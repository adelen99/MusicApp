const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Artist } = require("./models/artist.model.js");

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(corsOptions));

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

// Get songs for all albums of a specific artist
app.get("/api/artists/:id/songs", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the artist by ID
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Collect all songs from all albums of the artist
    let songs = [];
    artist.albums.forEach((album) => {
      album.songs.forEach((song) => {
        songs.push(song);
      });
    });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other routes for CRUD operations on artists

// Get artist by id
app.get("/api/artists/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all artists
app.get("/api/artists", async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create artist
app.post("/api/artists", async (req, res) => {
  try {
    const artists = await Artist.insertMany(req.body);
    res.status(201).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an artist
app.put("/api/artists/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete artist
app.delete("/api/artists/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(200).json({ message: "Artist deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
