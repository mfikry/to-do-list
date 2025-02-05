import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    setCount(count - 1);
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex gap-6 p-4">
      <button
        onClick={handleDecrement}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Kurang
      </button>
      <p>{count}</p>
      <button
        onClick={handleIncrement}
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Tambah
      </button>
    </div>
  );
};

export default Counter;
