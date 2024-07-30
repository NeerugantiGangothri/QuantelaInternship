//Import the required modules: http, url, and fs.
var http=require('http');
var url=require('url');
var file=require('fs');
http.createServer((req,res)=>{

// The parse method takes a URL string and returns an object representing various components of the URL.
// req.url is the URL string from the incoming request.
// The second argument true specifies that the query string should be parsed into an object. If this argument is omitted or set to false, the query string will be left as a string.
//in current example it is index.html which is incoming request
    var q=url.parse(req.url,true);
//The dot (.) represents the current directory in a file system path.
    var path='.'+q.pathname;
    file.readFile(path,(err,data)=>{
        if(err){
            //used to handle response to an http request, Content-Type specify the type of response 
            res.writeHead(404,{'Content-Type':'text/html'});
            // It informs the server that the response is complete.
            res.end("Not Found");
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        }
    });
}).listen(8081);

// Given a URL like http://localhost:8081/index.html:

// req.url will be /index.html.
// q.pathname will be /index.html.
// '.' + q.pathname will result in ./index.html.
// path will be ./index.html.