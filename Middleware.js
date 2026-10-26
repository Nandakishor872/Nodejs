const express  =require('express');
const app = express();
const port = 3000; 
app.use(express.json());
let users = [{id:1,name:'Nanda',age:22},{id:2,name:'Nani chinni,age:25'}];
app.use((req,res,next)=>{
    if(10>1){
        next(); 
        console.log("middleware is running");
    }
}) 
// get method 
app.get('/users',(req,res)=>{
    res.send(users);
});
app.listen(port,()=>{
    console.log("port is running at 3000")
}) 

//--------- post method--create new user-----------
app.post('/read',(req,res)=>{
    const {id,name,age} = req.body; 
    const Newuser = {
        id: users.length+1,
        name,
        age
    }
    users.push(Newuser);
    res.status(201).send({
        message:"user created successfully",
        data: users
    })
}); 
//---------- post method using Map function ------ 
app.post('/create/map',(req,res)=>{
    const updatedUsers = users.map((user)=>{ 
        return {
             id: user.id,
             name: user.name.toUpperCase(),
             age: user.age
        }
    }) 
    res.status(201).send({
        message:"user created successfully",
        data: updatedUsers
        })
}) 
//--------- put method update all the users using map function --------
app.put('/update',(req,res)=>{
    const {id} = req.body;
    const updateUsers = users.map((user)=>{
        return{
            id:user.id,
            name:user.name,
            age:user.age ,
            status:'Active'
        }
    })
    res.status(200).send({
        message:'user updated successfully',
        data:updateUsers
    })
}) 
// ----------update the user through using id  and find method ----------------  
app.put('/update/:id',(req,res)=> {  
    const id = parseInt(req.params.id);
    const {name,age} = req.body; 
    const user = users.find((u)=>u.id==id);
    if(!user) {
    return res.status(400).send ({message:'user not found'})
    } 
    user.name = name;
    user.age=age;
    res.status(200).send({'message':'user updated successfully',
    data:users})
})
// ----------------- delete method ------------------------------  
app.delete('/delete/:id',(req,res)=>{
    const {id} = parseInt(req.params.id); 
    const user = users.filter((u)=>u.id!==id);
    res.send({
        message:'User deleted Successfully',
        data:user
    })
}) 
