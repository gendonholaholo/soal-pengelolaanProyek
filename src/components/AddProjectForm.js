import React, { useState } from 'react';
import { createProject } from '../api/projectApi';

const AddProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      name,
      description,
    };

    try {
      await createProject(projectData);
      alert('Project created successfully!');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Project</h2>

      {/* Project Name Input */}
      <label htmlFor="project-name">Project Name</label>
      <input
        id="project-name"  
        name="projectName"
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Project Description Input */}
      <label htmlFor="project-description">Project Description</label>
      <textarea
        id="project-description" 
        name="projectDescription" 
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
