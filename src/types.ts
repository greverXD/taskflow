export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

export interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  priority?: string
  status: TaskStatus
}
