import React, { useState } from 'react';
import axios from 'axios';

const EditForm = ({ handleCloseEditForm, selectedTask, allAssingees }) => {
    console.log(selectedTask);
    const defaultTask = selectedTask ? selectedTask : {
        title: '',
        content: '',
        assignee: {},
        state: "pending"
    };
    const [editedTask, setEditedTask] = useState(defaultTask); 

    const handleCloseForm = () => {
        handleCloseEditForm(); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setEditedTask({
                ...editedTask,
                state: value 
            });
        } else {
            setEditedTask({
                ...editedTask,
                [name]: value
            });
        }
    };

    const handleEditTask = async (e) => {
        e.preventDefault();
        if (selectedTask) {
            try {
                const response = await axios.put(`http://localhost:3000/tasks/${selectedTask._id}`, editedTask);
                console.log(response.data);
                handleCloseEditForm();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        else {
            try {
                const newTask = {
                    title: editedTask.title,
                    content: editedTask.content,
                    state: editedTask.state,
                    assignee: editedTask.assignee || null,
                }
                console.log(newTask);
                const response = await axios.post('http://localhost:3000/tasks', newTask);
                console.log(response.data);
                handleCloseEditForm();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    };

    return (
        <form className="w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="close-Btn" onClick={handleCloseForm}>
                    <i className="fa-solid fa-close "></i>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="editTodo" className="block text-gray-700 font-bold mb-2">Edit</label>
            </div>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input name="title" id="title" type="text" placeholder="Title" required
                    value={editedTask.title} onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                <textarea name="content" id="content" cols="30" rows="5" placeholder="Content" required
                    value={editedTask.content} onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="assignee" className="block text-gray-700 font-bold mb-2">Assignee</label>
                <select
                    name="assignee"
                    id="assignee"
                    required
                    defaultValue={editedTask.assignee ? editedTask.assignee._id : ''}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Chọn 1 assignee</option>
                    {allAssingees.map((assignee) => (
                        <option
                            key={assignee._id}
                            value={assignee._id}
                        >
                            {assignee.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4 flex">
                <div className="mr-4">
                    <input name="status" type="radio" value="pending" className="mr-1" checked={editedTask.state === "pending"} onChange={handleInputChange} />Pending
                </div>
                <div>
                    <input name="status" type="radio" value="in_progress" className="mr-1" checked={editedTask.state === "in_progress"} onChange={handleInputChange} />In_progress
                </div>
                <div className="mr-4">
                    <input name="status" type="radio" value="completed" className="mr-1" checked={editedTask.state === "completed"} onChange={handleInputChange} />Completed
                </div>
            </div>
            <button id="AddEditBtn" style={{ width: '50%', padding: '0.2rem', margin: '1rem' }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEditTask}>Submit</button>
        </form>
    );
};

export default EditForm;
