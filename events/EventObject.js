/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * EventObjects Class
 */

class EventObject {
  constructor() {
    this._listeners = new Map(); 
  }
  
  get listenerCount() {
    return this._listeners.size;
  }

  listeners(type) {
    let listeners = this._listeners.get(type);
    let ret = []
    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        let { cb } = listener;
        ret.push(cb);
      });
    }

    return ret;
  }

  eventNames() {
    let listeners = this._listeners;
    let names = []
    if (listeners && listeners.size) {
      listeners.forEach((value, key) => {
        names.push(key);
      });
    }

    return names;
  }


  _isFunction(obj) {  
    return typeof obj == 'function' || false;
  };

  _createListener (callback, once) {
    return { cb: callback, once: once || false };
  } 

  // add event listener
  addListener(type, callback, once = false) {
    this._listeners.has(type) || this._listeners.set(type, []);
    // this._listeners.get(type).push(callback);
    this._listeners.get(type).push(this._createListener(callback, once));
  }

  
  // remove event listener
  removeListener(type, callback) {
    let listeners = this._listeners.get(type);
    let index;

    if (listeners && listeners.length) {
        index = listeners.reduce((i, listener, index) => {
          return (this._isFunction(listener.cb) && listener.cb === callback ) ? i = index : i;             
        }, -1);


        if (index > -1) {
          listeners.splice(index, 1);
          this._listeners.set(type, listeners);
          return true;
        }
    }
    return false;
  }

  removeAllListener(type) {
    if (type) {
      this._listeners.delete(type);
    } else {
      this._listeners.clear();
    }
  }

  // emit event
  emit(type, ...args) {
    let listeners = this._listeners.get(type);

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        let { cb, once } = listener;
        
        if (once) {
          this.removeListener(type, cb);
        }

        cb(...args);
      });
      return true;
    }
    return false;
  }

  on(type, callback) {
    return this.addListener(type, callback, false);
  };

  once(type, callback) {
    return this.addListener(type, callback, true);
  };
}

export default EventObject;