import './App.css';
import { StrictMode } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <StrictMode>
      <Navbar />
      <Outlet />
    </StrictMode>
  );
}

export default App;
