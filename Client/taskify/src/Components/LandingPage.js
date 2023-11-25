// TypewriterDemo.js
import React from "react";
import Typewriter from "typewriter-effect";
import illustratedImage from "../images/illustratedImage.jpg";
import "./Landing.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-parent">
      <div className="ill">
        <img src={illustratedImage} width={800} alt="My Illustrator" />
      </div>
      <div className="typeWriter">
        <h1>
          Welcome to the Task Management App. This application allows you to
          manage your tasks efficiently.
        </h1>
        <h1>
          <div className="type">
            <Typewriter
              options={{
                strings: [
                  "Organize tasks effortlessly.",
                  "Be productive and focused.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </h1>
        <div className="buttons-container">
          <Link className="btn btn-primary" to="/register">
            Register
          </Link>
          <Link className="btn btn-primary" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
