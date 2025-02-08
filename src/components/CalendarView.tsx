import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

interface Task {
  id: number;
  title: string;
  dueDate: string; // Format: "YYYY-MM-DD"
}

interface CalendarProps {
  tasks: Task[];
}

const CalendarView: React.FC<CalendarProps> = ({ tasks }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const currentMonth = new Date();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const toggleCalendar = () => setShowCalendar(!showCalendar);

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
            {daysInMonth.map((day) => (
              <div
                key={day.toISOString()}
                className="relative p-2 border rounded"
              >
                {format(day, "d")}
                {tasks.some((task) =>
                  isSameDay(new Date(task.dueDate), day)
                ) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
