import { useState } from "react";
import type { Task, TaskPriority, SortBy } from "../types";
import { useDebounce } from "./useDebounce";

const PRIORITY_WEIGHT: Record<TaskPriority,number> = {High:3, Medium:2, Low:1}

export function useTasksFilters(tasks: Task[]){
      const [priorityFilter,setPriorityFilter] = useState<TaskPriority|'all'>("all")
      const [sortBy,setSortBy] = useState<SortBy>("none")
      const [search,setSearch] = useState('')
      const debouncedSearch = useDebounce(search,300)
      const visibleTasks = tasks.filter((task)=> task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) && (priorityFilter === 'all'  || task.priority === priorityFilter))

    function getWeight(task: Task): number{
         return PRIORITY_WEIGHT[task.priority ?? "Low"]
        }
        const sortTask = visibleTasks.toSorted((a,b)=>{
         if(sortBy === "dueDate"){
            return a.dueDate.localeCompare(b.dueDate)
        }
        if(sortBy === "priority"){
            return getWeight(b) - getWeight(a)
        }
             return 0
        })
        return {priorityFilter,setPriorityFilter,sortBy,setSortBy,search,setSearch,sortTask}
}