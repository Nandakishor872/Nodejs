// -------- toprint the given number is even or not---------------------------
// let n = 10;
// if (n%2==0){
//     console.log(n,'is even number')
// } else {
//     console.log(n,'is not even  number ')
// }
// ------- to print list of even numbers from 1 to 10-------------------------------
// let n = [1,2,3,4,5,6,7,8,9,10];
// let even =[];
// for (let i of n) {
//     if(i%2==0) {
//         even.push(i)
//     }
// }
// console.log(even)

// -----------to count total numbers in the given list ---------------------------
// let n = 123456;
// let count = 0;
// for(let i=1;i<=n;i++) {
//     count = count+1
//     n = Math.floor(n/10)
// } 
// console.log(count)


// ------------ to print the given number is armstrong or not---------------------------
// let n = 153;
// let temp = n;
// let sum = 0;
// while(temp>0) {
//     let d = temp%10;
//     sum = sum+d**3;
//     temp=Math.floor(temp/10);
// } 
// if(n==sum){
//     console.log(n,"is arm number ")
// } else {
//     console.log(n,"is not a arm number ")
// }


// ---------------- to print the given numbers in range armstrong numbers--------------------------- 
// let start = Number(prompt("enter the value from the user : ")); 
// let end = Number(prompt("enter the value from the user : "));
// for(let i=start;i<=end;i++) {
//     digit = i.toString().length;
//     let temp=i;
//     let sum=0;
//     while(temp>0) {
//         let d = temp%10;
//         sum=sum+d**digit;
//         temp=Math.floor(temp/10);
//     }
//     if(sum==i) {
//     console.log(i,'is armstrong number')
// }
// } 


// -----------------------------To print reverse of the given number---------------------------
// let n = 12345;
// let temp=n;
// let rev = 0;
// while(n>0){
//     let d=n%10;
//     rev = rev*10+d
//     n = Math.floor(n/10)
// } 
// console.log(rev)


// -----------------------------To print the given number is palindrome or not---------------------------
// let n=Number(prompt("Enter the value from the user : ")) 
// let n=121;
// let temp = n;
// let rev= 0;
// while(n>0) {
//     let d=n%10;
//     rev=rev*10+d 
//     n = Math.floor(n/10)
// }
// if(temp==rev) {
//     console.log(temp,"the given number is polindrome ");
// } else {
//     console.log(temp,"the given number is not polindrome number ");
// }


// -----------------------------To print polindrome number in range--------------------------- 
// let start = Number(prompt("Enter the number from the user : "));
// let end = Number(prompt("Enter the number form the user : "));
// for(let i=start;i<=end;i++) {
//     let temp=i;
//     let sum = 0;
//     while(temp>0) {
//         let d =  temp%10;
//         sum=sum*10+d;
//         temp=Math.floor(temp/10);
//     } 
//     if(sum==i) {
//         console.log(i,'is polindrome number ');
//     }
// }



// -----------------------------To print the given number is prime or not---------------------------
// let n = Number(prompt('Enter the value from the user:'));
// let isPrime = true;
// if(n<=1) {
//     isPrime=false;
// } else {
//     for(let i=2;i<n;i++) {
//         if(n%i==0) {
//             isPrime=false;
//             break;
//             console.log(n,'the given number is not a prime ')
//         }
//     }
// } 
// if(isPrime) {
//     console.log(n,'is a prime number');
// } else {
//     console.log(n,'is not a prime number ');
// }


// ----------------------to print prime numbers in the given range---------------------------
// let start  = Number(prompt("Enter the value from the user : "));
// let end = Number(prompt("Enter the value from the user : ")); 

// for(let n=start;n<=end;n++) {
//     let isprime = true;
//     if(n<=1) {
//         isprime=false
//     } else {
//         for(let i=2;i<n;i++) {
//         if(n%i==0) {
//             isprime=false
//           break;   
//         }
//     }
//     }
// if(isprime) {
//     console.log(n)
// }
// }

// ----------------to print sum of the given numbers in the range---------------------------
// let sum = 0;
// for(let i=0;i<=100;i++) {
//     sum=sum+i;
// } 
// console.log(sum)
// let n = 100;
// let d=1;
// let a=1;
// let sum = (n*(n+1)/2)
// console.log(sum) 

// -----------------to print  fibonacci series in the given number ----------------------
// let n = 10;
// let f = 0;
// let s = 1;
// for(let i=0;i<n;i++) {
//     console.log(f)
//     let temp=f;
//     f=s;
//     s=temp+f
// } 

