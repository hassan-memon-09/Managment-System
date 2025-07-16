import { updateTask, deleteTask } from '../services/api';
import { motion } from 'framer-motion';

function TaskList({ tasks, setEditingTask, setIsModalOpen, refreshTasks, token }) {
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      refreshTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      await updateTask(
        task._id,
        { ...task, status: task.status === 'pending' ? 'completed' : 'pending' },
        token
      );
      refreshTasks();
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 && <p className="text-gray-300 italic">No tasks found.</p>}
      {tasks.map((task) => (
        <motion.div
          key={task._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl hover:scale-[1.01] transition-transform duration-200"
        >
          <div>
            <h3
              className={`text-xl font-semibold ${
                task.status === 'completed' ? 'line-through text-green-300' : 'text-white'
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-300">{task.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleToggleStatus(task)}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                task.status === 'completed'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {task.status === 'completed' ? 'Mark Pending' : 'Mark Done'}
            </button>
            <button
              onClick={() => handleEdit(task)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default TaskList;
