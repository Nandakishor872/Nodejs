// Synchronous errors examples 
// Real time scenario: reading a file in synchronous way and handling errors using try-catch block
// const fs = require('fs');  
// try {
//     const config = fs.readFileSync('Nodejs.txt','utf-8');
//     console.log('file reading in Synchronous way');
// } catch(error) {
//     console.log('passing an error object to catch block');
//     console.log(error);
// } 
// console.log('server is running'); 
// Basic Examples for synchronous errors
// try {
//     const result = JSON.parse('{"id":1,"name":"Nani"}');
//     console.log("a Valid data format is passed",result);
// } catch(error) {
//     console.log('Invalid data ')
// } 
//------------------------------- Asynchronous errors examples  --------------------    
// const fs  = require('fs');
// fs.readFile('Nodejs.txt','utf-8',(error,data)=>{ 
//     if(error) {
//         console.log(message.error)
//     } 
//     console.log(data); 
// }) 
// console.log('server is running');


// =======================CRUD OPERATIONS IN NODE JS  ========================
const express = require('express');
const app = express();  
const port = 3000; 
app.use(express.json());
const users = [{id:101,name:'python',price:'25000',coding:'high level'},
            {id:102,name:'java',price:'20000',coding:'high level and static'},
            {id:103,name:'javascript',price:'30000',coding:'high level and dynamic'},
            {id:104,name:'c++',price:'15000',coding:'middle level and static'},
            {id:105,name:'c#',price:'22000',coding:'high level and static'},
];  
app.use((req,res,next)=>{
    if(10>2) {
        next();
        console.log('middleware is executed');
    }
})
// get method 
app.get('/users/:id',(req,res)=> {
    // const user = users.find(u => u.id === parseInt(req.params.id));
    // if(!user) return res.status(404).send('User not found');
    res.send(user);
}) 
// create a new user 
app.post('/create',(req,res)=>{  
    const {name,price,coding} = req.body;
    const newUser = {
        id:users.length+1,
        name,
        price,
        coding
    }
    users.push(newUser); 
    res.status(201).send({
        message:'New user created Successfully',
        data:users
    })
}) 
// put method 
// app.put('/update/:id',(req,res)=>{
//     const id  = parseInt(req.params.id);
//     const {name,price,coding} = req.body;
// const user = users.find(u=>u.id==id); 
// if(!user) {
//     res.status(400).send({
//         message:"user not found "
//     }) 
// }
//     user.name = name,
//     user.price = price,
//     user.coding = coding 
//     res.send(({
//         message:'user updated Successfully',
//         data:user
//     }))
// })

app.put('/update/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const { name, price, coding } = req.body;

    const user = users.find(u => u.id == id);

    if (!user) {
        return res.status(400).send({
            message: "User not found"
        });
    }

    user.name = name;
    user.price = price;
    user.coding = coding;

    return res.send({
        message: "User updated Successfully",
        data: user
    });
});
 // delete method 
 app.delete('/delete/:id',(req,res)=>{
    const id = parseInt(req.params.id);  
    const user = users.filter(u=>u.id !==id); 
    if(!user){
        res.status(400).send({
            message:'user not found',
        })
    } 
    res.send({
        message:'user deleted successfully',
        data:user
    })
 })
app.listen(port,()=>{
    console.log('server is running at port 3000');
})