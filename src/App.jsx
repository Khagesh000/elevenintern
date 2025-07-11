import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// ✅ CORRECT
import { DataProvider } from './components/DataContext';

import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import Offerings from './components/Offerings';
import Students from './components/Students';
import './App.scss';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <h2 className='link-h2'><Link to="/">Student Registration</Link></h2>
            <ul className="nav-links">
              <li><Link to="/">Types</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/offerings">Offerings</Link></li>
              <li><Link to="/students">Students</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<CourseTypes />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/offerings" element={<Offerings />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
