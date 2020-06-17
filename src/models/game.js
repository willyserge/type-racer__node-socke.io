import mongoose from 'mongoose';
import playerSchema from './player';

const gameSchema = new mongoose.Schema({
  words: [{
    type: String,
  }],
  isOpen: {
    type: Boolean, default: true,
  },
  isOver: {
    type: Boolean, default: true,
  },
  players: [playerSchema],
  startTime: { type: Number },
});

const Game = mongoose.model('Game', gameSchema);
export default Game;
