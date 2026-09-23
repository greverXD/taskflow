import { type ReactNode } from "react";
import type { Column } from "../types";
import { useDroppable } from "@dnd-kit/core";
import { motion,type Variants } from "motion/react";
const columnVariant : Variants ={
    hidden:{opacity:0, y:20},
    visible:{opacity:1,y:0},
}
interface ColumnProps{
    column:Column
    children: ReactNode
}

function Columnpcomponent({column,children}:ColumnProps ){
    const {setNodeRef,isOver} = useDroppable({id:column.id})
    return(
         <motion.div ref={setNodeRef} className="column" variants={columnVariant} animate="visible">
            <div className={isOver ? 'title_yellow' : "title_none"}>{column.title}</div>
            {children}
         </motion.div>
    )
}
export default Columnpcomponent