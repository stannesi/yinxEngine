/*
* @author    stan nesi
* @copyright 2017 @stannesi
*
* Transform class
*/

import { Point } from './../geometry';

class Transform {
  constructor() {
    this._type = "type.transform.object";
    this.positon = new Point(0, 0);
    
    this._rotation = 0;
    
    this.scale = new Point(1, 1);

    this.pivot = new Point(0, 0);

  }

  get rotation()
  {
    return this._rotation;
  }

  set rotation(value)
  {
    this._rotation = value;
  }

  // get right() {}
  // static left() {

  // } 
}

export default Transform;
