var MyCam;
var canvas ;
var btnCapture;
var imcanvas;
var captureFlag = false;
var btnConvert;
function watch_video(){
    

    document.getElementById("divs").style.display = "block";
    document.getElementById("conv").style.display ="none";
    MyCam = document.getElementById("MyCam");
    canvas = document.getElementById('canvas');
    btnCapture = document.getElementById("btnCapture");
    btnConvert= document.getElementById("btnConvert")
    imcanvas = canvas.getContext("2d");

    btnCapture.addEventListener("click",capture);
    btnConvert.addEventListener("click",convert);

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
    
    
    document.getElementById("btnCapture").textContent="capturer";


        } 
    }, 1000);
    
    
}

function convert(){
    document.getElementById("conv").style.display ="block";
    var base64 = canvas.toDataURL("image/jpeg");	//l'image au format base 64
    document.getElementById('conv').value = '';
    document.getElementById('conv').value = base64;
}


