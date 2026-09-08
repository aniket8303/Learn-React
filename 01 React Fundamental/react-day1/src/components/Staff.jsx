function Staff({
    id,
    name,
    department,
    role,
    onEdit,
    onDelete
}) {

    return (
        <div className="staff-card">

            <h2>{name}</h2>

            <p>Department: {department}</p>

            <p>Role: {role}</p>

            <button onClick={() => onEdit(id)}>
                Edit
            </button>

            <button onClick={() => onDelete(id)}>
                Delete
            </button>

        </div>
    );
}

export default Staff;