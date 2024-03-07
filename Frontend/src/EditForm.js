import React from 'react';
import './style.css';
const EditForm = () => {
    return (
        <form>
            <div className="close-Btn">
                <i className="fa-solid fa-close "></i>
            </div>
            <div className="adding-form-title">
                <label htmlFor="editTodo">Edit Todo</label>
            </div>
            <div className="adding-form-title">
                <label htmlFor="Category">Category</label>
                <input name="categoryEdit" className="input" id="Category" type="text" placeholder="Category" required />
            </div>
            <div className="adding-form-title">
                <label htmlFor="Title">Title</label>
                <input name="titleEdit" className="input" id="Title" type="text" placeholder="Title" required />
            </div>
            <div className="adding-form-title">
                <label htmlFor="Description">Description</label>
                <textarea name="descriptionEdit" id="Description" cols="30" rows="5" placeholder="Description" required></textarea>
            </div>
            <div className="radioBtn" style={{ flexDirection: 'row' }}>
                <div className="radioChoise">
                    <input name="status" type="radio" value="Todo" />Todo
                </div>
                <div className="radioChoise">
                    <input name="status" type="radio" value="Doing" />Doing
                </div>
                <div className="radioChoise">
                    <input name="status" type="radio" value="Done" />Done
                </div>
            </div>
            <button id="AddEditBtn" style={{ width: '50%', padding: '0.2rem', margin: '1rem' }}>Add</button>
        </form>
    );
};

export default EditForm;
