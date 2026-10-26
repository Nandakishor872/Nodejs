//  ------------------- to remove the duplicates in the given string -------------------
// let s = "java script Progtramming";
// let d = [] 
// for (i of s) {
//     if(!d.includes(i)) {
//         d.push(i)
//     }
// } 
// let result = d.join('');
// console.log(result)

// ------------------- to count only duplicates --------------------------
// let s = "learing javascript programming";
// let d = [];
// for (i of s) {
//     if(s.split(i).length - 1 > 1 && !d.includes(i)) {
//         d.push(i)
//     }
// } 
// console.log(d)


// --------------------Counting the Number of Occurrence’s of a single  Character in a String -------------------- 
// let s = 'leaarning javascript programming';
// let ch='a';
// let count=0;
// for(i of s) {
//     if(i==ch){
//         count = count+1
//     } 
// } 
// console.log(count)
// ---------------------Counting the Number of Occurrence’s of all  Character in a String --------------------
// let s = 'leaarning javascript programming';
// let d=[];
// for (let i of s) {
//     if(i in d) {
//         d[i] = d[i]+1
//     } 
//     else {
//         d[i] = 1;
//     }
// } 
// console.log(d)
// for(let key in d) {
//     console.log(`${key} : ${d[key]}`)
// } 
// ---------------------To count vowels and consonants and list of vowels and consonants------------- 
// let s = "learning javascript programming";
// let vowels = "AEIOUaeiou";
// let vc=0;
// let cc=0; 
// console.log('vowels')
// for (let i of s) {
//     if (vowels.includes(i)) {
//         vc=vc+1;
//         console.log(i)
//     } 
// } 
// console.log('vowels count',vc)
// console.log('consonants ') 
// for (let i of s) {
//     if (!vowels.includes(i)) {
//         cc=cc+1;
//         console.log(i)
//     }
// }

// console.log('consonants count',cc)
// ----------------------To reverse the given  string --------------------
// let s = "learing javascript programming";
// let n = s.length-1;
// // while(n>=0) {
// //     console.log(s[n])
// //     n=n-1;
// // } 
// for(let i=n;i>=0;i--) {
//     console.log(s[i])
// }
// let a = "javascript"
// for(let i of a.split('').reverse()){
//     console.log(i)
// }

// ------------------- to print the first non-repeating character in a string ------------------- 
let s = "iam learning javascript";
let freq = {};
for(let ch of s) {
    if(ch in freq) {
        freq[ch]++
    } else {
        freq[ch] = 1
    }
} 
for (let ch of s) {
    if(freq[ch]===1){
        console.log("freq of first  non repeating chars",ch);
        break;
    }
}
// -------------------- to print the given string is polindrome or not  ------------------------------------
// let s = "malayalam";
// let w = "";
// for(let i of s) {
//     w=i+w
// } 
// if (w==s) {
//     console.log(s,'The given string is polindrome ')
// } else {
//     console.log(s,'The given string is not polindrome')
// }
// ------------------- to prin the given string is anagram or not ---------------------------------------------
// let s = 'silent';
// let s1 = 'listen';
// let a = s.split('').sort().join();
// let b = s1.split('').sort().join();
// if(a==b) {
//     console.log('Bothe are the anagram')
// } else {
//     console.log('Both are not anagram')
// }

// ------------------- to print the special chars numbers and symbols in the given string   --------------------------------------
// let s  = "nanda@#1234";
// let spe = "";
// let alp = "";
// let num = "";
// for (let i of s) {
//     if((i>='A' && i<='Z') || (i>='a' && i<='z')) {
//         alp = alp+i
//     } else if(i>='0' && i<='9') {
//         num = num+i
//     } else {
//         spe = spe+i
//     }
// } 
// console.log('spe',spe);
// console.log('alp',alp);
// console.log('num',num)

// ------------------- to count total number of words in string--------------------------
// let s = "iam learning basics";
// let word = s.split(" ");
// let wordcount = 0;
// for(let i of word) {
//     wordcount = wordcount+1
// } 
// console.log('wordcount',wordcount)


// -----------------------------write a python program to print half string is reversed and 2nd string as same------------------
// let s = "java Script";
// let firsthalf = "";
// let secondhalf = "";
// let midpoint = Math.floor(s.length/2);
// for(let i=midpoint-1;i>=0;i--){
//     firsthalf = firsthalf+s[i]
// }
// for(let i=midpoint;i<s.length;i++) {
//     secondhalf = secondhalf+s[i]
// } 
// let result = firsthalf+secondhalf;
// console.log(result)

//  ------------------------------ to reverse each and every word of the given string ------------------------------------
// let s = "this is java script programming";
// let word = s.split(" ");
// let rev = [];
// for (let i of word) {
//     let d = i.split('').reverse().join('');
//     rev.push(d) 
// }
// let result = rev.join(' ');
// console.log(result)