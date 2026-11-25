import { zodResolver } from "@hookform/resolvers/zod"
import type { TaskFormValues } from '../schemas/taskSchema'
import { useThemeStore } from '../stores/useThemeStore'
import { taskSchema } from "../schemas/taskSchema"
import { useForm } from "react-hook-form"
import { PRIORITY } from "../types"

const initialForm: TaskFormValues = {
    title:'',
    description:'',
    dueDate:'',
    priority:'Medium'
}
interface TaskProps{
    onAddTask:(form: TaskFormValues)=> void
}
function TaskForm({onAddTask}:TaskProps){
    "use no memo"
    const isDark = useThemeStore((state)=> state.isDark)
   const{  register,reset,handleSubmit, formState: {errors}} = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: initialForm,
        mode: "onTouched"
    })
    function onValid(data:TaskFormValues){
        onAddTask(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onValid)} className={isDark ? "form_dark":"form_white"}>
            <input {...register('title')} aria-invalid={errors.title ? true : false}/>
            {errors.title &&<p className="form-error">{errors.title.message}</p>}
            
            <textarea {...register('description')} aria-invalid={errors.description ? true : false}></textarea>
            {errors.description &&<p className="form-error">{errors.description.message}</p>}
            <input type='date' {...register('dueDate')} aria-invalid={errors.dueDate ? true : false}/>
            {errors.dueDate &&<p className="form-error">{errors.dueDate.message}</p>}
            <select {...register('priority')}>
               {PRIORITY.map((p)=>(
                <option key={p} value={p}>{p}</option>
               ))}
            </select>
            
            <button type='submit'>Добавить</button>
            <button type='button' onClick={()=> reset()}>Очистить форму</button>
        </form>
    )
}

export default TaskForm