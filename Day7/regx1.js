/*Regular expressions (regex) in JavaScript are patterns
 used to match character combinations in strings. 
 They are a powerful tool for performing complex search and replace operations. 
 JavaScript provides both a RegExp object and literal syntax for defining regular expressions.*/

/* Creating Regular Expressions
There are two ways to create a regular expression in JavaScript*/

/*Literal Notation:

let regex = /pattern/flags;

Constructor Function:

let regex = new RegExp('pattern', 'flags');*/

/*Basic Syntax
Pattern: The pattern is the string that defines the search criteria.
Flags: Flags are optional and can modify the search behavior. Common flags include:
g (global): Perform a global match (find all matches rather than stopping after the first match).
i (ignoreCase): Perform case-insensitive matching.
m (multiline): Treat beginning and end characters (^ and $) as working across multiple lines.*/

let regex = /hello/;
let str = "hello world";
console.log(regex.test(str)); // true

let regex1 = /hello/i; // Case-insensitive match
let str1 = "Hello world";
console.log(regex1.test(str1)); // true


let regex2 = new RegExp('hello', 'i');
let str2 = "Hello world";
console.log(regex2.test(str2)); // true
