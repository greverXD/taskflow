import { useState, type Dispatch, type SetStateAction,type SubmitEvent } from "react"
import { Link } from "react-router"
import type { Board } from "../types"


interface HomePagesProps{
    board: Board[]
    setBoard: Dispatch<SetStateAction<Board[]>>
}


function HomePages({board,setBoard}:HomePagesProps){
    const [title,setTitle] = useState("")
    function handleCreateBoard(e: SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setBoard((prev)=>{
        const newId = prev.length > 0 ? Math.max(...prev.map((b)=> b.id)) + 1 : 1
        const newBoard : Board = {id: newId,title: title}
        return [...prev, newBoard]
        }
    )
    setTitle("")
    } 
    return(
        <div><h2>Мои доски</h2>
        <ul>
            {board.map((board)=>(
                <li key={board.id}>
                    <Link to={`/boards/${board.id}`}>{board.title}</Link>
                </li>
            ))}
        </ul>
        <form onSubmit={handleCreateBoard}>
            <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <button type="submit">Создать доску</button>
        </form>
        </div>
    )
}
export default HomePages