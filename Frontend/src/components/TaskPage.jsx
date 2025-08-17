import { useState, useEffect } from 'react';
import TaskList from './TaskLists';
import TaskForm from './TaskForm';
import { getTasks } from '../services/api';

function TaskPage({ token }) {
  const [tasks, setTasks] = useState([]);
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
      console.error('Error In fetching the Task:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>
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

export default TaskPage;