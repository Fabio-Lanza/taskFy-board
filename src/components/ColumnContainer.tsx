import { BiTrash } from "react-icons/bi";
import { Column, Id } from "../Types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = ({ column, deleteColumn }: ColumnContainerProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

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
      className="bg-columnBackground h-[600px] w-[350px] max-h-[600px] rounded-md flex flex-col"
    >
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackground border-4 flex justify-between items-center"
      >
        <div className="flex gap-2">
          <span className="flex justify-center items-center bg-columnBackground px-2 py-1 text-sm rounded-full">
            0
          </span>
          {column.title}
        </div>
        <button onClick={() => deleteColumn(column.id)}>
          <BiTrash className="h-[25px] w-[25px] text-gray-400 hover:text-white" />
        </button>
      </div>

      {/* column task  */}
      <div className="flex flex-grow">content</div>

      {/* column footer  */}
      <div>footer</div>
    </div>
  );
};

export default ColumnContainer;
