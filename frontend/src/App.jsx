import { useState, useEffect } from 'react';
import TaskList from './components/TaskLists';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import { getTasks } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
    setToken(null);
    setTasks([]);
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <TaskList
        tasks={tasks.filter(task =>
          filter === 'all' ? true : task.status === filter
        )}
        setEditingTask={setEditingTask}
        setIsModalOpen={setIsModalOpen}
        refreshTasks={fetchTasks}
        token={token}
      />
      {isModalOpen && (
        <TaskForm
          setIsModalOpen={setIsModalOpen}
          refreshTasks={fetchTasks}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          token={token}
        />
      )}
    </div>
  );
}

export default App;