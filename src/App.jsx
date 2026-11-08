import React, { useState } from "react";
import { Container, Navbar, Button, Row, Col } from "react-bootstrap";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  // Set array tugas awal kosong (tidak ada task dulu)
  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleShowAdd = () => {
    setCurrentTaskIndex(null);
    setShowModal(true);
  };

  const handleShowEdit = (index) => {
    setCurrentTaskIndex(index);
    setShowModal(true);
  };

  const handleSaveTask = (taskData) => {
    if (currentTaskIndex !== null) {
      // Update Task
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = taskData;
      setTasks(updatedTasks);
    } else {
      // Create Task
      setTasks([...tasks, taskData]);
    }
  };

  const handleDeleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  return (
    <div className="bg-light min-vh-100 pb-5 font-sans">
      {/* Navbar Atas */}
      <Navbar bg="white" className="shadow-sm mb-4 py-3">
        <Container>
          <Navbar.Brand className="fw-bold fs-4 text-primary d-flex align-items-center gap-2">
            🚀 <span className="text-dark">Task Management</span> Dashboard
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Konten Utama */}
      <Container>
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="fw-bold text-dark m-0">Task List</h2>
            <p className="text-muted small m-0">
              Manage your daily academic and project activities efficiently.
            </p>
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={handleShowAdd}
              className="rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"
            >
              <span>+</span> Add Task
            </Button>
          </Col>
        </Row>

        {/* Daftar Tugas */}
        <TaskList
          tasks={tasks}
          onEdit={handleShowEdit}
          onDelete={handleDeleteTask}
        />

        {/* Modal Form Tambah/Edit */}
        <TaskForm
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSaveTask}
          currentTask={
            currentTaskIndex !== null ? tasks[currentTaskIndex] : null
          }
        />
      </Container>
    </div>
  );
}

export default App;
