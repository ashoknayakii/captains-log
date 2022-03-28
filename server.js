const noteLogs = require("../db/db.json");

const fs = require("fs");
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// HTML ROUTES TO CREATE

app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
})

// GET /notes should return the notes.html file

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// GET * should return the index.html file

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function addNote(body, noteArray) {
    const newNote = body;
    if (!Array.isArray(noteArray))
    noteArray = [];

    if (noteArray.length === 0)
    noteArray[0]++;

    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(_dirname, '../db/db.json'),
        JSON.stringify(noteArray, null, 2)
    );
    return newNote;
}

// API ROUTES TO CREATE
// GET /api/notes should read the db.json file and return all saved notes as JSON.

app.get("/api/notes", (req, res) => {
  res.json(noteLogs.slice(1));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
    const newNote = addNote(req.body, noteLogs);
    res.json(newNote);
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});