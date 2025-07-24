import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import socket from "../../utils/socket";

import classes from "./index.module.css";

import {
  getSvgPathFromStroke,
} from "../../utils/element";
import getStroke from "perfect-freehand";
import axios from "axios";


function Board({ id }) {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  console.log(id)

  const {
    elements,
    toolActionType,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo,
    redo,
    setCanvasId,
    setElements,
    setHistory
  } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);

  const token = localStorage.getItem("whiteboard_user_token");

  const [isAuthorized, setIsAuthorized] = useState(true);

  // Combined canvas initialization and socket handling
  useEffect(() => {
    if (!id || !token) return;
    
    

    // Clear canvas state immediately when switching canvases
    setElements([]);
    setHistory([]);
    setCanvasId(id);

    let mounted = true; // Flag to prevent state updates after unmount
    let initialDataLoaded = false;

    // Initialize canvas connection
    socket.emit("joinCanvas", { canvasId: id });

    // Socket event handlers
    // Socket event handlers
    const handleLoadCanvas = (initialElements) => {
      if (mounted && !initialDataLoaded) {
        initialDataLoaded = true;
        setElements(initialElements || []);
        setHistory([initialElements || []]);
      }
    };

    const handleDrawingUpdate = (updatedElements) => {
      if (mounted && initialDataLoaded) {
        setElements(updatedElements);
      }
    };

    const handleUnauthorized = (data) => {
      if (mounted) {
        alert("Access Denied: You cannot edit this canvas.");
        setIsAuthorized(false);
      }
    };

    // Set up socket listeners for this specific canvas
    socket.on(`loadCanvas_${id}`, handleLoadCanvas);
    socket.on(`receiveDrawingUpdate_${id}`, handleDrawingUpdate);
    socket.on(`unauthorized_${id}`, handleUnauthorized);

    // Fetch initial canvas data
    const fetchCanvasData = async () => {
      if (!mounted) return;
      
      try {
        const response = await axios.get(
          `http://localhost:5000/api/canvas/load/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (mounted) {
          const canvasElements = response.data.elements || [];
          setElements(canvasElements);
          setHistory(canvasElements);
        }
      } catch (error) {
        console.error("Error loading canvas:", error);
      }
    };

    fetchCanvasData();

    // Cleanup function
    return () => {
      mounted = false;
      socket.off(`loadCanvas_${id}`, handleLoadCanvas);
      socket.off(`receiveDrawingUpdate_${id}`, handleDrawingUpdate);
      socket.off(`unauthorized_${id}`, handleUnauthorized);
      // setElements([]);
      // setHistory([]);
      // setIsAuthorized(true);
    };
  }, [id, token]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSH:
          context.fillStyle = element.stroke;
          const path = new Path2D(getSvgPathFromStroke(getStroke(element.points)));
          context.fill(path);
          context.restore();
          break;
        case TOOL_ITEMS.TEXT:
          context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          context.restore();
          break;
        default:
          throw new Error("Type not recognized");
      }
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);


  useEffect(() => {
    const textarea = textAreaRef.current;
    if (toolActionType === TOOL_ACTION_TYPES.WRITING) {
      setTimeout(() => {
        textarea.focus();
      }, 0);
    }
  }, [toolActionType]);

  // console.log("Elements ",elements);

  const handleMouseDown = (event) => {
    if (!isAuthorized) return;
    boardMouseDownHandler(event, toolboxState);
  };

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Modified mouse handlers
  const handleMouseMove = debounce((event) => {
    if (!isAuthorized) return;
    boardMouseMoveHandler(event);
    if (elements.length > 0) {
      socket.emit("drawingUpdate", { 
        canvasId: id, 
        elements 
      });
    }
  }, 10);

  const handleMouseUp = () => {
    if (!isAuthorized) return;
    boardMouseUpHandler();
    if (elements.length > 0) {
      socket.emit("drawingUpdate", { 
        canvasId: id, 
        elements 
      });
    }
  };
  

  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && (
        <textarea
          type="text"
          ref={textAreaRef}
          className={classes.textElementBox}
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          onBlur={(event) => textAreaBlurHandler(event.target.value)}
        />
      )}
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

export default Board;
