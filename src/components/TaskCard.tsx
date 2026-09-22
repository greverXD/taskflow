import type { Task } from '../types';
import type { TaskStatus } from '../types';
import '../App.css'
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
interface TaskCardProps {
    tasks: Task,
    onDelete: (id: number) => void
    handleMoveStatus:(id:number,direction: 1 | -1) => void
}

const STATUS_CLASS : Record<TaskStatus,string> ={
       todo: 'task-title_todo',
       'in-progress': 'task-title_in-progress',
       review: 'task-title_review',
       done: 'task-title_done',
}

function TaskCard({ tasks, onDelete , handleMoveStatus }: TaskCardProps) {
    const {attributes ,listeners,setNodeRef,transform}= useDraggable({id:tasks.id})
    const style ={
        transform: CSS.Translate.toString(transform)
    }
    return(
        <div className="task-card" style={style} ref={setNodeRef} {...listeners} {...attributes}>
            <h3 className={STATUS_CLASS[tasks.status]}>{tasks.title}</h3>
            <p>{tasks.description}</p>
            <span className="task-card_date">{tasks.dueDate}</span>
            {tasks.priority && <span className="task-card_priority">{tasks.priority}</span>}
            <button onClick={()=> onDelete(tasks.id)}>Удалить</button>
            <div>
            <button onClick={()=>handleMoveStatus(tasks.id,-1)}>◀</button>
            <button onClick={()=>handleMoveStatus(tasks.id,1)}>▶</button>
            </div>
            </div>
    )
}

export default TaskCard;