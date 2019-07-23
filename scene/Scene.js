/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * Scene Class
 */

import { ObjectList } from './../objects/';

class Scene {
  constructor(name, manager) {

    this._name = name || '';
    this._type = 'type.object.scene'

    // reference to the core game engine;
    this.engine = manager.engine;

    // reference to the scene manager 
    this.sceneManager = manager;

    this._isLoaded = false;

    // list of child objects
    this.children = new ObjectList();
  }

  get type() {
    return this._type;
  }

  set isLoaded(value) {
    this._isLoaded = value;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  load() {
    this.sceneManager.activeScene = this;
  }

  add(obj) {
    if (obj.scene === this) {
      throw new Error(`[object] "${obj.name}" is already present on [scene] "${obj.scene.name}", or it's a child of [parent-object] ${obj.parent.name}. present on [scene]`);
      return;
    }

    obj.scene = this;
    this.children.add(obj);

    obj.updateObject(obj);
    return this;
  }

  remove(obj) {
    this.bucket.remove(obj);
    return this;
  }

  start() {
    const { children } = this;
    children.start();
  }

  update (deltaTime){
    const { children } = this;
    children.update(deltaTime);
  }
  
  render(renderer) {
    const { children } = this;
    children.draw(renderer)
  }
  
  destroy() {
    this.isLoaded = false;
    this.engine = null;
    this.sceneManager = null;
    this.children.destroy();
  }
}

export default Scene;