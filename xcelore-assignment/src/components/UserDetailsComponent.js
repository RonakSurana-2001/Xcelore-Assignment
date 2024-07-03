import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import UserInfoDisplayComponent from './UserInfoDisplayComponent';
import NewUserModel from './NewUserModel';

function UserDetailsComponent() {

  const [usersDetails, setusersDetails] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0)
  const itemsPerPage = 3; 

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const filteredDomains = usersDetails.filter(record =>
    record.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedUsers = filteredDomains.slice(page, page + itemsPerPage);

  const getAllUsers = async () => {
    try {
      const allusers = await axios.post('http://localhost:4000/user/allusers', {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token")
      })
      setusersDetails(allusers.data.usersNew)
    } catch (err) {
      console.log(err)
      toast.error("Dont try to corrupt data")
    }
  }

  useEffect(() => {
    if (localStorage.getItem("isAdmin") == "true") {
      getAllUsers()
    }
  }, [])

  const refreshUsers = () => {
    getAllUsers();
  };

  const deleteUser = async (element) => {
    try {
      if (element.email === localStorage.getItem("email")) {
        toast.error("Can't delete yourself");
      } else {
        const user = await axios.delete(`http://localhost:4000/user/deleteUser`, {
          headers: {
            email: localStorage.getItem("email"),
            token: localStorage.getItem("token"),
            emailtodelete: element.email
          }
        });
        if (user.data.success) {
          toast.success(user.data.message);
          refreshUsers();
        } else {
          toast.error(user.data.message);
        }
      }
    } catch (err) {
      toast.error("Unable to delete");
    }
  };

  const handleNextPage = () => {
    if (page < filteredDomains.length - itemsPerPage) {
      setPage(page + itemsPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - itemsPerPage);
    }
  };


  return (
    <>
      <div>Logged in as {localStorage.getItem("email")}</div>
      {localStorage.getItem("isAdmin") == "true" && (
        <>
          <div className='flex flex-col justify-center items-center p-2 space-y-2'>
            <input type="text" placeholder="Search "
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className="border-2 border-blue-600 w-1/2 rounded-lg h-10 text-center "
            />
            <div className='border-2 cursor-pointer p-2 bg-slate-400' onClick={() => toggleModal()}>Create New User</div>
            {showModal && <NewUserModel show={showModal} onClose={toggleModal} refreshUsers={refreshUsers} />}
          </div>
          <div className='  w-full flex flex-row justify-center'>
            <div className='overflow-auto rounded-lg'>
              <table>
                <thead>
                  <tr style={{ border: '2px solid black' }}>
                    <th style={{ border: '2px solid black', padding: '8px' }}>Username</th>
                    <th style={{ border: '2px solid black', padding: '8px' }}>Email</th>
                    <th style={{ border: '2px solid black', padding: '8px' }}>Edit</th>
                    <th style={{ border: '2px solid black', padding: '8px' }}>Delete</th>
                  </tr>
                </thead>
                <tbody style={{ border: '2px solid black' }}>
                  {displayedUsers.length > 0 && displayedUsers.map((element, index) =>
                    <UserInfoDisplayComponent element={element} key={index} index={index} refreshUsers={refreshUsers} deleteUser={deleteUser} page={page} />
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className='flex flex-row space-x-2 justify-center p-2'>
            <div
              className={`bg-slate-600 hover:bg-slate-700 rounded-md p-2 ${page >= filteredDomains.length - itemsPerPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handleNextPage}
            >
              Next
            </div>
            <div
              className={`bg-slate-600 rounded-md p-2 ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700 cursor-pointer'}`}
              onClick={handlePreviousPage}
            >
              Previous
            </div>
          </div>
        </>
      )}
    </>
  )
}


export default UserDetailsComponent