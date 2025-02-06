import React from "react";

interface TaskItemProps {
  onClick: () => void;
  title: string;
  time: string;
  description: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  onClick,
  title,
  time,
  description,
}) => {
  return (
    <div
      className="w-86 mt-4 bg-white rounded-2xl shadow-lg p-4 ml-1 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <li className="text-xl font-bold">{title}</li>
        <p className="text-xs text-gray-700 mt-1">{time}</p>
      </div>
      <p className="text-gray-600 pl-7">{description}</p>
    </div>
  );
};

export default TaskItem;
