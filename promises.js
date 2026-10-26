

// const myPromise = new Promise((resolve,reject)=>{
//   let success = false;
//   if(success) {
//     resolve('task completed')
//   }   else {
//     reject('task not completed')
//   }
// })  
// myPromise 
// .then((data)=>{
//     console.log(data)
// }).catch((error)=>{
//     console.log('pass the error',error)
// }) 
//  Api hit 

const fetch = new Promise((resolve,reject)=>{
setTimeout(()=>{
    resolve({
    name:'node js',
    code:'Backend',
    skills:['python','java','Node']
})
},1000)
}) 
async function getData() {
    try{
const data = await myPromise 
    } catch(error) {

    }
} 
getData()




