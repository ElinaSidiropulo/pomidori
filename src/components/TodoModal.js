import React, { useState } from "react";

export const TodoModal = ({ todo, closeModal, updateTodo }) => {
    const [description, setDescription] = useState(todo.description || "");
    const [status, setStatus] = useState(todo.completed ? "Completed" : "In Progress");

    const handleSave = () => {
        updateTodo(todo.id, { description, completed: status === "Completed" });
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-header">{todo.task}</h2>
                <div className="modal-body">
                    <textarea
                        className="modal-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a description..."
                    />
                    <div className="modal-status">
                        <label>Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="modal-select"
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
                <div className="modal-actions">
                    <button className="modal-btn" onClick={handleSave}>Save</button>
                    <button className="modal-btn" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};
