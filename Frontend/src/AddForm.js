import React from 'react';
import './style.css';
const AddForm = () => {
    return (
        <form>
            <div className="close-Btn">
                <i className="fa-solid fa-close "></i>
            </div>
            <div className="adding-form-title">
                <label htmlFor="Category">Category</label>
                <input name="category" id="Category" type="text" placeholder="Category" required />
            </div>
            <div className="adding-form-title">
                <label htmlFor="Title">Title</label>
                <input name="title" id="Title" type="text" placeholder="Title" required />
            </div>
            <div className="adding-form-title">
                <label htmlFor="Description">Description</label>
                <textarea name="description" id="Description" cols="30" rows="5" placeholder="Description" required></textarea>
            </div>
            <div className="adding-form-title">
                <label htmlFor="Deadline">Deadline</label>
                <input name="date" id="Deadline" type="date" placeholder="Deadline" required />
            </div>
            <div className="adding-form-title">
                <input name="submit" type="submit" value="Submit" />
            </div>
        </form>
    );
};

export default AddForm;
