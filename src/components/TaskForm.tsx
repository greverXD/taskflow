import React, { useState } from 'react'
import type { TaskPriority } from '../types' 
interface TaskFormValues{
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
function TaskForm(){
    const [form,setForm] = useState<TaskFormValues>(initialForm)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
        const {name, value} = e.target;
        setForm((prev)=>({...prev,[name]: value}))
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log(form)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name='title' value={form.title} 
            onChange={handleChange}
            />
            <textarea name='description' value={form.description} onChange={handleChange}></textarea>
            <input type='date' name='dueDate' value={form.dueDate} onChange={handleChange}></input>
            <select name='priority'  value={form.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            {form.title}
            <button type='submit'>Добавить</button>
        </form>
    )
}

export default TaskForm