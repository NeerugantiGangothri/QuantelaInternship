/*In JavaScript, classes provide a way to create objects and define their behavior through
 a more structured and syntactic approach. Introduced in ECMAScript 6 (ES6), classes make 
 it easier to write and manage object-oriented code.*/


 class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Method 
    greetings() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const person1 = new Person('Gangothri', 21);
person1.greetings(); // Hello, my name is Gangothri and I am 21 years old.

 