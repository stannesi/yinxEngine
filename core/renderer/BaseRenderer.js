/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * BaseRenderer Class
 */


import { RENDER_ENGINE } from './';

class BaseRenderer {
  constructor(width, height, type) {
    
    this._type = type || RENDER_ENGINE.CANVAS;
    this._width = width || 480;
    this._height = height || 380;
    this._backgroundColor = '#18181d'; // rgb(0, 0, 0)

    this.pointer = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      startX: 0,
      startY: 0,
      canvas: this.canvas,
      touchMode: false,
      isDown: false,
      center: function (s) {
        this.dx *= s;
        this.dy *= s;
        endX = endY = 0;
      },
      sweeping: false,
      scale: 0
    }
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(value) {
    this._backgroundColor = value;
  }

  start() {}
  update() {}
  render() {}
  destroy() {}
}

export default BaseRenderer;