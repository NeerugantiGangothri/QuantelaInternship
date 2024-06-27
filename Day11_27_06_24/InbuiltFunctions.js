/*JavaScript provides a rich set of built-in functions for performing various tasks. */
//1. Date Object
const date=new Date();
console.log(date);
console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());
/*Output:024-06-27T12:53:50.133Z
2024
5
4
18
23
50
133*/

//Setting values
date.setFullYear(2003);
date.setMonth(5); 
date.setDate(3);
date.setHours(10);
date.setMinutes(30);
date.setSeconds(15);
console.log(date);
//Output:2003-06-03T05:00:15.133Z

//Math Object
console.log(Math.PI);
console.log(Math.E);
console.log(Math.round(2.5));
console.log(Math.ceil(2.5));
console.log(Math.floor(2.5));
console.log(Math.sqrt(9));
console.log(Math.pow(2,3));
console.log(Math.abs(-2));
console.log(Math.max(1,2,3,4,5,6,7,8));
console.log(Math.min(1,2,3,4,5,6,7,8));
console.log(Math.pow(4, 2));
console.log(Math.random());
console.log(Math.floor(Math.random() * 10));  // Returns a random integer from 0 to 9
// Returns a random integer from 0 to 99
console.log(Math.floor(Math.random() * 100));
/*Output:3.141592653589793
2.718281828459045
3
3
2
3
8
2
8
1
16
0.08055373578905978
3
45*/

//String Methods
console.log("String Methods");
let str="I am Gangothri";
console.log(str.length);
console.log(str.toUpperCase());
console.log(str.toLowerCase());
console.log(str.charAt(0));
console.log(str.replace("Gangothri", "JavaScript"));
console.log(str.substring(5,15));
console.log(str.split(" "));
console.log(str.indexOf("am"));
/*14
I AM GANGOTHRI
i am gangothri
I
I am JavaScript
Gangothri
[ 'I', 'am', 'Gangothri' ]
2*/

//Array Methods
let arr=[1,2,3,4,5,6,7,8,9];
console.log(arr.length);
console.log(arr[0]);
arr.push(10);
console.log(arr);
arr.pop();
console.log(arr);
arr.shift();
console.log(arr);
arr.unshift(0);
console.log(arr);
arr.concat([10, 11]);
console.log(arr);
console.log(arr.join(", "));
console.log(arr.slice(1, 3));
arr.splice(0, 1, 10);
console.log(arr);
console.log(arr.reverse());
console.log(arr.sort((a, b) => a - b));
/*Output:9
1
[
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9
]
[
  2, 3, 4, 5,
  6, 7, 8, 9
]
[
  0, 2, 3, 4, 5,
  6, 7, 8, 9
]
[
  0, 2, 3, 4, 5,
  6, 7, 8, 9
]
0, 2, 3, 4, 5, 6, 7, 8, 9
[ 2, 3 ]
[
  10, 2, 3, 4, 5,
   6, 7, 8, 9
]
[
  9, 8, 7,  6, 5,
  4, 3, 2, 10
]
[
  2, 3, 4,  5, 6,
  7, 8, 9, 10
]
*/

