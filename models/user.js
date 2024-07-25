const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  height: Number,
  weight: Number,
  bmi: Number,
  date: Date
});

module.exports = mongoose.model('User', userSchema);

