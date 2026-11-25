import * as z from "zod"

export const boardSchema = z.object({
    title: z.string().trim().min(1,"Введите название доски").max(30,"Не длиннее 30 символов")
})

export type BoardFormValues = z.infer<typeof boardSchema>