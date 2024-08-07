const express=require('express');

const path=require('path');

const { connectToDb }=require('./connect')

const urlRoute=require('./routes/url');

const staticRouter=require('./routes/staticrouter');


const URL=require('./models/url');
//const { timeStamp } = require('console');

const app=express();
const port=3000;

connectToDb('mongodb://localhost:27017/shorturl')
.then(()=>console.log("Mogodb Connected"));

//setting view engine to embedded javascript
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());

app.use(express.urlencoded({extended:false}));

// app.get('/test',async(req,res)=>{
//     //return res.end("<h1> Hey From Server</h1>");
//     const allUrls= await URL.find({});
//     return res.render('home',{
//         urls:allUrls,
//     });
// })

app.use('/url',urlRoute);

app.use('/',staticRouter)

//var entry;

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
      const entry=await URL.findOneAndUpdate(
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
       {new:true}
  );
  if(!entry){
    return res.status(404).send("URL not found");
  }
   res.redirect(entry.redirectURL);
})


app.listen(port,()=>console.log(`server started at ${port}`));