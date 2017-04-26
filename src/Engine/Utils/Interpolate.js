/**
 * Created by Laca on 2017. 04. 26..
 */
"use strict";

/**
 *
 * @param {*} value
 * @param {number} cycles
 * @param {number} rate
 * @constructor
 */
function Interpolate(value, cycles, rate) {
    this.mCurrentValue = value;
    this.mFinalValue = value;
    this.mCycles = cycles;
    this.mRate = rate;
    this.mCyclesLeft = 0;
}

/**
 *
 * @private
 */
Interpolate.prototype._interpolateValue = function () {
    this.mCurrentValue = this.mCurrentValue + this.mRate * (this.mFinalValue - this.mCurrentValue);
};

/**
 *
 * @return {*}
 */
Interpolate.prototype.getValue = function () {
    return this.mCurrentValue;
};

/**
 *
 * @param {number} stiffness
 * @param {number} duration
 */
Interpolate.prototype.configInterpolation = function (stiffness, duration) {
    this.mRate = stiffness;
    this.mCycles = duration;
};

/**
 *
 * @param {*} v
 */
Interpolate.prototype.setFinalValue = function (v) {
    this.mFinalValue = v;
    this.mCyclesLeft = this.mCycles;
};

/**
 *
 */
Interpolate.prototype.updateInterpolation = function () {
    if (this.mCyclesLeft <= 0)
        return;
    this.mCyclesLeft--;
    if (this.mCyclesLeft === 0)
        this.mCurrentValue = this.mFinalValue;
    else
        this._interpolateValue();
};

