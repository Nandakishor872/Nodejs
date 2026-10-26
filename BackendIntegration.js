const express = require('express'); 
// import express from 'express';
const users = require('./users.js');

const app = express(); 
const port = 4000;

app.get('/',(req,res)=>{
    res.send('server is ready')
});

app.get('/api/users',(req,res)=>{
    res.json(users);
});

app.listen(port,()=>{
    console.log(`server is running at,http://localhost:${port}`)
})