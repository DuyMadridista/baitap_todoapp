import React from 'react';

const AddForm = ({ handleCloseAddForm }) => {
    const handleCloseForm = () => {
        handleCloseAddForm();
    };
    return (
        <form className="w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="close-Btn" onClick={() => { handleCloseForm() }}>
                    <i className="fa-solid fa-close "></i>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="Category" className="block text-gray-700 font-bold mb-2">Category</label>
                <input name="category" id="Category" type="text" placeholder="Category" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="Title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input name="title" id="Title" type="text" placeholder="Title" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="Description" className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea name="description" id="Description" cols="30" rows="5" placeholder="Description" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="Deadline" className="block text-gray-700 font-bold mb-2">Deadline</label>
                <input name="date" id="Deadline" type="date" placeholder="Deadline" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <input name="submit" type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
            </div>
        </form>
    );
};

export default AddForm;
