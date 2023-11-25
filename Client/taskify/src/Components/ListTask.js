import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Complete from "../images/Complete.jpg";
import "./Listtasks.css";
const ListTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch user details using the stored token
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Handle the case where the token is not present
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/showAlltasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle the case where the token is not present
        console.error("Token not found in localStorage");
        return;
      }

      // Make a DELETE request to the API to delete the task
      await axios.delete(`http://localhost:5000/api/deleteTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task removed successfully");
      // Update the tasks in the state after successful deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      {" "}
      <div className="parent-ListTask">
        <div className="child-image">
          <img src={Complete} width={450} alt="My Illustrator" />
        </div>
        <div className="child-text">
          {" "}
          <h3>
            Welcome to your task management dashboard. Stay organized and
            focused by managing your tasks efficiently. Add new tasks, update
            their status, and remove completed tasks. Your productivity journey
            starts here!
          </h3>
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Tasks</h2>

        <Link to="/addtask" className="btn btn-primary mb-4">
          Add Task
        </Link>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Description</th>
                <th>Update Task/Status</th>
                <th>Remove Task</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.status}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Link
                      to={`/updatetask/` + task._id}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListTask;
