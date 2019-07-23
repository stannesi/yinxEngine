// Import stylesheets
import './style.css';

// impore the core engine 
import { YinxEngine } from './core/';

// import the baseObject and grid Object
import { BaseObject, Grid } from './objects/';

// Write Javascript code!

/************************ */

/*
 * This is a test custom class created to show how to use
 * the BaseObject Class
 * update() fucntion  - for updating position
 * draw() function - from drawing 
 * all renderable object inherit from the baseObject
*/
class BouncingBall extends BaseObject {
  constructor(name, size, color, speed) {
    super(name)
    this.name = name || 'bouncing-ball';
    this._active = true;
    this._renderable = true;
    
    this.size = size || 10;
    this.color = color || 'white'
    this.speed = speed || 1;
    this.timeScale = 1;
  }

  start(){
    this.transform.x = 1,
    this.transform.y = 1,
    this.force = 2,
    this.gravity = 5;
    this.count = 0;
  }

  update(deltaTime) {
    this.bounce();
  }

  draw(renderer) {
    let ctx = renderer.context;
    ctx.beginPath();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.transform.x, this.transform.y, this.size, 0, Math.PI * 360);
    ctx.fill();
  }

  bounce(){
    if(this.transform.x >= Yinx.renderer.width || this.transform.x <= 0) { this.force *=- 1; }
    if(this.transform.y >= Yinx.renderer.height || this.transform.y <= 0) { this.gravity *= -1; }

    this.transform.x += this.force * this.speed * this.timeScale;
    this.transform.y += this.gravity * this.speed  * this.timeScale;
  }
}


// get the parent element of the html element in DOM
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h2> [ Yinx ] 2D Engine <div id="times">00</div></h2>`;

// start Enging - Yinx is not the name...lol its still nameless
const Yinx = new YinxEngine(640, 480, appDiv);
window.Yinx = Yinx;

// set render engine display background 
// Yinx.renderer.setBackgroundColor('rgba(0,0,0, 0.8)')

// create scenes
const scene1 = Yinx.scene.create('2-ball-scene-no-grid');
const scene2 = Yinx.scene.create('1-ball-scene');
const scene3 = Yinx.scene.create('2-ball-scene');
const scene4 = Yinx.scene.create('all-balls');

// a genric grid Object 
const grid = new Grid(Yinx.renderer.width, Yinx.renderer.height, 50, 50, 'grey');
// create a new 
const yBall = new BouncingBall('yellow-ball', 20, 'yellow', 0.5);
const rBall = new BouncingBall('red-ball', 10, 'red', 1.5);
const gBall = new BouncingBall('green-ball', 40, 'green', 2);
const wBall = new BouncingBall('white-ball', 30, 'white', 0.7);


window.grid = grid;
// // scene1.add(yBall);
// rBall.addChild(gBall);
// // wBall.visible = false;
// rBall.addChild(wBall);
// // grid.active = true;
// grid.addChild(yBall);
// grid.addChild(gBall);
// scene1.add(yBall);


scene1.add(yBall);
scene1.add(rBall);

scene2.add(grid);
scene2.add(yBall);

scene3.add(grid);
scene3.add(yBall);
scene3.add(rBall);


scene4.add(grid);
scene4.add(yBall);
scene4.add(rBall);
scene4.add(gBall);

grid.name = "GRID-01";



// rBall.addChild(yBall);

// yBall.addChild(gBall);
// scene2.add(yBall);
// rBall.addChild(gBall);



/* you can load scene with Yinx Engine sceneManager {name} or (index) or
* from the scene object as used below
* Yinx.scene.load('ball-scene');
* Yinx.scene.load(0)
*/
// scene1.load();

// render scene to screen for dislay 
Yinx.render();
// start yinx engine which 
Yinx.start();
Yinx.scene.start();

// Yinx.scene.start();
// scene1.load();

// start playing the first scene created;
// Yinx.scene.start();
// start running the engine

// Yinx.destroy();

Yinx.addListener("event-01", console.log);
Yinx.on("event-01", console.log);
Yinx.once("event-01", console.log);
Yinx.once("event-01", console.log);
Yinx.on("event-01", console.log);

Yinx.addListener("event-02", console.log);
Yinx.on("event-02", console.log);
Yinx.once("event-03", console.log, 's');
Yinx.once("event-03", console.log, 'ssss');
Yinx.on("event-04", console.log);
Yinx.removeAllListener();

Yinx.emit("event-03", 'event-01 emitting');
Yinx.emit("event-03", 'event-02 emitting');


console.log('app engine:', Yinx);
// Yinx.emit("event-01", 'event-01 emitting');
// Yinx.emit("event-01", 'event-01 emitting');

// console.log(rBall);


// console.log( 'grid', grid.parent, grid.scene);
// console.log( 'rBall', rBall.parent, rBall.scene);
// console.log( 'yBall', yBall.parent, yBall.scene);
// console.log( 'gBall', gBall.parent, gBall.scene);

const button1 = document.getElementById("btn-start");
const button2 = document.getElementById("btn-pause");
const button3 = document.getElementById("btn-prev-scene");
const button4 = document.getElementById("btn-next-scene");
const sceneNameDiv = document.getElementById("scene-Name");
sceneNameDiv.innerHTML = Yinx.scene.activeScene.name;

// let startStop = (Yinx.started) ? 0 : 1;
// let pausePlay = (Yinx.running) ? 0 : 1;

button1.innerHTML = (Yinx.started) ? "STOP" : "START";
button2.innerHTML = (Yinx.running) ? "PAUSE" : "PLAY :.";

button1.onclick =  () => {
  const startStop = (Yinx.started) ? 0 : 1;

  if (startStop) {
    button1.innerHTML =" STOP ";
    Yinx.start();
  } else {
  button1.innerHTML ="START";
    Yinx.stop();
  }
};

button2.onclick =  () => {
  const pausePlay = (Yinx.running) ? 0 : 1;

  if (pausePlay) {
    button2.innerHTML ="PLAY :.";
    Yinx.wake();
  } else {
  button2.innerHTML ="PAUSE :.";
    Yinx.sleep();
  }
};

button3.onclick =  () => {
  Yinx.scene.prevScene();
  sceneNameDiv.innerHTML = Yinx.scene.activeScene.name;
};

button4.onclick =  () => {
  Yinx.scene.nextScene();
  sceneNameDiv.innerHTML = Yinx.scene.activeScene.name;
};