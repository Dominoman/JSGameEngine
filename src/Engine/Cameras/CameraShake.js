/**
 * Created by Laca on 2017. 04. 26..
 */
/* global vec2, ShakePosition */
"use strict";

/**
 *
 * @param {CameraState} state
 * @param {number} xDelta
 * @param {number} yDelta
 * @param {number} shakeFrequency
 * @param {number} shakeDuration
 * @constructor
 */
function CameraShake(state, xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mOrgCenter = vec2.clone(state.getCenter());
    this.mShakeCenter = vec2.clone(this.mOrgCenter);
    this.mShake = new ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration);
}

/**
 *
 */
CameraShake.prototype.updateShakeState = function () {
    var s = this.mShake.getShakeResults();
    vec2.add(this.mShakeCenter, this.mOrgCenter, s);
};

/**
 *
 * @return {boolean}
 */
CameraShake.prototype.shakeDone = function () {
    return this.mShake.shakeDone();
};

/**
 *
 * @return {vec2|*}
 */
CameraShake.prototype.getCenter = function () {
    return this.mShakeCenter;
};

/**
 *
 * @param {vec2} c
 */
CameraShake.prototype.setRefCenter = function (c) {
    this.mOrgCenter[0] = c[0];
    this.mOrgCenter[1] = c[1];
};