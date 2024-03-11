import React from 'react';
import '../style.css';

const FormDataItem = ({ data, displayEdit, handleDeleteData }) => {
    return (
        <div className={`formContainer data-item-${data.id}`}>
            <div className="FormTitle">
                <div className="Title-Content">
                    <div className="Main-Title">{data.title}</div>
                    <div className="Kind-Title">{data.content}</div>
                </div>
                <div className="Title-Btn">
                    <button onClick={() => displayEdit(data.id)} className="editBtn">
                        <i className="fa-sharp fa-regular fa-edit "></i>
                    </button>
                    <button onClick={() => handleDeleteData(data.id)} className="deleteBtn">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <div className="form-details">
                <p className="description">Stage: {data.state}</p>
                <div>
                    {data.assignee && <p className="assignee">Assignee: {data.assignee.name}</p>}
                </div>
            </div>
        </div>
    );
};

export default FormDataItem;
