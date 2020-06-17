import express from 'express';
import dotenv from 'dotenv';
import socketio from 'socket.io';
import mongoose from 'mongoose';

dotenv.config();

dotenv.config();
const app = express();

const port = process.env.PORT || 3001;
const server = app.listen(port);
const io = socketio(server);

mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }, () => {
    console.log('successfull connected to database');
  });
