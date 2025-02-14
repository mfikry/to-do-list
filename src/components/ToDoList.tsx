import { useEffect, useRef, useState } from "react";
import TaskFilter from "./TaskFilter";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { CiSearch } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskDetail from "./TaskDetail";
import { Task } from "../types";
import CalendarView from "./CalendarView";

const ToDoList = () => {
  const [activeButton, setActiveButton] = useState("Undone");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const isFirstLoad = useRef(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error parsing tasks from LocalStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  };

  const filteredTasks = tasks
    .filter((task) => task.category === activeButton)
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
    toast.success("Task updated successfully!");
  };

  const markAsDone = (taskToRemove: Task) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToRemove.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setSelectedTask(null);
    toast.success("Task marked as done!");
  };

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(today);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <ToastContainer />
      <div className="w-105 bg-gray-200 rounded-2xl shadow-lg shadow-cyan-500/50 max-w-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Today</h2>
          <CalendarView
            tasks={tasks}
            markAsDone={markAsDone}
            updateTask={updateTask}
          />
        </div>
        <p className="text-gray-600 text-sm">{formattedDate}</p>

        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-full bg-gray-400"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <TaskFilter
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        <div className="max-h-110 overflow-x-hidden">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                setSelectedTask={setSelectedTask}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center mt-4">No tasks available</p>
          )}
        </div>

        <div className="w-full px-2 pt-4">
          <button
            onClick={() => setShowForm(true)}
            className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 text-lg md:text-xl font-bold rounded-full px-8 py-4 w-full min-h-[60px]"
          >
            Add new task
          </button>
        </div>
      </div>

      {showForm && (
        <AddTaskForm addTask={addTask} closeForm={() => setShowForm(false)} />
      )}

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          markAsDone={markAsDone}
          updateTask={updateTask}
        />
      )}
    </div>
  );
};

export default ToDoList;
