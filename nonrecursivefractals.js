let fq=[];
let paused=true;

class Branch{
  constructor(x,y,r,a){
    this.x=x;
    this.y=y;
    this.r=r;
    this.a=a;
  }
  
  draw(){
    let nx=this.x+this.r*cos(this.a);
    let ny=this.y-this.r*sin(this.a);
    line(this.x,this.y,nx,ny);
    return [nx,ny];
  }
}

function initfractal00(){
  fq=[];
  fq.push(new Branch(width/2,height/2,300,0));
  fq.push(new Branch(width/2,height/2,300,PI));
}

function initfractal01(){
  fq=[];
  fq.push(new Branch(width/2,height/2,200,0));
  fq.push(new Branch(width/2,height/2,200,2*PI/3));
  fq.push(new Branch(width/2,height/2,200,4*PI/3));
}

function initfractal02(){
  fq=[];
  fq.push(new Branch(width/2,height/2,200,0));
  fq.push(new Branch(width/2,height/2,200,PI/2));
  fq.push(new Branch(width/2,height/2,200,PI));
  fq.push(new Branch(width/2,height/2,200,3*PI/2));
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
  stroke(255,255,255,192);
	initfractal02();
}

function grow00(){
  if(fq.length<=0){ return; }
  let cur=fq.shift();
  if(cur.r<1.0){ return; }
  let nxy=cur.draw();
  let nr=0.45*cur.r;
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a+PI/2));
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a-PI/2));
}

function grow01(){
  if(fq.length<=0){ return; }
  let cur=fq.shift();
  if(cur.r<1.0){ return; }
  let nxy=cur.draw();
  let nr=0.55*cur.r;
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a+15*PI/31));
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a-15*PI/31));
}

function grow02(){
  if(fq.length<=0){ return; }
  let cur=fq.shift();
  if(cur.r<1.0){ return; }
  let nxy=cur.draw();
  let nr=0.55*cur.r;
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a+10*PI/21));
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a));
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a-10*PI/21));
}

function grow03(){
  if(fq.length<=0){ return; }
  let cur=fq.shift();
  if(cur.r<1.0){ return; }
  let nxy=cur.draw();
  let nr=0.55*cur.r;
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a+10*PI/21));
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a));
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a-10*PI/21));
}

function grow04(){
  if(fq.length<=0){ return; }
  let cur=fq.shift();
  if(cur.r<1.0){ return; }
  let nxy=cur.draw();
	let rfrac=map(mouseY,0,height,0.1,0.9);
	let afrac=map(mouseX,0,width,0,PI/2);
  let nr=rfrac*cur.r;
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a+afrac));
  //fq.push(new Branch(nxy[0],nxy[1],nr,cur.a));
  fq.push(new Branch(nxy[0],nxy[1],nr,cur.a-afrac));
}

function draw() {
	if(!paused){
    grow04();
  }
}

function mousePressed(){
  paused=!paused;
}

function keyPressed(){
	if(key=='c'){
    background(0);
    initfractal02();
  }
}

