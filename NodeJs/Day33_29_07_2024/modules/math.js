//math.js
//This file defines a simple module with a function that adds two numbers.


function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function mul(a,b){
    return a*b;
}
function div(a,b){
    return a/b;
}
//In Node.js, module.exports is the object that's actually returned as the result of a require call.
// Export the 'add' function so it can be used in other files.
//to excute multiple functions at a time we use objects 
//module.exports=add;

module.exports={
    addFn:add,
    subFn:sub,
    mulFn:mul,
    divFn:div
}

// module.exports={add,sub,mul,div}