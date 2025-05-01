import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Super Mobile Car Sales</Link>
        <div>
          <Link to="/" className="text-white mr-4">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/vehicles" className="text-white mr-4">Vehicles</Link>
              <Link to="/customers" className="text-white mr-4">Customers</Link>
              <Link to="/payments" className="text-white mr-4">Payments</Link>
              <Link to="/sales" className="text-white mr-4">Sales</Link>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;