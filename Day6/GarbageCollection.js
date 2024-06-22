/* in high level languages like java and javascript
memeory allocation will be done at declaration of variables
all unused memory allocation will be cleared by garbagecollector */

// Garbage collection algorithms
/*1.reference counting alogorthm : 
Incrementing Count: Whenever a reference to an object is created, the reference count of that object is incremented.
Decrementing Count: Whenever a reference to an object is removed or goes out of scope, the reference count of that object is decremented.
Deallocation: When the reference count of an object reaches zero, the object is deallocated, and its memory is reclaimed.*/

function createPerson(name) {
    return {
        name: name,
        friend: null
    };
}

let person1 = createPerson("Ram");
let person2 = createPerson("Sita");

person1.friend = person2; // person1 references person2
person2.friend = person1; // person2 references person1

// Breaking the circular reference
person1.friend = null;
person2.friend = null;

// Setting variables to null, so reference counts drop to 0
person1 = null;
person2 = null;

// At this point, both objects can be deallocated

/*2. Mark-and-sweep-algorithm
 Mark Phase: Starting from the root objects (e.g., global objects, local variables in the current execution context, etc.), the garbage collector traverses the object graph, marking all reachable objects.
Sweep Phase: The garbage collector then scans through the heap and collects all unmarked objects, reclaiming their memory.*/


function createObject() {
    let obj = { data: "example" };
    return obj;
}

let obj1 = createObject();
let obj2 = createObject();

// obj1 and obj2 are reachable

obj1 = null; // obj1 is now unreachable

// Garbage collector will eventually run and reclaim the memory for obj1

