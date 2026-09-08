import { useState, useEffect } from "react";

function StaffForm({
    onStaffAdded,
    onStaffUpdated,
    editingStaff,
    onCancelEdit
}) {

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        role: ""
    });

    const [errors, setErrors] = useState({});


    // Populate form when editing
    useEffect(() => {

        if (editingStaff) {

            setFormData({
                name: editingStaff.name,
                department: editingStaff.department,
                role: editingStaff.role
            });

            setErrors({});

        } else {

            setFormData({
                name: "",
                department: "",
                role: ""
            });

            setErrors({});
        }

    }, [editingStaff]);


    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    }


    // Handle Add / Update
    async function handleSubmit(e) {

        e.preventDefault();


        // Validation
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


        try {

            let url = "http://localhost:8080/api/staff";
            let method = "POST";


            // Update mode
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

                throw new Error(
                    editingStaff
                        ? "Failed to update staff"
                        : "Failed to add staff"
                );
            }


            const data = await response.json();


            // Update
            if (editingStaff) {

                onStaffUpdated(data);

                onCancelEdit();

            }

            // Add
            else {

                onStaffAdded(data);

                setFormData({
                    name: "",
                    department: "",
                    role: ""
                });
            }


            setErrors({});


        } catch (error) {

            console.error(
                "Error submitting staff:",
                error
            );
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

            {errors.name && (
                <p>{errors.name}</p>
            )}


            <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
            />

            {errors.department && (
                <p>{errors.department}</p>
            )}


            <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
            />

            {errors.role && (
                <p>{errors.role}</p>
            )}


            <button type="submit">

                {editingStaff
                    ? "Update Staff"
                    : "Add Staff"}

            </button>


            {editingStaff && (

                <button
                    type="button"
                    onClick={onCancelEdit}
                >
                    Cancel
                </button>

            )}

        </form>
    );
}

export default StaffForm;