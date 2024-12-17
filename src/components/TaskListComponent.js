import React, { useEffect, useState } from 'react';
import { getTasksByProject } from '../api/projectApi';
import TaskItem from './TaskItem';
import { Spinner, Alert } from 'react-bootstrap';

const TaskListComponent = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error message if any
        const data = await getTasksByProject(projectId);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks for project:', error);
        setError('Gagal memuat tugas. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  // Callback to handle task status change
  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="task-list-container">
      <h4 className="text-center mb-4">DAFTAR TUGAS {projectId}</h4>

      {/* Displaying error message */}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* If loading, show a spinner */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
          <p className="ms-3">Memuat Tugas...</p>
        </div>
      ) : (
        <>
          {/* If no tasks available */}
          {tasks.length === 0 ? (
            <Alert variant="info" className="text-center">Tidak ada tugas untuk proyek ini.</Alert>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={handleTaskStatusChange} // Send callback to handle status change
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskListComponent;
