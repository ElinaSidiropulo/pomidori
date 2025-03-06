import React, { useEffect, useState } from "react";

export const PomodoroModal = ({ todo, closeModal, timers, setTimers }) => {
    const workTime = 10; // 10 секунд работы
    const restTime = 5; // 5 секунд отдыха
    const storedTimer = JSON.parse(localStorage.getItem(`timer-${todo.id}`));
    const timer = timers[todo.id] || storedTimer || { endTime: null, isRunning: false, pausedTime: null, mode: "work" };
    const [timeLeft, setTimeLeft] = useState(timer.pausedTime || workTime);
    const [mode, setMode] = useState(timer.mode || "work");

    useEffect(() => {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`timer-${todo.id}`, JSON.stringify({ ...timer, mode }));
    }, [timer, mode]);

    useEffect(() => {
        if (timer.endTime && timer.isRunning) {
            const updateTimer = () => {
                const remaining = Math.max(0, Math.floor((timer.endTime - Date.now()) / 1000));
                setTimeLeft(remaining);
                if (remaining === 0) {
                    if (Notification.permission === "granted") {
                        new Notification(`⏳ Pomodoro is ended!`, {
                            body: `Time for ${mode === "work" ? "the work" : "the rest"} "${todo.task}" is up.`,
                            icon: "/path-to-icon.png"
                        });
                    }
                    const newMode = mode === "work" ? "rest" : "work";
                    const newTime = newMode === "work" ? workTime : restTime;
                    setMode(newMode);
                    setTimers((prev) => {
                        const updatedTimers = {
                            ...prev,
                            [todo.id]: {
                                endTime: Date.now() + newTime * 1000,
                                isRunning: true,
                                pausedTime: null,
                                mode: newMode
                            }
                        };
                        localStorage.setItem(`timer-${todo.id}`, JSON.stringify(updatedTimers[todo.id]));
                        return updatedTimers;
                    });
                    setTimeLeft(newTime);
                }
            };

            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        }
    }, [timer.endTime, timer.isRunning, setTimers, todo.task, mode]);

    const startTimer = () => {
        const endTime = Date.now() + (timer.pausedTime || timeLeft) * 1000;
        setTimers((prev) => {
            const updatedTimers = {
                ...prev,
                [todo.id]: {
                    endTime,
                    isRunning: true,
                    pausedTime: null,
                    mode
                }
            };
            localStorage.setItem(`timer-${todo.id}`, JSON.stringify(updatedTimers[todo.id]));
            return updatedTimers;
        });
    };

    const pauseTimer = () => {
        setTimers((prev) => {
            const updatedTimers = {
                ...prev,
                [todo.id]: {
                    endTime: null,
                    isRunning: false,
                    pausedTime: timeLeft,
                    mode
                }
            };
            localStorage.setItem(`timer-${todo.id}`, JSON.stringify(updatedTimers[todo.id]));
            return updatedTimers;
        });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-header">Status: {mode === "work" ? "Work" : "Rest"}</h2>
                <p>{todo.task}</p>
                <h1>{formatTime(timeLeft)}</h1>
                <div className="modal-actions">
                    {timer.isRunning ? (
                        <button className="modal-btn" onClick={pauseTimer}>Pause</button>
                    ) : (
                        <button className="modal-btn" onClick={startTimer}>Start</button>
                    )}
                    <button className="modal-btn" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};
