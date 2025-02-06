import { useState } from "react";

interface AddTaskFormProps {
  addTask: (task: {
    title: string;
    time: string;
    description: string;
    category: string;
  }) => void;
  closeForm: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask, closeForm }) => {
  const [task, setTask] = useState({
    title: "",
    time: "",
    description: "",
    category: "Undone",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.title.trim()) {
      addTask(task);
      setTask({ title: "", time: "", description: "", category: "Undone" });
      closeForm();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-blend-color"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.90)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="time"
            value={task.time}
            onChange={(e) => setTask({ ...task, time: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="Undone">Undone</option>
            <option value="Meetings">Meetings</option>
            <option value="Consummation">Consummation</option>
          </select>
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
