import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";

function InstructorAttendance() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const qrRef = useRef();

  useEffect(() => {
    if (qrRef.current && text) {
      QRCode.toCanvas(qrRef.current, text, (error) => {
        if (error) console.error(error);
      });
    }
  }, [text]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setText(event.target.value);
    }
  };

  return (
    <div className="InstructorAttendance">
      <canvas id="qrcode" ref={qrRef}></canvas>
      <input
        id="text"
        type="text"
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="InstructorAttendance_Done"
        onClick={() => navigate("/InstructorHome")}
      >
        Cancel
      </button>
    </div>
  );
}

export default InstructorAttendance;

//testing api

// URL of the API endpoint
const apiUrl = "http://10.100.178.140:5000/items";

// Function to make the GET request
async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parse the JSON from the response
    const data = await response.json();

    // Handle the data (e.g., update the UI)
    console.log(data);
  } catch (error) {
    // Handle any errors
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Call the function to fetch data
fetchData();
