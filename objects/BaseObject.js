/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * Base Object Class
 */

import { Transform, ObjectList } from './';
import { EventObject } from './../events/';

class BaseObject extends EventObject {
  constructor(name = '') {

    super();
    this._name = name;

    this._type = "type.object.base";

    this._tag = '';

    this._active = true;

    this._visible = true;

    this._static = false;

    this.transform = new Transform();

    this._scene = null
    this._parent = null;

    this.children = new ObjectList();
  }

  get type() {
    return this._type;
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set tag(value) {
    this._tag = value;
  }

  get tag() {
    return this._tag;
  }

  set active(value) {
    this._active = value;
  }

  get active() {
    return this._active;
  }

  set visible(value) {
    this._visible = value;
  }

  get visible() {
    return this._visible;
  }

  set isStatic(value) {
    this._static = value;
  }

  get isStatic() {
    return this._static;
  }

  set parent(value) {
    this._parent = value;
  }

  get parent() {
    return this._parent;
  }

  set scene(value) {
    this._scene = value;
  }

  get scene() {
    return this._scene;
  }

  get hasChildren() {
    return !this.children.isEmpty;
  }

  start() {}

  update(deltaTime) {}

  draw(renderer) {}

  addChild(obj) {
    if (obj.parent || obj.parent === this) {
      throw new Error(`${obj.name} [object] already has a parent [object] ${obj.parent.name}`);
      return;
    }
    // obj.updateObject(this);
    return this.children.add(obj);
  }

  removeChild(obj) {
    return this.children.remove(obj);
  }

  removeChildren(){
    return this.children.removeAll();
  }

  getChild(name) {
    return this.children.get(name);
  }

  getChildAt(index) {
    return this.children.getAt(index);
  }

  getChildren() {
    return this.children.getAll();
  }

  // emit event
  updateObject(parent = null) {
    this.parent = parent || null;
    this.scene = parent ? parent.scene : null;

    if (this.hasChildren) {
      this._updateChildren(this);
    }
  }

  _updateChildren(parent) {
    const children = this.getChildren();
    for (let i = 0; i < children.length; i++) {
      children[i].updateObject(this);
    }
  }

  destroy() {
    this._active = false;
    this._visible = false;
    this.parent = null;
    this.children.destroy();
  }
}

export default BaseObject;