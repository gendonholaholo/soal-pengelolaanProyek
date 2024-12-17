import React, { useEffect, useState } from 'react';
import { getTasksByProject } from '../api/projectApi';
import TaskItem from './TaskItem'; 

const TaskListComponent = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error message jika ada
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

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Daftar Tugas untuk Proyek {projectId}</h2>
      
      {/* Jika tidak ada tugas */}
      {tasks.length === 0 ? (
        <div className="alert alert-info">Tidak ada tugas untuk proyek ini.</div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={handleTaskStatusChange} // Mengirim callback untuk status change
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskListComponent;
