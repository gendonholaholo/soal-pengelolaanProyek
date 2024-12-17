import React, { useEffect, useState } from 'react';
import { getProjects } from '../api/projectApi';
import TaskListComponent from './TaskListComponent'; 
import AddTaskForm from './AddTaskForm';  
import { Link } from 'react-router-dom'; 
import { Modal, Button, Spinner } from 'react-bootstrap'; 

const ProjectListComponent = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects(); 
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewTasks = (projectId) => {
    setSelectedProjectId(projectId);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedProjectId(null); 
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4 text-white">Daftar Proyek</h2>

      {/* Card Grid Layout for Projects */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map((project) => (
          <div key={project.id} className="col">
            <div className="card h-100 shadow-sm border-light rounded">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleViewTasks(project.id)}
                >
                  Lihat Tugas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to Add New Project */}
      <div className="text-center mt-4">
        <Link to="/projects/new" className="btn btn-success">
          Tambah Proyek Baru
        </Link>
      </div>

      {/* Modal to display tasks and AddTaskForm */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        dialogClassName="modal-dialog-centered-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Daftar Tugas Proyek</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Loading Spinner or Task List */}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Memuat Tugas...</p>
            </div>
          ) : selectedProjectId ? (
            <>
              <TaskListComponent projectId={selectedProjectId} />
              <hr />
              <h4>Tambah Tugas Baru</h4>
              <AddTaskForm projectId={selectedProjectId} />
            </>
          ) : (
            <p>Tidak ada tugas yang tersedia.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectListComponent;
