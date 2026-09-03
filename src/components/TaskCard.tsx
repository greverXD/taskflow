import type { Task } from '../types';
import '../App.css'
interface TaskCardProps {
    tasks: Task,
    onDelete: (id: number) => void
    onToggleDone: (id: number) => void
}


function TaskCard({ tasks, onDelete, onToggleDone }: TaskCardProps) {
    return(
        <div className="task-card">
            <h3 className={tasks.done ?'task-title_done' : 'task-title'}>{tasks.title}</h3>
            <p>{tasks.description}</p>
            <span className="task-card_date">{tasks.dueDate}</span>
            {tasks.priority && <span className="task-card_priority">{tasks.priority}</span>}
            <button onClick={()=> onDelete(tasks.id)}>Удалить</button>
            <input type="checkbox" checked={tasks.done} onChange={()=> onToggleDone(tasks.id)}/>
            </div>
    )
}

export default TaskCard;