import { create } from "zustand";
import type { Board } from "../types";
import { persist } from "zustand/middleware";


interface BoardState{
    boards: Board[]
    addBoard: (title:string)=> void
}
const initialBoards: Board[] = [{
    id: 1,
    title:"Первая доска"
}]
export const useBoardStore = create<BoardState>()(
    
    persist(
    (set)=>({
    boards: initialBoards,
    addBoard:(title)=>
        set((state)=>{
            const newId = state.boards.length > 0 ? Math.max(...state.boards.map((b)=>b.id))+1 : 1
            const newBoard: Board = {id:newId, title}
            return {boards: [...state.boards, newBoard]}
        })
}),
{name:"taskflow-boards"}
)
)