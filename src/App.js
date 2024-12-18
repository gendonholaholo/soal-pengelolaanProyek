import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import ProjectListComponent from './components/ProjectListComponent';
import AddProjectForm from './components/AddProjectForm';
import TaskListComponent from './components/TaskListComponent';
import AddTaskForm from './components/AddTaskForm';
import LoginComponent from './components/LoginComponent'; 
import ProtectedRoute from './components/ProtectedRoute'; 
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
            {/* Rute Login */}
            <Route path="/login" element={<LoginComponent />} />

            {/* Rute Protected */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProjectListComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/new"
              element={
                <ProtectedRoute>
                  <AddProjectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:projectId/tasks"
              element={
                <ProtectedRoute>
                  <TaskListComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:projectId/tasks/new"
              element={
                <ProtectedRoute>
                  <AddTaskForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
