import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';
import { motion } from 'framer-motion';

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
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md bg-white text-black rounded-2xl p-6 shadow-2xl backdrop-blur-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {editingTask ? '✏️ Edit Task' : '➕ Add New Task'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingTask(null);
                setTitle('');
                setDescription('');
                setError('');
              }}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {editingTask ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default TaskForm;
