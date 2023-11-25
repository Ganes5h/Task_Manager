import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!user.username.trim() || !user.email.trim() || !user.password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Make a POST request to the registration endpoint
      const response = await axios.post(
        "http://localhost:5000/users/register",
        user
      );

      toast.success("Registration successful", response);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.message);
      // Display an error message if registration fails
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="Register-form Register-task-form">
          <Link to="/">Back</Link>
          <h2 className="mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Register
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

export default Register;
