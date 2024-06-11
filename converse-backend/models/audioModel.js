const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const audioStream = new Schema({
  audioName: String,
  audioDate: Date,
  AudioLength: String,
  // etc etc
  // the way you're accepting/ sending the audio file
});

module.exports = mongoose.model("audioStream", audioStream);
