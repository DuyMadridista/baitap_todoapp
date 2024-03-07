const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoute = require('./router/task.router');
const userRoute = require('./router/user.router');
const authRoute = require('./router/auth.router');
require('dotenv').config();
const app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log("connected"); }).catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoute);
app.use('/tasks', taskRoute);
app.use('/users', userRoute);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
