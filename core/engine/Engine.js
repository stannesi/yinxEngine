/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * Engine Class
 */

import { Ticker } from './';
import { DOM } from './../';
import { SceneManager } from './../../scene/';
import { Renderer } from './../renderer/';

class Engine extends Ticker {
  constructor(width, height, elm) {
    super();
    
    // create and mount engine
    this.parent = DOM.create('div', 'yinx-engine')
    DOM.add(this.parent, elm);
    

    // ticker without inheritance
    // this.ticker = new Ticker();

    // create render engine
    this.renderer = new Renderer(width, height, this.parent);

    // create scene manager
    this.scene = new SceneManager(this);
  
    // A flag indicating if this Engine is currently running its game step or not.
    this.isRunning = false;

    //***** just for debbuging and testing purpuse ******
    this.counter = 0;
  }

  // start engine
  start() {

    this.isRunning = true;

    if (this.renderer) {
      // this.ticker.start(this.update.bind(this));
      this.startTicker (this.update, true);
    }
    
    // start scene manager
    this.scene.start();
  }


  // stop engine
  stop() {

    this.isRunning = false;
    // this.ticker.stop();
    this.stopTicker();
  }
  
  update(deltaTime) {

    // update the scene manager and all active scenes
    this.scene.update(deltaTime);

    // physics, collision and gravity updates
    
    // the main render loop. does all rendering
    this.render();
  }

  render() {

    // run the Pre-render (clearing the canvas, setting background colors, etc)
    this.renderer.preRender();
    
    // the main render loop. Iterates all Scenes and all Cameras in those scenes, rendering to the renderer instance.
    this.renderer.render(this.scene);
  }

  // destroy
  destroy() {

    this.stop();

    DOM.remove(this.parent);
    this.parent = null;
    
    this.scene.destroy();
    this.scene = null;
    
    this.renderer.destroy();
    this.renderer = null;

    this.destroyTicker();
    // this.ticker.destroy()
    // this.ticker = null;
  }
}

export default Engine;