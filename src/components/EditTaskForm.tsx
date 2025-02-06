import { useState } from "react";
import { Task } from "../types";

interface EditTaskFormProps {
  task: Task;
  updateTask: (task: Task) => void;
  closeForm: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  updateTask,
  closeForm,
}) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask(updatedTask);
    closeForm();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="time"
            value={updatedTask.time}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, time: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={closeForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
