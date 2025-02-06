interface TaskFilterProps {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  activeButton,
  setActiveButton,
}) => {
  const buttons = ["Undone", "Meetings", "Consummation"];

  return (
    <div className="flex justify-between flex-nowrap mt-4 gap-2">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => setActiveButton(button)}
          className={`px-3 py-2 flex-1 text-center rounded-full text-sm font-medium transition ${
            activeButton === button
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
