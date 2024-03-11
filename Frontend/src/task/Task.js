import React, { useState, useEffect } from 'react';
import '../style.css';
import anh1 from './anh1.png';
import anh2 from './anh2.png';
import FormDataItem from './FormDataItem';
import EditForm from './EditForm';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleAssigneeChange = (e) => {
    setSelectedAssignee(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // fetch data from API
  const fetchData = async () => {
    try {
      let url = `http://localhost:3000/tasks?content=${searchTerm}&assignee=${selectedAssignee}`;
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //fetch all assignees from api
  const fetchAssignees = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users/all');
      setAssignees(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAssignees();
  }, [searchTerm, selectedAssignee]);

  const handleAddTask = () => {
    displayEdit(null);
  };

  const displayEdit = (index) => {
    const selected = tasks.find(task => task._id === index);
    setSelectedTask(selected);
    setShowEditForm(!showEditForm);
  };

  const handleDeleteData = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:3000/tasks/${deleteItemId}`)
      .then(res => {
        setShowDeleteConfirmation(false);
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedTask(null);
    fetchData();
  };

  return (
    <div>
      <header className="header">
        <div className="container" style={{ marginLeft: '190px' }}>
          <div className="header-inner">
            <div className="logo">
              <img className="anh1" src={anh1} alt="" />
              <div className="decription flex items-center">
                Let's get shit done!
                <img className="anh2" src={anh2} alt="" />
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div>
                <select
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedAssignee}
                  onChange={handleAssigneeChange}
                >
                  <option value="">All Assignees</option>
                  {assignees.map(assignee => (
                    <option key={assignee._id} value={assignee._id}>{assignee.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder='Search for a task'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div id="add-btn" className={`AddBtn ${showEditForm ? 'opacity-50 pointer-events-none' : ''}`} onClick={handleAddTask}>
                <i className="fa-sharp fa-regular fa-plus"></i>
                <div>New Task</div>
              </div>
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
      {/* Delete Confirmation Form */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this task?</h2>
            <div className="flex justify-around">
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleConfirmDelete}>Yes</button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded" onClick={() => setShowDeleteConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Task;
