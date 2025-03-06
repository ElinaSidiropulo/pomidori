import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { TodoModal } from "./TodoModal";
import { PomodoroModal } from "./PomodoroModal";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [pomodoroTodo, setPomodoroTodo] = useState(null);
  const [timers, setTimers] = useState(() => {
    return JSON.parse(localStorage.getItem("timers")) || {};
  });

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    const checkTimers = setInterval(() => {
      Object.entries(timers).forEach(([id, timer]) => {
        if (timer.endTime && Date.now() >= timer.endTime) {
          if (Notification.permission === "granted") {
            new Notification("⏳ Pomodoro is ended!", {
              body: `Time is over!`,
              icon: "/path-to-icon.png",
            });
          }
          setTimers((prev) => {
            const updatedTimers = { ...prev };
            delete updatedTimers[id];
            return updatedTimers;
          });
        }
      });
    }, 1000);
    return () => clearInterval(checkTimers);
  }, [timers]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setTimers((prev) => {
      const updatedTimers = { ...prev };
      delete updatedTimers[id];
      return updatedTimers;
    });
  };

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
            todo.id === id ? { ...todo, task, isEditing: false } : todo
        )
    );
  };

  const updateTodo = (id, updatedFields) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedFields } : todo
        )
    );
  };

  const openModal = (todo) => setSelectedTodo(todo);
  const closeModal = () => setSelectedTodo(null);

  const openPomodoroModal = (todo) => {
    setPomodoroTodo(todo);
    if (!timers[todo.id]) {
      setTimers((prev) => ({
        ...prev,
        [todo.id]: { endTime: null, isRunning: false },
      }));
    }
  };

  const closePomodoroModal = () => setPomodoroTodo(null);

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "All") return true;
    return filterStatus === "Completed" ? todo.completed : !todo.completed;
  });

  return (
      <div className="TodoWrapper">
        <h1>Get Things Done!</h1>
        <label className="filter-label">
          Filter by Status:
          <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
          >
            <option value="All">All</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <TodoForm addTodo={addTodo} />
        {filteredTodos.map((todo) =>
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
                    openPomodoroModal={openPomodoroModal}
                />
            )
        )}
        {selectedTodo && (
            <TodoModal
                todo={selectedTodo}
                closeModal={closeModal}
                updateTodo={updateTodo}
            />
        )}
        {pomodoroTodo && (
            <PomodoroModal
                todo={pomodoroTodo}
                closeModal={closePomodoroModal}
                timers={timers}
                setTimers={setTimers}
            />
        )}
      </div>
  );
};
