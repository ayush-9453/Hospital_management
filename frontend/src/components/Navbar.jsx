import React from 'react';
import { useNavigate,Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // if you're using tokens
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 px-4 py-4 text-white flex justify-between items-center shadow-md">
    <div className="text-2xl font-bold">
      <Link to="/home">Hospital System</Link>
    </div>
    <div className="flex gap-6 text-lg">
      <Link to="/about" className="p-1 hover:text-gray-200 hover:underline">About</Link>
      <Link to="/contact" className="p-1 hover:text-gray-200 hover:underline">Contact</Link>
      <button 
        onClick={handleLogout}
        className="p-1 border border-transparent hover:border-white rounded transition duration-200"
      >
        Logout
      </button>
    </div>
  </nav>
  );
}

export default Navbar;
