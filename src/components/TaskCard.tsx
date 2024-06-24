import React, { useState } from "react";
import { Id, Task } from "../Types/types";
import { BiTrash } from "react-icons/bi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: TaskCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task?.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  //================= EDIT MODE
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackground p-3 h-[130px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-1 hover:ring-inset hover:ring-gray-500 cursor-grab relative"
      >
        <textarea
          autoFocus
          placeholder="Task Content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          value={task.content}
          className="h-[90%] w-full border-none rounded bg-transparent text-white focus:outline-none"
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="bg-mainBackground p-3 h-[130px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-1 hover:ring-inset hover:ring-gray-500 cursor-grab relative task"
    >
      <p className="my-auto h-[90%] w-full overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          className="text-gray-400 hover:text-gray-500 cursor-pointer absolute right-4 "
          onClick={() => deleteTask(task.id)}
        >
          <BiTrash className=" w-[25px] h-[25px]" />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
