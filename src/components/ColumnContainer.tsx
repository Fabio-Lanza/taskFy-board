import { BiTrash } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { Column, Id, Task } from "../Types/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
}

const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: ColumnContainerProps) => {

const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({id: column?.id,data: {type: "Column", column,},});

  const [editMode, setEditMode] = useState(false);
  

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackground h-[600px] w-[350px] max-h-[600px] rounded-md flex flex-col opacity-40 border-2"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackground h-[750px] w-[350px] max-h-[750px] rounded-md flex flex-col"
    >
      {/* Column Title */}
      <div
        onClick={() => setEditMode(!editMode)}
        {...attributes}
        {...listeners}
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-medium border-columnBackground border-4 flex justify-between items-center text-green-500 text-lg"
      >
        <div className="flex gap-4">
          <span className="flex justify-center items-center bg-columnBackground px-2 py-1 text-sm rounded-full">
            0
          </span>
          {!editMode && column.title}
          {editMode && (
            <input
              autoFocus
              value={column.title}
              onChange={(e) => updateColumn(column?.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
              className="bg-columnBackground focus:border-gray-400 border h-[40px] px-2 w-full rounded outline-none"
            />
          )}
        </div>
        <button onClick={() => deleteColumn(column?.id)}>
          <BiTrash className="h-[25px] w-[25px] text-gray-400 hover:text-white" />
        </button>
      </div>

      {/*  ========================== column task CONTENT  =========================== */}
      <div className="flex flex-grow flex flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* column footer  */}
      <button
        className="flex items-center gap-2 p-4 text-gray-400 hover:text-white border-columnBackground border-2 rounded-md active:bg-black hover:bg-mainBackground"
        onClick={() => createTask(column?.id)}
      >
        <CiCirclePlus className="h-[25px] w-[25px]" />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
