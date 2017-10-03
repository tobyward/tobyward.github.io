var audio = new Audio('audio/Funk-tabulous.mp3'),
	img = new Image();
var count = 0

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	circles = [],
	ticks = 0;

//Create Random Circles
function create() {

	ticks += 110 / 60;
//Place the circles on the left
    this.x = W/3;
	this.y = H/2;

	if(ticks >= 110) {
//Place the circles on the right
	    this.x = W/3*2;
	    this.y = H/2;

	    if(ticks >= 110 * 1.7) {
			ticks = 0;
		}
	}


	//Random radius between 2 and 50
	this.radius = 2 + Math.random()*25; 
	
	//Random speeds and directions
	this.vx = (-5 + Math.random()*10)/1.5;
	this.vy = (-5 + Math.random()*10)/1.5;
	
	//Random colors
	this.r = Math.round(Math.random())*255;
	this.g = Math.round(Math.random())*255;
	this.b = Math.round(Math.random())*255;
}

for (var i = 0; i < 500; i++) {
	circles.push(new create(count));
}

function draw() {
	
	canvas.width = W;
    canvas.height = H; 

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, W, H);

	//Fill the canvas with circles
	for(var j = 0; j < circles.length; j++){
		var c = circles[j];
		
		//Create the circles
		ctx.beginPath();
		ctx.arc(c.x, c.y, c.radius, 0, Math.PI*2, false);
        ctx.fillStyle = "rgba("+c.r+", "+c.g+", "+c.b+", 0.5)";
		ctx.fill();
		
		c.x += c.vx;
		c.y += c.vy;
		c.radius -= .02;
		
		if(c.radius < 0)
			circles[j] = new create(count);
	}
}

var playing = false;

function animate() {

	if(playing) { //if audio is playing then play the animation
		draw();
	}

	requestAnimFrame(animate);

}

animate();

//gets the audio state
var audio = document.getElementById("audio");
audio.addEventListener("pause", function() {
	playing = false;
});

audio.addEventListener("playing", function() {
	playing = true;
});

