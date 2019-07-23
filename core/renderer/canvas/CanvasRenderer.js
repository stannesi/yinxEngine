/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * CanvasRenderer Class
 */

import { DOM } from './../../'
import { BaseRenderer, RENDER_ENGINE } from './../';

class CanvasRenderer extends BaseRenderer {
  constructor(width, height) {

    super(width, height, RENDER_ENGINE.CANVAS);
    
    this._id = 'yinx-render-canvas';

    this.canvas = this.create(this.id);

    this.context = this.canvas.getContext('2d');

    this.alpha = 1;

    // mnumber of objects rendered/drawn on canvas
    this._drawCount = 0; 

    this._autoResize = true;

    this._refresh = true;

    this.resize(this._width, this._height);
  }

  set id(value) {
    this._id = value;
  }

  get id() {
    return this._id;
  }

  set drawCount(value) {
    this._drawCount = value;
  }

  get drawCount() {
    return this._drawCount;
  }

  set autoResize(value) {
    this._autoResize = value;
  }

  get autoResize() {
    return this._autoResize;
  }

  set refresh(value) {
    this._refresh = value;
  }

  get refresh() {
    return this._refresh;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }


  // create new canvas element
  create (id)
  {
    // create canvas element
    let canvas = DOM.create('canvas', this.id);

    canvas.width =  this._width || 480;
    canvas.height = this._height || 320;
    canvas.style.display = 'block';
    canvas.style.background = this.backgroundColor;
    
    return canvas;
  }


  // set canvas background
  setBackgroundColor (canvas, color) {

    color = color || 'rgb(0, 0, 0)';

    this.backgroundColor = color;
    canvas.style.background = this.backgroundColor;

    return canvas;
  }

  // get canvas renderer
  get getCanvas() {
    return this.canvas;
  }

  // resize canvas
  resize(width, height) {
    this.canvas.width = this._width = width || this._width;
    this.canvas.height = this._height = height || this._height ;

    if (this.autoResize)
    {
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
    }
  }
  
  preRender()
  {
    const context = this.context;
    // get configs
    const width = this.width;
    const height = this.height;

    // clear before rendering
    context.clearRect(0,0, width , height);

    this.drawCount = 0;
  }

  // render update
  // note: scene is the sceneManager
  render(sceneManager) {
    
    if (!this.canvas) {
      return;
    }

    const ctx = this.context;

    ctx.save();
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;

    const tempContext = this.context;

    this.context = ctx;
    
    sceneManager.render(this);

    this.context = tempContext;

    ctx.restore();
  }

  // destroy canvas renderer
  destroy(removeCanvas) {
    if (removeCanvas && this.canvas.parentNode) {
      DOM.remove(this.canvas);
    }

    this.context = null;

    this.canvas = null;
  }
}

export default CanvasRenderer;