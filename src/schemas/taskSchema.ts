import * as z from "zod"
import { PRIORITY } from "../types"

function getToday(){
    const d = new Date()
    const month = String(d.getMonth()+1).padStart(2,"0")
    const day = String(d.getDate()).padStart(2,"0")
    return `${d.getFullYear()}-${month}-${day}`
}

export const taskSchema = z.object({
    title: z.string().trim().min(1,"Введите название").max(50,"Не длиннее 50 символов"),
    description: z.string().max(200,"Не длиннее 200 символов"),
    dueDate: z.string().min(1,"Укажите дедлайн").refine((value)=> value >= getToday(),"Не может быть в прошлом"),
    priority: z.enum(PRIORITY)
})

export type TaskFormValues = z.infer<typeof taskSchema>
