import React from 'react'
import { useNavigate } from 'react-router-dom'

import {  useDispatch } from 'react-redux'
import { authActions } from "../redux/store";


function Navbar() {
  
    const navigate=useNavigate()
    const dispatch=useDispatch()

  return (
    <div className='flex flex-row-reverse w-full bg-blue-600'>
        <div className='bg-slate-400 p-4 cursor-pointer font-medium' onClick={()=>{
            dispatch(authActions.logout())
            navigate('/')
            localStorage.clear()
        }}>Logout</div>
    </div>
  )
}

export default Navbar