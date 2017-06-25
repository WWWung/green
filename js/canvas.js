var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var imgObj = {
  hero1Ready: false,
  hero2Ready: false
}
var heroImg1 = new Image();
heroImg1.src = './imgs/hero1.png';
var heroImg2 = new Image();
heroImg2.src = './imgs/hero2.png';

heroImg1.onload = function () {
  imgObj.hero1Ready = true;
}
heroImg2.onload = function () {
  imgObj.hero2Ready = true;
}
var flag = true;
var dir = {
  t: false,
  d: false,
  l: false,
  r: false
}

class Hero {
  constructor() {
    this.src = heroImg1;
    this.hat = 0;
    this.vx = 2.5;
    this.vy = 0;
    this.accy = -0.5;
    this.w = 120;
    this.h = 120;
    this.posx = canvas.width/2-this.w/2;
    this.posy = canvas.height-this.h;
  };
  draw(ctx){
    if(imgObj.hero1Ready){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.save();
      ctx.drawImage(this.src,this.posx,this.posy,this.w,this.h);
      ctx.restore();
    }
  }
}

class Hat {
  constructor() {
    this.w = 53;
    this.h = 51;
    this.posx = Math.random()*(canvas.width-this.w);
    this.posy = -60;
  }
}

var hero = new Hero();
start()
function start() {
  direction();
  imgChange();
  hero.draw(ctx);
  window.requestAnimationFrame(start);
}

function direction() {
  if(dir.l){
    hero.posx-=hero.vx;
  }
  if(dir.r){
    hero.posx+=hero.vx;
  }
  if(hero.posx>canvas.width-hero.w){
    hero.posx=canvas.width-hero.w
  }
  if(hero.posx<=0){
    hero.posx=0
  }
}

function imgChange() {
  if(dir.l||dir.r){
    if(hero.src === heroImg2){
      setTimeout(()=>{
        hero.src = heroImg1
      },100)
    }else{
      setTimeout(()=>{
        hero.src = heroImg2
      },100)
    }
  }else{
    hero.src = heroImg2
  }
}

window.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      dir.l = true;
      break;
    case 39:
      dir.r = true;
      break;
  }
}
window.onkeyup = function (e) {
  switch (e.keyCode) {
    case 37:
      dir.l = false;
      break;
    case 39:
      dir.r = false;
      break;
  }
}
