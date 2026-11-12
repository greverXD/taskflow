import { useState,type SubmitEvent } from "react"
import { Link } from "react-router"

import { useBoardStore } from "../stores/useBoardStore"




function HomePages(){
    const boards = useBoardStore ((state)=> state.boards)
    const addBoard = useBoardStore ((state)=> state.addBoard)
    const [title,setTitle] = useState("")
    function handleCreateBoard(e: SubmitEvent<HTMLFormElement>){
        e.preventDefault()

    addBoard(title)
    setTitle("")
    } 
    return(
        <div><h2>Мои доски</h2>
        <ul>
            {boards.map((board)=>(
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