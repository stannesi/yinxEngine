/*
* @author    stan nesi
* @copyright 2017 @stannesi
*
* App class
*/

// frames per millisecond.
import { EventObject } from './../../../events/';

// Target frames per millisecond.
const FPMS = 0.06;

class Ticker extends EventObject {

  constructor() {
    super();
    /**
     * Internal current frame request ID
     * @private
    */
    this._requestId = null;

    /**
     * Internal value managed by minFPS property setter and getter.
     * This is the maximum allowed milliseconds between updates.
     * @private
    */
    this._maxElapsedMS = 100;

    /**
     * Scalar time value from last frame to this frame.
     * This value is capped by setting {#minFPS}
     * and is scaled with {#speed}.
     * **Note:** The cap may be exceeded by scaling.
     *
    */
    this.deltaTime = 1;
    
    /**
     * Time elapsed in milliseconds from last frame to this frame.
     * Opposed to what the scalar {#deltaTime}
     * is based, this value is neither capped nor scaled.
     * If the platform supports DOMHighResTimeStamp,
     * this value will have a precision of 1 µs.
     * Defaults to target frame time
     * @default 16.66
    */
    this.elapsedMS = 1 / FPMS; 

    /**
     * The most recent timestamp. Either a DOMHighResTimeStamp under requestAnimationFram 
     * or `Date.now` under SetTimeout.
    */
    this._tick = 0;

    /**
     * True if the step is using setTimeout instead of requestAnimationFram.
     */
    this.isSetTimeOut = false;
    
    /**
     * The last time {#update} was invoked.
     * This value is also reset internally outside of invoking
     * update, but only when a new animation frame is requested.
     * If the platform supports DOMHighResTimeStamp,
     * this value will have a precision of 1 µs.
     *
     * 
     * The previous time the step was called.
    */
    this.lastTime = -1;

    /**
     * Factor of current {#deltaTime}.
     * @example
     * // Scales ticker.deltaTime to what would be
     * // the equivalent of approximately 120 FPS
     * ticker.speed = 2;
    */
    this.speed = 1;

    /**
     * Whether or not this ticker has been started or is runniing.
     * `true` if {#start} has been called.
     * `false` if {#stop} has been called.
     * While `false`, this value may change to `true` in the
     * event of {#autoStart} being `true`
     * and a listener is added.
     *
     */
    this.started = false;

    /**
     * A flag that is set once the TimeStep has started running and toggled when it stops.
     * The difference between this value and `started` is that `running` is toggled when
     * the TimeStep is sent to sleep, where-as `started` remains `true`, only changing if
     * the TimeStep is actually stopped, not just paused.
    */
    this.running = false;

    /**
     * the callback to be invoked each step
     */
    this.callback = () => {};


    /**
     * Internal tick method bound to ticker instance.
     * any animation API, just invoke ticker.tick(time).
     *
     * @private
     * @param {number} time - Time since last tick.
     */
    this._run = (time) => {
      this._requestId = null;

      if (this.started) {
        
        // update ticker 
        this.updateTicker(time);

        if (this.started && this._requestId === null ) {
          this._requestId = window.requestAnimationFrame(this._run);
        }
      }
    }

    // for setTimeOut
    this._runTimeout = () => {

      const d = Date.now();

      const delay = Math.max(16 + this.lastTime - d, 0);

      this.lastTime = this._tick;

      this._tick = d;

      // update ticker
      this.updateTicker(d);

      this._requestId = window.setTimeout(this._runTimeout, delay);
    }
  }

  // start engine
  startTicker(callback, useSetTimeOut) {

    if (this.started) {
        return
    }

    this.isSetTimeOut = (useSetTimeOut);

    this.started = true;

    this.running = true;

    // invoke callbacks now
    this.callback = callback;

    if (this._requestId === null) {
  
      // ensure callbacks get correct delta
      this.lastTime = performance.now();

      this._requestId = (this.isSetTimeOut)
       ? window.setTimeout(this._runTimeout, 0)
       : window.requestAnimationFrame(this._run);
    }
    
    console.log(`.: engine started :.: ${this.lastTime} ::: ${this._requestId}`);
  }

  // stop engine
  stopTicker() {

    if (this.started ) {
      
      this.started = false;

      this.running = false;
      
      if (this._requestId !== null) {
        if (this.isSetTimeOut) {
          window.clearTimeout(this._requestId);
        } else {
          window.cancelAnimationFrame(this._requestId);
        }

        this._requestId = null;

        console.log(`.: engine stopped :. ' + ${this.lastTime}`);
      }
    }
  }

  tick() {
    this._run(window.performance.now());
  }

  updateTicker(currentTime = performance.now()) {

    if (currentTime > this.lastTime) {
      this.elapsedMS = currentTime - this.lastTime;

      if (this.elapsedMS > this._maxElapsedMS) {
        this.elapsedMS = this._maxElapsedMS;
      }

      this.deltaTime = this.elapsedMS * FPMS * this.speed;

      this.callback(this.deltaTime);

    } else {
      this.deltaTime = this.elapsedMS = 0;
    }


    document.getElementById('times').innerHTML = `lastime: ${this.deltaTime} <br> current time: ${parseInt(this.elapsedMS)} <br> FPS :: ${parseInt(this.FPS)} `;
  
    this.lastTime = currentTime;
  }

  sleep() {
    if (this.running) {
      this.stopTicker();

      this.running = false;
    }
  }

  wake() {
    if (this.running) {
      this.sleep()
    }

    this.startTicker(this.callback);

    this.running = true;

    this.update(window.performance.now)

    return this;
  }

  get FPS() {
    return 1000 / this.elapsedMS;
  }

  destroyTicker() {
    this._destory();
  }

  // destroy
  _destory() {
    this.stopTicker();
    this.callback = () => {};
    this.removeAllListener();
  }
}

export default Ticker;