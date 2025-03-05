import React, { useState } from "react";

export const TodoModal = ({ todo, closeModal, updateDescription }) => {
    const [description, setDescription] = useState(todo.description || "");

    const handleSave = () => {
        updateDescription(todo.id, description);
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{todo.task}</h2>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Добавьте описание..."
                />
                <div>
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={closeModal}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};
