import type { Board, Task } from "./types";
import "./App.css";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { Routes, Route } from "react-router";
import BoardPages from "./pages/BoardPages";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout";
import HomePages from "./pages/HomePages";


const initialTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "...",
    dueDate: "2023-06-01",
    priority: "High",
    status: "todo",
    boardId: 1
  },
  {
    id: 2,
    title: "Task 2",
    description: "...",
    dueDate: "2023-06-02",
    status: "todo",
    boardId: 1
  },
  {
    id: 3,
    title: "Task 3",
    description: "...",
    dueDate: "2023-06-03",
    status: "todo",
    boardId: 1
  },
];
  const initialBoards: Board[] = [
    {
      id:1,
      title: "Первая доска"
    }
  ]
function App() {

  const [task,setTask] = useLocalStorage("keyTask", initialTasks);
  const [boards,setBoards] = useLocalStorage("keyBoards", initialBoards)

  return (
    <Routes>
      <Route element= {<Layout />}>
        <Route path="/" element={<HomePages board={boards} setBoard={setBoards}/>} ></Route>
        <Route path = '/boards/:boardId' element ={<BoardPages boards={boards} tasks={task} setTasks={setTask}/>}> </Route>
        <Route path="/about" element ={<AboutPage />}> </Route>
      </Route>
    </Routes>
  );
}

export default App;
