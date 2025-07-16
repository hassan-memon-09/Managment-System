import { useState } from 'react';
import { login, register } from '../services/api';
import { motion } from 'framer-motion';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    try {
      const response = isRegister
        ? await register({ username, password })
        : await login({ username, password });
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setError('');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
      <motion.div
        className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isRegister ? '🔐 Register' : '🔓 Login'}
        </h2>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="👤 Username"
            className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="🔑 Password"
            className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="w-full text-sm text-purple-200 hover:text-white transition-colors"
          >
            {isRegister ? 'Already have an account? Login' : 'New here? Register'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
