const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    const readableStream = fs.createReadStream('streams.txt', { encoding: 'utf8' });
    readableStream.pipe(res); 
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
}).listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
