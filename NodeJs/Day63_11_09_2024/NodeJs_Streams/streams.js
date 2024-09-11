const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('./index.html',{encoding:'utf-8'}).pipe(res);
  } else if (req.method === 'POST' && req.url === '/upload') {
    const uploadPath = path.join(__dirname, 'uploaded.txt');
    const writableStream = fs.createWriteStream(uploadPath, { encoding: 'utf8' });

    req.pipe(writableStream);

    writableStream.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File uploaded successfully');
    });

    writableStream.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error writing file');
    });
  } else if (req.method === 'GET' && req.url === '/download') {
    const filePath = path.join(__dirname, 'uploaded.txt');
    
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });
      readableStream.pipe(res); 
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

server.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
