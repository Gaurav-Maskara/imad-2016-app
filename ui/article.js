// to add comment box section into the articles page
 
 
/* var commentSubmitButton=document.getElementById("submitComment");
 function myfunction(){
     
      var request=new XMLHttpRequest();
     //capture the response and store it in a variable
     request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status==200){
                var comment =request.responseText;
                document.getElementById("comment").innerHTML=comment;
                
             }
          }
         
     };
     
     var comment=document.getElementById("textBox");
     var commentValue=comment.value;
     request.open('GET','http://gaurav-maskara.imad.hasura-app.io/submit-comment?comment='+commentValue   ,true);
     request.send(null);
     
 };*/
 

 var commentSubmitButton=document.getElementById("submitComment");
 function myfunction(){
     
      var request=new XMLHttpRequest();
     //capture the response and store it in a variable
     request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status==200){
              var comments = request.responseText;
            /*  comments = JSON.parse(comments);
              var list = '';
              for (var i=0; i< comments.length; i++) {
                  list += '<li>' + comments[i] + '</li>';
              }*/
              var list=comments;
              var ul = document.getElementById('commentList');
              ul.innerHTML =list ; 
                
             }
          }
         
     };
     
     var comment=document.getElementById("textBox");
     var commentValue=comment.value;
     request.open('GET','http://gaurav-maskara.imad.hasura-app.io/submit-comment?comment='+commentValue   ,true);
     request.send(null);
     
 }
 
window.onload = function() {
 alert("Successfully Loaded");
};