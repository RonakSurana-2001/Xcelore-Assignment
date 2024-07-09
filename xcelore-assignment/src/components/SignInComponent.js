import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux'
import { authActions } from "../redux/store";

function SignInComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [isLoading, setisLoading] = useState(false)

    console.log(isLoading)

    // console.log(userEmail.current.value,userPassword.current.value)

    const handleSubmit = async () => {
        setisLoading(true)
        try {
            const user = await axios.post('https://xcelore-assignment.onrender.com/user/userLogin', {
                email,
                password
            })
            if (user.data.success) {
                localStorage.setItem("email", email)
                localStorage.setItem("token", user.data.jwtToken)
                localStorage.setItem("isAdmin", user.data.isAdmin)
                toast.success("User Logged Successfully")
                dispatch(authActions.login())
                setisLoading(false)
                navigate("/userdetails")
            }
            else {
                setisLoading(false)
                toast.error(user.data.message)
            }
        } catch (err) {
            setisLoading(false)
            console.log(err)
        }
    }

    return (
        <>
            {!isLoading ? <div className='h-screen flex flex-row items-center justify-center'>
                <div className='grid grid-row-4 justify-center bg-blue-300 rounded-lg max-md:w-4/5 w-2/6 p-3'>
                    <div className='flex flex-col items-center space-y-6 p-2'>
                        <div className='max-md:text-2xl text-4xl'>Email</div>
                        <input type="text" placeholder='Email' className='max-md:w-4/5 w-80 h-10 rounded-md text-center' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col items-center space-y-6 p-2'>
                        <div className='max-md:text-2xl text-4xl'>Password</div>
                        <input type="text" placeholder='Password' className='max-md:w-4/5 w-80 h-10 rounded-md text-center' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col items-center p-2'>
                        <button className='text-xl bg-green-600 p-3 rounded-lg' onClick={async () => {
                            handleSubmit()
                        }}>Submit</button>
                    </div>
                    <div className='flex flex-col items-center space-y-2 p-2 text-center'>
                        <Link to='/signup' className='max-md:text-sm text-3xl'>Not a user register</Link>
                    </div>
                </div>
            </div> : <p className='text-center text-red-600 text-6xl'>Loading...</p>}
        </>
    )
}

export default SignInComponent