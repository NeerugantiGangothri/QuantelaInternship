// Import the 'http' module to work with HTTP requests and responses
const http = require('http');


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if(req.url==='/'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Get Method Example");
    }
    // Handle GET request
    // Check if the request URL (the path in the address bar) is '/products'
    if (req.url === '/products') {
      // Create some dummy data for products (like items in an online store)
      const products = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
      ];
      // Respond to the client (the web browser in this case)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // Send the products as a JSON string to the client
      res.end(JSON.stringify(products));
    }
  }
  else{
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end("Method Not Allowed");
  }
}).listen(8081);
