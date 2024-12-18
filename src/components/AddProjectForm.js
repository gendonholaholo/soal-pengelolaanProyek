import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { addProject } from '../redux/projectSlice'; 
import { createProject } from '../api/projectApi'; 

const AddProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = { name, description };

    try {
      const newProject = await createProject(projectData);

      dispatch(addProject(newProject)); 

      alert('Proyek berhasil dibuat!');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Terjadi kesalahan saat membuat proyek:', error);
      alert('Gagal membuat proyek!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Proyek</h2>

      {/* Input untuk Nama Proyek */}
      <label htmlFor="project-name">Nama Proyek</label>
      <input
        id="project-name"
        name="projectName"
        type="text"
        placeholder="Nama Proyek"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Input untuk Deskripsi Proyek */}
      <label htmlFor="project-description">Deskripsi Proyek</label>
      <textarea
        id="project-description"
        name="projectDescription"
        placeholder="Deskripsi Proyek"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Tambah Proyek</button>
    </form>
  );
};

export default AddProjectForm;
