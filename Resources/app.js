// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff'
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Crash Detect',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);


// Open the window
win1.open();


// Crash Detection using Core Motion
var CoreMotion = require('ti.coremotion');


if (CoreMotion.isAccelerometerAvailable()) {
   // Start the service
   accelerometer_state = true;
}

var accelX = accelY = accelZ = 0;
var lastX = lastY = lastZ = 0;
var CRASH_THRESHOLD = 2;

/*
function updateMotionData (e) {
    
    if (e.success) {     
        var data = e.userAcceleration;
        if (Math.abs(lastX - data.x) > CRASH_THRESHOLD) {
            accelX++;
        }
        if (Math.abs(lastY - data.y) > CRASH_THRESHOLD) {
            accelY++;
        }
        if (Math.abs(lastZ - data.z) > CRASH_THRESHOLD) {
            accelZ++;
        }
        crashDetect();
        lastX = data.x;
        lastY = data.y;
        lastZ = data.z;
        
    } else {
        if (e.error) Ti.API.error(e.error);
    }
}

function crashDetect(){
	if (accelX > SHAKE_THRESHOLD || accelY > SHAKE_THRESHOLD || accelZ > SHAKE_THRESHOLD) {
        var err = SHAKE_THRESHOLD * 0.5;
        if (accelX > SHAKE_THRESHOLD && (accelY < err && accelZ < err)){
            alert("Crash detected!");
        }
        else if (accelY > SHAKE_THRESHOLD && (accelX < err && accelZ < err)){
            alert("Crash detected!");
        }
        else if (accelZ > SHAKE_THRESHOLD && (accelX < err && accelY < err)){
            alert("Crash detected!");
        }
        else {
            alert("You probably just hit a bump.");
        }        
        accelX = accelY = accelZ = 0;
    }
}
*/

function updateMotionData(e) {
    if (e.success) {
        var data = e.userAcceleration;
        if (data.x > 0 || data.y > 0 || data.z >0){
            alert("Crash detected!");
        }
    }
    else {
        if (e.error) Ti.API.error(e.error);
    }
}

function crashDetect(){
    if (accelX > SHAKE_THRESHOLD || accelY > SHAKE_THRESHOLD || accelZ > SHAKE_THRESHOLD) {
        alert("Crash detected!")
    }
}