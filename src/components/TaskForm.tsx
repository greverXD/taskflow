import React, { useState } from 'react'
import type { TaskPriority } from '../types' 
export interface TaskFormValues{
    title:string
    description:string
    dueDate:string
    priority:TaskPriority
}
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
    const [form,setForm] = useState<TaskFormValues>(initialForm)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
        const {name, value} = e.target;
        setForm((prev)=>({...prev,[name]: value}))
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        onAddTask(form)
        setForm(initialForm)
    }

    function handleClearForm(){
        setForm(initialForm)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name='title' value={form.title} 
            onChange={handleChange}
            required
            />
            <textarea name='description' value={form.description} onChange={handleChange}></textarea>
            <input type='date' name='dueDate' value={form.dueDate} onChange={handleChange} required/>
            <select name='priority'  value={form.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            {form.title}
            <button type='submit'>Добавить</button>
            <button type='button' onClick={handleClearForm}>Очистить форму</button>
        </form>
    )
}

export default TaskForm