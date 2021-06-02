const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
  msg: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);