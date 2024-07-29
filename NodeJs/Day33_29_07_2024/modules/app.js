//console.log(add(2,3));
//add function is not defined here we will get error we have to import access the add method which is defined in other file for that we have to use modules

//so we will use modules to import the add method from other file and use it here
// Require the 'math.js' module which is in the same directory.
//const math = require('./math');: 
//This line imports the add function from math.js. 
//The require function is used to include modules that exist in separate files. 
//The ./ indicates that math.js is in the same directory as app.js.
const math=require('./math')

console.log("The Addition:",math.addFn(2,3));
console.log("The Addition:",math.subFn(10,3));
console.log("The Addition:",math.mulFn(2,3));
console.log("The Addition:",math.divFn(6,3));



// console.log(math.add(2,3));
// console.log(math.sub(10,3));


