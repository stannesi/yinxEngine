/**
 * Yinx Engine
 * 
 * @author    stan nesi
 * @copyright 2017 nappy cat labs
 * 
 * SceneManager  Class
 */

import { Scene, SplashScene } from './'

class SceneManager {
  constructor(engine) {
    
    this._type = 'type.manager.scene'
    // reference to engine
    this.engine = engine;

    // array of scenes
    this.scenes = [];

    this._activeScene;
    
    this._isProcessing = false;

    this._splashScreenAdded = false;
  }

  get type () {
    return this._type;
  }
  
  set activeScene(value)
  {
    this._activeScene = value;
  }

  get activeScene() {
    return this._activeScene;
  }

  get getCurrentSceneIndex() {
    const index = this.scenes.indexOf(this.activeScene);
    return index;
  }

  create(name, first = false) {
    const sceneName = name || 'scene-' + length + 1;
    const newScene = new Scene(sceneName, this);
    this.add(newScene, first);
    return newScene;
  }

  load(value) {
    let newScene;
    if (typeof value === 'number') {
      newScene  = this.getAt(value);
    } else {
      newScene = this.get(value);
    }

    if (this.activeScene) {
      this.activeScene.isLoaded = false;
    }

    newScene.isLoaded = true;

    newScene.start();

    this.activeScene = newScene;

    // rendere scene to screen incase engine isn't running
    this.engine.render();

    return  newScene;
  }

  add(scene, first = false) {
    if (this.scenes.indexOf(scene) === -1) {
      if (!first) {
        this.scenes.push(scene);
      } else {
        this.scenes.unshift(scene);
      }
    }
    
    return scene;
  }
  
  get(name) {
    let scene = this.scenes.find( scene => {
      return scene.name === name;
    })
    return scene;
  }

  getAt (index) {
    return this.scenes[index];
  }

  nextScene(remove = false) {
    const index = this.scenes.indexOf(this.activeScene);
    const nextIndex = index + 1;
    
    if (nextIndex !== this.scenes.length) {
      const newScene = this.load(nextIndex);
      if (remove) {
        this.removeAt(index);
      }
    }

    return newScene;
  }

  prevScene(remove = false) {
    const index = this.scenes.indexOf(this.activeScene);
    const prevIndex = index - 1;
 
    if (prevIndex !== -1  ) {
      const newScene = this.load(prevIndex);
      if (remove) {
        this.removeAt(index);
      }
    }

    return newScene;
  }

  splashScreen() {
    const newScene = new SplashScene(2, this);
    this.add(newScene, true);
    this._splashScreenAdded = true;
  }
  
  start() {
    if (this.engine.renderer.splashScreen && !this._splashScreenAdded) {
      this.splashScreen();
    }

    if (this.sceneCount <= 0) {
      throw new Error(`SceneManager [object] has '${this.sceneCount}' scenes. Create or add a new scene to start`);
    }

    if (!this.activeScene) {
      this.load(0);
      return;
    }

    const scene = this.activeScene;

    if (scene) {
      scene.start();
    }
  }

  update(deltaTime) {
    const scene = this.activeScene;
    
    this._isProcessing = true;

    if (scene) {
      scene.update(deltaTime);
    }

      
    this._isProcessing = false;
  }

  render(renderer) {
    const scene = this.activeScene;
    this._isProcessing = true;

    if (scene) {
      scene.render(renderer);
    }
      
    this._isProcessing = false;
  }

  remove(scene) {
    const index = this.scenes.indexOf(scene);
    if (index !== -1) {
      this.scenes.splice(index, 1);
    }

    return scene;
  }

  removeAt(index) {
    if (index !== -1) {
      this.scenes.splice(index, 1);
    }
  }

  removeAll() {
    const i = this.scenes.length;

    while (i--) {
      this.remove(this.scenes[i]);
    }

    return this;
  }

  destroy() {
    this.removeAll();
    this.scenes = [];
    this.activeScene = null;
    this.engine = null;
  }

  get sceneCount() {
    return this.scenes.length;
  }
}

export default SceneManager;