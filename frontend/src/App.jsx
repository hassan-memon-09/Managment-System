// src/App.jsx
import { useState, useEffect } from 'react';
import TaskList from './components/TaskLists';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import { getTasks } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(token);
      setTasks(response.tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setToken(null);
    setTasks([]);
  };

  const userName = localStorage.getItem('name');

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'all' ? true : task.status === filter;
    const matchesSearch =
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task._id?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-900 text-white font-sans px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">🌟 Task Manager</h1>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="inline-flex justify-center w-full rounded-md border border-white/30 shadow-sm px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              👤 {userName}
            </button>
            {showDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all duration-300"
            >
              ➕ Add Task
            </button>
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-black"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="🔍 Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-64 text-black"
          />
        </div>

        <div className="bg-white/10 border border-white/20 p-4 rounded-xl shadow-lg mb-6">
          <TaskList
            tasks={filteredTasks}
            setEditingTask={setEditingTask}
            setIsModalOpen={setIsModalOpen}
            refreshTasks={fetchTasks}
            token={token}
          />
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-black"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
              >
                <TaskForm
                  setIsModalOpen={setIsModalOpen}
                  refreshTasks={fetchTasks}
                  editingTask={editingTask}
                  setEditingTask={setEditingTask}
                  token={token}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
