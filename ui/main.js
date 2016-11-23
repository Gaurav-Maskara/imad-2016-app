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
			//	alert("Succesfully saved client's details");
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



//submit username and password to login into the app
var login = document.getElementById('login_btn');
 function loginFunction(){
	// Create a request object

	if(username=''||password=''){
       alert('Username/password cannot be empty');
       return;
	}
	var request = new XMLHttpRequest();

	// Capture the response and store it in a variable
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			// Take some action
			if (request.status === 200) {
			   	document.getElementById("closeLogin").click();
			   	loadLogin();
				submit.value = 'Success!!';
			} else if (request.status === 403) {
			    alert('Invalid credentials,Try again');
				submit.value = 'Invalid credentials,Try again';
			} else if (request.status === 500) {
				alert('Something went wrong on the server');
				submit.value = 'Login';
			} else {
				alert('Something went wrong on the server');
				submit.value = 'Login';
			}
			loadLogin();
		}  
	
	};

	// Make the request
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	

	console.log(username);
	console.log(password);
	request.open('POST', '/login', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({username: username, password: password}));  
	submit.value = 'Logging in...';

};


var register = document.getElementById('register_btn');
function registerFunction(){
    // Create a request object
    if(username=''||password=''){
       alert('Username/password cannot be empty');
       return;
	}
    
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              alert('User created successfully , Please login to unlock awesome features');
              register.value = 'Registered!';
          } else {
              alert('Could not register the user');
              register.value = 'Register';
          }
      }
    };
    
    // Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
   
   
    
    request.open('POST', '/create-user', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));  
    register.value = 'Registering...';

};



function loadLogin() {
    // Checking if the user is already logged in
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            }/* else {
                loadLoginForm();
            }*/
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadLoggedInUser(username) {
 //   alert("loadLoggedInUser");
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
           <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown"><b>HI, ${username}</b><span class="caret"></span></a>
                <ul class="dropdown-menu">
		        <li><a href="/logout">Logout</a></li>
               </ul>
           </li>
    `;
    
    var commentBox=`<textarea id="textBox" rows="3" placeholder="Enter your comments" style="width:80%"></textarea>
      <br>
      <button id="submitComment" type="submit" class="btn btn-large" onclick="myfunction()"><i class="icon-paper-plane"></i> SUBMIT</button>`;
      document.getElementById('comment_form').innerHTML = commentBox;
    
    
}

/*function loadLoginForm() {
  
	var loginArea = document.getElementById('login_area');
	 loginArea.innerHTML = `
     <li><a href="#loginModal" role="button" data-toggle="modal" class="active"><i class="icon-doc-text"></i> LOGIN/SIGNUP</a></li>  
`;
	
}*/

//The first thing to do is to check if the user is logged in!
loadLogin();


