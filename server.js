const noteLogs = require("./db/db.json");

const fs = require("fs");
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
_dirname = fs.realpathSync('.');
_dirname = path.resolve();

app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// HTML ROUTES TO CREATE

// API ROUTES TO CREATE
// GET /api/notes should read the db.json file and return all saved notes as JSON.

app.get("/api/notes", (req, res) => {
  res.json(noteLogs.slice(1));
});


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


function addNote(body, notesArray) {
  const note = body;
  if (!Array.isArray(notesArray))
  notesArray = [];

  if (notesArray.length === 0)
  notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(note);
  fs.writeFileSync(
      path.join(_dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return note;
}


// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
  const note = addNote(req.body, noteLogs);
  res.json(note);
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});

