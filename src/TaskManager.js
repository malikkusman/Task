import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const addTask = () => {
    if (taskName.trim() !== "" && taskDescription.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTaskName("");
      setTaskDescription("");
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Task Manager</h1>
        <div className="flex flex-col items-center mb-8">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 mb-4 w-80 rounded"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 mb-4 w-80 rounded"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={addTask}
            disabled={taskName.trim() === "" || taskDescription.trim() === ""}
          >
            Add Task
          </button>
        </div>
        {tasks.length === 0 ? (
          <p className="text-center">No tasks available</p>
        ) : (
          <ul className="flex flex-col items-center">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center mb-4 bg-white rounded shadow p-4 w-80"
              >
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <div className={`${task.completed ? "line-through" : ""}`}>
                  <strong className="text-lg">{task.name}</strong>:{" "}
                  {task.description}
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-auto"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
