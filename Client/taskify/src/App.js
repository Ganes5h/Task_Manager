import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar.js";
import AddTaskForm from "./Components/AddTaskForm.js";
import UpdateTaskForm from "./Components/UpdateTaskForm.js";
import ListTask from "./Components/ListTask.js";
import Footer from "./Components/Footer/Footer.js";
import LandingPage from "./Components/LandingPage.js";
import Register from "./Components/Register.js";
import Login from "./Components/Login.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/addtask" element={<AddTaskForm />} />
          <Route path="/updatetask/:id" element={<UpdateTaskForm />} />
          <Route path="/alltasks" element={<ListTask />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
