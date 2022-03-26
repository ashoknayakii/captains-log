const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const Notes = require('./db/db.json');

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());



// HTML ROUTES TO CREATE
// GET /notes should return the notes.html file

app.get('/notes', (req, res) => {
    res.send('/notes.html')
  })

// GET * should return the index.html file




// API ROUTES TO CREATE
// GET /api/notes should read the db.json file and return all saved notes as JSON.




// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).









app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });