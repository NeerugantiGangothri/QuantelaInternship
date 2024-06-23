/*The instanceof operator in JavaScript is used to check if an object is an instance of a
 specific class or constructor function. It returns true if the object is an instance of 
 the specified class (or any class in its prototype chain), and false otherwise.*/

 class Person {
    constructor(name) {
        this.name = name;
    }
}

class Employee extends Person {
    constructor(name, jobTitle) {
        super(name);
        this.jobTitle = jobTitle;
    }
}

const john = new Person('John');
const alice = new Employee('Alice', 'Developer');

console.log(john instanceof Person); // true 
console.log(john instanceof Employee); // false --because john is parent class instance which is not applied for child class

console.log(alice instanceof Person); // true
console.log(alice instanceof Employee); // true

console.log(alice instanceof Object); // true
