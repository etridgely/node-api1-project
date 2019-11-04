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
server.post('/hubs', (req, res) => {
    const hubInfo = req.body;
    console.log('body:', hubInfo);

    db.add(hubInfo)
      .then((hub) => {
        res.status(201).json({ success: true, hub });
      })
      .catch((err) => {
        res.status(500).json( { success: false, err });    
      })
});

//delete a hub
server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleteHub => {
            if (deleteHub) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: `I could not find id=${id}`});
            }
        });
});

server.put('/hubs/:id', (req, res) =>{
    const {id} = req.params;
    const hubInfo = req.body;
    //check here -- it's possible something was changed
    db.update(id, hubInfo)
      .then(hub => {
          if (hub) {
              res.status(200).json({success: true, hub });
          } else {
              res.status(404).json({success: false, message: `id ${id} does not exist` });
          }
      })
      .catch(err => {
          res.status(500).json({ success: false, err});
      });
});

server.get('/hubs/:id', (req, res) => {
    //do your thing here
});
//console.log('hello world');