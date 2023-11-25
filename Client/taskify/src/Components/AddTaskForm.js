import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AddTaskForm.css";

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      await axios.post("http://localhost:5000/api/createTask", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        toast.success("Task added successfully", {
          onClose: () => {
            // Redirect to the dashboard after the toast is closed
            navigate("/alltasks");
          },
        });
      }, 500);
      // navigate("/");
    } catch (error) {
      toast.error("Error adding task. Please try again.");
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="Login-form Add-task-form">
          <Link to="/">Back</Link>
          <h2 className="mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <input
              type="radio"
              name="status"
              value="Pending"
              checked={task.status === "Pending"}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{ background: "#333", color: "#fff" }}
        />
      </div>
    </div>
  );
};

export default AddTaskForm;
