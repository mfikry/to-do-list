import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import TaskDetail from "./TaskDetail"; // Import TaskDetail

interface Task {
  id: number;
  title: string;
  dueDate: string; // Format: "DD-MM-YYYY"
  description?: string;
  time: string;
  category: string;
}

interface CalendarProps {
  tasks: Task[];
  markAsDone: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const CalendarView: React.FC<CalendarProps> = ({
  tasks,
  markAsDone,
  updateTask,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // State untuk task terpilih

  const currentMonth = new Date();
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  // Handle klik tanggal merah
  const handleDateClick = (date: string) => {
    const tasksForDate = tasks.filter((task) => task.dueDate === date);

    if (tasksForDate.length > 0) {
      setSelectedTask(tasksForDate[0]); // Pilih task pertama
    }
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleCalendar} className="p-2 bg-gray-200 rounded">
        <CalendarIcon className="w-6 h-6" />
      </button>

      {showCalendar && (
        <div className="absolute top-10 left-0 bg-white p-4 shadow-lg rounded w-64 z-10">
          <h3 className="text-center font-bold mb-2">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {daysInMonth.map((day) => {
              const formattedDay = format(day, "dd-MM-yyyy"); // Format tanggal agar cocok
              const hasTask = tasks.some(
                (task) => task.dueDate === formattedDay
              );

              return (
                <div
                  key={day.toISOString()}
                  className={`relative border rounded p-1 cursor-pointer ${
                    hasTask ? "bg-red-500 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => hasTask && handleDateClick(formattedDay)}
                >
                  {format(day, "d")}
                </div>
              );
            })}
          </div>
        </div>
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

export default CalendarView;
