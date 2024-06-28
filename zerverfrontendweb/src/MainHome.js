import React from "react";
import { useNavigate } from "react-router-dom";

function MainHome() {
  const navigate = useNavigate();

  return (
    <div className="MainHome">
      <button
        className="HomeNavigationButton"
        onClick={() => navigate("/InstructorHome")}
      >
        Instructor
      </button>
      <button
        className="HomeNavigationButton"
        onClick={() => navigate("/StudentHome")}
      >
        Student
      </button>
    </div>
  );
}

export default MainHome;
