import React from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  setSelectedTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setSelectedTask }) => {
  return (
    <div
      className="w-86 mt-4 bg-white rounded-2xl shadow-lg shadow-gray-400 p-4 ml-1 cursor-pointer hover:bg-gray-100"
      onClick={() => {
        setSelectedTask(task);
      }}
    >
      <div className="flex justify-between">
        <li className="text-xl font-bold">{task.title}</li>
        <p className="text-xs text-gray-700 mt-1">{task.time}</p>
      </div>
      <p className="text-gray-600 pl-7">{task.description}</p>
      <p className="text-gray-500 text-sm mt-2 ml-7">
        Due: {task.dueDate || "No deadline"}
      </p>
    </div>
  );
};

export default TaskItem;
