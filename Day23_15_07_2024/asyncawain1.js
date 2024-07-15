const p1=new Promise((resolve)=>{
    setTimeout(()=>{
        resolve('success')
        },2000)
});
const p2=new Promise((resolve)=>{
    setTimeout(()=>{
        resolve('success')
        },5000)
});

async function handlePromise(){
   
    const res2=await p2;
    console.log("Hii");
    console.log(res2);

    const res1=await p1;
    console.log("Hii");
    console.log(res1);

}
handlePromise();  // After 5 second all values will be printed

async function handlePromise(){
   

    const res1=await p1;
    console.log("Hii");
    console.log(res1);

    const res2=await p2;
    console.log("Hii");
    console.log(res2);

}
handlePromise();  // after 2 seconds p1 promise printed after 5 seconds p2 printed


function getData(){
    //Js engine will not wait promise to resolve
    // Hii , Success
    p.then(res=>console.log(res));
    console.log("Hii")
}
getData();