// -----------------to print fibonacci series in the reverse order in the given number ----------------------
// let n = Number(prompt('enter the value from the user:'));
// let f=0;
// let s=1;
// let fb = [];
// for (let i=0;i<n;i++) {
//     fb.push(f) 
//     let temp = f;
//     f=s
//     s=temp+f
// } 
// console.log(fb)
// console.log([...fb].reverse())


// --------------to print swapping og 2 variable  an dalso using 3rd variable ----------------------------

// let x = 10;
// let y = 20;
// [x,y] = [y,x] 
// console.log('x = ',x)
// console.log('y = ',y) 
// let x = 10;
// let y = 20;
// let temp = x
// x = y 
// y = temp
// console.log('x=',x)
// console.log('y=',y)


// -----------------to print the given number is perfect or not---------------------------
// let num = 729;
// let n = Math.sqrt(num);
// if(Number.isInteger(n)) {
//     console.log(n,'is perfect square number')
// } else {
//     console.log(n,'is not a perfect square number')
// }


// -----------------to print the given number is perfect square in range --------------------------- 
// let start = Number(prompt('Enter the given value from the user:'));
// let end = Number(prompt('Enter the given value from the user:'));
// for(let i=start;i<end;i++) {
//     sq = Math.sqrt(i)
//  if(Number.isInteger(sq)) {
//     console.log(i)
// }
// }


// -----------------To print multiplication table of the given number and also in range ---------------------------
// let n  = 12;
// for (let i=1;i<=10;i++) {
//     console.log(n,'x',i,'=',n*i)
// }
// for(let i=2;i<=10;i++) {
//     for(let j=1;j<=10;j++) {
//         console.log(`${i} x ${j} = ${i*j}`)
//     }
// } console.log()

// ---------------------the given year Is leap year or not ----------------------------
// let n = 2024;
// if((n%4==0 && n%100!=1) ||(n%400==0)) {
//     console.log(n,'is leap year');
// } else {
//     console.log(n,'is not a leap year ')
// }


// ---------------------to print no of days based on the month and year ----------------------------
// let n = 2024;
// let month = 2;
// if(month==2) {
//     if((n%4==0 && n%100!=1) || (n%400==0)) {
//         console.log('29 days in that month ')
//     } else {
//         console.log('28 days in that month ')
//     }
// } else if([1,3,5,7,8,10,12].includes(month)) {
//     console.log('31 days in that month')
// } else if([4,6,11,9].includes(month)) {
//     console.log('30 days in that month ')
// } else {
//     console.log('you entered invalid month ')
// }


// --------------------To print the roots of the given quadric equation ----------------------------
// let a = Number(prompt('Enter the value from the user:'));
// let b = Number(prompt('Enter the value from the user:'));
// let c = Number(prompt('Enter the value from the user:'));
// let delta = b**2-4*a*c;
// if(delta<0) {
//     console.log('roots are real and complex');
// } else {
//     root1 = (-b+Math.sqrt(delta))/2*a;
//      root2 = (-b-Math.sqrt(delta))/2*a;
// } 
// console.log(root1);
// console.log(root2);



// --------------------------- To print the factorial of the given number  ----------------------------
// let n = 5;
// let f=1;
// if(n==0) {
//     console.log(n,'the fact of zero is 1')
// } else if (n<0){
//     console.log(n,'the fact does not exist');
// } else {
//     for(let i=1;i<=n;i++) {
//         f=f*i
//     }   console.log(f)
// }

// function factorial(z) {
//     if(z<=0){
//         return 1 
//     } else {
//         return z*factorial(z-1)
//     }
// }
// console.log('the factorial of the given  number',factorial(5))


// ---------------------to print factor of the given number ----------------------------    
// let n = 6;
// for(let i=0;i<=n;i++) {
//     if(n%i==0) {
//         console.log(i)
//     }
// }


// ---------------------to print the given number is strong or not ----------------------------
// function strongNumber(num) {
//     let temp = num;
//     let sum=0;
//     function factorial(n) {
//         let fact = 1;
//         for(let i=1;i<=n;i++) {
//             fact = fact*i
//         } return fact
//     } 
//     while(temp>0) {
//         let digit = temp%10;
//         sum=sum+factorial(digit);
//         temp = Math.floor(temp/10)
//     } 
//     if(sum==num) {
//         console.log(`${num},is a strong number `)
//     } else {
//         console.log(`${num},is not a strong number`)
//     }
// }
// strongNumber(145);
// strongNumber(123);

