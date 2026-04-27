import React from "react";

export const TaskList = ({ tasks, deleteTasks, toggleTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="task">

         
        <span
        onClick={() => toggleTask(task)}
        className="me-2 d-inline-flex align-items-center justify-content-center"
        style={{
         width: "30px",
        height: "30px",
        cursor: "pointer",
        color: task.is_done ? "green" : "red"
  }}
>
  {task.is_done ? "✔" : "✖"}
</span>
 
         
          {task.label}

         
          <span
            className="delete"
            onClick={() => deleteTasks(task.id)}
          >
            ×
          </span>
        </li>
      ))}
    </ul>
  );
};