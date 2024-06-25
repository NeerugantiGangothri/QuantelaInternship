let textButton=document.querySelector('#tbtn');
textButton.addEventListener('click',function(){
 //AJAX
 //craete ajax request
 let ar = new XMLHttpRequest();
 //prepare the request
ar.open('GET','./Data/text.txt',true);
//send the request
ar.send();
//process the request
ar.onload= function(){
   if(ar.status === 200){
      let data=ar.responseText;
      console.log(data);
   }else {
    console.error('Failed to load text data:', ar.statusText);
   }
};

});