/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * Point Class
 */

class Point {
  constructor(x = 0, y = 0)
  {
    this.x = x || 0;
    this.y = y || 0;
  }

  // set the x any coordinates of the point
  set(x, y) {
    this.x = x || 0;
    this.y = y || (( y != 0) ? this.x : 0);

    return this;
  }

  add(x, y) {
    this.x += x;
    this.y += y;

    return this;
  }

  subtract(x, y) {
    this.x -= x;
    this.y -= y;

    return this;
  }

  multiply(x, y) {
    this.x *= x;
    this.y *= y;

    return this;
  }

  divide(x, y) {
    this.x /= x;
    this.y /= y;

    return this;
  }
  
  clone() {
    return new Point(this.x, this.y);
  }

  copy(p) {
    this.set(p.x, p.y);
  }

  invert() {
    return this.set(this.y, this.x);
  }

  equals(p) {
    return (p.x === this.x) && (p.y === this.y);
  }
  
  ceil() {
    return this.set(Math.ceil(this.x), Math.ceil(this.y))
  }

  floor() {
    return this.set(Math.floor(this.x), Math.floor(this.y))
  }

  magnitude() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  magnitudeSqrt() {
    return ((this.x * this.x) + (this.y * this.y));
  }
  
  interpolate(p, t = 0) {
  
    let out = p || new Point();

    out.x = this.x + ((p.x - this.x) * t);
    out.y = this.y + ((p.y - this.y) * t);

    return out;
  }

  negative() {
    return new Point(-this.x, -this.y);
  }


/*
  minus(p) {
    return new Point(this.x - p.x, this.y - p.y);
  }

  plus(p) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  plusEqual(p) {
    this.set(this.x + p.x, this.y + p.y);
  }
  
  minusEqual(p) {
    this.set(this.x - p.x, this.y - p.y);
  }
  */
}

export default Point;