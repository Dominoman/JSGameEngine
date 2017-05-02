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
    this.mNear = 5;
    this.mFar = 10;
    this.mIntensity = 1;
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
Light.prototype.setNear = function (r) {
    this.mNear = r;
};

/**
 *
 * @return {number|*}
 */
Light.prototype.getNear = function () {
    return this.mNear;
};

/**
 *
 * @param {number} r
 */
Light.prototype.setFar = function (r) {
    this.mFar = r;
};

/**
 *
 * @return {number|*}
 */
Light.prototype.getFar = function () {
    return this.mFar;
};

/**
 *
 * @param {number} r
 */
Light.prototype.setIntensity = function (r) {
    this.mIntensity = r;
};

/**
 *
 * @return {number|*}
 */
Light.prototype.getIntensity = function () {
    return this.mIntensity;
};


/**
 *
 * @param {boolean} on
 */
Light.prototype.setLightTo = function (on) {
    this.mIsOn = on;
};

/**
 *
 * @return {boolean|*}
 */
Light.prototype.isLightOn = function () {
    return this.mIsOn;
};

