import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

function TaskList({ tasks, onEdit, onDelete }) {
  // Menentukan warna lencana dan border berdasarkan tingkat prioritas
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "High":
        return {
          variant: "danger",
          borderClass: "border-start border-danger border-4",
        }; // Merah
      case "Medium":
        return {
          variant: "warning",
          borderClass: "border-start border-warning border-4",
        }; // Kuning
      case "Low":
        return {
          variant: "success",
          borderClass: "border-start border-success border-4",
        }; // Hijau
      default:
        return {
          variant: "secondary",
          borderClass: "border-start border-secondary border-4",
        };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Done":
        return "bg-success-subtle text-success border border-success-subtle";
      case "In Progress":
        return "bg-warning-subtle text-warning border border-warning-subtle";
      default:
        return "bg-secondary-subtle text-secondary border border-secondary-subtle";
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-light p-5 my-3">
        <div className="fs-1 mb-2">📋</div>
        <h5 className="fw-bold text-dark">No tasks found</h5>
        <p className="text-muted small mb-0">
          Click "+ Add Task" to create your first task!
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {tasks.map((task, index) => {
        const config = getPriorityConfig(task.priority);
        return (
          <Card
            key={index}
            className={`border-0 shadow-sm rounded-4 bg-white ${config.borderClass}`}
          >
            <Card.Body className="d-flex align-items-center justify-content-between py-3 px-4">
              <div className="d-flex flex-column">
                <span
                  className="text-uppercase text-muted fw-bold mb-1"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}
                >
                  Task
                </span>
                <span className="fw-bold text-dark fs-5">{task.title}</span>
              </div>

              <div className="d-flex align-items-center gap-4">
                <div className="text-center d-none d-md-block">
                  <span
                    className="text-muted d-block mb-1"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}
                  >
                    PRIORITY
                  </span>
                  <Badge
                    bg={config.variant}
                    className="px-3 py-2 fw-semibold rounded-pill shadow-sm"
                  >
                    {task.priority}
                  </Badge>
                </div>

                <div className="text-center d-none d-md-block">
                  <span
                    className="text-muted d-block mb-1"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}
                  >
                    STATUS
                  </span>
                  <span
                    className={`badge px-3 py-2 fw-semibold rounded-pill ${getStatusBadge(task.status)}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="d-flex gap-2">
                  <Button
                    variant="light"
                    size="sm"
                    className="text-primary bg-primary-subtle border-0 rounded-circle p-2 d-flex align-items-center justify-content-center shadow-none"
                    style={{ width: "38px", height: "38px" }}
                    onClick={() => onEdit(index)}
                    title="Edit Task"
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="text-danger bg-danger-subtle border-0 rounded-circle p-2 d-flex align-items-center justify-content-center shadow-none"
                    style={{ width: "38px", height: "38px" }}
                    onClick={() => onDelete(index)}
                    title="Delete Task"
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default TaskList;
