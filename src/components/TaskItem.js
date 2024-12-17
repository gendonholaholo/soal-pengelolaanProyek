import React, { useState } from 'react';
import { updateTaskStatus } from '../api/projectApi';

const TaskItem = ({ task, onStatusChange }) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      await updateTaskStatus(task.id, newStatus);

      setStatus(newStatus);

      if (onStatusChange) {
        onStatusChange(task.id, newStatus);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{task.name}</h5>
        <p className="card-text">Status: {status}</p>
        <select value={status} onChange={handleStatusChange} className="form-select">
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;
