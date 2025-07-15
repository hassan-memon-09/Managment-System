import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/Landing';
import TaskPage from './components/TaskPage';
// import Login from './components/Login';
// import { getTasks } from '';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar setToken={setToken} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tasks" element={<TaskPage token={token} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;