var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session = require('express-session');

var config = {
    user: 'gaurav-maskara',
    database: 'gaurav-maskara',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

/*var articles={

'article-one':{
    title:'Article One| Gaurav Maskara',
    heading:'Article One',
    date:'26 September',
     content:`<p>This is the content for my second article. </p>`,
},
 'article-two':{
    title:'Article Two| Gaurav Maskara',
    heading:'Article Two',
    date:'18 September',
    content:`<p>This is the content for my second article. </p>`
},
 'article-three':{
    title:'Article Three| Gaurav Maskara',
    heading:'Article Three',
    date:'18 September',
    content:`<p>This is the content for my third article. </p>`
}
};*/

function createTemplate(data){

var title=data.title;
var date =data.date;
var content=data.content;
var heading=data.heading; 
var video=data.video;

var htmlTemplate=`
<html lang="en">
<head>
<title>
${title}
</title>
<link rel="shortcut icon" href="http://i-cdn.phonearena.com/images/article/58161-image/25-cool-new-icon-packs-and-themes-to-freshen-up-your-Android-style-2014-edition.jpg" type="image/x-icon" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="text/javascript" src="/ui/article.js"></script>
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="font/css/fontello.css" rel="stylesheet">
<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css" media="screen">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script>
 window.onload = function() {
    checkLogin();}
</script>

</head>
<body>
<div class="navbar">
  <div class="navbar-inner">
    <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </a> <a class="brand" href="/"><img src="img/user.jpg" alt=""></a>
      <ul class="nav nav-collapse pull-right">
        <li><a href="/" class="active"><i class="icon-user"></i> Profile</a></li>
        <li><a href="skills.html"><i class="icon-trophy"></i> Skills</a></li>
        <li><a href="/resume/Gaurav_Maskara_Resume"><i class="icon-doc-text"></i> Resume</a></li>
        <li class="dropdown">
		          <a class="dropdown-toggle" data-toggle="dropdown">Articles<span class="caret"></span></a>
		          <ul class="dropdown-menu">
        		    <li><a href="/article-one">Article One</a></li>
		            <li><a href="/article-two">Article Two</a></li>
        		    <li><a href="/article-three">Article Three</a></li> 
		          </ul>
        </li>
      </ul>
       <ul class="nav nav-collapse pull-right">
        <li><a href="index.html" class="active"><i class="icon-doc-text"></i> LOGIN/SIGNUP</a></li>
      </ul>
      <div class="nav-collapse collapse"></div>
    </div>
  </div>
</div>

<div class="container work">
  <h2> ${heading}</h2>
  <div>
  ${date.toDateString()}
  </div>
  
  <div>
  ${video}
  </div>
  
  <br><br><br>
  <div>
   ${content}
  </div>
  
  <h2><u>Comment Section</u></h2>
  <ul id="commentList">
  </ul>
  
  <div id="comments">
                <center>Loading comments...</center>
  </div>
  
  <div class="modal-body" style="text-align: left;" id="comment_form">
     /* <textarea id="textBox" rows="3" placeholder="Enter your comments" style="width:80%"></textarea>
      <br>
      <button id="submitComment" type="submit" class="btn btn-large" onclick="myfunction()"><i class="icon-paper-plane"></i> SUBMIT</button>*/
  </div>
  
</div>
<div class="row social">
  <ul class="social-icons">
    <li><a href="https://www.facebook.com/gaurav.maskara.7" target="_blank"><img src="img/fb.png" alt=""></a></li>
    <li><a href="https://www.linkedin.com/in/gaurav-maskara-8682a0a6?trk=hp-identity-name" target="_blank"><img src="img/linkedin_circle_color-512.png" alt=""></a></li>
    <li><a href="https://twitter.com/MaskaraGaurav" target="_blank"><img src="img/tw.png" alt=""></a></li>
    <li><a href="https://plus.google.com/u/0/105122053130989041348" target="_blank"><img src="img/go.png" alt="go"></a></li>
  </ul>
</div>
<div class="footer">
  <div class="container">
    <p class="pull-left"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=gauravmaskara007@gmail.com" target="_blank">gauravmaskara007@gmail.com</a></p>
    <p class="pull-right"><a href="#myModal" role="button" data-toggle="modal"> <i class="icon-mail"></i> FEEDBACK</a></p>
  </div>
</div>
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="close">x</button>
    <h3 id="myModalLabel"><i class="icon-mail"></i> Submit Your Feedback</h3>
  </div>
  <div class="modal-body">
      <input type="text" placeholder="Your Name" id="name">
      <input type="text" placeholder="Your Email" id="email">
      <input type="text" placeholder="Website (Optional)" id="website">
      <textarea rows="3" style="width:80%" id="text"></textarea>
      <br>
      <button type="submit" class="btn btn-large" onclick="return feedback()"><i class="icon-paper-plane"></i> SUBMIT</button>
  </div>
</div>
<script src="js/jquery-1.10.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ui/main.js"></script>
<script>
$('#myModal').modal('hidden')
</script>
</body>
</html>
`;

return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input, salt) {
    // how do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
    
}

app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "Gaurav", "password": "password"}
   // JSON
  
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
 
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});


