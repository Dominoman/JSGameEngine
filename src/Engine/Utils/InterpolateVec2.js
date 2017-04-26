/**
 * Created by Laca on 2017. 04. 26..
 */
"use strict";

/**
 *
 * @param {vec2} value
 * @param {number} cycle
 * @param {number} rate
 * @constructor
 */
function InterpolateVec2(value, cycle, rate) {
    Interpolate.call(this, value, cycle, rate);
}
gEngine.Core.inheritPrototype(InterpolateVec2, Interpolate);

/**
 *
 * @private
 */
InterpolateVec2.prototype._interpolateValue = function () {
    vec2.lerp(this.mCurrentValue, this.mCurrentValue, this.mFinalValue, this.mRate);
};