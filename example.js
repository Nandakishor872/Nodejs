// ------------ to print the given number is armstrong or not---------------------------
let n = 153;
let temp = n;
let sum = 0;
while(temp>0) {
    let d = temp%10;
    sum = sum+d**3;
    temp=Math.floor(temp/10);
} 
if(n==sum){
    console.log(n,"is arm number ")
} else {
    console.log(n,"is not a arm number ")
}