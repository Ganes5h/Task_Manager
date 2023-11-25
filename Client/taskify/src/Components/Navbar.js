import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TASKIFY
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to="/alltasks">
                  Show Tasks
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to="/addtask">
                  Add Task
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to="/register">
                  Register
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={handelLogout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
