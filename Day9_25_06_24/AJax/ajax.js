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
      displayTextdata(data);
   }else {
    console.error('Failed to load text data:', ar.statusText);
   }
};

});

let displayTextdata= (data) =>{
   let textDiv = document.querySelector('#txt');
   let newData = document.createElement('p');
   newData.textContent = data;
   textDiv.appendChild(newData);
};
