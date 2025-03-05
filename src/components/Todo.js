import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, openModal }) => {
    return (
        <div className="Todo">
            <p
                className={`${task.completed ? "completed" : "incompleted"}`}
                onClick={() => {
                    console.log("Clicked on:", task);
                    if (openModal) {
                        openModal(task);
                    } else {
                        console.error("openModal is not defined or not a function");
                    }
                }}
            >
                {task.task}
            </p>
            <div>
                <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    );
};
