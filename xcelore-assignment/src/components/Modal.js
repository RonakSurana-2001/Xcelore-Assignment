import React, { useState, memo } from "react";
import toast from 'react-hot-toast';
import axios from "axios"

function Modal({ show, onClose, userInfo,refreshUsers }) {

    const [info, setInfo] = useState({
        username: userInfo.username,
        status: userInfo.status
    });

    if (!show) {
        return null;
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const user=await axios.put("https://xcelore-assignment.onrender.com/user/updateUser",{
                email:localStorage.getItem("email"),
                emailupdate:userInfo.email,
                token:localStorage.getItem("token"),
                username:info.username,
                status:info.status
            })
            if(user.data.success){
                toast.success("Successfully Updated")
                refreshUsers()
            }
        } catch(err){
            console.log(err)
            toast.error("Not able to Update")
        }
        await onClose();
    };

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
            <div className="relative w-full max-w-md p-4 max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit User Details
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={handleChange}
                                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="username"
                                    value={info.username}
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="status"
                                            name="status"
                                            type="checkbox"
                                            onChange={handleChange}
                                            checked={info.status}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        />
                                    </div>
                                    <label
                                        htmlFor="status"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Make Admin
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Edit User Details
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Modal);
