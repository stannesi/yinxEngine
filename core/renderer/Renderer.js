/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * Renderer Class
 */

import { DOM } from './../dom';
import { CanvasRenderer } from './';

class Renderer {
  constructor(width, height, elem, id) {

    this.width = width || 480;

    this.height = height || 320;

    this.parent = elem;

    this._splashScreen = true;

    this._init();
  }

  /*
  * create new canvas and mount it to parent
  */
  _init() {

    this.engine = new CanvasRenderer(this.width, this.height);
    this.canvas = this.engine.getCanvas;

    // mount canvas to DOM parent
    DOM.add(this.canvas, this.parent);

    console.log('.: canvasRenderer engine created :.')
    console.log('...render engine initilized');
  }

  get splashScreen() {
    return this._splashScreen;
  }

  get splashScreen() {
    return this._splashScreen;
  }

  get getCanvas() {
    return this.canvas;
  }

  get getRenderEngine() {
    return this.engine;
  }

  start() {}

  setBackgroundColor(color) {
    this.engine.setBackgroundColor(this.canvas, color);
  }

  preRender() {
    if (this.engine) {
      this.engine.preRender();
    }
  }
  // render
  // note: scene is the sceneManager
  render(scene) {
    if (this.engine) {
      this.engine.render(scene);
    }
  }


  destroy() {
    this.engine.destroy(this.canvas);
    this.engine = null;
    this.canvas = null;
    this.parent = null;
  }
}

export default Renderer;