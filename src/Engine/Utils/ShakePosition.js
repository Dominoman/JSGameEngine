/**
 * Created by Laca on 2017. 04. 26..
 */
"use strict";

/**
 *
 * @param {number} xDelta
 * @param {number} yDelta
 * @param {number} shakeFrequency
 * @param {number} shakeDuration
 * @constructor
 */
function ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mXMag = xDelta;
    this.mYMag = yDelta;
    this.mCycles = shakeDuration;
    this.mOmega = shakeFrequency * 2 * Math.PI;
    this.mNumCyclesLeft = shakeDuration;
}

/**
 *
 * @return {number}
 * @private
 */
ShakePosition.prototype._nextDumpedHarmonic = function () {
    var frac = this.mNumCyclesLeft / this.mCycles;
    return frac * frac * Math.cos((1 - frac) * this.mOmega);
};

/**
 *
 * @return {boolean}
 */
ShakePosition.prototype.shakeDone = function () {
    return this.mNumCyclesLeft <= 0;
};

/**
 *
 * @return {Array}
 */
ShakePosition.prototype.getShakeResults = function () {
    this.mNumCyclesLeft--;
    var c = [];
    var fx = 0;
    var fy = 0;
    if (!this.shakeDone()) {
        var v = this._nextDumpedHarmonic();
        fx = (Math.random() > 0.5) ? -v : v;
        fy = (Math.random() > 0.5) ? -v : v;
    }
    c[0] = this.mXMag * fx;
    c[1] = this.mYMag * fy;
    return c;
};

