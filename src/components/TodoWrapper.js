import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { TodoModal } from "./TodoModal";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
  };

  const editTodo = (id) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
    );
  };

  const editTask = (task, id) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
    );
  };

  const updateDescription = (id, newDescription) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, description: newDescription } : todo
        )
    );
  };


  const openModal = (todo) => setSelectedTodo(todo);
  const closeModal = () => setSelectedTodo(null);

  return (
      <div className="TodoWrapper">
        <h1>Get Things Done !</h1>
        <TodoForm addTodo={addTodo} />
        {/* display todos */}
        {todos.map((todo) =>
            todo.isEditing ? (
                <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
            ) : (
                <Todo
                    key={todo.id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    toggleComplete={toggleComplete}
                    openModal={openModal}
                />
            )
        )}
        {selectedTodo && (
            <TodoModal
                todo={selectedTodo}
                closeModal={closeModal}
                updateDescription={updateDescription}
            />
        )}
      </div>
  );
};
