import React, { useState, useEffect } from "react";
import { InputTask } from "./InputTask";
import { TaskList } from "./TaskList";

export const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const username = "Genesis";


  const getTasks = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `https://playground.4geeks.com/todo/users/${username}`
      );
      const data = await resp.json(); 

    console.log(" DATA DE LA API:", data); 


      setTasks(data.todos || []);


    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 
  const addTasks = async (e) => {
    if (e.key === "Enter") {

      if (inputvalue === "") {
        setError("No puede estar vacío");
        return;
      }

      if (inputvalue.length < 3) {
        setError("Debe tener al menos 3 caracteres");
        return;
      }

      setCreating(true);

      try {
        await fetch(
          `https://playground.4geeks.com/todo/todos/${username}`,
          {
            method: "POST",
            body: JSON.stringify({
              label: inputvalue,
              is_done: false
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        setInputvalue("");
        setError("");
        await getTasks();

      } catch (error) {
        console.log(error);
      } finally {
        setCreating(false);
      }
    }
  };

 
  const deleteTasks = async (id) => {
    await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      {
        method: "DELETE"
      }
    );
    await getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <h1 className="title">My Todo List</h1>

      <InputTask
        inputvalue={inputvalue}
        setInputvalue={setInputvalue}
        addTasks={addTasks}
        setError={setError}
      />

      {error && <p className="error">{error}</p>}

      {creating && <p className="item">Creando tarea...</p>}

      {loading ? (
        <p className="item">Cargando tareas...</p>
      ) : (
        <TaskList tasks={tasks} deleteTasks={deleteTasks} />
      )}

      <p className="item">
        {tasks.length === 0
          ? "0 items"
          : `${tasks.length} item${tasks.length > 1 ? "s" : ""} left`}
      </p>
    </div>
  );
};