import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(email, password);
      login(token, user);

      if (user.role === 'admin') navigate('/dashboard');
      else if (user.role === 'verifier') navigate('/dashboard');
      else navigate('/loan-application');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (<><div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between border-b border-gray-200">
    <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
      EasyLoan <span className="text-gray-700">Manager</span>
    </h1>
  </div>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-100"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </form>
    </div>
  </>
  );
};

export default LoginPage;
