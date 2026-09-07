function Staff(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Department: {props.department}</p>
            <p>Role: {props.role}</p>
            <button onClick={() => props.onEdit(props.id)}>Edit</button>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
    );
}

export default Staff;