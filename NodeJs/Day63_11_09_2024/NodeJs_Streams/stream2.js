const fs = require('fs');
const { Transform } = require('stream');

// Create a transform stream to convert data to uppercase
const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase()); // Convert chunk to uppercase
    callback();
  }
});


const readableStream = fs.createReadStream('streams.txt', { encoding: 'utf8' });
const writableStream = fs.createWriteStream('output1.txt');


readableStream.pipe(uppercaseTransform).pipe(writableStream);

writableStream.on('finish', () => {
  console.log('File has been transformed and written successfully.');
});
