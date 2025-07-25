import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import boardContext from '../../store/board-context';
import { useParams } from 'react-router-dom';
import socket from "../../utils/socket";

const Sidebar = () => {
  const [canvases, setCanvases] = useState([]);
  const token = localStorage.getItem('whiteboard_user_token');
  const { canvasId, setCanvasId,setElements,setHistory, isUserLoggedIn, setUserLoginStatus} = useContext(boardContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { id } = useParams(); 

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchCanvases();

      // Listen for canvas list updates
      socket.on(`canvasListUpdate_${localStorage.getItem('userId')}`, () => {
          fetchCanvases();
      });

      return () => {
          socket.off(`canvasListUpdate_${localStorage.getItem('userId')}`);
      };
    }
  }, [isUserLoggedIn]);

  useEffect(() => {}, []);

  const fetchCanvases = async () => {
    try {
      const response = await axios.get('https://realtime-whiteboard-1g1v.onrender.com/api/canvas/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCanvases(response.data);
      console.log(response.data)
      
      if (response.data.length === 0) {
        const newCanvas = await handleCreateCanvas();
        if (newCanvas) {
          setCanvasId(newCanvas._id);
          handleCanvasClick(newCanvas._id);
        }
      } else if (!canvasId && response.data.length > 0) {
        if(!id){
          setCanvasId(response.data[0]._id);
          handleCanvasClick(response.data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching canvases:', error);
    }
  };

  const handleCreateCanvas = async () => {
    try {
      const response = await axios.post('https://realtime-whiteboard-1g1v.onrender.com/api/canvas/create', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data)  
      fetchCanvases();
      setCanvasId(response.data.canvasId);
      handleCanvasClick(response.data.canvasId);
    } catch (error) {
      console.error('Error creating canvas:', error);
      return null;
    }
  };

  const handleDeleteCanvas = async (id) => {
    try {
      await axios.delete(`https://realtime-whiteboard-1g1v.onrender.com/api/canvas/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCanvases();
      setCanvasId(canvases[0]._id);
      handleCanvasClick(canvases[0]._id);
    } catch (error) {
      console.error('Error deleting canvas:', error);
    }
  };

  const handleCanvasClick = async (id) => {
    navigate(`/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('whiteboard_user_token');
    setCanvases([]);
    setUserLoginStatus(false);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleShare = async () => {
    if (!email.trim()) {
      setError("Please enter an email.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      setSuccess(""); // Clear previous success message

      const response = await axios.put(
        `https://realtime-whiteboard-1g1v.onrender.com/api/canvas/share/${canvasId}`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Emit socket event for real-time update
      socket.emit("canvasShared", { recipientId: response.data.recipientId });

      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to share canvas.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={styles.sidebar}>
      <button 
        className={styles["create-button"]}
        onClick={handleCreateCanvas} 
        disabled={!isUserLoggedIn}
      >
        + Create New Canvas
      </button>
      <ul className={styles["canvas-list"]}>
        {canvases.map(canvas => (
          <li 
            key={canvas._id} 
            className={`${styles["canvas-item"]} ${canvas._id === canvasId ? styles.selected : ''}`}
          >
            <span 
              className={styles["canvas-name"]} 
              onClick={() => handleCanvasClick(canvas._id)}
            >
              {canvas._id}
            </span>
            <button className={styles["delete-button"]} onClick={() => handleDeleteCanvas(canvas._id)}>
              del
            </button>
          </li>
        ))}
      </ul>
      
      <div className={styles["share-container"]}>
        <input
          type="email"
          placeholder="Enter the email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles["share-button"]} onClick={handleShare} disabled={!isUserLoggedIn}>
          Share
        </button>
        {error && <p className={styles["error-message"]}>{error}</p>}
        {success && <p className={styles["success-message"]}>{success}</p>}
    </div>
      {isUserLoggedIn ? (
        <button className={`${styles["auth-button"]} ${styles["logout-button"]}`} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className={`${styles["auth-button"]} ${styles["login-button"]}`} onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Sidebar;
