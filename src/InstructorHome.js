import React from "react";
import { useNavigate } from "react-router-dom";

function InstructorHome() {
  const navigate = useNavigate();

  return (
    <div className="InstructorHome">
      <button
        className="InstructorHome_TakeAttendance"
        onClick={() => navigate("/InstructorAttendance")}
      >
        Take Attendance
      </button>
      <button className="InstructorHome_Back" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default InstructorHome;
