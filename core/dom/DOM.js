/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * DOM Class
 */


class DOM {
  constructor() {}

  /*
  * create DOM element
  */
  static create (tagName, id) {

    let newElem = document.createElement(tagName);
    
    if (id) {
      newElem.id = id;
    }

    return newElem;
  }

  // get DOM element by id
  static getById(id) {
    return document.getElementById(id);
  }
  
  // add element to DOM
  static add(elem, parent) {

    let target = parent;

    if (parent) {
      if (typeof parent === 'string') {
        target = this.getById(parent);
      }
    }

    if (!target)
    {
      target = document.body;
    }

    target.appendChild(elem);

    return elem;
  }

  // remove element from DOM
  static remove(elem) {

    if (elem.parentNode)
    {
        elem.parentNode.removeChild(elem);
    }
  }
}

export default DOM;