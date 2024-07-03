import React, { memo, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';

function UserInfoDisplayComponent({ element, index, deleteUser,refreshUsers,page }) {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            {showModal && <Modal show={showModal} onClose={toggleModal} userInfo={element} refreshUsers={refreshUsers}/>}
            <tr key={index}>
                <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{element.username}</td>
                <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{element.email}</td>
                <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }} onClick={() => toggleModal()} className='cursor-pointer'><FaRegEdit /></td>
                <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }} onClick={() => deleteUser(element)} className='cursor-pointer'>
                    <MdDelete />
                </td>
            </tr>
        </>
    );
}

export default memo(UserInfoDisplayComponent)