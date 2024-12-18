import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../redux/projectSlice'; 
import { getProjects } from '../api/projectApi'; 
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FaTasks, FaPlusCircle } from 'react-icons/fa';
import { logout } from '../redux/store'; 
import TaskListComponent from './TaskListComponent';
import AddTaskForm from './AddTaskForm';

const ProjectListComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects); 
  const user = useSelector((state) => state.auth.user); 
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects(); 
        dispatch(setProjects(data)); 
      } catch (error) {
        console.error('Terjadi kesalahan saat memuat proyek:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(); 
  }, [dispatch, user, navigate]); 

  const handleViewTasks = (projectId) => {
    setSelectedProjectId(projectId); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedProjectId(null); 
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 text-primary">Daftar Proyek</h2>

      {user && (
        <>
          {/* Menampilkan daftar proyek jika user sudah login */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="col">
                  <div className="card shadow-lg border-light rounded-lg h-100">
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
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Belum ada proyek untuk ditampilkan.</p>
              </div>
            )}
          </div>

          {/* Tombol untuk menambah proyek baru */}
          <div className="text-center mt-5">
            <Link to="/projects/new" className="btn btn-success btn-lg">
              <FaPlusCircle className="me-2" /> Tambah Proyek Baru
            </Link>
          </div>

          {/* Tombol logout */}
          <div className="text-center mt-3">
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </div>
        </>
      )}

      {/* Modal untuk melihat tugas proyek */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        dialogClassName="modal-dialog-centered-custom"
      >
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
