const http=require('http');
 
const myServer=http.createServer((req,res)=>{
    console.log("New Req Received");
    res.end("Hello From Server");
});
myServer.listen(8080,()=>{console.log("Server Started!")});