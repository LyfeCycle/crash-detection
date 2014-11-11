// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//
// create base UI tab and root window
//

var win = Titanium.UI.createWindow({  
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

win.add(label1);

// Open the window
win.open();


// Crash Detection using Core Motion
var CoreMotion = require('ti.coremotion');

if (CoreMotion.isAccelerometerAvailable()) {
    // Start the service
    accelerometer_state = true;
    alert("accelerometer polling started");
    // Send data at 1 s (1000 ms) intervals
    CoreMotion.setAccelerometerUpdateInterval(1000);
    // Start with a callback
    CoreMotion.startAccelerometerUpdates(updateAccelData);
}

var accelX = accelY = accelZ = 0;
var lastX = lastY = lastZ = 0;
var CRASH_THRESHOLD = 2;


function updateAccelData (e) {
    
    if (e.success) {     
        var data = e.acceleration;
        if (Math.abs(lastX - data.x) > CRASH_THRESHOLD) {
            accelX++;
            alert("Crash detected!");
        }
        if (Math.abs(lastY - data.y) > CRASH_THRESHOLD) {
            accelY++;
            alert("Crash detected!");
        }
        if (Math.abs(lastZ - data.z) > CRASH_THRESHOLD) {
            accelZ++;
            alert("Crash detected!");
        }
        // crashDetect();
        lastX = data.x;
        lastY = data.y;
        lastZ = data.z;

        data = e.attitude;
        
    } else {
        if (e.error) Ti.API.error(e.error);
    }
}

/*
function crashDetect(){
	if (accelX > CRASH_THRESHOLD || accelY > CRASH_THRESHOLD || accelZ > CRASH_THRESHOLD) {
        var err = CRASH_THRESHOLD * 0.5;
        if (accelX > CRASH_THRESHOLD && (accelY < err && accelZ < err)){
            alert("Crash detected!");
        }
        else if (accelY > CRASH_THRESHOLD && (accelX < err && accelZ < err)){
            alert("Crash detected!");
        }
        else if (accelZ > CRASH_THRESHOLD && (accelX < err && accelY < err)){
            alert("Crash detected!");
        }
        else {
            alert("You probably just hit a bump.");
        }        
        accelX = accelY = accelZ = 0;
    }
}
*/
