const express=require('express');
const http=require('http');
const path=require('path');
const {Server} =require('socket.io');

const app=express();
const server=http.createServer(app);

const io=new Server(server);

// app.set('view engine','ejs');
// app.set('views','views');

io.on('connection',(socket)=>{
    //console.log('Client connected',socket.id);
    socket.on('user-message',(message)=>{
        io.emit(message);
        console.log(message);
    })
})

app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
    //res.render('chat');
    return res.sendFile('./public/index.html');
})

server.listen(3000,()=>{
    console.log('server is running on port 3000');
})