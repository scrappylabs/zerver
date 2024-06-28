import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHome from "./MainHome";
import StudentHome from "./StudentHome";
import InstructorHome from "./InstructorHome";
import InstructorAttendance from "./InstructorAttendance";
import InstructorDone from "./InstructorDone";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/InstructorHome" element={<InstructorHome />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route
          path="/InstructorAttendance"
          element={<InstructorAttendance />}
        />
        <Route path="/InstructorDone" element={<InstructorDone />} />
      </Routes>
    </Router>
  );
}

export default App;

// below is for rest-api

const apiUrl = "http://10.100.178.140:5000/items";

async function getItems() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getItem(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createItem() {
  const newItem = {
    name: "item3",
    price: 15.99,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateItem(id) {
  const updatedItem = {
    name: "updated_item1",
    price: 9.99,
  };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteItem(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    displayOutput({ message: `Item ${id} deleted` });
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayOutput(data) {
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}
