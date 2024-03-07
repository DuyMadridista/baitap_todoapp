const mongoose = require('mongoose');
const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    ,
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
    ,
    state: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    }
});

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }]
});
const User = mongoose.model('User', user);
const task = mongoose.model('task', Task);
module.exports = { task, User };
