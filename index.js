'use strict';
const express = require('express');
const cors = require('cors');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const userRoutes = require('./routes/user-routes');
const educatorRoutes = require('./routes/educator-routes');
const storyRoutes = require('./routes/story-routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', studentRoutes.routes);
app.use('/api', userRoutes.routes);
app.use('/api', educatorRoutes.routes);
app.use('/api', storyRoutes.routes);



app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port))
