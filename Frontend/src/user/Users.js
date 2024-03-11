import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import Pagination from '@mui/material/Pagination';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(3);
    const [totalUser, setTotalUser] = useState(0);
    const [DeleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchTotalUsers();
    }, [searchTerm, sortOrder, currentPage, pageSize]);

    const fetchUsers = async () => {
        try {
            const link = `http://localhost:3000/users?search=${searchTerm}&sort=${sortOrder}&page=${currentPage}&limit=${pageSize}`;
            const response = await axios.get(link);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchTotalUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/all');
            setTotalUser(response.data.length);
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }

    const handleAddUser = () => {
        setShowForm(true);
        setEditUserId(null);
    };

    const handleEditUser = (id) => {
        setShowForm(true);
        setEditUserId(id);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        fetchUsers();
    }
    const handleDeleteUser = (id) => {
        setDeleteUserId(id);
        setDeleteConfirm(true);
    };

    const handleConfirmDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`);
            const updatedUsers = users.filter(user => user._id !== id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const getTotalTasks = (user) => {
        return user.tasks.length;
    };

    return (
        <div className="container mx-auto">
            <div className='flex justify-between items-center mb-4'>
                <div className="flex items-center justify-around">
                    <select
                        className="border border-gray-400 px-4 py-2 mr-2 rounded"
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="1">Ascending</option>
                        <option value="-1">Descending</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-400 px-4 py-2 mb-2 rounded"
                    />
                </div>
                <div id="add-btn" className={`AddBtn  'opacity-50 pointer-events-none' : ''}`} onClick={handleAddUser}>
                    <i className="fa-sharp fa-regular fa-plus"></i>
                    <div>New User</div>
                </div>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Total Tasks</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-400 px-4 py-2">{getTotalTasks(user)}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleEditUser(user._id)}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    <i className="fa-sharp fa-regular fa-edit "></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50 ">
                    <div
                        className="bg-white p-4 rounded-lg w-1/2  ">
                        <UserForm
                            handleCloseUserForm={handleCloseForm}
                            selectedUser={users.find(user => user._id === editUserId)}
                        />
                    </div>
                </div>
            )}
            {DeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
                    <div className="bg-white p-4 rounded-lg w-1/4">
                        <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this user?</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={() => {
                                    handleConfirmDelete(deleteUserId);
                                    setDeleteConfirm(false);
                                }}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setDeleteConfirm(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Pagination
                count={Math.ceil(totalUser / pageSize)}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                className="mt-4"
            />
        </div>
    );
}

export default Users;
