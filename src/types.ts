export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'Low' | 'Medium' | 'High'
export interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  priority?: TaskPriority
  status: TaskStatus
}
export interface Column{
  id: TaskStatus
  title: string
}