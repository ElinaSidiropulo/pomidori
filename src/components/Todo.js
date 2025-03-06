import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, openModal, openPomodoroModal }) => {
    return (
        <div className="Todo">
            <p className="incompleted" onClick={() => openModal(task)}>
                {task.task}
            </p>
            <div className="todo-buttons">
                <span
                    className="tomato-icon"
                    onClick={() => openPomodoroModal(task)}
                    style={{ cursor: "pointer", fontSize: "18px", marginRight: "10px" }}
                >
                    🍅
                </span>
                <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    );
};
