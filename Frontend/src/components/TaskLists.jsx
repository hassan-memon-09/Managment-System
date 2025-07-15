import { updateTask, deleteTask } from '../services/api';

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
      {tasks.length === 0 && <p className="text-gray-500">No tasks found.</p>}
      {tasks.map(task => (
        <div
          key={task._id}
          className="flex items-center justify-between p-4 bg-white shadow rounded"
        >
          <div>
            <h3 className={`text-lg ${task.status === 'completed' ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-400">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleToggleStatus(task)}
              className={`px-3 py-1 rounded ${
                task.status === 'completed'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
            </button>
            <button
              onClick={() => handleEdit(task)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;