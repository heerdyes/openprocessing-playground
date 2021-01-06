// ---------------------------------------------------------- //
// author: heerdyes
// sketch url: https://www.openprocessing.org/sketch/945469
// ---------------------------------------------------------- //

var state=0;
var r=10.0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(50);
}

function translucentwipe(bg,a){
	fill(bg,bg,bg,a);
	rect(0,0,width-1,height-1);
}

function draw() {
	if(state==1){
	  translucentwipe(50,25);
	}
	var x=radians(frameCount);
	stroke(0,240,0,state==0?30:255);
	noFill();
	line(mouseX, mouseY, mouseX+r*sin(x), mouseY+r*cos(x));
}

function mouseClicked(){
	if(state==0){
		state=1;
	}else if(state==1){
		state=0;
	}
}
