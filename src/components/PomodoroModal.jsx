// import React, { useState, useEffect } from "react";
//
// export const PomodoroModal = ({ todo, closeModal }) => {

//
//     const [timeLeft, setTimeLeft] = useState(WORK_TIME);
//     const [isRunning, setIsRunning] = useState(false);
//     const [status, setStatus] = useState("Work");
//
//     useEffect(() => {
//         let timer;
//         if (isRunning) {
//             timer = setInterval(() => {
//                 setTimeLeft((prev) => {
//                     if (prev === 1) {
//                         if (status === "Work") {
//                             setStatus("Rest");
//                             return REST_TIME;
//                         } else {
//                             setStatus("Work");
//                             return WORK_TIME;
//                         }
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//         }
//
//         return () => clearInterval(timer);
//     }, [isRunning, status]);
//
//     const startTimer = () => setIsRunning(true);
//     const pauseTimer = () => setIsRunning(false);
//
//     const formatTime = (seconds) => {
//         const min = Math.floor(seconds / 60);
//         const sec = seconds % 60;
//         return `${min}:${sec < 10 ? "0" : ""}${sec}`;
//     };
//
//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <h2>Pomodoro Timer</h2>
//                 <p>Task: {todo.task}</p>
//                 <p>Status: {status}</p>
//                 <p>Time Left: {formatTime(timeLeft)}</p>
//                 <button onClick={startTimer}>Start</button>
//                 <button onClick={pauseTimer}>Pause</button>
//                 <button onClick={closeModal}>Close</button>
//             </div>
//         </div>
//     );
// };
