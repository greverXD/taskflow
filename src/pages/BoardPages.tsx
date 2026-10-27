import TaskCard from "../components/TaskCard";
import type { Board, Task } from "../types";
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
import type { Dispatch,SetStateAction } from "react";
import { useParams,Link } from "react-router";

interface BoardPage{
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<Task[]>>
    boards: Board[]
}
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

const STATUS_ORDER: TaskStatus[] = ["todo", "in-progress", "review", "done"];

function BoardPages({tasks,setTasks,boards}:BoardPage) {
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
    handleDelete(id);
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

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  }
  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDelete(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function handleMoveStatus(id: number, direction: 1 | -1) {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id !== id) {
          return task;
        }
        const currentIndex = STATUS_ORDER.indexOf(task.status);
        const newIndex = currentIndex + direction;
        if (newIndex < 0 || newIndex >= STATUS_ORDER.length) {
          return task;
        } else {
          const statustask = STATUS_ORDER[newIndex];
          return { ...task, status: statustask };
        }
      });
    });
  }

  function handleCreateTask(taskCreate: TaskFormValues) {
    setTasks((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((task) => task.id)) + 1 : 1;
      const newTask: Task = { ...taskCreate, id: newId, status: "todo",boardId: currentBoardId };
      return [...prev, newTask];
    });
  }

  function handleSetAllStatus(status: TaskStatus) {
    setTasks((prev) => prev.map((task) => ({ ...task, status })));
  }

  function handleClearCompleted() {
    setTasks((prev) => prev.filter((task) => task.status !== "done"));
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
            Выполнено {doneCount} из {tasks.length}
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
                      handleMoveStatus={handleMoveStatus}
                    />
                  ))}
              </AnimatePresence>
            </Columnpcomponent>
          ))}
        </motion.div>
      </DndContext>
      <button onClick={() => handleSetAllStatus("done")}>
        Отметить все как выполненные
      </button>
      <button onClick={() => handleSetAllStatus("todo")}>
        Снять все отметки
      </button>
      <button onClick={handleClearCompleted}>Очистить выполненные</button>
      

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
