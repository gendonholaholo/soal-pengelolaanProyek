import axios from 'axios';

const API_URL = 'https://test-fe.sidak.co.id/api';

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getTasksByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks for project:', error);
    throw error;
  }
};

export const createTask = async (projectId, taskData) => {
  try {
    const response = await axios.post(`${API_URL}/projects/${projectId}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};
