// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===')
});

server.get('/', (req, res) => {
    res.send('hello world...');
});
//CRUD - Create, Read, Update, Delete

//GET: Read the User
server.get('/api/users', (req, res) => {
    db.find()
      .then((users) => {
          res.status(200).json(users);
      })
      .catch((err) => {
          res.status(500).json({error: "The users information could not be retrieved"});
      });
});

//GET: Read the ID

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
    .then(user => { 
        if(user) {
            res.json(user)
        }
        else {
            res.status(404).json({message: "The user with the specified ID does NOT exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The users information could not be retrieved."})
    })
});

//POST: Create a User
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if(!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for user"});
    } else {
        userInfo
        .insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })
    }
    
})

//DELETE: Delete a User
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params.id;

    db.remove(id)
    .then(user => {
        if(user) {
            res.json({message: "User has been removed from the database"})
        } else{
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed"})
    })
})

//PUT: Update a User

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body
    if(!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for user"});
    } else {
    db.update(id, updatedUser)
        .then(user => {
            if(user) {
                db.findById(id)
                    .then(upUser => {
                        res.status(200).json(upUser)
                    })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified"})
        })
    }

})
