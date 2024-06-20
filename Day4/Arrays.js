//Arrays
let nums=[10,20,30,40,50]
console.log(nums[2]);
console.log(nums);
console.log(nums.length);
console.log(nums.toString());
for(let i=0;i<nums.length;i++){
    console.log(nums[i]);
}
for(let i=0;i<nums.length;i++){
    nums[i]=nums[i]*2;
}
console.log(nums);
let fruits=["Apple","Banana","Grapes","Orange"]
for(let fruit of fruits){
console.log(fruit.toUpperCase());
}
//push function
fruits.push("Mango","Starwberry");
console.log(fruits);
fruits.pop();
console.log(fruits);
let colors=["Red","Blue","Green"];
let final=fruits.concat(colors);
console.log(final);
//slice
console.log(fruits.slice(0,3));
//splice
let num=[1,2,3,4,5,6,7];
num.splice(2,3,10,20,30);
console.log(num);




Output:
30
[ 10, 20, 30, 40, 50 ]
5
10,20,30,40,50
10
20
30
40
50
[ 20, 40, 60, 80, 100 ]
APPLE
BANANA
GRAPES
ORANGE
[ 'Apple', 'Banana', 'Grapes', 'Orange', 'Mango', 'Starwberry' ]
[ 'Apple', 'Banana', 'Grapes', 'Orange', 'Mango' ]
[
  'Apple',  'Banana',
  'Grapes', 'Orange',
  'Mango',  'Red',
  'Blue',   'Green'
]
[ 'Apple', 'Banana', 'Grapes' ]
[
   1, 2, 10, 20,
  30, 6,  7
]
