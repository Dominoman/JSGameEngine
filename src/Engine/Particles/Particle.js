/**
 * Created by Laca on 2017. 05. 16..
 */
/* globals vec2, gEngine, LineRenderable */
"use strict";

/**
 *
 * @param {vec2} pos
 * @constructor
 */
function Particle(pos) {
    this.kPadding = 0.5;
    this.mPosition = pos;
    this.mVelocity = vec2.fromValues(0, 0);
    this.mAcceleration = gEngine.Particle.getSystemAcceleration();
    this.mDrag = 0.95;

    this.mPositionMark = new LineRenderable();
    this.mDrawBounds = false;
}

/**
 *
 * @param {Camera} aCamera
 */
Particle.prototype.draw = function (aCamera) {
    if (!this.mDrawBounds) {
        return;
    }
    var x = this.mPosition[0];
    var y = this.mPosition[1];

    this.mPositionMark.setFirstVertex(x - this.kPadding, y + this.kPadding);
    this.mPositionMark.setSecondVertex(x + this.kPadding, y - this.kPadding);
    this.mPositionMark.draw(aCamera);
    this.mPositionMark.setFirstVertex(x + this.kPadding, y + this.kPadding);
    this.mPositionMark.setSecondVertex(x - this.kPadding, y - this.kPadding);
    this.mPositionMark.draw(aCamera);
};

/**
 *
 */
Particle.prototype.update = function () {
    var dt = gEngine.GameLoop.getUpdateIntervalInSeconds();

    var p = this.getPosition();
    vec2.scaleAndAdd(this.mVelocity, this.mVelocity, this.mAcceleration, dt);
    vec2.scale(this.mVelocity, this.mVelocity, this.mDrag);
    vec2.scaleAndAdd(p, p, this.mVelocity, dt);
};

/**
 *
 * @param {Array} color
 */
Particle.prototype.setColor = function (color) {
    this.mPositionMark.setColor(color);
};

/**
 *
 * @return {Array|(number|number|number|number)[]|*}
 */
Particle.prototype.getColor = function () {
    return this.mPositionMark.getColor();
};

/**
 *
 * @return {boolean}
 */
Particle.prototype.getDrawBounds = function () {
    return this.mDrawBounds;
};

/**
 *
 * @param {boolean} d
 */
Particle.prototype.setDrawBounds = function (d) {
    this.mDrawBounds = d;
};

/**
 *
 * @param {number} xPos
 * @param {number} yPos
 */
Particle.prototype.setPosition = function (xPos, yPos) {
    this.setXPos(xPos);
    this.setYPos(yPos);
};

/**
 *
 * @return {vec2|*}
 */
Particle.prototype.getPosition = function () {
    return this.mPosition;
};

/**
 *
 * @return {number}
 */
Particle.prototype.getXpos = function () {
    return this.mPosition[0];
};

/**
 *
 * @param {number} xPos
 */
Particle.prototype.setXpos = function (xPos) {
    this.mPosition[0] = xPos;
};

/**
 *
 * @return {number}
 */
Particle.prototype.getYpos = function () {
    return this.mPosition[1];
};

/**
 *
 * @param {number} yPos
 */
Particle.prototype.setYpos = function (yPos) {
    this.mPosition[1] = yPos;
};

/**
 *
 * @param {vec2} f
 */
Particle.prototype.setVelocity = function (f) {
    this.mVelocity = f;
};

/**
 *
 * @return {vec2|*}
 */
Particle.prototype.getVelocity = function () {
    return this.mVelocity;
};

/**
 *
 * @param {vec2} g
 */
Particle.prototype.setAcceleration = function (g) {
    this.mAcceleration = g;
};

/**
 *
 * @return {(number|number)[]|*}
 */
Particle.prototype.getAcceleration = function () {
    return this.mAcceleration;
};

/**
 *
 * @param {number} d
 */
Particle.prototype.setDrag = function (d) {
    this.mDrag = d;
};

/**
 *
 * @return {number|*}
 */
Particle.prototype.getDrag = function () {
    return this.mDrag;
};

