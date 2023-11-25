import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateTaskForm.css";
const UpdateTaskForm = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/getTask/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTask(response.data);
      } catch (error) {
        toast.error("Error fetching task details");
        console.error("Error fetching task details:", error.message);
      }
    };

    // Fetch task details when the component mounts
    fetchTaskDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
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

      // Send a PUT request to update the task
      await axios.put(`http://localhost:5000/api/updateTask/${id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task updated successfully", {
        onClose: () => {
          navigate("/alltasks");
        },
      });
    } catch (error) {
      toast.error("Error updating task");
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="Update-task-form">
          <Link to="/">Back</Link>
          <h2 className="mb-4">Update Task</h2>
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
            <div className="mb-3">
              <label className="form-label status">Status: </label>{" "}
              <div className="form-check form-check-inline">
                {" "}
                <input
                  type="radio"
                  className="form-check-input"
                  name="status"
                  value="Incomplete"
                  checked={task.status === "Incomplete"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Incomplete</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="status"
                  value="Pending"
                  checked={task.status === "Pending"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Pending</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="status"
                  value="Completed"
                  checked={task.status === "Completed"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Completed</label>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update Task
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

export default UpdateTaskForm;
