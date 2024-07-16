const cart=["Shoe","kurta","food"]

//Call Back Hell Giving control of one function to another function - inversion control
createOrder(cart, function(orderId){
    proceedToPayment(orderId, function(paymentinf){
        showOrderSummary(paymentinf,function(){
            updateWallet();
        });
    });
});

//Promise Chaining
//promises gives us guarantee to call nestsed call backs
createOrder(cart)
.then(function(orderId){
    return proceedToPayment(orderId);
})
.then(function(paymentinf){
    return showOrderSummary(paymentinf);
})
.then(function(paymentinf){
   return updateWallet(paymentinf);
});