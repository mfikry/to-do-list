import { useEffect, useRef, useState } from "react";
import TaskFilter from "./TaskFilter";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { CiSearch } from "react-icons/ci";

import TaskDetail from "./TaskDetail";
import { Task } from "../types";
import CalendarView from "./CalendarView";

const ToDoList = () => {
  const [activeButton, setActiveButton] = useState("Undone");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const isFirstLoad = useRef(true); // Tambahkan useRef untuk mendeteksi pertama kali
  const [searchQuery, setSearchQuery] = useState(""); // Tambah state untuk search

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
      isFirstLoad.current = false; // Set false setelah pertama kali render
      return;
    }

    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Tambahkan task baru ke state
  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  // Filter task sesuai dengan kategori yang dipilih
  const filteredTasks = tasks
    .filter((task) => task.category === activeButton)
    .filter(
      (task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) //  Filter berdasarkan search query
    );

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
  };

  // Hapus task yang sudah selesai
  const markAsDone = (taskToRemove: Task) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToRemove.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Simpan ke localStorage
    setSelectedTask(null); // Tutup modal
  };

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(today);

  return (
    <div className="flex flex-col items-center space-y-4 p-6 ">
      <div className="w-105 bg-gray-200 rounded-2xl shadow-lg shadow-cyan-500/50 max-w-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Today</h2>
          <CalendarView tasks={tasks} />
        </div>
        <p className="text-gray-600 text-sm">{formattedDate}</p>

        {/* Input Search */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-full  bg-gray-400"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Komponen Filter */}
        <TaskFilter
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        {/* Daftar Task yang Sesuai dengan Filter */}
        <div className="max-h-110 overflow-x-hidden overflow-y-aut">
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

        {/* Tombol Add New Task */}
        <div className="w-full px-2 pt-4">
          <button
            onClick={() => setShowForm(true)}
            className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 text-lg md:text-xl font-bold rounded-full px-8 py-4 w-full min-h-[60px]"
          >
            Add new task
          </button>
        </div>
      </div>

      {/* Tampilkan Form jika showForm true */}
      {showForm && (
        <AddTaskForm addTask={addTask} closeForm={() => setShowForm(false)} />
      )}

      {/* Modal Task Detail */}
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
