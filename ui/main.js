console.log('Loaded!');

var element =document.getElementById("mainId");
element.innerHTML="This is the new Value of the Element";

var img =document.getElementById('shiva');
var marginLeft=0;

function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+"px";
    
}

img.onclick=function() {
    
    var interval=setInterval(moveRight ,100);
    
  
};