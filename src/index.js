/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import socketio from 'socket.io';
import mongoose from 'mongoose';

import Game from './models/game';
import getData from './quotableAPI';

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
    console.log('successfully connected to database');
  });

io.on('connect', (socket) => {
  socket.on('join-game', async ({ gameID: _id, nickName }) => {
    try {
      let game = await Game.findById(_id);
      if (game.isOpen) {
        const gameID = game._id.toString();
        socket.join(gameID);
        const player = {
          socketID: socket.id,
          nickName,
        };
        game.players.push(player);
        game = await game.save();
        io.to(gameID).emit('updateGame', game);
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('create-game', async (name) => {
    try {
      const quotableData = await getData();
      let game = new Game();
      game.words = quotableData;
      const player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName: name,
      };
      game.players.push(player);
      game = await game.save();
      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit('updateGame', game);
    } catch (error) {
      console.log(error);
    }
  });
});
