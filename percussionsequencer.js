// --------------------------------------------------------------------------------------------- //
// author: heerdyes
// sketch url: https://www.openprocessing.org/sketch/1019412
// blog post: https://heerdyes.wordpress.com/2020/12/09/rudimentary-sample-sequencer-in-p5-js/
// --------------------------------------------------------------------------------------------- //

// -------------------- global variables ------------------- //
let playhead;
let samplefiles=['snare02.wav','snare00.wav','snare01.wav','sn0.wav',
                'k0.wav','kick01.wav','kick00.wav','kick03.wav','kick02.wav',
                'steel02.wav','steel01.wav','steel00.wav',
                't0.wav','tack00.wav','tack01.wav','tack02.wav',
                'clap00.wav','clap02.wav','clap01.wav',
                'click02.wav','click01.wav','click00.wav',
                'sq0.wav',
                'flute_c4.wav','flute_b.wav','flute_a.wav','flute_g.wav',
                'flute_f.wav','flute_e.wav','flute_d.wav','flute_c.wav'];
let samples=[];
let fontocra;
let sampseq;
let btnpanel;
let activepattern=0;
let patterns=[
  {
    "name": "OLDSKOOL",
    "matrix": [
      "00000000X0000000",
      "0000000000000000",
      "0000000000000000",
      "000000X000000000",
      "000X000000000000",
      "0000000000000000",
      "X000000000X00000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0X0X000000000XX0",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000XX0000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "X0X0000000000X00",
      "0000000000000000",
      "00000000000X0000",
      "00000000X0000X00",
      "0000000000000000",
      "0000000X00000000",
      "0000000000000000",
      "X0X0000000000000"
    ]
  },
  {
    "name": "FUNKZERO",
    "matrix": [
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "X0X000000000000X",
      "0000X00000000000",
      "0000000000000000",
      "X000000000000000",
      "0X00X00X00X00X00",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000000000000XX",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "000X000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "MOVEMENT",
    "matrix": [
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000000000X00X0",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "X00000X000000000",
      "0000000000000000",
      "00XX0000XX000000",
      "0000000000000000",
      "0000000000000000",
      "000000000000000X",
      "00000000000000X0",
      "0000000000000X00",
      "X000X000X00X0X00",
      "0000000000000000",
      "0000000000000000",
      "0X00000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000000000000X0",
      "00X0000000000000",
      "0000000000000000",
      "0X00000000000X00",
      "0000000000000000",
      "X00000000000X000"
    ]
  },
  {
    "name": "JUMPYJOO",
    "matrix": [
      "000000000000X000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "000X00X000000000",
      "X000X000X0000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00X00000000X0000",
      "0X00000000X00000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "X00000000000000X",
      "0X000000000000X0",
      "00X0000000000X00",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000X00X0000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "RUNNNING",
    "matrix": [
      "000000000X000000",
      "00X0000000000000",
      "00000X0000000000",
      "X000X000X0000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0X0X0000X00X00X0",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000X000000000X0",
      "00000X0000000X00",
      "000000X00000X000",
      "0000000000000000",
      "0000000000000000",
      "00000000000X0000",
      "000000X000000000",
      "X000000000000000",
      "0000000000000000",
      "00XX0000XX000XX0",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "SMOOTHEN",
    "matrix": [
      "000000000X000000",
      "000000000X000000",
      "00X0000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "XX0000XX00000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00X000000000000X",
      "000000000X0000X0",
      "000000000000000X",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "X000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "LATINONE",
    "matrix": [
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00X0X0000X0X0000",
      "0000000000000000",
      "0000000000000000",
      "X00000XX000000X0",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0X00000X0X000000",
      "X00000X000000000",
      "000XX000000000XX",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "URBNJNGL",
    "matrix": [
      "0000000000000000",
      "00000000X0000000",
      "0000000000000000",
      "X0X0000X00X000X0",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0X00000000000000",
      "00000000000X0X00",
      "X000000000X00000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00X0X00000000X0X",
      "000X0000000000X0",
      "0000000000000000",
      "000X000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "AFRICANO",
    "matrix": [
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000XXX00000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00X000000X00000X",
      "0X000000000X0000",
      "X000000000000X00",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000X00",
      "0000000000000000",
      "X0X0000000X0000X",
      "0000X00000000000",
      "0000000000000000",
      "000000XX00000000",
      "0000000000X00000",
      "X000000000000X00"
    ]
  },
  {
    "name": "USER0000",
    "matrix": [
      "0000000000000000",
      "0000000000000000",
      "000000000000X000",
      "0000000000000000",
      "00000000000XX000",
      "0000X00000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000000X0000000",
      "0000000000000000",
      "0000000X00000000",
      "0000000000000000",
      "000000000000X000",
      "00000X0000000000",
      "0000000000000X00",
      "0000000000000000",
      "0000000000000000",
      "00X0000000000000",
      "00X0000000000000",
      "0000000000000000",
      "00000000000000X0",
      "0000000000000000",
      "00000000X0000000",
      "00000X0000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "000000000X000000",
      "000000000000X000"
    ]
  },
  {
    "name": "USER0001",
    "matrix": [
      "0000000000000000",
      "000000X000000000",
      "0000000000000000",
      "000000000000000X",
      "000X000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000000X0000000",
      "00000X0000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000X000X0000",
      "000X0X000000X000",
      "0000000000000000",
      "0000000000000000",
      "0X0000000000000X",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000000X0000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000X00",
      "0000000000000000",
      "0000000000000000",
      "000000000000X00X",
      "0000000000000000"
    ]
  },
  {
    "name": "USER0002",
    "matrix": [
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000X00000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "000X00000000X000",
      "0000000000000000",
      "0000000000000000",
      "000000000000000X",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "000000000000X000",
      "000000X000000000",
      "0000000000000000",
      "0X00000X0000000X",
      "00000X0000000000",
      "0000000000000000",
      "00000000000X000X",
      "0000000000000000",
      "0000000000000000",
      "000000000X0000X0",
      "000000X000000000",
      "X00000X000X00000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "USER0003",
    "matrix": [
      "0000000000000000",
      "00000000000000X0",
      "0000000000000000",
      "00X0000000000000",
      "0000000000000000",
      "00000X0X0X000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "X0000000X0000000",
      "00X00000000X0000",
      "0000000000X00000",
      "0000000000X00000",
      "0X00000X00000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "X000000000X000X0",
      "0000000000000000",
      "000000X000000000",
      "0000000000000000",
      "00X0000000000000",
      "0000X000000X0X00",
      "00000000000000X0",
      "0000000000000000",
      "0000000000000X00"
    ]
  },
  {
    "name": "USER0004",
    "matrix": [
      "0000000000000000",
      "0000000X00000000",
      "0000000000000000",
      "0000000000X00X00",
      "0000000000000000",
      "0000000000000000",
      "00X000000000X000",
      "0000000X00000000",
      "0000000000000000",
      "0000000000000000",
      "X00000000000000X",
      "0000000000000X00",
      "0000000000000000",
      "00000X0000000000",
      "0000000000000000",
      "000000X000000X00",
      "0000000000000000",
      "000000000X000000",
      "000X0000000X0000",
      "0000000000000000",
      "000000X000000000",
      "00000X0000000000",
      "0000000000000000",
      "X00X0000X00000XX",
      "000000000X000000",
      "000X0X0000000000",
      "0000000000000000",
      "0000000000000000",
      "000000000XX00000",
      "0000000000000000",
      "0000000000000000"
    ]
  },
  {
    "name": "USER0005",
    "matrix": [
      "00000000000X0X00",
      "0000000000000000",
      "000X0X000X00X000",
      "0000000000000000",
      "0000000000000000",
      "X000000000000000",
      "0X00000000000000",
      "0000000000000000",
      "000X000000000000",
      "0000000000000000",
      "00X0000000000000",
      "0000000000000000",
      "0000000000000000",
      "00000000000X0000",
      "00000000000000X0",
      "0000000000000000",
      "X0000X0000000000",
      "0000000000000000",
      "000000000X000000",
      "0X00000000000000",
      "00000000000X0000",
      "000000000X0000XX",
      "0000000000000000",
      "0000000000000000",
      "000000000X000000",
      "000000000X000000",
      "000X000000000000",
      "0000000000000000",
      "0000000000000000",
      "X000000000X00000",
      "0000000000000000"
    ]
  },
  {
    "name": "USER0006",
    "matrix": [
      "0000000000000000",
      "00000000000000X0",
      "0X0X0X00X0000000",
      "00000000000XX000",
      "0000000000000000",
      "000X000X00X00000",
      "0000000000000000",
      "0000000000000000",
      "0X000X0000000000",
      "0000000000000000",
      "000000000000000X",
      "0000000000000000",
      "X000000000X00000",
      "000000000X000000",
      "000X00X00000XX0X",
      "0000X00000000000",
      "0000000000000000",
      "0000X00000000000",
      "0000000000000000",
      "0000000X0000000X",
      "00000000X00000X0",
      "0000000000000000",
      "000000000000X000",
      "0000000000000000",
      "0000000000000000",
      "XX00000000000000",
      "00000000000X0X00",
      "00X00X0000000000",
      "0000000000000000",
      "X000000000000000",
      "0000000000000000"
    ]
  }
];
let monitor;
let transcript;
let t=0.0;
let st=0.0;
// [mouse|key]listeners usage: [[obj1,keyhandler1],[obj2,keyhandler2]]
let keylisteners=[];
let mouselisteners=[];
let patternmemory;

// -------------------------- function definitions ------------------------- //
function rndstr(n){
  let s='';
  for(let i=0;i<n;i++){
    let c;
    if(random()<=0.5){
      c=round(random(48,57));
    }else{
      c=round(random(65,90));
    }
    s+=String.fromCharCode(c);
  }
  return s;
}

function d(msg){
  transcript.writeline(msg);
}

function wtavgcolor(c1,c2,d){
  let mr=(c1[0]+c2[0])/2;
  let dr=abs(c1[0]-c2[0])/2;
  let r=mr+dr*sin(d[0]*t);
  let mg=(c1[1]+c2[1])/2;
  let dg=abs(c1[1]-c2[1])/2;
  let g=mg+dg*sin(d[1]*t);
  let mb=(c1[2]+c2[2])/2;
  let db=abs(c1[2]-c2[2])/2;
  let b=mb+db*sin(d[2]*t);
  return [r,g,b];
}

function decohoriline(x1,x2,y,c1,c2){
  let mxpt=round(random(x1,x2));
  let M=abs(x2-x1)+1;
  for(let i=x1;i<=x2;i++){
    let rgb=this.wtavgcolor(c1,c2,[1,3,7]);
    stroke(rgb[0],rgb[1],rgb[2],64);
    point(i,y);
    t+=0.01;
  }
}

function decovertline(x,y1,y2,c1,c2){
  let mxpt=round(random(y1,y2));
  let M=abs(y2-y1)+1;
  for(let i=y1;i<=y2;i++){
    let rgb=this.wtavgcolor(c1,c2,[1,2,4]);
    stroke(rgb[0],rgb[1],rgb[2],64);
    point(x,i);
    t+=0.01;
  }
}

function decorect(x,y,w,h,c1,c2){
  noFill();
  decohoriline(x  ,x+w,y  ,c1,c2);
  decohoriline(x  ,x+w,y+h,c1,c2);
  decovertline(x  ,y  ,y+h,c1,c2);
  decovertline(x+w,y  ,y+h,c1,c2);
}
// -------------------------- end function definitions ------------------------- //

// ------------------------------ class definitions ---------------------------- //
class ActionButton{
  constructor(x,y,w,h,nm,fnonclick){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.title=nm;
    this.onclick=fnonclick;
  }
  
  wipe(){
    fill(0);
    noStroke();
    rect(this.x,this.y,this.w,this.h);
    noFill();
  }
  
  render(){
    this.wipe();
    decorect(this.x,this.y,this.w,this.h,[255,255,0],[255,0,0]);
    decorect(this.x+3,this.y+3,this.w-6,this.h-6,[255,255,0],[255,0,0]);
    textAlign(CENTER,CENTER);
    textFont(fontocra);
    fill(255,255,0);
    text(this.title,this.x+this.w/2,this.y+this.h/2);
  }
  
  sendclick(px,py){
    if(px>this.x && px<(this.x+this.w) && py>this.y && py<(this.y+this.h)){
      this.onclick();
    }
  }
}
// ---------------------------- end class ActionButton ------------------------ //

class TextInput{
  constructor(x,y,w,h,ltxt,chars,spacing){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.ltxt=ltxt.toUpperCase();
    this.nchars=chars;
    this.value=[];
    this.cursor=0;
    this.spacing=spacing;
  }
  
  wipe(){
    fill(0);
    stroke(0);
    rect(this.x,this.y,this.w,this.h);
    decorect(this.x,this.y,this.w,this.h,[255,255,0],[255,96,0]);
  }
  
  clrbdr(){
    noFill();
    stroke(0,0,0);
    rect(this.x,this.y,this.w,this.h);
    decorect(this.x,this.y,this.w,this.h,[255,255,0],[255,96,0]);
  }
  
  render(){
    this.wipe();
    textAlign(LEFT,CENTER);
    textSize(11);
    textFont(fontocra);
    fill(255,255,0);
    text(this.ltxt,this.x+this.w/12,this.y+this.h/2);
    let nv=this.value.length;
    let tfx=this.x+this.w/2;
    let tfy=this.y+this.h/2;
    for(let i=0;i<this.value.length;i++){
      text(this.value[i],tfx+i*this.spacing,tfy);
    }
    decohoriline(tfx+this.cursor*this.spacing,tfx+this.cursor*this.spacing+10,tfy+10,[255,255,255],[0,255,0]);
  }
  
  sendchar(c){
    let C=c.toUpperCase();
    let nv=this.value.length;
    if(nv<this.nchars){
      this.cursor+=1;
    }else if(nv==this.nchars){
      this.value.shift();
    }
    this.value.push(C);
    this.render();
  }
  
  getval(){
    return this.value.join('');
  }
  
  setval(v){
    this.value=[];
    for(let i=0;i<v.length;i++){
      this.value.push(v[i]);
    }
  }
}
// --------------- end class TextInput ---------------- //

class ToggleButton{
  constructor(x,y,w,h,con,coff){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.on=false;
    this.con=con;
    this.coff=coff;
  }
  
  wipe(){
    fill(0);
    noStroke();
    rect(this.x+1,this.y+1,this.w-2,this.h-2);
    noFill();
  }
  
  render(){
    let rbnds=null;
    this.wipe();
    if(this.on){
      stroke(this.con[0],this.con[1],this.con[2]);
      rect(this.x+0.3*this.w,this.y+0.3*this.h,this.w/10,0.6*this.h);
      rect(this.x+0.6*this.w,this.y+0.3*this.h,this.w/10,0.6*this.h);
    }else{
      stroke(this.coff[0],this.coff[1],this.coff[2]);
      let x1=this.x+0.3*this.w;
      let y1=this.y+0.3*this.h;
      let x2=x1;
      let y2=this.y+0.7*this.h;
      let x3=this.x+0.7*this.w;
      let y3=this.y+0.5*this.h;
      line(x1,y1,x2,y2);
      line(x2,y2,x3,y3);
      line(x3,y3,x1,y1);
    }
  }
  
  toggle(){
    d('[togglebutton] '+(this.on?'paused':'playing'));
    this.on=!this.on;
    this.render();
  }
  
  sendclick(px,py){
    if(px>this.x && px<(this.x+this.w) && py>this.y && py<(this.y+this.h)){
      this.toggle();
    }
  }
}
// ----------------------------- end class ToggleButton -------------------------------- //

class Cell{
  constructor(x,y,w,h,txt,con,coff,tsz){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.txt=txt;
    this.on=false;
    this.con=con;
    this.coff=coff;
    this.txtsz=tsz;
  }
  
  render(){
    let rbnds=null;
    if(this.on){
      fill(this.con[0],this.con[1],this.con[2]);
      rbnds=[this.x+5,this.y+5,this.w-10,this.h-10];
    }else{
      fill(this.coff[0],this.coff[1],this.coff[2]);
      rbnds=[this.x+1,this.y+1,this.w-2,this.h-2];
    }
    noStroke();
    rect(rbnds[0],rbnds[1],rbnds[2],rbnds[3]);
  }
  
  glow(swstate){
    this.on=swstate;
    this.render();
  }
  
  centertext(txt){
    this.txt=txt;
    textAlign(CENTER,CENTER);
    textSize(this.txtsz);
    textFont(fontocra);
    fill(64,255,0);
    text(txt,this.x+this.w/2,this.y+this.h/2);
  }
  
  toggle(){
    this.glow(!this.on);
  }
}
// ----------------------------------- end class Cell -------------------------------- //

class Grid{
  constructor(x,y,w,h,r,c,pencolor,fnclickhandler,tsz){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.rows=r;
    this.cols=c;
    this.pc=pencolor;
    this.rowthickness=h/r;
    this.colthickness=w/c;
    this.cellgrid=[];
    // initialize grid view
    this.makegrid(tsz);
    this.drawgrid();
    this.clickhandler=fnclickhandler;
  }
  
  makegrid(tsz){
    for(let i=0;i<this.rows;i++){
      let cellrow=[];
      for(let j=0;j<this.cols;j++){
        let cellx=this.x+j*this.colthickness;
        let celly=this.y+i*this.rowthickness;
        cellrow.push(new Cell(cellx,celly,this.colthickness,this.rowthickness,'',[255,64,0],[0,0,0],tsz));
      }
      this.cellgrid.push(cellrow);
    }
  }
  
  loadgrid(m){
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
        this.cellgrid[i][j].glow(m[i][j]);
      }
    }
  }
  
  wipe(){
    fill(0);
    noStroke();
    rect(this.x+1,this.y+1,this.w-2,this.h-2);
  }
  
  drawgrid(){
    noFill();
    stroke(this.pc[0],this.pc[1],this.pc[2]);
    rect(this.x,this.y,this.w,this.h);
    // draw row boundaries
    for(let i=1;i<this.rows;i++){
      decohoriline(this.x,this.x+this.w,this.y+i*this.rowthickness,this.pc,[this.pc[1],round(this.pc[1]/2),this.pc[0]]);
    }
    // draw col boundaries
    for(let j=1;j<this.cols;j++){
      decovertline(this.x+j*this.colthickness,this.y,this.y+this.h,this.pc,[this.pc[1],round(this.pc[1]/2),this.pc[0]]);
    }
  }
  
  render(){
    // render cells of the grid
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
        this.cellgrid[i][j].render();
      }
    }
  }
  
  rowtext(names,rownum){
    for(let j=0;j<this.cols;j++){
      this.cellgrid[rownum][j].centertext(names[j]);
    }
  }
  
  coltext(names,colnum){
    for(let i=0;i<this.rows;i++){
      this.cellgrid[i][colnum].centertext(names[i]);
    }
  }
  
  getcol(colnum){
    let bitseq=[];
    for(let i=0;i<this.rows;i++){
      bitseq.push(this.cellgrid[i][colnum].on);
    }
    return bitseq;
  }
  
  getrow(rownum){
    console.log('[TODO] in progress');
  }
  
  highlightcol(colnum,hlcolor){
    stroke(0);
    noFill();
    rect(this.x+colnum*this.colthickness,this.y,this.colthickness,this.h);
    stroke(hlcolor[0],hlcolor[1],hlcolor[2]);
    rect(this.x+colnum*this.colthickness,this.y,this.colthickness,this.h);
  }
  
  dehighlightcol(colnum){
    let morphc=[this.pc[1],round(this.pc[1]/2),this.pc[0]];
    stroke(0);
    noFill();
    rect(this.x+colnum*this.colthickness,this.y,this.colthickness,this.h);
    decorect(this.x+colnum*this.colthickness,this.y,this.colthickness,this.h,this.pc,morphc);
  }
  
  sendclick(px,py){
    if(px>this.x && px<(this.x+this.w) && py>this.y && py<(this.y+this.h)){
      let tcrow=floor((py-this.y)/this.rowthickness);
      let tccol=floor((px-this.x)/this.colthickness);
      this.clickhandler(this,px,py,tcrow,tccol);
    }
  }
}
// ------------------------------------------------- end class Grid -------------------------------------- //

class ControlGrid{
  constructor(x,y,w,h,r,c,rlt,clt,mrgn,fnrlgridonclick,fnclgridonclick,fnsubgridonclick){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.rlt=rlt;
    this.clt=clt;
    this.mrgn=mrgn;
    this.subgridw=w-rlt-mrgn;
    this.subgridh=h-clt-mrgn;
    // event handlers
    this.subgridclickhandler=fnsubgridonclick;
    this.rlgridclickhandler=fnrlgridonclick;
    this.clgridclickhandler=fnclgridonclick;
    // grid creation
    this.subgrid=new Grid(x+rlt+mrgn,y+clt+mrgn,this.subgridw,this.subgridh,r,c,[0,192,0] ,this.subgridclickhandler,11);
    this.rlgrid =new Grid(x         ,y+clt+mrgn,rlt          ,this.subgridh,r,1,[192,96,0],this.rlgridclickhandler,11);
    this.clgrid =new Grid(x+rlt+mrgn,y         ,this.subgridw,clt          ,1,c,[192,96,0],this.clgridclickhandler,11);
    // button controls
    this.playpause=new ToggleButton(this.x,this.y,this.rlt,this.clt,[240,0,60],[0,240,40]);
  }
  
  loadsubgrid(m){
    this.subgrid.loadgrid(m);
  }
  
  subgridcol(colnum){
    return this.subgrid.getcol(colnum);
  }
  
  subgridcellstate(rownum,colnum){
    return this.subgrid.cellgrid[rownum][colnum].on;
  }
  
  highlightsubgridcol(colnum,hlcolor){
    this.subgrid.highlightcol(colnum,hlcolor);
  }
  
  dehighlightsubgridcol(colnum){
    this.subgrid.dehighlightcol(colnum);
  }
  
  render(){
    this.subgrid.wipe();
    this.subgrid.drawgrid();
    this.subgrid.render();
    this.rlgrid.render();
    this.clgrid.render();
    // update text
    this.rlgrid.coltext(samplefiles.map(sf=>sf.split('.')[0]),0);
    let snum=[];
    for(let i=0;i<16;i++){
      snum.push(str(i));
    }
    this.clgrid.rowtext(snum,0);
    this.playpause.render();
  }
  
  sendclick(px,py){
    if(px>this.x && px<(this.x+this.w) && py>this.y && py<(this.y+this.h)){
      this.subgrid.sendclick(px,py);
      this.playpause.sendclick(px,py);
      this.clgrid.sendclick(px,py);
      this.rlgrid.sendclick(px,py);
    }
  }
}
// -------------------------- end class ControlGrid ------------------------- //

class SampleSequencer{
  constructor(smps,x,y,w,h,iptn){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.nameinputht=30;
    this.inputbtnw=80;
    this.smpptn=new SamplePattern(iptn);
    let outerthis=this;
    this.initgrids(outerthis,smps);
    this.initnameinput();
    this.initinputbtn(outerthis);
    this.seqpos=0;
    this.prevseqpos=15;
    this.headless=false;
  }
  
  initgrids(outerthis,smps){
    this.rlgridonclick=function(grd,mx,my,tcrow,tccol){
      d('[sample] playing '+smps[tcrow]);
      outerthis.smpptn.sqsamples[tcrow].play();
    };
    this.clgridonclick=function(grd,mx,my,tcrow,tccol){
      grd.cellgrid[tcrow][tccol].toggle();
    };
    this.subgridonclick=function(grd,mx,my,tcrow,tccol){
      grd.cellgrid[tcrow][tccol].toggle();
      outerthis.smpptn.togglebit(tcrow,tccol);
    };
    this.cgrid=new ControlGrid(this.x,this.y+this.nameinputht+10,this.w,this.h-this.nameinputht-10,smps.length,16,68,24,10,this.rlgridonclick,this.clgridonclick,this.subgridonclick);
    this.cgrid.loadsubgrid(this.smpptn.activationmatrix);
  }
  
  initnameinput(){
    this.nameinput=new TextInput(this.x,this.y,this.w-this.inputbtnw-10,this.nameinputht,'pattern name : ',8,15);
    this.nameinput.render();
    for(let i=0;i<this.smpptn.sqname.length;i++){
      this.nameinput.sendchar(this.smpptn.sqname[i]);
    }
  }
  
  initinputbtn(outerthis){
    this.ibtnonclick=function(){
      d('[inputbutton] name -> '+outerthis.nameinput.getval());
      outerthis.savepattern();
    };
    this.inputbtn=new ActionButton(this.x+this.w-this.inputbtnw,this.y,this.inputbtnw,this.nameinputht,'SAVE',this.ibtnonclick);
    this.inputbtn.render();
  }
  
  loadpattern(sqpos){
    let ptn=patterns[sqpos];
    d('[SampleSequencer] loading pattern->'+ptn.name);
    this.nameinput.setval(ptn.name);
    this.smpptn.load(ptn);
    this.cgrid.loadsubgrid(this.smpptn.activationmatrix);
    this.render();
  }
  
  clearpattern(){
    this.smpptn.clr();
    this.cgrid.loadsubgrid(this.smpptn.activationmatrix);
    this.render();
  }
  
  savepattern(){
    let sqnm=this.nameinput.getval();
    d('[SampleSequencer] saving pattern->'+sqnm);
    this.smpptn.sqname=sqnm;
    this.smpptn.dump();
    patternmemory.render();
  }
  
  render(){
    this.cgrid.render();
    this.nameinput.render();
  }
  
  isplaying(){
    return this.cgrid.playpause.on;
  }
  
  toggleplaypause(){
    this.cgrid.playpause.toggle();
  }
  
  keyhandler(kc,k){
    if(kc==32){
      this.toggleplaypause();
    }else if((kc>=65 && kc<=90) || (kc>=48 && kc<=57)){
      this.nameinput.sendchar(k);
    }
  }
  
  tick(){
    monitor.clrbdr();
    // highlight active column
    this.cgrid.dehighlightsubgridcol(this.prevseqpos);
    this.cgrid.highlightsubgridcol(this.seqpos,[255,0,255]);
    // trigger sounds
    this.smpptn.tplay(this.seqpos,0.25);
    // increment seqpos
    this.prevseqpos=this.seqpos;
    this.seqpos+=1;
    if(this.seqpos==16){
      this.seqpos=0;
    }
  }
}
// --------------------------------------- end class SampleSequencer ----------------------------------- //

class SamplePattern{
  constructor(sqpos){
    let ptn=patterns[sqpos];
    this.sqname=ptn.name;
    this.load(ptn);
    this.sqsamples=samples;
  }
  
  tplay(pos,vol){
    for(let si=0;si<this.sqsamples.length;si++){
      if(this.activationmatrix[si][pos]){
        //d('[play] '+samplefiles[si]);
        this.sqsamples[si].setVolume(vol);
        this.sqsamples[si].play();
      }
    }
  }
  
  nsamples(){
    return this.sqsamples.length;
  }
  
  zeromatrix(r,c){
    let imat=[];
    for(let i=0;i<r;i++){
      let irow=[];
      for(let j=0;j<c;j++){
        irow.push(false);
      }
      imat.push(irow);
    }
    return imat;
  }
  
  clr(){
    this.activationmatrix=this.zeromatrix(this.nsamples(),16);
  }
  
  togglebit(r,c){
    this.activationmatrix[r][c]=!this.activationmatrix[r][c];
  }
  
  // updates the activationmatrix
  // returns nothing
  load(ptn){
    this.sqname=ptn.name;
    let mat=ptn.matrix;
    let imat=[];
    for(let i=0;i<mat.length;i++){
      let irow=[];
      let row=mat[i];
      for(let j=0;j<row.length;j++){
        irow.push(row[j]==='X'?true:false);
      }
      imat.push(irow);
    }
    this.activationmatrix=imat;
  }
  
  dump(){
    let mat=[];
    for(let i=0;i<this.activationmatrix.length;i++){
      let row=this.activationmatrix[i];
      let seq='';
      for(let j=0;j<row.length;j++){
        seq+=row[j]?'X':'0';
      }
      mat.push(seq);
    }
    let ptn={
      'name':this.sqname,
      'matrix':mat
    };
    // updates global map patterns
    patterns[activepattern]=ptn;
  }
}
// --------------------------- end class SamplePattern -------------------------- //

class Display{
  constructor(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.fg=[0,255,0];
    this.bg=[0,0,0];
    this.clrscr();
  }
  
  setcolor(bg,fg){
    this.bg=bg;
    this.fg=fg;
  }
  
  clrscr(){
    fill(this.bg[0],this.bg[1],this.bg[2]);
    stroke(this.bg[0],this.bg[1],this.bg[2]);
    rect(this.x,this.y,this.w,this.h);
    decorect(this.x,this.y,this.w,this.h,this.fg,[64,0,255]);
  }
  
  clrbdr(){
    stroke(this.bg[0],this.bg[1],this.bg[2]);
    noFill();
    rect(this.x,this.y,this.w,this.h);
    decorect(this.x,this.y,this.w,this.h,this.fg,[255,0,144]);
  }
  
  rndloc(){
    let rx=random(1,this.w-1);
    let ry=random(1,this.h-1);
    return [rx,ry];
  }
  
  textxy(txy,msg){
    let tx=txy[0];
    let ty=txy[1];
    if(tx>this.w || ty>this.h){
      d('[display][textxy] out of bounds of display');
      return;
    }
    let cx=this.x+tx;
    let cy=this.y+ty;
    noStroke();
    textAlign(LEFT,TOP);
    fill(this.fg[0],this.fg[1],this.fg[2]);
    text(msg,cx,cy);
  }
  
  pointxy(pxy){
    let px=pxy[0];
    let py=pxy[1];
    if(px>this.w || py>this.h){
      d('[display][pointxy] out of bounds of display');
      return;
    }
    let cx=this.x+px;
    let cy=this.y+py;
    stroke(this.fg[0],this.fg[1],this.fg[2],64);
    point(cx,cy);
  }
}
// -------------------------------- end class Display --------------------------- //

class Transcript extends Display{
  constructor(x,y,w,h,lht,fs){
    super(x,y,w,h);
    this.lineht=lht;
    this.fs=fs;
    this.nlines=round(h/this.lineht-1);
    this.buffer=[];
    for(let i=0;i<this.nlines;i++){
      this.buffer.push('');
    }
    this.cursor=[1,h-this.lineht];
    this.renderbuffer();
  }
  
  renderbuffer(){
    super.clrscr();
    textSize(this.fs);
    for(let i=0;i<this.nlines;i++){
      super.textxy([5,i*this.lineht],this.buffer[i]);
    }
  }
  
  writeline(msg){
    this.buffer.shift();
    this.buffer.push(msg);
    this.renderbuffer();
  }
}
// ------------------------------- end class Transcript ------------------------------ //

class PatternMemory{
  constructor(x,y,w,h,ptns,onclick,tsz){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.fs=tsz;
    this.ptns=ptns;
    this.clickhandler=onclick;
    this.grid=new Grid(x,y,w,h,ptns.length,1,[192,96,0],this.clickhandler,tsz);
  }
  
  render(){
    fill(0);
    noStroke();
    rect(this.x,this.y-40,this.w,40);
    textAlign(CENTER,CENTER);
    fill(255,144,0);
    textSize(this.fs);
    text('[_MEMORY_]',this.x+this.w/2,this.y-20);
    this.grid.render();
    this.grid.coltext(patterns.map(ptn=>ptn.name),0);
  }
}
// -------------- end class PatternMemory ----------------- //

class ButtonPanel{
  constructor(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    let outerthis=this;
    this.expclk=function(){
      d('[expbtn] exporting patterns...');
      outerthis.exportpatterns();
    };
    this.expbtn=new ActionButton(this.x+10,this.y+10,80,40,'EXPORT',this.expclk);
    this.fileinputclick=function(file){
      d('[fileinput] clicked!');
      outerthis.importpatterns(file);
    };
    // hidden file input
    this.handleFileSelect=function(evt){
      var f=evt.target.files[0];
      d('[fs] '+f.size+' '+f.name+' '+f.type);
      if(f.type!=='application/json'){
        d('[fs] file has unsupported MIME type!');
        return;
      }
      d('[fs] attempting to read patterns from file...');
      var reader=new FileReader();
      reader.onload=function(e){
        let fjsob=JSON.parse(e.target.result);
        if(fjsob.length!=16){
          d('[fs] pattern file does not contain exactly 16 patterns. unloadable!');
          return;
        }
        patterns=fjsob;
        d('[fs] loaded patterns!');
        patternmemory.render();
        sampseq.loadpattern(0);
      };
      reader.readAsText(f);
    };
    this.hiddenfileinput=createElement('input','browse');
    this.hiddenfileinput.id('hfinput');
    this.hiddenfileinput.position(0,0);
    this.hiddenfileinput.attribute('type','file');
		this.hiddenfileinput.style('visibility:hidden;');
    document.getElementById('hfinput')
            .addEventListener('change',this.handleFileSelect,false);
    //
    this.impclk=function(){
      d('[impclk] importing patterns...');
      document.getElementById('hfinput').click();
    };
    this.impbtn=new ActionButton(this.x+10,this.y+60,80,40,'IMPORT',this.impclk);
    this.clrclk=function(){
      d('[clrclk] clearing active pattern...');
      outerthis.clearactivepattern();
    };
    this.clrbtn=new ActionButton(this.x+10,this.y+110,80,40,'CLEAR',this.clrclk);
  }
  
  render(){
    d('[BP] rendering');
    decorect(this.x,this.y,this.w,this.h,[192,96,0],[255,144,0]);
    decorect(this.x+1,this.y+1,this.w-2,this.h-2,[192,96,0],[255,144,0]);
    this.expbtn.render();
    this.impbtn.render();
    this.clrbtn.render();
  }
  
  exportpatterns(){
    d('[transport] saving patterns to json');
    saveJSON(patterns,'patterns.json');
  }
  
  importpatterns(file){
    d('[transport] importing patterns from json');
    console.log(file.type);
    patterns=loadJSON(file.data);
    patternmemory.render();
  }
  
  clearactivepattern(){
    d('[reset] clearing active pattern');
    sampseq.clearpattern();
  }
}

// ------------------------------- end class definitions --------------------------------------- //

// --------------------------------------- p5js function definitions ---------------------------------- //
function preload(){
  fontocra=loadFont('ocr-a_regular.ttf');
	for(let i=0;i<samplefiles.length;i++){
		samples.push(loadSound(samplefiles[i]));
	}
  getAudioContext().resume();
}

function setup(){
  let w=1600,h=900;
  let cnv=createCanvas(1600,900);
  cnv.mousePressed(mousehandler);
  background(0);
	frameRate(30);
  playhead=0;
  monitor=new Display(w/2-300,20,600,160);
  transcript=new Transcript(w/2-526,810,1052,80,10,11);
  sampseq=new SampleSequencer(samplefiles,w/2-300,200,600,600,activepattern);
  keylisteners.push([sampseq,sampseq.keyhandler]);
  mouselisteners.push([sampseq.cgrid,sampseq.cgrid.sendclick],
                      [sampseq.inputbtn,sampseq.inputbtn.sendclick]);
  sampseq.render();
  // pattern memory
  let pmonclick=function(grd,mx,my,tcrow,tccol){
    d('[patternmemory] pattern: '+tcrow);
    activepattern=tcrow;
    sampseq.loadpattern(tcrow);
  };
  patternmemory=new PatternMemory(275,200,100,600,patterns,pmonclick,14);
  mouselisteners.push([patternmemory.grid,patternmemory.grid.sendclick]);
  patternmemory.render();
  btnpanel=new ButtonPanel(w/2+400,200,100,160);
  mouselisteners.push([btnpanel.expbtn,btnpanel.expbtn.sendclick],
                      [btnpanel.impbtn,btnpanel.impbtn.sendclick],
                      [btnpanel.clrbtn,btnpanel.clrbtn.sendclick]);
  btnpanel.render();
}

function draw(){
  playhead+=1;
  if(playhead%6==0 && sampseq.isplaying()){
    sampseq.tick();
  }
  if(sampseq.isplaying()){
    let xx=300*(1+map(mouseX,0,width,0.0,1.0)*sin(0.5*st));
    let yy=80*(1+map(mouseY,0,height,0.0,1.0)*cos(1.1*st));
    let pt=[xx,yy];
    let rr=128*(1+0.4*sin(2*st));
    let gg=128*(1+0.4*cos(1*st));
    let bb=32*(1+0.5*sin(4*st));
    monitor.fg=[rr,gg,bb];
    monitor.pointxy(pt);
    st+=0.02;
  }
  if(playhead%8==0){
    t+=0.05;
  }
  if(t>20000.0){
    t=0.0;
  }
}

// --------------------------------- event handlers -------------------------------- //
function mousehandler(){
  for(let i=0;i<mouselisteners.length;i++){
    let ob=mouselisteners[i][0];
    let fn=mouselisteners[i][1];
    fn.call(ob,mouseX,mouseY);
  }
}

function keyPressed(){
  for(let i=0;i<keylisteners.length;i++){
    let ob=keylisteners[i][0];
    let fn=keylisteners[i][1];
    fn.call(ob,keyCode,key);
  }
}

// --------------------------------- end event handlers ------------------------- //
