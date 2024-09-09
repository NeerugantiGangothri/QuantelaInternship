const { buffer } = require("stream/consumers");

const buf1=Buffer.alloc(10);
const buf2=Buffer.from([1,2,3]);
const buf3=Buffer.from('Hello','utf8');

buf1.write('Hello');

console.log(buf1.toString()); //Hello

const slice=buf3.slice(0,2);

slice[0]=74;

console.log(slice.toString()); //Je
console.log(buf3.toString()); //Jello

//copying buffer

const copyBuf=Buffer.alloc(5);
buf3.copy(copyBuf);
console.log(copyBuf.toString()); //Jello

const array=new  Uint16Array(2);
array[0]=100;
array[1]=200;
const buf4=Buffer.from(array);
console.log(buf4); //<Buffer 64 c8>
