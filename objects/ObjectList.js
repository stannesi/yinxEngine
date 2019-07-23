/*
* @author    stan nesi
* @copyright 2017 @stannesi
*
* Object Bucket class
*/

class ObjectList extends Array {
  // constructor(...items) {
  constructor() {
    // super(...items);
    this._type = "type.list.object";
    this.length = 0;
  }

  // add object
  add(obj) {
    if (this.indexOf(obj) === -1) {
      this.push(obj);
    }

    return obj;
  }

  remove(obj) {
    let index = this.indexOf(obj);

    if (index !== -1) {
      this.splice(index, 1);
    }

    /************** EMITT EVENT */
    // emit update remove object
    obj.updateObject();

    return obj;
  }

  removeAll() {
    let i = this.length

    while (i--) {
      this.remove(this[i]);
    }

    return this;
  }

  get isEmpty() {
    return this.length < 1;
  }

  get(name) {
    let obj = this.find(list => {
      return list.name === name;
    })
    return obj;
  }

  getAt(index) {
    return this[index];
  }

  getAll() {
    return this;
  }

  //get length() {
 //   return this.length;
 // }

  // remove object
  start() {
    for (let i = 0; i < this.length; i++) {

      let obj = this[i];

      if (obj.active) {
        obj.start();
        if (obj.hasChildren) {
          obj.children.start.call(obj.children);
          // this._deepLoop.call(obj.children,'start');
        }
      }
    }
  }

  // remove object
  update(deltaTime) {
    for (let i = 0; i < this.length; i++) {

      let obj = this[i];

      if (obj.active) {
        // obj.update.call(obj, deltaTime);
        obj.update(deltaTime);
        // update children objects if any
        if (obj.hasChildren) {
          obj.children.update.call(obj.children, deltaTime);
          // this._deepLoop.call(obj.children,'update', deltaTime);
          // this._deepUpdate(deltaTime, obj);
        }
      }
    }
  }

  // recursive loop
  draw(renderer, obj) {

    const length = this.length;

    renderer.drawCount += length;

    for (let i = 0; i < length; i++) {

      let obj = this[i];

      if (obj.active && obj.visible) {
        // obj.draw.call(obj, renderer);
        obj.draw(renderer);
        // raw children objects if any
        if (obj.hasChildren) {
          obj.children.draw.call(obj.children, renderer);
          // this._deepLoop.call(obj.children,'draw', renderer);
          // this._deepDraw(renderer, obj);
        }
      }
    }
  }

  _deepLoop(fnName, ...args) {
    this[fnName](...args);
  }

  destroy() {
    this.removeAll();
    this.length = 0;
  }
}

export default ObjectList;