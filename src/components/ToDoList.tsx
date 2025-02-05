import { useState } from "react";

const ToDoList = () => {
  const [activeButton, setActiveButton] = useState("Undone"); // Default aktif "Undone"

  const buttons = ["Undone", "Meetings", "Consummation"];

  return (
    <div className="flex flex-col items-center space-y-4 p-5  min-h-screen ">
      <div className="w-100 bg-gray-200 rounded-2xl shadow-lg p-4 max-w-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Today</h2>
          <h3>Kalender</h3>
        </div>
        <p className="text-gray-600 text-sm">5 Februari 2025, Rabu</p>

        {/* Tombol Search */}
        <button
          onClick={() => {}}
          type="button"
          className="flex justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 w-full mt-4"
        >
          Search
        </button>

        {/* Tombol Filter */}
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
        <div className="overflow-auto">
          <div>
            <div className="w-86 mt-6 bg-white rounded-2xl shadow-lg p-4 ml-1">
              <div>
                <div className="flex justify-between ">
                  <li className="text-xl font-bold">Project daily stand-up </li>
                  <p className="text-xs text-gray-700 mt-1">9.00 am</p>
                </div>
                <p className="text-gray-600 pl-7">
                  Ini adalah contoh card dengan rounded corners.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="w-86 mt-4 bg-white rounded-2xl shadow-lg p-4 ml-1">
              <div>
                <div className="flex justify-between">
                  <li className="text-xl font-bold">Project daily stand-up </li>
                  <p className="text-xs text-gray-700 mt-1">9.00 am</p>
                </div>
                <p className="text-gray-600 pl-7">
                  Ini adalah contoh card dengan rounded corners.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="w-86 mt-4 bg-white rounded-2xl shadow-lg p-4 ml-1">
              <div>
                <div className="flex justify-between">
                  <li className="text-xl font-bold">Project daily stand-up </li>
                  <p className="text-xs text-gray-700 mt-1">9.00 am</p>
                </div>
                <p className="text-gray-600 pl-7">
                  Ini adalah contoh card dengan rounded corners.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-2 pt-4">
          <button className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 text-lg md:text-xl font-bold rounded-full px-8 py-4 w-full min-h-[60px] overflow-visible">
            Add new task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
