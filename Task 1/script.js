let seconds = 0;
let minutes = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let interval = null;
let status = "stopped";

function stopWatch() {
    seconds++;
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;
    }
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }
    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    } else{
        displayMinutes = minutes;
    }
    if(minutes === 5){
    document.getElementById("display").style.color = 'red';
    document.getElementById("startStop").innerHTML = "Reset";
    reset();
    }
    document.getElementById("display").innerHTML = displayMinutes + ":" + displaySeconds;
}

function startStop(){
    if(status === "stopped"){
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Pause";
        status = "started";
    } else if (status === 'completed') {
        document.getElementById("display").style.color = 'black';
        document.getElementById("startStop").innerHTML = "Start";
        document.getElementById("display").innerHTML = "00:00";
        status = "stopped";
    } else {
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";
    }
}

function reset(){
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    status = "completed";
}