import "./App.css";
import { Routes, Route } from "react-router";
import BoardPages from "./pages/BoardPages";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout";
import HomePages from "./pages/HomePages";
import TaskDetails from "./pages/TaskDetails";
import NotFoundPage from "./pages/NotFoundPage";

function App() {  

  return (
    <Routes>
      <Route element= {<Layout />}>
        <Route path="/" element={<HomePages/>} ></Route>
        <Route path = '/boards/:boardId' element ={<BoardPages/>}> 
        <Route path="tasks/:taskId" element={<TaskDetails/>}></Route>
        </Route>
        <Route path="/about" element ={<AboutPage />}> </Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
