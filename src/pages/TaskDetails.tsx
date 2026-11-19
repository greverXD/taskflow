import { useNavigate, useParams,Link } from "react-router"
import { useKeyPress } from "../hooks/useKeyPress"
import { useTaskStore } from "../stores/useTaskStore"

function TaskDetails(){
    const updateTask = useTaskStore((state)=> state.updateTask)
    const tasks = useTaskStore((state)=>state.tasks)
    const {boardId,taskId} = useParams()
    const task = tasks.find((t)=> t.id === Number(taskId) && t.boardId === Number(boardId))
    const navigate = useNavigate()
    useKeyPress("Escape", ()=> navigate(`/boards/${boardId}`))

    if(!task){
        return <p>Задача не найдена</p> 
        
        
    }
    return(
        <div className="task-details">
            <input value={task.title} onChange={(e) => updateTask(task.id,{title: e.target.value})}/>
            <input value={task.description} onChange={(e) => updateTask(task.id,{description: e.target.value})}/>
            <p>Время: {task.dueDate}</p>
            <p>Приоритет: {task.priority ?? 'Не указан'}</p>
            <p>Статус: {task.status}</p>
            <Link to={`/boards/${boardId}`}>Назад</Link>
        </div>
    )
}

export default TaskDetails