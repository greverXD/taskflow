import type { Task } from "./types"
import { motion, type Variants } from "motion/react"
interface modalTask{
    task: Task
    onDelete: (id:number) => void
    onCancel: () => void
}
const modalVarants: Variants = {
      hidden: {opacity: 0},
      visible: {opacity: 1},
      exit:{opacity:0}

} 
const modalWindow: Variants = {
      hidden: {y: -20},
      visible: {y: 0},
      exit:{opacity:0 , y:-20}
}
function ConfirmModal({task,onDelete,onCancel}: modalTask){
    return(
        <motion.div className="modal-overlay" variants={modalVarants} initial="hidden" animate="visible" exit = "exit" onClick={onCancel}>
            <motion.div className="modal-window" variants={modalWindow} onClick={(e)=> e.stopPropagation()}>
            Удалить задачу {task.description} ?
            <button onClick={()=> onDelete(task.id)} type="button">Удалить</button>
            <button onClick={()=> onCancel()} type="button">отмена</button>
            </motion.div>
        </motion.div>
    )
}
export default ConfirmModal