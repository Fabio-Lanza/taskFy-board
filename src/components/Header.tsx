import React from 'react'
import  logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className='h-[120px] border-b border-green-500  text-gray-400 flex items-center pl-10 text-2xl font-medium'>
        <img src={logo} alt="" className='w-20 mr-5'/>
     <p className='text-[#284c77]'>Tasks Management Board</p>
    </div>
  )
}

export default Header
