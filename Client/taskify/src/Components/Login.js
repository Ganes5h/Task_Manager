import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Use Axios to send a POST request to the login endpoint
      const response = await axios.post(
        "http://localhost:5000/users/login",
        loginData
      );
      // Extract the token from the response
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Optionally, you can store the user ID or other information if needed
      const userId = response.data.userId;
      localStorage.setItem("userId", userId);

      console.log(response.data);
      toast.success("Login successful");

      // Redirect to the desired page after successful login
      navigate("/alltasks");
    } catch (error) {
      console.error("Login failed:", error.message);

      // Display an error message
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="Login-form Login-task-form">
          <Link to="/">Back</Link>
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Login
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

export default Login;
