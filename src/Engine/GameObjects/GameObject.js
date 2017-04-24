/**
 * Created by Laca on 2017. 04. 20..
 */
"use strict";

/**
 *
 * @param {Renderable} renderableObj
 * @constructor
 */
function GameObject(renderableObj) {
    this.mRenderComponent = renderableObj;
    this.mVisible = true;
    this.mCurrentFrontDir = vec2.fromValues(0, 1);
    this.mSpeed = 0;
}

/**
 * @return {Transform}
 */
GameObject.prototype.getXform = function () {
    return this.mRenderComponent.getXform();
};

/**
 *
 * @param {boolean} f
 */
GameObject.prototype.setVisibility = function (f) {
    this.mVisible = f;
};

/**
 *
 * @return {boolean}
 */
GameObject.prototype.isVisible = function () {
    return this.mVisible;
};

/**
 *
 * @param {number} s
 */
GameObject.prototype.setSpeed = function (s) {
    this.mSpeed = s;
};

/**
 *
 * @return {number|*}
 */
GameObject.prototype.getSpeed = function () {
    return this.mSpeed;
};

/**
 *
 * @param {number} delta
 */
GameObject.prototype.incSpeedBy = function (delta) {
    this.mSpeed += delta;
};

/**
 *
 * @param {number} f
 */
GameObject.prototype.setCurrentFrontDir = function (f) {
    vec2.normalize(this.mCurrentFrontDir, f);
};

/**
 *
 * @return {vec2|*}
 */
GameObject.prototype.getCurrentFrontDir = function () {
    return this.mCurrentFrontDir;
};

GameObject.prototype.update = function () {
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
};

/**
 *
 * @return {Renderable|*}
 */
GameObject.prototype.getRenderable = function () {
    return this.mRenderComponent;
};

/**
 *
 * @param {Camera} aCamera
 */
GameObject.prototype.draw = function (aCamera) {
    if (this.isVisible())
        this.mRenderComponent.draw(aCamera);
};

/**
 *
 * @param {vec2} p
 * @param {number} rate
 */
GameObject.prototype.rotateObjPointTo = function (p, rate) {
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE)
        return;
    vec2.scale(dir, dir, 1 / len);

    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);
    if (cosTheta > 0.999999)
        return;
    if (cosTheta > 1)
        cosTheta = 1;
    else if (cosTheta < -1)
        cosTheta = -1;
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);
    if (r3d[2] < 0)
        rad = -rad;
    rad *= rate;
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};

/**
 *
 * @return {BoundingBox}
 */
GameObject.prototype.getBBox = function () {
    var xform = this.getXform();
    return new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
};