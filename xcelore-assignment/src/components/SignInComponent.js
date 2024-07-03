import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux'
import { authActions } from "../redux/store";

function SignInComponent() {

    const userEmail=useRef('')
    const userPassword=useRef('')

    const navigate=useNavigate()

    const dispatch = useDispatch()  

    const handleSubmit=async()=>{
        try{
            const user=await axios.post('https://xcelore-assignment.onrender.com/user/userLogin',{
                email:userEmail.current.value,
                password:userPassword.current.value
            })
            if(user.data.success){
                localStorage.setItem("email",userEmail.current.value)
                localStorage.setItem("token",user.data.jwtToken)
                localStorage.setItem("isAdmin",user.data.isAdmin)
                toast.success("User Logged Successfully")
                dispatch(authActions.login())
                navigate("/userdetails")
            }
            else{
                toast.error(user.data.message)
            }
        } catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className='h-screen flex flex-row items-center justify-center'>
                <div className='grid grid-row-4 justify-center bg-blue-300 rounded-lg w-2/6 p-3'>
                    <div className='flex flex-col items-center space-y-6 p-2'>
                        <div className='max-md:text-2xl text-4xl'>Email</div>
                        <input type="email" placeholder='Email' className='max-lg:w-1/2 w-80 h-10 rounded-md text-center' ref={userEmail}/>
                    </div>
                    <div className='flex flex-col items-center space-y-6 p-2'>
                        <div className='max-md:text-2xl text-4xl'>Password</div>
                        <input type="password" placeholder='Password' className='max-lg:w-1/2 w-80 h-10 rounded-md text-center' ref={userPassword}/>
                    </div>
                    <div className='flex flex-col items-center p-2'>
                        <button className='text-xl bg-green-600 p-3 rounded-lg' onClick={async()=>{
                            handleSubmit()
                        }}>Submit</button>
                    </div>
                    <div className='flex flex-col items-center space-y-2 p-2 text-center'>
                        <Link to='/signup' className='max-md:text-sm text-3xl'>Not a user register</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInComponent