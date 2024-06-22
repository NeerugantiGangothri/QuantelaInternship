/*Implicit Type Casting (Coercion)
Implicit type casting happens automatically in JavaScript when operators are applied to values of different types.*/
//Examples
let num = 5;
let str = "The number is " + num;
console.log(str); 
// "The number is 5"

let result = '10' - 2;
console.log(result); // 8
//In this example, JavaScript automatically converts the string '10' to a number before performing the subtraction

let value = 0;
if (value) {
    console.log("True");
} else {
    console.log("False"); // This will be printed
}
//In this example, JavaScript automatically converts the number 0 to a boolean false before evaluating the if


/*Explicit Type Casting
Explicit type casting is done manually using global functions or methods to convert values from one type to another.*/

//Examples

let str1 = "123";
let num1 = Number(str);
console.log(num); // 123

let str2 = "123";
let str3 = "123.45";
console.log(parseInt(str2)); // 123
console.log(parseFloat(str3)); // 123.45

let num2 = 123;
let str4 = String(num2);
console.log(str4); // "123" we can use toString() also




