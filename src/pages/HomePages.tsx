import { Link } from "react-router"
import { boardSchema,type BoardFormValues } from "../schemas/boardSchema"
import { useBoardStore } from "../stores/useBoardStore"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"




function HomePages(){
    "use no memo"
    const boards = useBoardStore ((state)=> state.boards)
    const addBoard = useBoardStore ((state)=> state.addBoard)
   
    const {register, handleSubmit,reset,setError, formState: {errors}} = useForm<BoardFormValues>({
        resolver: zodResolver(boardSchema),
        defaultValues: {title: ""},
        mode: "onTouched"
    }) 

    function onValid(data: BoardFormValues){
        addBoard(data.title)
        const exist = boards.some((b)=> b.title.toLowerCase() === data.title)
        if(exist){
            setError("title",{message:"Доска с таким именем есть"})
            return
        }
        reset()
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
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register("title")} aria-invalid={errors.title ? true : false}/>
            {errors.title &&<p className="form-error">{errors.title.message}</p>}
            <button type="submit">Создать доску</button>
        </form>
        </div>
    )
}
export default HomePages