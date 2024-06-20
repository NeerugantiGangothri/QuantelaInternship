function function1(){
    console.log("Hi iam Gangothri");
    console.log("Currently I am working as  a intern at Quantela");
}

function1()

function welcomeMsg(name) {
    return ("Hello "+ name+" welcome to Quantela");

}
let nameVal = "Gangothri";
// calling the function
console.log(welcomeMsg(nameVal));


function myFunction(n1,n2) {
    return n1 / n2;
}
const value=myFunction(6,3); // Calling the function
console.log(value);


function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
  }
let temperatureF=98;
let temperatureC=toCelsius(temperatureF);
let text = "The temperature is "+temperatureC+" Celsius";
console.log(text);


Output:
[Running] node "c:\Users\Gangothri N\Desktop\QuantelaJSPractice\functions.js"
Hi iam Gangothri
Currently I am working as  a intern at Quantela
Hello Gangothri welcome to Quantela
2
The temperature is 36.666666666666664 Celsius
