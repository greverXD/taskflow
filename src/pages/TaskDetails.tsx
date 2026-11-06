import { useNavigate, useParams,Link } from "react-router"
import type { Task } from "../types"
import { useKeyPress } from "../hooks/useKeyPress"
import type { Dispatch, SetStateAction } from "react"


interface TaskDetailProps{
    tasks:Task[]
    setTasks: Dispatch<SetStateAction<Task[]>>
}

function TaskDetails({tasks,setTasks}: TaskDetailProps){
    const {boardId,taskId} = useParams()
    const task = tasks.find((t)=> t.id === Number(taskId) && t.boardId === Number(boardId))
    const navigate = useNavigate()
    useKeyPress("Escape", ()=> navigate(`/boards/${boardId}`))
    function handleChangeChange(change: Partial<Task>){
        setTasks((prev)=> prev.map((t)=> t.id === Number(taskId) ? {...t, ...change}: t))
    }
    if(!task){
        return <p>Задача не найдена</p> 
        
        
    }
    return(
        <div className="task-details">
            <input value={task.title} onChange={(e) => handleChangeChange({title: e.target.value})}/>
            <input value={task.description} onChange={(e) => handleChangeChange({description: e.target.value})}/>
            <p>Время: {task.dueDate}</p>
            <p>Приоритет: {task.priority ?? 'Не указан'}</p>
            <p>Статус: {task.status}</p>
            <Link to={`/boards/${boardId}`}>Назад</Link>
        </div>
    )
}

export default TaskDetails