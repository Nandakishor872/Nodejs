// Event loop concept 
// console.log('start')
// setTimeout(()=>{
//     console.log('setting the time')
// },1000) 
// console.log('end')



// // real time scenario 
// console.log('open the food delivery app') 
// setTimeout(()=>{
//     console.log('your order is wait until time reached ')
// },1000)
// fetch("https://jsonplaceholder.typicode.com/users")
// .then((response)=>response.json())
// .then((data)=>{
//     console.log('fetching the ordered details')
//     // console.log(data)
//     // finding the data using particular id based 
// const result = data.find((item)=>item.id===3) 
// console.log('item numbere 3 from order')
// console.log(result)

// }) .catch((error)=> {
//     console.log('pass the error',error.message)
// })
// console.log('data is displaying ')



// login page 
// console.log('login page')  
// setTimeout(()=>{
//     console.log('show pop up')
// },0) 
// Promise.resolve().then(()=>{
//     console.log('latest msg')
// })
// console.log('render login page')  

// ============================micro and Macro Task Queue===============================
// console.log('start')
// Promise.resolve().then(()=>{
//     console.log('micro task queue')
// })
// console.log('end')


// console.log('start') 
// setTimeout(()=>{
//     console.log('macro Task queue')
// })
// console.log('end')

// console.log('start') 
// setTimeout(()=>{
//     console.log('macro task queue') 
// },1000)
// Promise.resolve().then(()=>{
//     console.log('micro Task Queue')
// })
// console.log('end') 

// Real time scenario based application imagine shopping 
console.log('open the shopping app') 
Promise.resolve().then(()=>{
    console.log('added all the products to cart ')
}) 
setTimeout(()=>{
    console.log('show the bill or show the promotion Banner ')
})
console.log('rendering the page ') 


// ------------------------------------promises----------------------------------------
// const myPromise = new Promise((resolve,rejected)=>{
//     let success = false;
//     if(success) {
//         resolve('operation successfully completed')
//     } else {
//         rejected('operation failed ')
//     } 
// }) 
// myPromise 
// .then((data)=>{
// console.log(data)
// }).catch((error)=> {
//     console.log('pass the error',error.message)
// })

//-------------------- using async and await function ------------------------------------ 

// const fetchData = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve({
//             name:'Nanda',
//             age:20,
//             skill:['js','node','python']
//         })
//     },1000)
// }) 
// async function getData() {
//     try {
//   const data = await fetchData
//     // console.log(data) 
//     const result = data.skill.map((items)=>items)
//     console.log(result)
// } catch(error) {
//         console.log('pass the error ',error.message)
//     }
// } 
// getData()
  

// ----------------------------------Using Try Catch Block(Handling Errors) ------------------------------- 
// function getData(success) {
//     return new Promise((resolve,reject)=>{
//       setTimeout(()=>{
//           if(success) {
//             resolve('operation successfully')
//         } else {
//             reject('operation failed')
//         }
//       },1000)
//     }) 
// } 
// async function fetchData() {
//     try {
//         const data = await getData(true) 
//     console.log(data)
//     } catch(error) {
//         console.log('pass the error',error.message)
//     }
// } 
// fetchData()      

// ---------------------------copy function Java Script -----------------------------------------------
// shallow copy : Shallow copy means copying only the top-level properties, while nested objects still point to the same memory location.
// const users = [{
//     name:'Nanda',
//     age:25
// }] 
// const shallowCopy = [...users] 
// console.log(shallowCopy) 
// const users = [{
//     name:'Nanda',
//     address:{
//         city:'Hyderabad'
//     }
// }] 
// const shallowCopy = [...users] 
// shallowCopy[0].address.city = 'Bangalore' 
// console.log(shallowCopy[0].address.city) 
// console.log(users[0].address.city)
// // deep copy : const deepCopy = structuredClone(originalObj) 
// const user = [{
//     name:'Nanda',
//     address: {
//         city:'Hyderabad'
//     } 
// }] 
// const deepCopy = structuredClone(user) 
// deepCopy[0].address.city = 'Bangalore' 
// console.log(user[0].address.city) 
// console.log(deepCopy[0].address.city)


//-----------------HoF(Higher order Functions)--------------------------------
// syntax: 
// function higherOrderFunction(callback) {
//     callback();
// } 

// function greet(name) {
// console.log(' name '+name)
// }
// function user(callback) {
//     callback('Nanda ')
// } 
// user(greet)

// -------------   execution flow of event loop execution --------------------
// const fs = require('fs');
// console.log('1. Start'); 
// setTimeout(() => console.log('2. Timeout 1'));
// setImmediate(() => console.log('3. Immediate 1'));

// fs.readFile(__filename, () => {
//     console.log('4. File Read IO');
//     setTimeout(() => console.log('5. Timeout 2'));
//     setImmediate(() => console.log('6. Immediate 2'));
//     process.nextTick(() => console.log('7. NextTick inside IO'));
// });

// process.nextTick(() => console.log('8. NextTick 1'));
// Promise.resolve().then(() => console.log('9. Promise 1')); 
// console.log('10. End');
