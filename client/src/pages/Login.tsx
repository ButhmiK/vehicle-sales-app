import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-green-200 via-green-100 to-orange-100">
      <div className="bg-white shadow-xl rounded-2xl p-12 w-full max-w-md border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-orange-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-orange-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white font-semibold p-3 w-full rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <div className="mt-10 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-green-500 hover:underline">
            Register
          </a>
        </p>
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          <a href="/forgot-password" className="text-green-500 hover:underline">
            Forgot Password?
          </a>
        </p>
        </div>
    </div>
  );
};

export default Login;
