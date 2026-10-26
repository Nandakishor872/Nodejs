
// ---------------------- get method is used to retrieve data from a server. 
// async function getUsers() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
// if(!response.ok) {
//     throw new Error(`response status is ${response.status}`);
// }
//     const users = await response.json();
//     // console.log(users);
//     const result = users.map(user=> ({name: user.name,username:user.username,address:user.address}));
//     console.log(result);
// } catch(error) {
//     console.log('pass the error',error.message)
// }
// }
// getUsers();

// ------------------------- post method is used to send data to a server to create/update a resource.
// async function getuser() { 
//     const newUser = [{
//         name:'Nanda',
//         age:22,
//         salary:2000000
//     }];
//     try {
//        const response = await fetch( 'https://jsonplaceholder.typicode.com/users', {
//        method : 'POST',
//        headers: {
//            "content-type":"application/json"
//        },
//        body:JSON.stringify (newUser)
//     }
//        ) ;
//        if(!response.ok) {
//            throw new Error(`pass the error ${response.status}`)
//        }
//        const user = await response.json();
//        console.log(user)
//     } catch(error) {
//         console.log('pass the error',error.message)
//     }
// }
// getuser();


// -------------------put---------------------

// async function getUser() {
//     const updatedUser = [{
//         id:1,
//         name:'Nanda',
//         age:22,
//         salary:25000
//     }];
//     try {
//         const response = await fetch(' https://jsonplaceholder.typicode.com/users/1',{
//             method :'PUT',
//         headers :{
//             "content-type":'application/json'
//         },
//         body : JSON.stringify(updatedUser)

//         });
//         if(!response.ok) {
//             throw new Error(`passing an error ${response.status}`)
//         } 
//         const result = await response.json();
//         console.log(result)
//     } catch(error) {
//         console.log('passing an error',error.message)
//     }
// } 
// getUser();

// ----------------------post method is used to send data to a server to create/update a resource.
// async function getUsers() {
//     const newUser = [{
//         name:'Nani',
//         age:22,
//         location:'Hyde',
//         skill:'em ledu'
//     }];
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
//             method:'POST',
//             headers:{
//                 "content-type":"application/json"
//             },
//             body:JSON.stringify(newUser)
//         })
//         if(!response.ok) {
//             throw new Error(`passing response error ${response.status}`)
//         } 
//         const result = await response.json()
//         console.log(result)
//     }catch(error) {
//         console.log('passing error',error.message)
//     }
// }
// getUsers();


// create---->post
// read ---->get
// update---->put
// delete---->delete


// -------------get method is used to retrieve data from a server.
async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    if(!response.ok) {
        throw new Error(`passing an error ${error.status}`)
    } 
    const result=await response.json()
    const finalResult = result.map(user=>({id:user.id,title:user.title,completed:user.completed}))
    console.log(finalResult)
    // console.log(result)
    } catch(error) {
        console.log('pass an error ',error.message)
    }
}
getData();


// -----------------------put method is used to send data to a server to create/update a resource.
async function getPut() {
    const updateUser = [{
        id:1,
        title:'svs',
        completed:true
    }];
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1',{ 
            method:'PUT',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(updateUser)
        });
        if(!response.ok) {
            throw new Error(`passing an error ${response.status}`)
        }
        const result = await response.json();
        console.log(result);

    } catch(error) {
        console.log('pass an error',error.message)
    }
}
getPut();

// -----------------------patch method is used to send data to a server to create/update a resource.----------
async function getpatch() {
    const update=[{
        id:1,
        title:'javaScript programming'
    }];
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1',{
            method:'PATCH',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(update)
        });
        if(!response.ok) {
            throw new Error(`passing an error ${response.error}`)
        } 
        const result = await response.json() 
        console.log(result)
    }catch(error) {
        console.log(`passing an error ${error.message}`)
    }
}
getpatch();


// -----------------------delete method is used to send data to a server to create/update a resource.----------
async function getUsers() {
    const chage = [{
        id:1
    }];
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method:'DELETE'
        });
        if(!response.ok) {
            throw new Error(`passing an error ${response.status}`)
        } 
        const result = await response.json();
        console.log(result)
    }catch(error) {
        console.log(`passing an error ${error.message}`)
    }
}
getUsers();