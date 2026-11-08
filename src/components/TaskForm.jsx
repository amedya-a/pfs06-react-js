import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function TaskForm({ show, handleClose, handleSave, currentTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");

  // Setiap kali properti 'show' atau 'currentTask' berubah, perbarui form
  useEffect(() => {
    if (show) {
      if (currentTask) {
        // Jika mode Edit, isi form dengan data tugas yang dipilih
        setTitle(currentTask.title);
        setPriority(currentTask.priority);
        setStatus(currentTask.status);
      } else {
        // Jika mode Add (Tambah), pastikan form benar-benar bersih / kosong
        setTitle("");
        setPriority("Medium");
        setStatus("To Do");
      }
    }
  }, [show, currentTask]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave({ title, priority, status });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-primary">
          {currentTask ? "✏️ Edit Task" : "✨ Add New Task"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body className="pt-3">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary small">
              Task Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Complete database normalization..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="py-2 shadow-none border-secondary-subtle"
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Priority Level
              </Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="py-2 shadow-none border-secondary-subtle"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </Form.Select>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Label className="fw-semibold text-secondary small">
                Current Status
              </Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="py-2 shadow-none border-secondary-subtle"
              >
                <option value="To Do">📌 To Do</option>
                <option value="In Progress">⏳ In Progress</option>
                <option value="Done">✅ Done</option>
              </Form.Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 pb-3">
          <Button
            variant="light"
            onClick={handleClose}
            className="px-4 text-secondary fw-semibold"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="px-4 fw-semibold shadow-sm"
          >
            {currentTask ? "Save Changes" : "Create Task"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskForm;
