// Polymorphism allows objects of different classes to be treated as objects of a common superclass.
class Animal{
    speak(){
    console.log('Animal speaks');
    }
}
   class Cat extends Animal{
    speak(){
    console.log('Meow');
    }
}
   class Dog extends Animal{
    speak(){
    console.log('Bow');
    }
}
   function makeAnimalSpeak(animal){
    animal.speak();
}
   makeAnimalSpeak(new Cat()); // Meow
   makeAnimalSpeak(new Dog()); // Bow

// We have a base class Animal with a method speak.
// Two subclasses Cat and Dog inherit from Animal and override the speak method to provide their specific implementations.
// The makeAnimalSpeak function accepts an animal parameter of type Animal but can take any subclass instance (Cat or Dog) and call their overridden speak methods.

//Abstraction involves creating simple models representing complex real-world objects.
//Abstraction is the process of taking away the unimportant details and showing only the essential details.
class Vehicle{
    startEngine(){
    console.log('Engine started');
   }
   stopEngine(){
    console.log('Engine stopped');
    }
   }
   class Car extends Vehicle {
    startEngine(){
    console.log('Car engine started');
    }
   }
   let myCar = new Car();
   myCar.startEngine(); // Car engine started

// Vehicle is an abstract representation of any vehicle with methods startEngine and stopEngine.
// Car is a specific type of Vehicle that provides its own implementation of startEngine.
// The Car class inherits the general behaviors from Vehicle and adds or modifies specific behaviors as needed.
