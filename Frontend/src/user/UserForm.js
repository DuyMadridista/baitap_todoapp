import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ handleCloseUserForm, selectedUser }) => {
    const defaultUser = selectedUser ? selectedUser : {
        name: '',
        email: ''
    };
    const [editedUser, setEditedUser] = useState(defaultUser);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleCloseForm = () => {
        handleCloseUserForm();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value
        });
    };

    const validateForm = () => {
        let errors = {};
        if (!editedUser.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!editedUser.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(editedUser.email)) {
            errors.email = 'Invalid email format';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = selectedUser
                    ? await axios.put(`http://localhost:3000/users/${selectedUser._id}`, editedUser)
                    : await axios.post('http://localhost:3000/users', editedUser);
                console.log(response.data);
                handleCloseUserForm();
            } catch (error) {
                console.error('Error :', error.response.data.message);
                setErrorMessage(error.response.data.message);
            }
        }
    };

    return (
        <form className="w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="close-Btn" onClick={handleCloseForm}>
                    <i className="fa-solid fa-close "></i>
                </div>
            </div>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input name="name" id="name" type="text" placeholder="Name" required
                    value={editedUser.name} onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.name && <div className="text-red-500">{errors.name}</div>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input name="email" id="email" type="email" placeholder="Email" required
                    value={editedUser.email} onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>
            <button id="AddEditBtn" style={{ width: '50%', padding: '0.2rem', margin: '1rem' }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEditUser}>Submit</button>
        </form>
    );
};

export default UserForm;
