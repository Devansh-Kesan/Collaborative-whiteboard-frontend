import './App.css';

import Register from "./components/Register";




function App() {
  return (
    <BoardProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </Router>
    </BoardProvider>
  );
}

export default App;
