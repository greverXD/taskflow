import { create } from "zustand";
import type { TaskFormValues } from "../components/TaskForm";
import { persist } from "zustand/middleware";
import type { Task,TaskStatus } from "../types";



interface TaskState{
    tasks: Task[];
    addTask: (values:TaskFormValues, boardId:number) => void
    deleteTask:(id:number)=> void
    changeStatus: (id: number, status: TaskStatus) => void;
    moveStatus: (id: number, direction: 1 | -1) => void;
    setAllStatus: (boardId: number, status: TaskStatus) => void;
    clearCompleted: (boardId: number) => void;
    updateTask: (id: number, changes: Partial<Task>) => void;
}
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "...",
    dueDate: "2023-06-01",
    priority: "High",
    status: "todo",
    boardId: 1
  },
  {
    id: 2,
    title: "Task 2",
    description: "...",
    dueDate: "2023-06-02",
    status: "todo",
    boardId: 1
  },
  {
    id: 3,
    title: "Task 3",
    description: "...",
    dueDate: "2023-06-03",
    status: "todo",
    boardId: 1
  },
];
const STATUS_ORDER: TaskStatus[] = ["todo", "in-progress", "review", "done"];
export const useTaskStore = create<TaskState>()(
    persist((set)=>({
        tasks:initialTasks,
        addTask:(values,boardId)=> 
            set((state)=>{
            const newId =
        state.tasks.length > 0 ? Math.max(...state.tasks.map((task) => task.id)) + 1 : 1;
      const newTask: Task = { ...values, id: newId, status: "todo",boardId };
      return {tasks:[...state.tasks, newTask]};
    }),
    deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),

    changeStatus:(id,status) => set((state)=>({
      tasks: state.tasks.map((task)=> task.id === id ? {...task, status} : task)
    })),
    moveStatus:(id,direction) => set((state)=>({
      tasks: state.tasks.map((task)=>{
        if(task.id !== id){
          return task
        }
        const currentIndex = STATUS_ORDER.indexOf(task.status);
        const newIndex = currentIndex + direction;
        if (newIndex < 0 || newIndex >= STATUS_ORDER.length) {
          return task;
        } else {
          const statustask = STATUS_ORDER[newIndex];
          return { ...task, status: statustask };
        }

      })
    })),
    setAllStatus: (boardId,status) => set((state)=>({
      tasks: state.tasks.map((task)=> task.boardId === boardId ? {...task,status} : task)
    })),
    clearCompleted: (boardId) => set((state)=>({
      tasks: state.tasks.filter((task)=> !(task.boardId === boardId && task.status === "done") )
    })),
    updateTask: (id,changes) => set((state)=>({
      tasks: state.tasks.map((task)=> task.id === id ? {...task,...changes} : task)
    }))
  }), { name: "taskflow-tasks" })
)
