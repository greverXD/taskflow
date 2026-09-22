import TaskCard from './components/TaskCard';
import type { Task } from "./types"
import type { TaskStatus } from './types';
import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import type { TaskFormValues } from './components/TaskForm';
import { useVolume } from './TaskContext';
import { DndContext } from '@dnd-kit/core';
import type { Column } from './types';
import Columnpcomponent from './components/Column';

const key:string = "keyTask"


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
  const [tasks, setTasks] = useState<Task[]>(()=>{
      try{
    const tasksKey= localStorage.getItem(key)
    const parse = tasksKey ? JSON.parse(tasksKey) : initialTasks
    return parse
  } catch(error){
    console.warn("Error",error)
    return initialTasks
    
  }
  })

  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(tasks))
  },[tasks])
  

  function handleDelete(id: number) {
  setTasks((prev)=>prev.filter(task=> task.id !== id))
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

function handleCreateTask(taskCreate: TaskFormValues){
  setTasks((prev)=>{
    const newId = Math.max(...prev.map((task)=> task.id))+1
    const newTask: Task = {...taskCreate, id:newId, status:'todo'}
    return[...prev,newTask]
  })
}

function handleSetAllStatus(status: TaskStatus){
  setTasks((prev)=>prev.map((task)=>({...task,status})))
}

function handleClearCompleted(){
  setTasks((prev)=> prev.filter((task)=> task.status !== 'done'))
}
const doneCount = tasks.filter((task)=> task.status === 'done').length
const unDoneCount = tasks.filter((task)=> task.status !== 'done').length
 
useEffect(()=>{
  document.title = `Невыполнено ${unDoneCount}`
},[unDoneCount])

const {toggleDark} = useVolume()
const {color} = useVolume()

  return(
    <div className={color ? 'board_white' : 'board_dark'}>
      <h1 className={color ? 'h_white' : 'h_dark'}>TaskFlow</h1>
      <TaskForm onAddTask={handleCreateTask}/>
      <DndContext onDragEnd={()=>{}}>
      <div className="Board_list">
        <div>Выполнено {doneCount} из {tasks.length}</div>
      {COLUMNS.map((column) => (
        <Columnpcomponent key={column.id} column={column}>
           {tasks
            .filter((task) => task.status === column.id)
              .map((task) => (
             <TaskCard
             key={task.id}
            tasks={task}
            onDelete={handleDelete}
            handleMoveStatus={handleMoveStatus}
        />
      ))}
  </Columnpcomponent>
))}
      </div>
    </DndContext>
      <button onClick={() => handleSetAllStatus('done')}>Отметить все как выполненные</button>
      <button onClick={() => handleSetAllStatus('todo')}>Снять все отметки</button>
      <button onClick={handleClearCompleted}>Очистить выполненные</button>
      <button onClick={toggleDark}>Переключить тему</button>
    </div>
  )
}

export default App;