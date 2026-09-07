import { useState, useEffect } from "react";
import { CgUserList } from "react-icons/cg";
function StaffForm({ onStaffAdded,
    onStaffUpdated,
    editingStaff,
    onCancelEdit }) {

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        role: ""
    });


    useEffect(() => {
        if (editingStaff) {
            setFormData({
                name: editingStaff.name,
                department: editingStaff.department,
                role: editingStaff.role
            });
        }
    }, [editingStaff]);
    const [errors, setErrors] = useState({});
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const newErrors = {};

            if (!formData.name.trim()) {
                newErrors.name = "Name is required";
            }

            if (!formData.department.trim()) {
                newErrors.department = "Department is required";
            }

            if (!formData.role.trim()) {
                newErrors.role = "Role is required";
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            let url = "http://localhost:8080/api/staff";
            let method = "POST";

            if (editingStaff) {
                url = `http://localhost:8080/api/staff/${editingStaff.id}`;
                method = "PUT";
            }
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to add staff");
            }

            const data = await response.json();

            console.log("Response:", data);

            if (editingStaff) {
                onStaffUpdated(data);
                onCancelEdit();
            } else {
                onStaffAdded(data);
            }

            // Clear form after successful submission
            setFormData({
                name: "",
                department: "",
                role: ""
            });

        } catch (error) {
            console.error("Error adding staff:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            {errors.name && <p>{errors.name}</p>}

            <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
            />
            {errors.department && <p>{errors.department}</p>}

            <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
            />
            {errors.role && <p>{errors.role}</p>}
            <button type="submit">{editingStaff ? "Update Staff" : "Add Staff"}</button>
        </form>
    );
}

export default StaffForm;