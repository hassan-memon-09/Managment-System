import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';

function TaskForm({ setIsModalOpen, refreshTasks, editingTask, setEditingTask, token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      if (editingTask) {
        await updateTask(editingTask._id, { title, description }, token);
      } else {
        await createTask({ title, description }, token);
      }
      refreshTasks();
      setIsModalOpen(false);
      setEditingTask(null);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Error saving task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingTask ? 'Edit Task' : 'Add Task'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-2 border rounded"
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingTask(null);
                setTitle('');
                setDescription('');
                setError('');
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingTask ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;