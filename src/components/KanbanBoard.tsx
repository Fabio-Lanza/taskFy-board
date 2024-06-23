import { useMemo, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Column, Id, Task } from "../Types/types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, useSensor, PointerSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(
    () => columns.map((column) => column?.id),
    [columns]
  );

  const createColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 1000);
  };


  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };



  const deleteColumn = (id: Id) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };


  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((column) => {
      if (column?.id !== id) return column;
        return { ...column, title };
      
    });
    setColumns(newColumns);
  };


  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data?.current?.column);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
   const { active, over } = event;
    if (!over) return

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(columns => {
        const activeColumnsIndex = columns.findIndex(column => column.id === activeColumnId);
        const overColumnsIndex = columns.findIndex(column => column.id === overColumnId);
        return arrayMove(columns, activeColumnsIndex, overColumnsIndex);
    })
  };

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  }))
  
  


  return (
    <div className="flex m-auto min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-40">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column, index) => (
                <ColumnContainer
                  key={index}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks = {tasks.filter(task => task.columnId === column.id)}
                  deleteTask={deleteTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createColumn()}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackground border-2 border-columnBackground p-4 ring-rose-500 hover:ring-2 flex gap-3 items-center"
          >
            <CiCirclePlus className="h-[30px] w-[30px]" />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                updateColumn={updateColumn}
                deleteColumn={deleteColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                tasks = {tasks.filter(task => task.columnId === activeColumn.id)}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
