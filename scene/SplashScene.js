/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * SplashScreen Class
 */

import { Scene } from './';

class SplashScene extends Scene {
  constructor(delay, manager) {
    
    super('splash-scene', manager)
    this.manager = manager;
    
    this._delay = delay || 2;
    this._frameCounter = 0;
    this._now = null;
    this._then = Date.now();
    this._intervals = this.manager.engine.elapsedMS;

    this._seconds = 0;
  }

  set delay(value) {
    this._delay = value;
  }

  get delay() {
    return this._delay;
  }

  start() {
    this._first = Date.now();
    // this.engine.renderer.setBackgroundColor('black');
  }

  update (deltaTime) {
    this._now = Date.now();

    // if (deltaTime > this._intervals) {
      
      if (this._seconds > this.delay ) {
        this.manager.nextScene();
      }

      this._then = this._now - (deltaTime % this._intervals);
      this._seconds = parseInt(this._then - this._first)/1000;      
    // }
    // console.log(deltaTime, this._frameCounter, this._frameCounter/parseInt(this._seconds));
    ++this._frameCounter;
  }
  
  render(renderer) {
    const ctx = renderer.context; 
    // background
    ctx.rect(0, 0, renderer.canvas.width, renderer.canvas.height);
    ctx.fillStyle = "#8cc63e";
    ctx.fill();
    // text
    ctx.fillStyle = "white";
    ctx.font = "100px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("Yinx",renderer.canvas.width/2, renderer.canvas.height/2);
  }
  
  destroy() {
    super.destroy();
  }
}

export default SplashScene;