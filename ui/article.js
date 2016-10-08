// to add comment box section into the articles page
 
 
 var commentSubmitButton=document.getElementById("submitComment");
 commentSubmitButton.onclick=function(){
     
      var request=new XMLHttpRequest();
     //capture the response and store it in a variable
     request.onreadystatechange=function(){
         if(request.readyState==XMLHttpRequest.DONE){
            // Take some action  
            if(request.status==200){
                var comment =request.responseText;
                comment=JSON.parse(comment);
                document.getElementById("comments").innerHTML=comment;
                
             }
          }
         
     };
     
     var comment=document.getElementById("textBox");
     var commentValue=comment.value;
      request.open('GET','http://gaurav-maskara.imad.hasura-app.io/submit-comment?comment='+commentValue   ,true);
     request.send(null);
     
 };
 
 