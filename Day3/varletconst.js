// var
var a = 45;
var a = 18;
var a = 7;
//Final Value will be printed
//redeclared and updated
//accessible throughout function


let a = 45;
let a = 18;//cannot be re declared

{
    let a;
    a = 7;//output 7
    console.log(a); // Accessible within block
}
{
a = 45;
console.log(a);
};
const a = 50; // Cannot be  re-declared or updated.
const a = 60; //Error
console.log(a);

   