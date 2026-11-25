export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export const PRIORITY = ["Low", "Medium", "High"] as const
export type TaskPriority = (typeof PRIORITY)[number]
export type SortBy = "none" | "dueDate" | "priority"
export interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  priority?: TaskPriority
  status: TaskStatus
  boardId: number
}
export interface Column{
  id: TaskStatus
  title: string
}
export interface Board{
  id: number
  title: string
}