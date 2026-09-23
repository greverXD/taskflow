import type { Task } from '../types';
import type { TaskStatus } from '../types';
import '../App.css'
import { useDraggable } from '@dnd-kit/core';
import { motion, type Variants } from 'motion/react';
interface TaskCardProps {
    tasks: Task,
    onDelete: (id: number) => void
    handleMoveStatus:(id:number,direction: 1 | -1) => void
}
const cardVariant : Variants ={
    hidden:{opacity:0, scale:0.9},
    visible:{opacity:1,scale:1},
    dragging:{opacity:0.5,scale:1},
    exit:{opacity:0, scale:0.9}
}
const STATUS_CLASS : Record<TaskStatus,string> ={
       todo: 'task-title_todo',
       'in-progress': 'task-title_in-progress',
       review: 'task-title_review',
       done: 'task-title_done',
}

function TaskCard({ tasks, onDelete , handleMoveStatus }: TaskCardProps) {
    const {attributes ,listeners,setNodeRef,transform,isDragging}= useDraggable({id:tasks.id})

    return(
        <motion.div className= {`task-card ${isDragging ? 'task-card_dragging' : ''}`} 
        style={{x: transform?.x ?? 0, y: transform?.y ?? 0}} 
        ref={setNodeRef} 
        {...listeners} 
        {...attributes}
        variants={cardVariant}
        initial= "hidden"
        animate={isDragging ? 'dragging' : 'visible'}
        transition={{duration:0.3}}
        exit="exit"
        layoutId= {String(tasks.id)}
        layout
        >
            <h3 className={STATUS_CLASS[tasks.status]}>{tasks.title}</h3>
            <p>{tasks.description}</p>
            <span className="task-card_date">{tasks.dueDate}</span>
            {tasks.priority && <span className="task-card_priority">{tasks.priority}</span>}
            <button onClick={()=> onDelete(tasks.id)}>Удалить</button>
            <div>
            <button onClick={()=>handleMoveStatus(tasks.id,-1)}>◀</button>
            <button onClick={()=>handleMoveStatus(tasks.id,1)}>▶</button>
            </div>
            </motion.div>
    )
}

export default TaskCard;