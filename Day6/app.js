const express = require('express');
const Users = require('./data');
const app = express();
const fs = require('fs');
app.use(express.json());

// app.get('/api/Users',(req,res)=>{
//     res.send(Users);
// })

app.post('/api/Users', (req,res)=>{
    const {Username,age} = req.body;
    const User ={
        id: Users[Users.length -1].id + 1,
        Username : Username,
        age : age
    }
    Users.push(User);
    fs.writeFileSync('./data.json',JSON.stringify(Users));
    res.status(201).send(`User add with id : ${User.id}`);
    console.log(Users);
})

app.put('/api/Users/:id',(req,res)=>{
    console.log(req.params);
    const id = req.params.id;
    console.log(id);
    const {Username,age} = req.body;
    const index = Users.findIndex((ele)=>ele.id == id);
    if(index === -1){
        res.status(404).send('User not found');
        return;
    }
    if(!Username || !age){
        res.status(400).send('Username and age is required');
        return;
    }
    Users[index].Username = Username;
    Users[index].age = age;
    fs.writeFileSync('./data.json',JSON.stringify(Users));
    res.send(`User with id : ${id} is updated`);
    console.log(Users);
})

app.delete('/api/Users/:id',(req,res)=>{
    const id = req.params.id;
    const index = Users.findIndex((ele)=>ele.id == id);
    if(index === -1){
        res.status(404).send('User not found');
        return;
    }
    deleteUser = Users[index];
    Users.splice(index,1);
    fs.writeFileSync('./data.json',JSON.stringify(Users));
    res.send(`User with id : ${id} is updated ${deleteUser}`);
    
})
app.listen(9000 , ()=>{
    console.log('Server is running at port 9000');
})