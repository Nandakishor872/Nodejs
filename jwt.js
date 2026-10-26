// // we are building the sign up functionality

// const express = require('express');
// const cors = require('cors');
// const bodyparser = require('body-parser');
// const bcrypt = require('bcrypt');
// const { Pool } = require('pg');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors({ origin: '*' }));
// app.use(bodyparser.urlencoded({ extended: true }));

// const db = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: 'Nanda@872',
//     database: 'postgres',
//     port: 5432,
//     max: 10,
// });

// async function insertUser(username, hashedPassword) {
//     const { rows: [{ next_id: nextId }] } = await db.query(
//         'SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM users'
//     );

//     const query = `
//         INSERT INTO users (id, username, passwordhash, userregisteredat)
//         VALUES ($1, $2, $3, $4)
//         RETURNING id, username
//     `;

//     const values = [nextId, username, hashedPassword, new Date()];

//     const result = await db.query(query, values);
//     return result.rows[0];
// }

// app.get('/', (req, res) => {
//     res.send('Hello world');
// });

// app.post('/create', async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).send({ error: 'Username and password are required' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await insertUser(username, hashedPassword);

//         res.status(201).send({
//             message: 'User created successfully',
//             user,
//         });
//     } catch (error) {
//         console.error('Signup Error:', error.message);
//         res.status(500).send({ error: 'Failed to create user' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running successfully on port ${port}`);
// });





// ------------------------------------web socket---------------------------------------------
// server.js
// const { WebSocketServer } = require('ws');

// // Start a WebSocket server on port 8080
// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', (ws) => {
//   console.log('A new client connected!');

//   // Listen for messages from React
//   ws.on('message', (data) => {
//     console.log(`Received: ${data}`);

//     // Broadcast the message back to EVERY connected client
//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) { // 1 means OPEN
//         client.send(data.toString());
//       }
//     });
//   });

//   ws.on('close', () => console.log('Client disconnected.'));
// });

// console.log('WebSocket server is running on ws://localhost:8080');




// ----------------------------------------   Interview model paper practise  -----------------------------
// const express = require('express');
// const app = express();
// const port = 3000; 

// app.get('/slow-api',async(req,res)=>{
//   try{
//     const result = await new Promise((resolve,reject)=>{
//       setTimeout(()=>{
// resolve({message:'This is slow Api response'})
//       },20000)
//     })
//     res.send(result)
//     // res.json({message:'This is slow Api response'})
//   } catch(error){
//     // res.send({error:'pass the error '})
//     res.status(500).send({error:'pass the error '})
//   }
// })

// app.listen(port,()=>{
//   console.log(`server is running at ${port}`)
// })


// -----------setTimeout setImmediate and process.nextTick--------------------
// const fs  = require('fs');
// function userDetails(user) {
//   if(!user){
// process.nextTick(()=>{
//   console.log('user details are not found')
// })
//   }
//   setTimeout(()=>{
// console.log('user found and get the details form the db')
//   },1000)
// }
// userDetails(null)
// fs.readFile('index.html','utf-8',(err,data)=>{
//   if(err){
//     console.log('inside the file error is etting ')
//   } 
//   setImmediate(()=>{
//     console.log('inside the file read')
//   })
// })


// -------------------pagination ---------------
// const express = require("express");
// const app = express();
// const port = 3000;

// const users = [
//     { id: 1, name: "Nanda" },
//     { id: 2, name: "Rahul" },
//     { id: 3, name: "Kiran" },
//     { id: 4, name: "Ravi" },
//     { id: 5, name: "Arjun" },
//     { id: 6, name: "Suresh" },
//     { id: 7, name: "Mahesh" },
//     { id: 8, name: "Ramesh" },
//     { id: 9, name: "Kumar" },
//     { id: 10, name: "Vijay" }
// ];
// app.get("/users", (req, res) => {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 3;
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + limit;

//     const PaginationUser = users.slice(startIndex, endIndex);
//     res.json({
//         page,
//         limit,
//         users:users.length,
//         data: PaginationUser
//     })
// })

// app.listen(port, () => {
//     console.log('port is running at 3000')
// })

// ------------------filtering the records based on the query params--------------------
const express = require("express");
const app = express();
const port = 3000;

const users = [
    { id: 1, name: "Nanda", age: 25 },
    { id: 2, name: "Rahul", age: 30 },
    { id: 3, name: "Kiran", age: 35 },
    { id: 4, name: "Ravi", age: 40 },
    { id: 5, name: "Arjun", age: 45 }
];

app.get("/users", (req, res) => {
    const { age } = req.query;
    let filteredUsers = users;

    if (age) {
        filteredUsers = users.filter(user => user.age === Number(age));
    }

    res.json({
        users: filteredUsers
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})




