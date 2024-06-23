/*In JavaScript, the constructor is a special method used within a class 
to initialize new objects created with that class. When you create an instance of a class 
using the new keyword, the constructor method is called to set up the initial state of the object.*/

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const ram = new Person('ram', 30);
ram.greet(); // Hello, my name is ram and I am 30 years old.

/*Class Declaration: The Person class is declared with a constructor method.
Constructor Method: The constructor method takes two parameters, name and age, and assigns them to the instance properties this.name and this.age.
Instance Creation: When you create a new instance of the Person class with new Person('ram', 30), the constructor method is called, initializing the name and age properties of the new object.
Method Call: The greet method can then be called on the instance to display a message using the initialized properties.*/