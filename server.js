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
       </p>`

    
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


app.get('/:articleName' ,function(req, res){
    // articleName==article-one
    
    var articleName=req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});

app.get('/article-four', function (req , res){
	res.send('Article four will be served here');
	
} );

app.get('/article-five', function (req , res){
	res.send('Article five will be served here');
	
} );

app.get('/article-six', function (req , res){
	res.send('Article six will be served here');
	
	// this is written on git hub to check how conflicts occur on github
	// again this is written on git hub to see how thing swork on git hub
	
} );

app.get('/article-nine', function (req , res){
	res.send('Article nine will be served here');
	
} );

app.get('/article-ten', function (req , res){
	res.send('Article nine will be served here');
	
} );

app.get('/ui/main.js', function (req , res){
	res.sendFile(path.join(__dirname, 'ui', 'main.js'));
	
} );


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
