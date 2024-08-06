const express=require('express');

const { connectToDb }=require('./connect')

const urlRoute=require('./routes/url');

const URL=require('./models/url');
//const { timeStamp } = require('console');

const app=express();
const port=3000;

connectToDb('mongodb://localhost:27017/shorturl')
.then(()=>console.log("Mogodb Connected"));

app.use(express.json());

app.use('/url',urlRoute);

var entry;

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
      entry=await URL.findOneAndUpdate(
        {
        shortId
       },
       {
        $push:{
            visitHistory: {
                timeStamp: Date.now(),
            },
        },
       },
  );
   res.redirect(entry.redirectURL);
})


app.listen(port,()=>console.log(`server started at ${port}`));