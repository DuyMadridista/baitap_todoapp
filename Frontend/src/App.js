import React, { useState, useEffect } from 'react';
import './style.css';
import anh1 from './anh1.png';
import anh2 from './anh2.png';
import FormDataItem from './FormDataItem';
import AddForm from './AddForm';
import EditForm from './EditForm';
import axios from 'axios';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [assignees, setAssignees] = useState([]);
  //const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //fetch all assignees form api
  const fetchAssignees = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users');
      setAssignees(res.data);
      console.log(assignees);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchAssignees();
  }, []);

  // Sample data array containing tasks with different statuses
  // const tasks = [
  //   { id: 1, title: 'Work', content: 'Complete project proposal', assignee: 'EOD', state: 'Todo' },
  //   { id: 2, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Doing' },
  //   { id: 3, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Done' },
  //   { id: 4, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Todo' },
  //   { id: 5, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Todo' },
  //   { id: 6, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Doing' },
  //   { id: 7, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Done' },
  //   { id: 8, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Todo' },
  //   { id: 9, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Todo' },
  //   { id: 10, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Doing' },
  //   { id: 11, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Done' },
  //   { id: 12, title: 'Work', content: 'Complete project proposal', assignee: 'Duy', state: 'Todo' },
  // ];


  const handleAddTask = () => {
    //setShowAddForm(!showAddForm);
    displayEdit(null);
  };

  const displayEdit = (index) => {

    console.log('displayEdit' + index);
    const selected = tasks.find(task => task._id === index);
    setSelectedTask(selected); // Set state mới với dữ liệu của mục được chọn
    setShowEditForm(!showEditForm);
  };
  const handleDeleteData = (i) => {
    // console.log('handleDeleteData' + i);
    axios.delete(`http://localhost:3000/tasks/${i}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        fetchData();
      });
  };
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedTask(null);
    fetchData();
  };
  // const handleCloseAddForm = () => {
  //   setShowAddForm(false);
  //   fetchData();
  // };

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
                <div className="list-count countTodo">{tasks.filter(task => task.state === 'pending').length}</div>
              </div>
              <div className="TodoList">
                {tasks.filter(t => t.state === 'pending').map((data) => (
                  <FormDataItem
                    key={data.id}
                    data={data}
                    displayEdit={() => displayEdit(data._id)}
                    handleDeleteData={() => handleDeleteData(data._id)}
                  />
                ))}
              </div>
            </div>
            {/* Doing List */}
            <div className="List-form">
              <div className="status Doing">Doing
                <div className="list-count countDoing">{tasks.filter(task => task.state === 'in_progress').length}</div>
              </div>
              <div className="DoingList">
                {tasks.filter(t => t.state === 'in_progress').map((data) => (
                  <FormDataItem
                    key={data.id}
                    data={data}
                    displayEdit={() => displayEdit(data._id)}
                    handleDeleteData={() => handleDeleteData(data._id)}
                  />
                ))}
              </div>
            </div>
            {/* Done List */}
            <div className="List-form">
              <div className="status Done">Done
                <div className="list-count countDone">{tasks.filter(task => task.state === 'completed').length}</div>
              </div>
              <div className="DoneList">
                {tasks.filter(t => t.state === 'completed').map((data) => (
                  <FormDataItem
                    key={data.id}
                    data={data}
                    displayEdit={() => displayEdit(data._id)}
                    handleDeleteData={() => handleDeleteData(data._id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Editing Task Form */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <EditForm handleCloseEditForm={handleCloseEditForm} selectedTask={selectedTask} allAssingees={assignees} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
