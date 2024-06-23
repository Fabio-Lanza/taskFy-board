import React , {useState}from 'react'
import { Id, Task } from '../Types/types'
import { BiTrash } from 'react-icons/bi'


interface TaskCardProps {
  task: Task
  deleteTask: (id: Id) => void
}


const TaskCard = ({ task, deleteTask }: TaskCardProps) => {
    const [mouseIsOver, setMouseIsOver] = useState(false)

  return (
    <div onMouseEnter={()=> {setMouseIsOver(true)}} onMouseLeave={()=> {setMouseIsOver(false)}} className='bg-mainBackground p-3 h-[100px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-1 hover:ring-inset hover:ring-gray-500 cursor-grab relative'>
      {task.content}

     {mouseIsOver && (
         <button className='text-gray-400 hover:text-gray-500 cursor-pointer absolute right-4 ' onClick={() => deleteTask(task.id)} >
         <BiTrash className=' w-[25px] h-[25px]'/>
 
         </button>
     )}
    </div>
  )
}

export default TaskCard
