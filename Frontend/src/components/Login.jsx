import { useState,React } from 'react';
import { login, register } from '../services/api';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? 'Register' : 'Login'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="w-full text-blue-500 hover:underline"
          >
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;