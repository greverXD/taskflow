import TaskCard from './components/TaskCard';
import type { Task } from "./types"
import { useState } from 'react';
import './App.css';


const initialTasks: Task[] = [
  { id: 1, title: 'Task 1', description: '...', dueDate: '2023-06-01', priority: 'High', done: false },
  { id: 2, title: 'Task 2', description: '...', dueDate: '2023-06-02', done: false },
  { id: 3, title: 'Task 3', description: '...', dueDate: '2023-06-03', done: false },
]


function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  function handleDelete(id: number) {
  setTasks((prev)=>prev.filter(task=> task.id !== id))
}
function handleToggleDone(id:number){
  setTasks((prev)=> 
  prev.map((task)=> 
    task.id === id ? {...task, done: !task.done} : task))
}
function handleAddTask(){
  setTasks((prev)=>{
    const newId = Math.max(...prev.map((task)=>task.id)) + 1
    const newTask: Task = {
      id:newId,
      title: 'Новая задача',
      description: 'Описание задачи',
      dueDate: '2026-09-03',
      done: false,
    }
    return [...prev,newTask]
  })


}

function handleSetAllDone(done:boolean){
  setTasks((prev)=>prev.map((task)=>({...task,done})))
}

function handleClearCompleted(){
  setTasks((prev)=> prev.filter((task)=> task.done !== true))
}
const doneCount = tasks.filter((task)=> task.done === true).length
  return(
    <div className="board">
      <h1>TaskFlow</h1>
      <div className="Board_list">
        <div>Выполнено {doneCount} из {tasks.length}</div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            tasks={task}
            onDelete={handleDelete}
            onToggleDone={handleToggleDone}
          />
        ))}
      </div>
      <button onClick={() => handleSetAllDone(true)}>Отметить все как выполненные</button>
      <button onClick={() => handleSetAllDone(false)}>Снять все отметки</button>
      <button onClick={handleAddTask}>Добавить задачу</button>
      <button onClick={handleClearCompleted}>Очистить выполненные</button>
    </div>
  )
}

export default App;