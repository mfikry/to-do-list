import { useState } from "react";
import TaskFilter from "./TaskFilter";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { CiSearch } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import TaskDetail from "./TaskDetail";

const ToDoList = () => {
  const [activeButton, setActiveButton] = useState("Undone");
  const [tasks, setTasks] = useState<
    { title: string; time: string; description: string; category: string }[]
  >([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    title: string;
    time: string;
    description: string;
    category: string;
  } | null>(null);

  // Tambahkan task baru ke state
  const addTask = (newTask: {
    title: string;
    time: string;
    description: string;
    category: string;
  }) => {
    setTasks([...tasks, newTask]);
  };

  // Filter task sesuai dengan kategori yang dipilih
  const filteredTasks = tasks.filter((task) => task.category === activeButton);

  // Hapus task yang sudah selesai
  const markAsDone = (taskToRemove: {
    title: string;
    time: string;
    description: string;
  }) => {
    setTasks(tasks.filter((task) => task !== taskToRemove));
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
    <div className="flex flex-col items-center space-y-4 p-5 min-h-screen">
      <div className="w-100 bg-gray-200 rounded-2xl shadow-lg max-w-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Today</h2>
          <SlCalender />
        </div>
        <p className="text-gray-600 text-sm">{formattedDate}</p>

        {/* Tombol Search */}
        <button className="flex justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 w-full mt-4">
          <CiSearch className="size-5" />
          Search
        </button>

        {/* Komponen Filter */}
        <TaskFilter
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        {/* Daftar Task yang Sesuai dengan Filter */}
        <div className="overflow-auto">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskItem
                key={index}
                title={task.title}
                time={task.time}
                description={task.description}
                onClick={() => setSelectedTask(task)}
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
        />
      )}
    </div>
  );
};

export default ToDoList;
