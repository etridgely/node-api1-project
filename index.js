// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===')
});

server.get('/', (req, res) => {
    res.send('hello world...');
});
//CRUD - Create, Read, Update, Delete
//Read method
server.get('/hubs', (req, res) => {
    db.find()
      .then((hubs) => {
          res.status(200).json(hubs);
      })
      .catch((err) => {
          res.status(500).json({
            message: err,
            success: false;
          });
      });
});

//create a hub
server.post('/hubs')

