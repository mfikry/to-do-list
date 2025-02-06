import React from "react";
import { Task } from "../types";

interface TaskDetailProps {
  task: Task | null;
  onClose: () => void;
  markAsDone: (task: Task) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onClose,
  markAsDone,
}) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{task.time}</p>
        <p className="mt-4">{task.description}</p>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => markAsDone(task)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
