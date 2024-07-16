const p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('p1 Success')
        },3000)
});

const p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //resolve('p2 Success')
        reject('p2 Error');
        },1000)
});

const p3=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('p3 Success')
        },2000)
});

//wait for all of them to finish and gives final output
//if one promise will fails immediately throws error
Promise.all([p1,p2,p3]).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.error(err);
})
//op:p2 Error

//It will wait for all promises to settle and gives final output whether it is success or failure
Promise.allSettled([p1,p2,p3]).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.error(err);
    })
/*[
  { status: 'fulfilled', value: 'p1 Success' },
  { status: 'rejected', reason: 'p2 Error' },
  { status: 'fulfilled', value: 'p3 Success' }
]
*/

//whatever will be first one it will gives that whether it is success or failure
//first settled promise
Promise.race([p1,p2,p3]).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.error(err);
    })
// since p2 resolves first and it is failure it will gives that
//op: p2 Error

//it will gives the first settled success
//if all promises fails it will give aggregate error
Promise.any([p1,p2,p3]).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.error(err);
    })
//op:p3 Success    
