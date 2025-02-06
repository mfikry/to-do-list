import { useState } from "react";
import { Task } from "../types";
import EditTaskForm from "./EditTaskForm";

interface TaskDetailProps {
  task: Task | null;
  onClose: () => void;
  markAsDone: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onClose,
  markAsDone,
  updateTask,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);

  if (!task) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.90)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {!showEditForm ? (
          <>
            <h2 className="text-xl font-bold">{task.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{task.time}</p>
            <p className="mt-4">{task.description}</p>

            <div className="flex justify-between mt-6 gap-4">
              <button
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded w-1/3"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowEditForm(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded w-1/3"
              >
                Update
              </button>

              <button
                onClick={() => markAsDone(task)}
                className="bg-green-600 text-white px-4 py-2 rounded w-1/3"
              >
                Done
              </button>
            </div>
          </>
        ) : (
          <EditTaskForm
            task={task}
            updateTask={updateTask}
            closeForm={() => setShowEditForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