app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Matching the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt);
              if (hashedPassword === dbString) {
                
                // Setting the session
                req.session.auth = {userId: result.rows[0].id};
                // setting cookie with a session id
                // internally, On the server side, It maps the session id to an object (req)
                // { auth: {userId }}
                
                res.send('Credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});


app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
      
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});


app.get('/logout', function (req, res) {
   delete req.session.auth;
  res.sendFile(path.join(__dirname, 'ui', 'logout.html'));
});



var pool = new Pool(config);
app.get('/test-db',function (req, res){
   //make a select request 
   // return a response with the results
   pool.query('SELECT * FROM test',function (err, result){
       if(err){
           res.status(500).send(err.toString());  
       }
       else{
           res.send(JSON.stringify(result.rows));
       }
       
   });
});



var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

var names=[];
app.get("/submit-name",function(req ,res){ //URL :/submit-name?name=xxxxx
    //get the name from the request object 
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

/*app.get("/submit-comment",function(req ,res){ 
    //get the name from the request object 
    var comment=req.query.comment;
    comment =comment + " this part is returned from the server ";
   // res.send(JSON.stringify(comment));
   res.send(comment);
    
});*/

/*var comments=[];
app.get("/submit-comment",function(req ,res){ 
    //get the comment from the request object 
    var comment=req.query.comment;
    comments.push(comment);
    res.send(JSON.stringify(comments));
});*/


app.get("/submit-comment",function(req ,res){ 
    //get the comment from the request object 
    var comment=req.query.comment;
    var comments;
   
    pool.query("insert into comment (comment) values ($1)",[comment],function(err,result){
       if (err)
			res.status(500).send(err.toString());

	else{
	    pool.query("SELECT * FROM comment ",function(err,result){
        if(err){
                   res.status(500).send(err.toString()); 
               }
        else{
            if(result.rows.length===0){
               res.status(404).send('Unable to fetch comments from the database');
            }
            else{
                for(var i=0;i<result.rows.length;i++){
                     comments=comments+"<li>"+result.rows[i].comment+"</li>";
                }
                  res.send(comments);
            }
        }
     });
	   }	
    });
  
});


app.get("/comments",function(req ,res){ 
	    pool.query("SELECT * FROM comment ",function(err,result){
           if(err){
               res.status(500).send(err.toString()); 
            }
           else{
              if(result.rows.length===0){
                 res.status(404).send('Unable to fetch comments from the database');
               }
            else{
                var comments;
                for(var i=0;i<result.rows.length;i++){
                     comments=comments+"<li>"+result.rows[i].comment+"</li>";
                }
                  res.send(comments);
            }
        }
    });
});
  
app.get("/feedback",function(req ,res){ 

	var name=req.query.name;
	var email=req.query.email;
	var website=req.query.website;
	var text=req.query.text;
    
   
    pool.query("insert into feedback (name,email,website,text) values ($1,$2,$3,$4)",[name,email,website,text],function(err,result){
       if (err)
			res.status(500).send(err.toString());

	else{
	  
	    }	
    });
  
});

app.get("/client/details",function(req ,res){ 

	var ip=req.query.ip;
	var city=req.query.city;
	var region=req.query.region;
	var country=req.query.country;
   
    pool.query("insert into clientdetails (ip,city,region,country) values ($1,$2,$3,$4)",[ip,city,region,country],function(err,result){
       if (err)
			res.status(500).send(err.toString());

	else{
	  
	    }	
    });
  
});

app.get('/resume/Gaurav_Maskara_Resume', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'Gaurav_Maskara_Resume.pdf'));
});


app.get('/:articleName' ,function(req, res){
    // articleName==article-one
    
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
        if(err){
           res.status(500).send(err.toString()); 
        }
        else{
            if(result.rows.length===0){
             //  res.status(404).send('Article Not Found in the database');
                 res.sendFile(path.join(__dirname, 'ui', 'error.html'));
            }
            else{
                var articleData=result.rows[0];
            	res.send(createTemplate(articleData));
            }
        }
    });

});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req , res){
	res.sendFile(path.join(__dirname, 'ui', 'main.js'));
} );

app.get('/ui/article.js', function (req , res){
	res.sendFile(path.join(__dirname, 'ui', 'article.js'));
} );

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/css/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css/', 'style.css'));
});

app.get('/css/bootstrap.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css/', 'bootstrap.css'));
});

app.get('/font/css/fontello.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/font/css/', 'fontello.css'));
});

app.get('/js/jquery-1.10.1.min.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js/', 'jquery-1.10.1.min.js'));
});

app.get('/js/bootstrap.min.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js/', 'bootstrap.min.js'));
});

app.get('/img/user.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img/', 'user.jpg'));
});

app.get('/img/gaurav.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img/', 'gaurav.png'));
});

app.get('/img/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img/', 'fb.png'));
});

app.get('/img/linkedin_circle_color-512.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img/', 'linkedin_circle_color-512.png'));
});

app.get('/img/tw.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img/', 'tw.png'));
});

app.get('/img/go.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img/', 'go.png'));
});

app.get('/font/font/fontello.ttf', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/font/font/', 'fontello.ttf'));
});

app.get('/font/font/fontello.woff', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/font/font/', 'fontello.woff'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
