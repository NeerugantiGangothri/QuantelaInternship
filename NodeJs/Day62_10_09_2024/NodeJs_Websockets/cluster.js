const cluster=require('node:cluster');
const os = require('os');
const express=require('express');

const totalCpus=os.cpus().length;

//console.log(totalCpus);

if(cluster.isPrimary){
    for(let i=0;i<totalCpus;i++){
        cluster.fork();
    }
}
else{
    const app=express();

    app.get('/',(req,res)=>{
        return res.json({
            message:`Hello from Server ${process.pid}`
            //for ex: Hello from Server 18296
        })
    });
    
    app.listen(8000,()=>{
            console.log('Server is running on port 8000');
        }
    );

}

//Clusters of Node.js processes can be used to run multiple instances of Node.js that can distribute workloads among their application threads.