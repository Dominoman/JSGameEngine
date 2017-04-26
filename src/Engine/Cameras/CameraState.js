/**
 * Created by Laca on 2017. 04. 26..
 */
"use strict";

/**
 *
 * @param {vec2} center
 * @param {number} width
 * @constructor
 */
function CameraState(center, width) {
    this.kCycles = 300;
    this.kRate = 0.1;
    this.mCenter = new InterpolateVec2(center, this.kCycles, this.kRate);
    this.mWidth = new Interpolate(width, this.kCycles, this.kRate);
}

/**
 *
 * @return {vec2}
 */
CameraState.prototype.getCenter = function () {
    return this.mCenter.getValue();
};

/**
 *
 * @return {number}
 */
CameraState.prototype.getWidth = function () {
    return this.mWidth.getValue();
};

/**
 *
 * @param {vec2} c
 */
CameraState.prototype.setCenter = function (c) {
    this.mCenter.setFinalValue(c);
};

/**
 *
 * @param {number} w
 */
CameraState.prototype.setWidth = function (w) {
    this.mWidth.setFinalValue(w);
};

/**
 *
 */
CameraState.prototype.updateCameraState = function () {
    this.mCenter.updateInterpolation();
    this.mWidth.updateInterpolation();
};

/**
 *
 * @param {number} stiffness
 * @param {number} duration
 */
CameraState.prototype.configInterpolation = function (stiffness, duration) {
    this.mCenter.configInterpolation(stiffness, duration);
    this.mWidth.configInterpolation(stiffness, duration);
};