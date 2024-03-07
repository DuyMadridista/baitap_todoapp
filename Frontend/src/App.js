import React, { useState } from 'react';
import './style.css';
import anh1 from './anh1.png';
import anh2 from './anh2.png';
import FormDataItem from './FormDataItem';
import AddForm from './AddForm';
import EditForm from './EditForm';
const App = () => {
  const [data, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Sample data array containing tasks with different statuses
  const tasks = [
    { id: 1, category: 'Work', title: 'Complete project proposal', description: 'Finish writing the project proposal by EOD', date: '2024-03-08', status: 'Todo' },
    { id: 2, category: 'Personal', title: 'Go for a run', description: 'Run for 30 minutes in the morning', date: '2024-03-06', status: 'Doing' },
    { id: 3, category: 'Home', title: 'Grocery shopping', description: 'Buy groceries for the week', date: '2024-03-07', status: 'Done' },
    // add thêm một vài task nữa để hiển thị
    { id: 4, category: 'Work', title: 'Complete project proposal', description: 'Finish writing the project proposal by EOD', date: '2024-03-08', status: 'Todo' },
    { id: 5, category: 'Personal', title: 'Go for a run', description: 'Run for 30 minutes in the morning', date: '2024-03-06', status: 'Doing' },
    { id: 6, category: 'Home', title: 'Grocery shopping', description: 'Buy groceries for the week', date: '2024-03-07', status: 'Done' },
    { id: 7, category: 'Work', title: 'Complete project proposal', description: 'Finish writing the project proposal by EOD', date: '2024-03-08', status: 'Todo' },
    { id: 8, category: 'Personal', title: 'Go for a run', description: 'Run for 30 minutes in the morning', date: '2024-03-06', status: 'Doing' },
    { id: 9, category: 'Home', title: 'Grocery shopping', description: 'Buy groceries for the week', date: '2024-03-07', status: 'Done' },
  ];

  const handleAddTask = () => {
    console.log("1");
    setShowAddForm(true);
    console.log(showAddForm);
  };

  const handleEditTask = () => {
    // Implement task editing logic here
  };
  const displayEdit = (index) => {
    console.log('displayEdit' + index);
  };
  const handleDeleteData = () => {
    console.log('handleDeleteData');
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <img className="anh1" src={anh1} alt="" />
              <div className="decription flex items-center">
                Let's get shit done!
                <img className="anh2" src={anh2} alt="" />
              </div>
            </div>
            <div id="add-btn" className="AddBtn" onClick={handleAddTask}>
              <i className="fa-sharp fa-regular fa-plus"></i>
              <div>New Task</div>
            </div>
          </div>
        </div>
      </header>
      <div className="mainBody">
        <div className="container">
          <div className="mainBody-inner">
            {/* Todo List */}
            <div className="List-form">
              <div className="status Todo">To Do
                <div className="list-count countTodo">{tasks.filter(task => task.status === 'Todo').length}</div>
              </div>
              <div className="TodoList">
                {tasks.filter(t => t.status === 'Todo').map((data) => (
                  <FormDataItem
                    key={data.id}
                    data={data}
                    displayEdit={displayEdit}
                    handleDeleteData={handleDeleteData}
                  />
                ))}
              </div>
            </div>
            {/* Doing List */}
            <div className="List-form">
              <div className="status Doing">Doing
                <div className="list-count countDoing">{tasks.filter(task => task.status === 'Doing').length}</div>
              </div>
              <div className="DoingList">
                {tasks.filter(t => t.status === 'Doing').map((data) => (
                  <FormDataItem
                    key={data.id}
                    data={data}
                    displayEdit={displayEdit}
                    handleDeleteData={handleDeleteData}
                  />
                ))}
              </div>
            </div>
            {/* Done List */}
            <div className="List-form">
              <div className="status Done">Done
                <div className="list-count countDone">{tasks.filter(task => task.status === 'Done').length}</div>
              </div>
              <div className="DoneList">
                {tasks.filter(t => t.status === 'Done').map((data) => (
                  <FormDataItem
                    key={data.id}
                    data={data}
                    displayEdit={displayEdit}
                    handleDeleteData={handleDeleteData}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Adding Task Form */}
      <div id="adding-form" className="">
        {!showAddForm && <AddForm />}
      </div>
      {/* Editing Task Form */}
      <div id="editing-form" className="">
        {showEditForm && <EditForm />}
      </div>
    </div>
  );
}

export default App;
