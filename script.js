var MyCam;
var canvas ;
var btnCapture;
var imcanvas;
var captureFlag = false;
var btnConvert;
var btnDownload;
var range;
var img; 
function watch_video(){
    
    
    document.getElementById("divs").style.display = "block";
    document.getElementById("conv").style.display ="none";
   
    MyCam = document.getElementById("MyCam");
    canvas = document.getElementById('canvas');
    btnCapture = document.getElementById("btnCapture");
    btnConvert= document.getElementById("btnConvert");
    btnDownload=document.getElementById("btnDownload");
    imcanvas = canvas.getContext("2d");
    btnCapture.addEventListener("click",capture);
    btnConvert.addEventListener("click",convert);
    btnDownload.addEventListener("click",download_img);
    range=document.querySelectorAll('input[type=range]');
    
    navigator.getUserMedia = (

        navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia );

    if(navigator.getUserMedia){

        navigator.getUserMedia({
            video : true,
        }, SuccessCapture, ErrorCapture);

    }else{
        var source = document.createElement('source');
    source.setAttribute('src', 'video.mp4');
    MyCam.appendChild(source);
    MyCam.play();
    }
    
}



function SuccessCapture(stream){
    MyCam.srcObject = stream;
}

function ErrorCapture(error){
    console.log("error " + error);
    var source = document.createElement('source');
    source.setAttribute('src', 'video.mp4');
    MyCam.appendChild(source);
    MyCam.play();
}

function capture(){
    
    var seconds = 4;
    var countdown = setInterval(function() {
         seconds--;
        document.getElementById("btnCapture").textContent = seconds;
       
        if (seconds <= 0){
            clearInterval(countdown);
            captureFlag = true;
    
    imcanvas.drawImage(MyCam, 0, 0, canvas.width, canvas.height);
    img = document.createElement("img");
    img.src= canvas.toDataURL('img/jpeg',1.0);
    canvas.prepend(img);
    
    document.getElementById("btnCapture").textContent="capturer";
    

        } 
    }, 1000);
    
    
}
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image.src;
}

function convert(){
    document.getElementById("conv").style.display ="block";
    var base64 = canvas.toDataURL("image/jpeg");	//l'image au format base 64
    document.getElementById('conv').value = '';
    document.getElementById('conv').value = base64;
}

function download_img() {
    var caa=document.getElementById('canvas');
  document.getElementById("download").href = caa.toDataURL("image/jpeg");
};

function filter(){
    
    var computedFilters = '';
    var r = document.querySelectorAll('input[type=range]');
    r.forEach(function(item, index){
        computedFilters += item.getAttribute('data-filter') + '(' + item.value + item.getAttribute('data-scale') + ') ';

    });
    
    imcanvas.filter = computedFilters;
    //imcanvas.filter="contrast(240%)";
    imcanvas.drawImage(img, 0, 0, canvas.width, canvas.height);

}



function getOffset( el ) {
    var _x = 0; 
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function cropImg(){
var sourceCX = getOffset(document.getElementById('canvas')).left;
var sourceCY = getOffset(document.getElementById('canvas')).top;
console.log('sourceCX='+sourceCX, 'sourceCY='+sourceCY);
var sourceX = getOffset(document.getElementById('resizable')).left;
var sourceY = getOffset(document.getElementById('resizable')).top;
console.log('sourceX='+sourceX, 'sourceY='+sourceY);
var sourceW = document.getElementById('resizable').offsetWidth;
var sourceH = document.getElementById('resizable').offsetHeight;
console.log('sourceW='+sourceW, 'sourceH='+sourceH);
var destW = 400;
var destH = 200;
var destX = 0;
var destY = 0;
imcanvas.clearRect(0, 0, canvas.width,canvas.height);
imcanvas.drawImage(img, sourceX-sourceCX, sourceY-sourceCY, sourceW, sourceH, destX, destY, destW, destH);
img = document.createElement("img");
img.src = canvas.toDataURL('image/jpeg', 1.0);
canvas.prepend(img);
}

function crop(){
    const element = document.querySelector('.resizable');
    var x = element.getBoundingClientRect().left-canvas.getBoundingClientRect().left;
    var y = element.getBoundingClientRect().top-canvas.getBoundingClientRect().top;
    var w = element.getBoundingClientRect().width;
    var h = element.getBoundingClientRect().height;

    console.log(x, y, w, h)
    imcanvas.clearRect(canvas,x,y,w,h,0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height);

    imcanvas.drawImage(canvas,x,y,w,h,0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height);
    img = document.createElement("img");
    img.src= canvas.toDataURL('img/jpeg',1.0);
    canvas.prepend(img);
}

