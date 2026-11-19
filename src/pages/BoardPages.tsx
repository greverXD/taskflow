import TaskCard from "../components/TaskCard";
import type { Task } from "../types";
import type { TaskStatus } from "../types";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import type { TaskFormValues } from "../components/TaskForm";
import type { Column } from "../types";
import Columnpcomponent from "../components/Column";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import ConfirmModal from "../ConfirmModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { TaskPriority, SortBy } from "../types";
import { useTasksFilters } from "../hooks/useTasksFilters";
import { useKeyPress } from "../hooks/useKeyPress";

import { useParams,Link, Outlet } from "react-router";
import { useBoardStore } from "../stores/useBoardStore";
import { useTaskStore } from "../stores/useTaskStore";


const appVariant: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.15) } },
};
const COLUMNS: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];


function BoardPages() {
  const tasks = useTaskStore((state)=> state.tasks)
  const addTask = useTaskStore((state)=> state.addTask)
  const deleteTask = useTaskStore((state)=>state.deleteTask)
  const changeStatus = useTaskStore((state)=> state.changeStatus)
  const moveStatus = useTaskStore((state)=> state.moveStatus)
  const setAllStatus = useTaskStore((state)=> state.setAllStatus)
  const clearCompleted = useTaskStore((state)=> state.clearCompleted)
  const boards = useBoardStore((state)=>state.boards)
  const {boardId} = useParams()
  const currentBoardId = Number(boardId) 
  const board = boards.find((b)=> b.id === currentBoardId)
  const boardTask=tasks.filter((task)=> task.boardId === currentBoardId)


  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>(undefined);

  const {
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    search,
    setSearch,
    sortTask,
  } = useTasksFilters(boardTask);
  const [hideDone, setHideDone] = useLocalStorage("hideDone", false);
  function openModalDelete(id: number) {
    setTaskToDelete(tasks.find((task) => task.id === id));
  }
  function confirmModal(id: number) {
    deleteTask(id);
    setTaskToDelete(undefined);
  }
  function cancelModal() {
    setTaskToDelete(undefined);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as TaskStatus;

    changeStatus(taskId,newStatus)
  }
  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );





  function handleCreateTask(values: TaskFormValues) {
    addTask(values,currentBoardId)
  }


  const doneCount = boardTask.filter((task) => task.status === "done").length;
  const unDoneCount = boardTask.filter((task) => task.status !== "done").length;

  useEffect(() => {
    document.title = `Невыполнено ${unDoneCount}`;
  }, [unDoneCount]);

  useKeyPress("Escape", cancelModal);

  const visibleColumns = hideDone ? COLUMNS.filter((column)=> column.id !== "done"): COLUMNS

if(!board){
  return(
    <p>Доска не найдена. <Link to="/">Вернуться к доскам</Link> </p>
  )
}
  
  return (
    <>
      <h2>{board.title}</h2>
      <Outlet/>
            <TaskForm onAddTask={handleCreateTask} />
      <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <select
        value={priorityFilter}
        onChange={(e) =>
          setPriorityFilter(e.target.value as TaskPriority | "all")
        }
      >
        <option value="all">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortBy)}
      >
        <option value="none">ничего</option>
        <option value="dueDate">Время</option>
        <option value="priority">Приоритет</option>
      </select>
      <label>
        <input type="checkbox" checked={hideDone} onChange={()=> setHideDone(prev => !prev)} />
        Скрыть выполненные
      </label>
              <DndContext sensors={sensor} onDragEnd={handleDragEnd}>
        <motion.div
          className="Board_list"
          variants={appVariant}
          animate="visible"
          initial="hidden"
        >
          <div>
            Выполнено {doneCount} из {boardTask.length}
          </div>
          {visibleColumns.map((column) => (
            <Columnpcomponent key={column.id} column={column}>
              <AnimatePresence initial={false}>
                {sortTask
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      tasks={task}
                      onDelete={openModalDelete}
                      handleMoveStatus={moveStatus}
                    />
                  ))}
              </AnimatePresence>
            </Columnpcomponent>
          ))}
        </motion.div>
      </DndContext>
      <button onClick={() => setAllStatus(currentBoardId,"done")}>
        Отметить все как выполненные
      </button>
      <button onClick={() => setAllStatus(currentBoardId,"todo")}>
        Снять все отметки
      </button>
      <button onClick={()=> clearCompleted(currentBoardId)}>Очистить выполненные</button>
      

      <AnimatePresence>
        {taskToDelete && (
          <ConfirmModal
            key={taskToDelete.id}
            task={taskToDelete}
            onDelete={confirmModal}
            onCancel={cancelModal}
          />
        )}
      </AnimatePresence>
    
    </>
  );
}

export default BoardPages;
