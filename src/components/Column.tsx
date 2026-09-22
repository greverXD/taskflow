import React, { type ReactNode } from "react";
import type { Column } from "../types";
import { useDroppable } from "@dnd-kit/core";
interface ColumnProps{
    column:Column
    children: ReactNode
}

function Columnpcomponent({column,children}:ColumnProps ){
    const {setNodeRef,isOver} = useDroppable({id:column.id})
    return(
         <div ref={setNodeRef} className="column">
            <div>{column.title}</div>
            {children}
         </div>
    )
}
export default Columnpcomponent