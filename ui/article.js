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
 
 var currentArticleTitle = window.location.pathname.split('/')[1];

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
 
/*window.onload = function() {
    
      $.getJSON('http://freegeoip.net/json/', function (location) {
        var ip=location.ip;
        var region=location.region_name;
        var city=location.city;
        var country=location.country_name;
        
        //    alert(ip +city+country+region );
         
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
     request.send(null);
};*/


function checkLogin(){
    alert("inside check login");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadCommentForm(username){
    var commentBox=`<textarea id="textBox" rows="3" placeholder="Enter your comments" style="width:80%"></textarea>
      <br>
      <button id="submitComment" type="submit" class="btn btn-large" onclick="submitComment()"><i class="icon-paper-plane"></i> SUBMIT</button>`;
      document.getElementById('comment_form').innerHTML = commentBox;
      
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
           <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown"><b>HI, ${username}</b><span class="caret"></span></a>
                <ul class="dropdown-menu">
		        <li><a href="/logout">Logout</a></li>
               </ul>
           </li>
    `;
}


function loadComments () {
       
     alert("inside load comments");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                alert("response received from the server");
                var content = '';
                var commentsData = JSON.parse(request.responseText);
                alert(commentsData);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                alert(content);
                comments.innerHTML = content;
            } else {
                comments.innerHTML='Oops! Could not load comments!';
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

function submitComment() {
        // Create a request object
        alert("Inside submit comment");
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clearing the form & reloading all the comments
                    document.getElementById('textBox').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
          }
        };
        
        // Make the request
        var comment = document.getElementById('textBox').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        
}
