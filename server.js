var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles={

'article-one' :{
    title:'Article One| Gaurav Maskara',
    heading:'Article One',
    date:'26 September',
    content:`
    
      <p>This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first artic
       </p>
       
       <p>This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first artic
       </p>
       
       <p>This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first artic
       </p>`,
       
    
},
 'article-two':{
    
    title:'Article Two| Gaurav Maskara',
    heading:'Article Two',
    date:'18 September',
    content:`
    
      <p>This is the content for my second article. 
       </p>
       
       `
},
 'article-three':{
    
    
    title:'Article Three| Gaurav Maskara',
    heading:'Article Three',
    date:'18 September',
    content:`
    
      <p>This is the content for my third article. 
       </p>
       
       `
}
};

function createTemplate(data){

var title=data.title;
var date =data.date;
var content=data.content;
var heading=data.heading; 

var htmlTemplate=`<html>
<head>
    
    <title>
    ${title}
    </title>
    
    <meta name="viewport" content="width=device-width ,initial-scale=1">
    <link href="/ui/style.css" rel="stylesheet" />
    <script type="text/javascript" src="/ui/article.js"></script>
   
</head>
    
    <body>
        
        <div class="container">
        
        
           <div>
            <a href="/">Home</a>
           </div>
        
           <hr/>
        
            <h3>
               ${heading}
            </h3>
        
            <div>
               ${date}
            </div>
        
        
        <div>
        ${content}
        </div>
      
      
      
        <div id="footer" class="footer">
        <input id="textBox" type="textbox" placeholder="Enter your comments here "> 
        <input id="submitComment" type="submit" onclick="myfunction()">
        
        
        <span id="comments"></span>
       
       
       </div>
        
       
        
        
       
        
    </body>
    
</html>
`;

return htmlTemplate;

}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var names=[];
app.get("/submit-name",function(req ,res){ //URL :/submit-name?name=xxxxx
    //get the name from the request object 
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
  
    
});



app.get("/submit-comment",function(req ,res){ 
    //get the name from the request object 
    var comment=req.query.comment;
    comment =comment + " this part is returned from the server ";
   // res.send(JSON.stringify(comment));
   res.send(comment);
    
});

app.get('/:articleName' ,function(req, res){
    // articleName==article-one
    
    var articleName=req.params.articleName;
	res.send(createTemplate(articles[articleName]));
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

app.get('/ui/4.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '4.jpg'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
