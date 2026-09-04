import TaskCard from './components/TaskCard';
import type { Task } from "./types"
import type { TaskStatus } from './types';
import { useState } from 'react';
import './App.css';
interface Column{
  id:TaskStatus
  title:string
}
const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
]
const initialTasks: Task[] = [
  { id: 1, title: 'Task 1', description: '...', dueDate: '2023-06-01', priority: 'High', status: 'todo' },
  { id: 2, title: 'Task 2', description: '...', dueDate: '2023-06-02', status: 'todo' },
  { id: 3, title: 'Task 3', description: '...', dueDate: '2023-06-03', status: 'todo' },
]


const STATUS_ORDER: TaskStatus[] = ["todo", "in-progress", "review", "done"]




function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  function handleDelete(id: number) {
  setTasks((prev)=>prev.filter(task=> task.id !== id))
}

function handleAddTask(){
  setTasks((prev)=>{
    const newId = Math.max(...prev.map((task)=>task.id)) + 1
    const newTask: Task = {
      id:newId,
      title: 'Новая задача',
      description: 'Описание задачи',
      dueDate: '2026-09-03',
      status: 'todo',
    }
    return [...prev,newTask]
  })


}

function handleMoveStatus(id:number, direction: 1 | -1){
  setTasks((prev)=>{
    return prev.map((task)=>{
      if(task.id !== id){
        return task
      }
      const currentIndex = STATUS_ORDER.indexOf(task.status) 
      const newIndex = currentIndex + direction
      if(newIndex < 0 || newIndex >= STATUS_ORDER.length){
        return task
      } else{
       
        const statustask = STATUS_ORDER[newIndex]
        return {...task, status:statustask}
      }
    })
    
  })
}


function handleSetAllDone(done:boolean){
  setTasks((prev)=>prev.map((task)=>({...task,status:'done'})))
}

function handleClearCompleted(){
  setTasks((prev)=> prev.filter((task)=> task.status === 'todo'))
}
const doneCount = tasks.filter((task)=> task.status === 'done').length
  return(
    <div className="board">
      <h1>TaskFlow</h1>
      <div className="Board_list">
        <div>Выполнено {doneCount} из {tasks.length}</div>
        {
          COLUMNS.map((column)=>(
            <div key={column.id} >
            <div>{column.title}
            </div>
            {tasks.filter((task)=> task.status === column.id)
            .map((task)=>(
            <TaskCard
            key={task.id}
            tasks={task}
            onDelete={handleDelete}
            handleMoveStatus = {handleMoveStatus}
          />
            ))}
            </div>
          ))
        }
      </div>
      <button onClick={() => handleSetAllDone(true)}>Отметить все как выполненные</button>
      <button onClick={() => handleSetAllDone(false)}>Снять все отметки</button>
      <button onClick={handleAddTask}>Добавить задачу</button>
      <button onClick={handleClearCompleted}>Очистить выполненные</button>
    </div>
  )
}

export default App;