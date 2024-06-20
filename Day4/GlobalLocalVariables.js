// Global variable
let globalV= "I'm a global variable";
function myFunction2() {
    // Local variable
    let localV = "I'm a local variable";
    console.log(globalV); //Both variables are accessible here
    console.log(localV);  
}
myFunction2();

console.log(globalV); // Accessible here
console.log(localV);  // Not accessible here

Output:
ReferenceError: localV is not defined
    at Object.<anonymous> (c:\Users\Gangothri N\Desktop\QuantelaJSPractice\functions.js:52:13)
    at Module._compile (node:internal/modules/cjs/loader:1358:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)
    at Module.load (node:internal/modules/cjs/loader:1208:32)
    at Module._load (node:internal/modules/cjs/loader:1024:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at node:internal/main/run_main_module:28:49