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

