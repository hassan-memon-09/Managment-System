import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      <p className="text-lg text-gray-600 mb-6">
        Organize your life with our powerful and user-friendly task management application.
        Built with the MERN stack, Task Manager lets you create, edit, and track tasks
        effortlessly with a clean, responsive interface.
      </p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Features</h2>
        <ul className="list-disc list-inside mx-auto max-w-md text-left text-gray-600">
          <li>Create and manage tasks with ease</li>
          <li>Mark tasks as completed or pending</li>
          <li>Filter tasks by status</li>
          <li>Secure user authentication</li>
          <li>Responsive design for all devices</li>
        </ul>
      </div>
      <Link
        to="/tasks"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;