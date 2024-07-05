const express = require("express");
const mongoose = require("mongoose");
const { Artist } = require("./models/artist.model.js");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://lupuadelin4:jrQPrEd1Ck5orU5Q@backenddb.y81vyyg.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello from Node API.");
});

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

// Create artists
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
