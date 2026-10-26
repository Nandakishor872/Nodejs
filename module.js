// const os = require('os'); 
// // cpu status 
// console.log(os.cpus().length)
// // os paltform 
// console.log(os.platform()) 
// // os type 
// console.log(os.type()) 
// // shows free space in the memory and total memory
// console.log(os.freemem()) 
// console.log(os.totalmem())
// // shows the architecture of the os
// console.log(os.arch()) 
// // shows the uptime of the os in seconds
// console.log(os.uptime()) 
// // shows the hostname of the os
// console.log(os.hostname())
// // shows the home directory of the os
// console.log(os.homedir())
// // shows the network interfaces of the os
// console.log(os.networkInterfaces())

// The path module in Node.js is a built-in module used for working with file and directory paths.
// const path = require('path');
// // shows the file name of the current module
// console.log(path.basename(__filename));
// // shows the directory name of the current module
// console.log(path.dirname(__filename));
// // shows the extension of the current module
// console.log(path.extname(__filename));
// // shows the parsed path of the current module
// console.log(path.parse(__filename));
// // shows the joined path of the current directory, 'test' folder and 'hello.txt' file
// console.log(path.join(__dirname, 'test', 'hello.txt')); 



//--------------------------File Module ----------------------------------------------
// creating a file  
const fs = require('fs');
// fs.writeFile('demo.txt','utf-8',(error,data)=>{
//     if(error) {
//         console.log('pass the error ',error)
//     } else { 
//         console.log('file ctreates ',data)
//     }
// })  
// read the file data 
// fs.readFile('demo.txt','utf-8',(error,data)=>{
//     if(error) {
//         console.log('pass the error ',error)
//     }  else {
//         console.log('file reads ',data)
//     }
// }) 
// Write Data into an Existing File 
// fs.writeFile('demo.txt','hello world',(error,data)=> {
//     if(error) {
//         console.log('pass the error ',error)            
//     } else {
//         console.log('file writes ',data)
// } 
// }) 
 
// Add Data Without Removing Old Data 
// fs.appendFile('demo.txt','\nleraning node js is adv',(error,data)=>{
//     if(error) {
//         console.log('pass the error',error)
//     } else {
//         console.log('added the data',data)
//     }
// })
 
//Rename a File 
// fs.rename('demo.txt','node js ',(error,data)=>{
//     if (error) {
//         console.log('pass the error',error)
//     } else {
// console.log('file renamed',data)
//     }
// }) 
 
// fs.unlink('node 123',(error,data)=>{
//     if (error) {
//         console.log('pass the error',error)     
//     } else {
//         console.log('file deleted',data)
//     }
// })

// The http module in Node.js is a built-in module that allows you to create web servers and handle HTTP 
// requests and responses.

// Using the http module, you can:
// Create a web server
// Receive requests from clients (browser, mobile apps, etc.)
// Send responses back to clients
// Build simple APIs
// You do not need to install it because it comes with Node.js. 


// creating the basic server using http module
const http = require('http');
// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.write('hello world');
//     res.end();
// }) 
// server.listen(3000,()=>{
//     console.log('porty is running at 3000 in local server')
// })  


//  using routing methods
// const server = http.createServer((req,res)=>{
// if (req.url=='/') {
//    res.write('login page ')
//    res.end()
// } else if (req.url =='/about') {
//     res.write('landing page ')
//     res.end()
// } else {
//     res.write('page not found')
//     res.end()
// }
// }) 
// server.listen(3000,()=>{
//     console.log('server is running at port 30000 in local server')
// })