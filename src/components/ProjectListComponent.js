import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { setProjects } from '../redux/projectSlice'; 
import { getProjects } from '../api/projectApi'; 
import TaskListComponent from './TaskListComponent';
import AddTaskForm from './AddTaskForm';
import { Link } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FaTasks, FaPlusCircle } from 'react-icons/fa'; 

const ProjectListComponent = () => {
  const dispatch = useDispatch(); 
  const projects = useSelector((state) => state.projects.projects); 
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        dispatch(setProjects(data)); // Update Redux state dengan proyek
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [dispatch]);

  const handleViewTasks = (projectId) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProjectId(null);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 text-primary">Daftar Proyek</h2>

      {/* Card Grid Layout for Projects */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map((project) => (
          <div key={project.id} className="col">
            <div className="card h-100 shadow-lg border-light rounded-lg">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-dark">{project.name}</h5>
                <p className="card-text text-muted">{project.description}</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-info w-100"
                    onClick={() => handleViewTasks(project.id)}
                  >
                    <FaTasks className="me-2" /> Lihat Tugas
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to Add New Project */}
      <div className="text-center mt-5">
        <Link to="/projects/new" className="btn btn-success btn-lg">
          <FaPlusCircle className="me-2" /> Tambah Proyek Baru
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
        <Modal.Header className="d-flex justify-content-center align-items-center" />
        <Modal.Body className="d-flex justify-content-center align-items-center">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Memuat Tugas...</p>
            </div>
          ) : selectedProjectId ? (
            <>
              <TaskListComponent projectId={selectedProjectId} />
              <hr />
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
