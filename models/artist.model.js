const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
});

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  songs: [songSchema],
  description: {
    type: String,
    required: true,
  },
});

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  albums: [albumSchema],
});

const Song = mongoose.model("Song", songSchema);
const Album = mongoose.model("Album", albumSchema);
const Artist = mongoose.model("Artist", artistSchema);

module.exports = {
  Song,
  Album,
  Artist,
};
