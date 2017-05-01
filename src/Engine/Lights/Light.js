/**
 * Created by Laca on 2017. 04. 27..
 */
/* globals vec4,vec3 */
"use strict";

/**
 *
 * @constructor
 */
function Light() {
    this.mColor = vec4.fromValues(0.1, 0.1, 0.1, 1);
    this.mPosition = vec3.fromValues(0, 0, 5);
    this.mRadius = 10;
    this.mIsOn = true;
}

/**
 *
 * @param {vec4} c
 */
Light.prototype.setColor = function (c) {
    this.mColor = vec4.clone(c);
};

/**
 *
 * @return {vec4|*}
 */
Light.prototype.getColor = function () {
    return this.mColor;
};

/**
 *
 * @param {[number,number]}p
 */
Light.prototype.set2DPosition = function (p) {
    this.mPosition = vec3.fromValues(p[0], p[1], this.mPosition[2]);
};

/**
 *
 * @param {number} x
 */
Light.prototype.setXPos = function (x) {
    this.mPosition[0] = x;
};

/**
 *
 * @param {number} y
 */
Light.prototype.setYPos = function (y) {
    this.mPosition[1] = y;
};

/**
 *
 * @param {number} z
 */
Light.prototype.setZPos = function (z) {
    this.mPosition[2] = z;
};

/**
 *
 * @return {vec3|*}
 */
Light.prototype.getPosition = function () {
    return this.mPosition;
};

/**
 *
 * @param {number} r
 */
Light.prototype.setRadius = function (r) {
    this.mRadius = r;
};

/**
 *
 * @return {number|*}
 */
Light.prototype.getRadius = function () {
    return this.mRadius;
};

/**
 *
 * @param {boolean} isOn
 */
Light.prototype.setLightOn = function (isOn) {
    this.mIsOn = isOn;
};

/**
 *
 * @return {boolean|*}
 */
Light.prototype.isLightOn = function () {
    return this.mIsOn;
};

