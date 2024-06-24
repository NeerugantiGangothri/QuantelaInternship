const str=`Hi iam Gangothri 
            am working as a intern`;
const regx=/[.a]/g
console.log(regx.exec(str));
console.log(str.match(regx)); 
//console.log(regx.test(str));
const arr=str.matchAll(regx);
for (const match of arr) {
    console.log(match);
    }

const str1=`I am gangothri
            My age is 21
            My mobile number is 123456789`;
const regx1=/\s+/g;
const regx2=RegExp('age*','g');
console.log(str1.match(regx1));
console.log(regx1.test(str1));
console.log(regx2.exec(str1));
console.log(str1.match(regx2));
const regex3=/[a-e]/g
console.log(str1.match(regex3));

// \b\B	word, not-word boundary
console.log("Word boundary");
const str2="Hii hello Shello Whellow hello";
const regx4=/\bhello\b/g;
const regx5=/\Bhello\B/g;
console.log(str2.match(regx4));
console.log(str2.match(regx5));

console.log("Escape Characters");
const str3=`Hii! Iam Gangothri 
            & iam from quantela.
            `;
const regx6=/\!|\./g;
const regx7=/\n/g
console.log(str3.match(regx6));
console.log(str3.match(regx7));
console.log(str3.search(regx7));


const str4="ab abbb ababa";
const regx8=/ab+/g;
console.log(str4.match(regx8));
const regx9=/ab?/g;
console.log(str4.match(regx9));
console.log(str4.search(regx9));

const str5=`Hello World, hello Good morning
             Hello  `;
const regx10=/hello/gi;
console.log(str5.replace(regx10,"hi"));
console.log(str5.replaceAll(regx10,"hii"));

/*[
  'a',
  index: 4,
  input: 'Hi iam Gangothri \n            am working as a intern',
  groups: undefined
]
[ 'a', 'a', 'a', 'a', 'a' ]
[
  'a',
  index: 4,
  input: 'Hi iam Gangothri \n            am working as a intern',
  groups: undefined
]
[
  'a',
  index: 8,
  input: 'Hi iam Gangothri \n            am working as a intern',
  groups: undefined
]
[
  'a',
  index: 30,
  input: 'Hi iam Gangothri \n            am working as a intern',
  groups: undefined
]
[
  'a',
  index: 41,
  input: 'Hi iam Gangothri \n            am working as a intern',
  groups: undefined
]
[
  'a',
  index: 44,
  input: 'Hi iam Gangothri \n            am working as a intern',
  groups: undefined
]
[
  ' ',
  ' ',
  '\n            ',
  ' ',
  ' ',
  ' ',
  '\n            ',
  ' ',
  ' ',
  ' ',
  ' '
]
true
[
  'age',
  index: 30,
  input: 'I am gangothri\n' +
    '            My age is 21\n' +
    '            My mobile number is 123456789',
  groups: undefined
]
[ 'age' ]
[
  'a', 'a', 'a',
  'e', 'b', 'e',
  'b', 'e'
]
Word boundary
[ 'hello', 'hello' ]
[ 'hello' ]
Escape Characters
[ '!', '.' ]
[ '\n', '\n' ]
19
[ 'ab', 'abbb', 'ab', 'ab' ]
[ 'ab', 'ab', 'ab', 'ab', 'a' ]
0
hi World, hi Good morning
             hi  
hii World, hii Good morning
             hii  

[Done] exited with code=0 in 0.16 seconds*/