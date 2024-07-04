//classes and objects in js
//class is a template for creating objects
//object is an instance of a class

class car{
    constructor(make, model, year, color, price){
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
        this.price = price;
    }
        //create methods
        myMethod() {
            console.log("this is a method");

        }
        }
        //create an object from the class
        let myCar = new car("Toyota", "Camry", 2018, "Black");
        console.log(myCar);

//Inheritance

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    study() {
        console.log(`${this.name} is studying and is in grade ${this.grade}.`);
    }
}
const student1 = new Student('John', 20, 'A');

console.log(student1.greet()); // Hello, my name is John and I am 20 years old.
console.log(student1.study()); // John is studying and is in grade A.

//Super Keyword
class Person1 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

class students extends Person1 {
    constructor(name, age, grade) {
        super(name, age); 
        this.grade = grade;
    }

    study() {
        console.log(`${this.name} is studying and is in grade ${this.grade}.`);
    }
}

const student2 = new students('John', 20, 'A');

student2.greet(); // Hello, my name is John and I am 20 years old.
student2.study(); // John is studying and is in grade A.
