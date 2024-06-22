/* Iterables are iterable objects (like Arrays).

Iterables can be accessed with simple and efficient code.

Iterables can be iterated over with for..of loops */

const array = [1, 2, 3];
for (const value of array) {
    console.log(value); // 1, 2, 3
}

const string = "hello";
for (const char of string) {
    console.log(char); // h, e, l, l, o
}

const map = new Map();
map.set('a', 1);
map.set('b', 2);
for (const [key, value] of map) {
    console.log(key, value); // a 1, b 2
}

const set = new Set([1, 2, 3]);
for (const value of set) {
    console.log(value); // 1, 2, 3
}


/*Custom Iterables
You can make your own objects iterable by implementing the [Symbol.iterator] method.*/
const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};

for (const value of myIterable) {
    console.log(value); // 1, 2, 3
}
