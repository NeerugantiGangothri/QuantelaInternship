const fs = require('fs');

// Create a readable stream to read 
const readableStream = fs.createReadStream('streams.txt', { encoding: 'utf8' });

// Create a writable stream to write 
const writableStream = fs.createWriteStream('output.txt');

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);

writableStream.on('finish', () => {
  console.log('File has been written successfully.');
});
