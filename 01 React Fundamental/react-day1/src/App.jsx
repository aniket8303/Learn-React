import { useState, useEffect } from 'react';

import './App.css'
import Staff from './components/Staff';
import StaffForm from "./components/StaffForm";
function App() {

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {

    fetch("http://localhost:8080/api/staff")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch staff");
        }
        return response.json();
      })
      .then(data => {
        setStaffList(data);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching staff:", error);
        setError("Failed to load staff");
        setLoading(false);
      });
  }, []);


  function handleStaffAdded(newStaff) {
    setStaffList([...staffList, newStaff]);
  }
  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/staff/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete staff");
      }

      setStaffList(
        staffList.filter((staff) => staff.id !== id)
      );

    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  }

  function handleEdit(id) {
    const staff = staffList.find((staff) => staff.id === id);
    setEditingStaff(staff);
  }

  function handleStaffUpdated(updatedStaff) {
    setStaffList(
      staffList.map((staff) =>
        staff.id === updatedStaff.id
          ? updatedStaff
          : staff
      )
    );
  }

  function handleCancelEdit() {
    setEditingStaff(null);
  }
  return (
    <div>
      <h1>Staff Management System</h1>

      <StaffForm onStaffAdded={handleStaffAdded}
        onStaffUpdated={handleStaffUpdated}
        editingStaff={editingStaff}
        onCancelEdit={handleCancelEdit} />

      {loading && <p>Loading staff...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        staffList.map((staff) => (
          <Staff
            key={staff.id}
            id={staff.id}
            name={staff.name}
            department={staff.department}
            role={staff.role}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        ))
      )}

    </div>
  );
}

export default App
