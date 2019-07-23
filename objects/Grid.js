    /*
* @author    stan nesi
* @copyright 2017 @stannesi
*
* Grid class
*/

import { BaseObject } from './';

class Grid extends BaseObject {
  constructor(width, height, cellWidth, cellHeight, color) {

    super('Grid');
    this.width = width;
    this.height = height;
    this.cellWidth = cellWidth || 10;
    this.cellHeight = cellHeight || 10;
    this.color = color || 'rgb(159, 159, 165)';
  }

  start() {}

  update(deltaTime) {}

  draw(renderer) {
  
    let ctx = renderer.context;
  
    ctx.fillStyle = this.color;
    
    for (var y = 0; y < this.height; y += this.cellHeight)
    {
        ctx.fillRect(0, y, this.width, 1);
    }

    // this.bmd.resize(width, height);

    for (var x = 0; x < this.width; x += this.cellWidth)
    {
        ctx.fillRect(x, 0, 1, this.height);
    }
    // return this.bmd.generateTexture(key);
  }
}

export default Grid;

