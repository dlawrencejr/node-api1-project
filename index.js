const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

let users = [];

const PORT = 5000;

server.listen(PORT,()=>{
    console.log('listening on port',PORT)
});

// server.get('/hello',(req,res)=>{
//     res.json({name:'Dereck'});
// })

//C - (POST)
//R- (GET)
//U - (PUT)
//D - (DELETE)
server.get('/api/users',(req,res)=>{
    if(!users){
        res.status(500).json({errorMessage:'The users information could not be retrieved.'})
    }
    else{
        res.status(200).json({users})
    }
})
server.get('/api/users/:id',(req,res)=>{
    const user = users.find(user => user.id == req.params.id)
    if(user){
        res.status(200).json({user})
    } 
    else{
        res.status(404).json({message: 'The user with the specified ID does not exist.'})
    }
})

//create
server.post('/api/users',(req,res)=>{
   const user = req.body;
 
   if(!user.name || !user.bio){
       res.status(400).json({errorMessage:'Please provide a name and bio for the user.'})
   }
   else{
       user.id = shortid.generate();
       users.push(user);
       res.status(201).json(user);
   }
});

// //read
// server.get('/api/users',(req,res)=>{
//     if(!users){
//         res.status(500).json({errorMessage:'The users information could not be retrieved.'})
//     }
//     else{
//         res.status(200).json({users})
//     }
// })
// server.get('/api/users/:id',(req,res)=>{
//     const user = users.find(user => user.id === req.params.id)
//     if(user){
//         res.status(200).json({user})
//     } 
//     else{
//         res.status(404).json({message: 'The user with the specified ID does not exist.'})
//     }
// })

//update
server.patch('/api/users/:id',(req,res)=>{
    let user = users.find(user => user.id === req.params.id)
    const changes = req.body
    if(!req.body.name || !req.body.bio){
        res.status(400).json({errorMessage: 'Please provide a name and bio for the user.'})
    }
    else if(user){
        Object.assign(user,changes)
        res.status(200).json({user})
    }
    else{
        res.status(400).json({message:'The user with the specified ID does not exist.'})
    }
})

//delete 
server.delete('/api/users/:id',(req,res)=>{
    console.log(req.params.id)
    const user = users.find( user => user.id === req.params.id)

    if(user){
        users = users.filter(u => u.id !=user.id );
        res.status(200).json(users);
    }
    else{
        res.status(404).json({message:'The user with the specified ID does not exist.'});
    }
});

// server.patch('/api/hubs/:id',(req,res)=>{
//     const {id} = req.params;
//     const changes = req.body;

//     let found = hubs.find(hub => hub.id === id);
//     if (found){
//         Object.assign(found,changes);
//         res.status(200).json(found);
//     }
//     else{
//         res.status(404).json({message:'id not found'});

//     }
// })

// server.put('/api/hubs/:id',(req,res)=>{
//     const {id} = req.params;
//     const changes = req.body;
//     changes.id = id;

//     let index = hubs.findIndex(hub => hub.id === id);

//     if(index !== -1){
//         hubs[index] = changes;
//         res.status(200).json(hubs[index]);
//     }
//     else{
//         res.status(404).json({message:'id not found'});

//     }
// })
