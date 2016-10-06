 //counter code
 var button =document.getElementById("counter");
 var counter=0;
 button.onclick=function(){
     
     //make arequest to the counte endpoint 
     //capture the response and store it in avariable
     //render the varible at the correct span
     
     counter=counter+1;
     var span =document.getElementById("count");
     span.innerHTML=counter.toString();
     
 };