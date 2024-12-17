import React, { useState } from 'react';
import { createTask } from '../api/projectApi';  

const AddTaskForm = ({ projectId }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Nama tugas tidak boleh kosong");
      return;
    }

    const taskData = { name, status };

    try {
      await createTask(projectId, taskData);  
      setSuccess(true);
      setName('');  
      setStatus('To Do');  
      setError(null);  
    } catch (error) {
      setError('Terjadi kesalahan saat menambahkan tugas.');
      setSuccess(false);
    }
  };

  return (
    <div className="add-task-form">
      <h4 className="text-center text-white mb-4">ADD NEW TASK</h4>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="mb-3">
          <label htmlFor="task-name" className="form-label">Nama Tugas</label>
          <input
            id="task-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Masukkan nama tugas"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="task-status" className="form-label">Status Tugas</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
            required
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Tambahkan Tugas</button>
      </form>

      {/* Pesan Status */}
      {success && <p className="text-success text-center mt-3">Tugas berhasil ditambahkan!</p>}
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
};

export default AddTaskForm;
