const cart=["Shoe","kurta","food"];

//Promise Chaining
//promises gives us guarantee to call nestsed call backs
//consumer 
createOrder(cart)
.then(function(orderId){
    console.log(orderId);
    return orderId;
})
.then(function(orderId){
    return proceedToPayment(orderId);
})
.then(function(paymentinf){
   console.log(paymentinf);
})
.catch(function(err){
    console.log(err.message);
});

//producer
function createOrder(cart){
        const p=new Promise((resolve, reject) => {
            if(!valiDateCart(cart)){
               const err=new Error("cart is not valid");
               reject(err);
            }
            const orderId="12234";
            if(orderId){
                setTimeout(function(){
                    resolve(orderId);
                },2000)
            }
        });
        return p;
}
function proceedToPayment(orderId){
return new Promise(function(resolve,reject){
   resolve("Payment Successfull");
});
}
 function valiDateCart(cart){
    return true;
 }