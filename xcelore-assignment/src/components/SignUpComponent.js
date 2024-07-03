import axios from 'axios'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function SignUpComponent() {

    const username=useRef('')
    const email=useRef('')
    const password=useRef('')

    const navigate=useNavigate()

    const handleSubmit=async()=>{
        try{
            const user=await axios.post('https://xcelore-assignment.onrender.com/user/userRegister',{
                email:email.current.value,username:username.current.value,
                password:password.current.value
            })
            if(user.data.success){
                toast.success(user.data.message)
                navigate("/")
            }
            else{
                toast.error(user.data.message)
            }
        } catch(err){
            toast.error("Some Error Occurred try again")
        }
    }

    return (
        <>
            <div className='h-screen flex flex-row items-center justify-center'>
                <div className='grid grid-row-4 justify-center bg-blue-300 rounded-lg w-2/6 p-3'>
                    <div className='flex flex-col items-center space-y-6 p-2'>
                        <div className='max-md:text-2xl text-4xl'>Username</div>
                        <input type="text" placeholder='Username' className='max-lg:w-1/2 w-80 h-10 rounded-md text-center' ref={username}/>
                    </div>
                    <div className='flex flex-col items-center space-y-6 p-2'>
                        <div className='max-md:text-2xl text-4xl'>Email</div>
                        <input type="email" placeholder='Email' className='max-lg:w-1/2 w-80 h-10 rounded-md text-center' ref={email}/>
                    </div>
                    <div className='flex flex-col items-center space-y-6 p-2'>
                        <div className='max-md:text-2xl text-4xl'>Password</div>
                        <input type="password" placeholder='Password' className='max-lg:w-1/2 w-80 h-10 rounded-md text-center' ref={password}/>
                    </div>
                    <div className='flex flex-col items-center p-2'>
                        <button className='text-xl bg-green-600 p-3 rounded-lg' onClick={()=>handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpComponent