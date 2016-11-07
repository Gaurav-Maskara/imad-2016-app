 //counter code
/* var button =document.getElementById('counter');

 button.onclick=function(){
     
     //Create a request object 
     var request=new XMLHttpRequest();
     
     //capture the response and store it in a variable
     request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status==200){
                var counter =request.responseText;
                 var span =document.getElementById('count');
                  span.innerHTML=counter.toString();
            }
         }
         
     };
     //make a request 
     request.open('GET','http://gaurav-maskara.imad.hasura-app.io/counter',true);
     request.send(null);
     
 };*/
 
 //Submit name

 var submit =document.getElementById("submit_btn");
 submit.onclick=function(){
      //Create a request object 
       
     var request=new XMLHttpRequest();
     
     //capture the response and store it in a variable
     request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status==200){
                var names =request.responseText;
                  names=JSON.parse(names);
                  var list="";
                  for(var i=0;i<names.length;i++){
                     list=list+"<li>"+names[i]+"</li>";
                   }
     
                 var ul =document.getElementById("nameList");
                ul.innerHTML=list;
             }
          }
         
     };
       var nameInput=document.getElementById("name");
       var name=nameInput.value;
     //make a request 
     request.open('GET','http://gaurav-maskara.imad.hasura-app.io/submit-name?name='+name   ,true);
     request.send(null);
     
    
     
 };
 
  function feedback(){
      
      document.getElementById("close").click();
        var request=new XMLHttpRequest();
        request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            if(request.status==200){
              window.close();
              return true;
             }
             
             else{
                 
             }
          }
     };
     
     var name=document.getElementById("name").value;
     var email=document.getElementById("email").value;
     var website=document.getElementById("website").value;
     var text=document.getElementById("text").value;
    
     request.open('GET','http://gaurav-maskara.imad.hasura-app.io/feedback?name='+name+'&email='+email+'&website='+website+'&text='+text   ,true);
     request.send(null);
 };
 
 
 /* window.onload = function() {
    
      $.getJSON('http://freegeoip.net/json/', function (location) {
        var ip=location.ip;
        var city=location.city;
        var region=location.region_name;
        var country=location.country_name;
        
         alert(ip +city+country+region );
         
          var request=new XMLHttpRequest();
          request.onreadystatechange=function(){
             if(request.readyState==XMLHttpRequest.DONE){
                 if(request.status==200){
                 alert("Succesfully saved client's details");
                }
               }
             };
       request.open('GET','http://gaurav-maskara.imad.hasura-app.io/client/details?ip='+ip+'&city='+city+'&region='+region+'&country='+country   ,true);
       request.send(null);
         
        }); 
    
    
};*/


window.onload = function() {
    
    
    alert("IMAD Console but u dont updtae");
    
     /* $.getJSON('http://freegeoip.net/json/', function (location) {
        var ip=location.ip;
        var region=location.region_name;
        var city=location.city;
        var country=location.country_name;
        
         alert(ip +city+country+region );
         
        }); 
    
     var request=new XMLHttpRequest();
     request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status==200){
              var comments = request.responseText;
              var list=comments;
              var ul = document.getElementById('commentList');
              ul.innerHTML =list ; 
             }
          }
     };
     request.open('GET','http://gaurav-maskara.imad.hasura-app.io/comments',true);
     request.send(null);*/
};

 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 