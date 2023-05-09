const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const placesRoutes = require('./routes/post-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/', placesRoutes); 



app.use((req, res, next)=>{
    const error= new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});


const socket = socketIo(server, {
  cors: {
    origin: '*',
  },
})

socket.on('connection', (socket) => {
  console.log('a user connected ' + socket.id, new Date()) // socket.id is unique for each connection
})

app.set('socket', socket)

mongoose
.connect('mongodb://localhost:27017/retro-activity')
.then(()=>{
  app.listen(5000);
})
.catch((err)=>{
  console.log(err);
});



