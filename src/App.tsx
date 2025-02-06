import { Route, Routes } from "react-router";
import ToDoList from "./components/ToDoList.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<ToDoList />} />
      </Routes>
    </>
  );
}

export default App;
