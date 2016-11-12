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
            if(request.status===200){
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


function save(location){
      
      //  alert(ip+city);
        
        var request=new XMLHttpRequest();
     
       request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status==200){
               alert("Succesfully saved client's details");
            }
         }
         
     };
     //make a request 
        location=JSON.parse(location);
        var ip=location.ip;
        var city=location.city;
        var region=location.region_name;
        var country=location.country_name;
    request.open('GET','http://gaurav-maskara.imad.hasura-app.io/client/details?ip='+ip+'&city='+city+'&region='+region+'&country='+country   ,true);
     request.send(null);
    
};

 
 
// submit username and password to login into the app
 var submit_login =document.getElementById("submit_login");
 submit_login.onclick=function(){
      //Create a request object 
       
     var request=new XMLHttpRequest();
     
     //capture the response and store it in a variable
     request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status===200){
               console.log("user logged in ");
             }
             else if(request.status===403){
                 
             }
             else if(request.status===500){
                 
             }
            
          }
         
     };
       var username=document.getElementById("username").value;
       var password=document.getElementById("password").value;
     //make a request 
     request.open('POST','http://gaurav-maskara.imad.hasura-app.io/login', true);
     request.setRequestHeader('Content-Type','application/json');
     request.send(JSON.stringify({username: username, password: password}));
     
    
     
 };
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 