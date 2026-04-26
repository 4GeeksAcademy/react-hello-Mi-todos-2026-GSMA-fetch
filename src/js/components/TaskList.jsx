import React from "react";

export const TaskList = ({ tasks, deleteTasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="task">
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