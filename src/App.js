import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectListComponent from './components/ProjectListComponent';
import AddProjectForm from './components/AddProjectForm';
import TaskListComponent from './components/TaskListComponent';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container-fluid bg-dark text-white min-vh-100">
        {/* Header */}
        <header className="text-center py-5">
          <h1 className="display-4 app-header">Pengelolaan Proyek</h1>
        </header>

        {/* Routes */}
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<ProjectListComponent />} />
            <Route path="/projects/new" element={<AddProjectForm />} />
            <Route path="/projects/:projectId/tasks" element={<TaskListComponent />} />
            <Route path="/projects/:projectId/tasks/new" element={<AddTaskForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
