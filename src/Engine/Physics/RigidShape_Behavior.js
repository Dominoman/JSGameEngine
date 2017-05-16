/**
 * Created by Laca on 2017. 05. 15..
 */
/* globals RigidShape, gEngine, vec2 */
"use strict";

/**
 *
 */
RigidShape.prototype.update = function () {
    var dt = gEngine.GameLoop.getUpdateIntervalInSeconds();
    var v = this.getVelocity();
    vec2.scaleAndAdd(v, v, this.mAcceleration, this.getInvMass() * dt);
    var pos = this.getPosition();
    vec2.scaleAndAdd(pos, pos, v, dt);
};

/**
 *
 * @return {number}
 */
RigidShape.prototype.getInvMass = function () {
    return this.mInvMas;
};

/**
 *
 * @param {number} m
 */
RigidShape.prototype.setMass = function (m) {
    if (m > 0) {
        this.mInvMas = 1 / m;
    } else {
        this.mInvMas = 0;
    }
};

/**
 *
 * @return {vec2}
 */
RigidShape.prototype.getVelocity = function () {
    return this.mVelocity;
};

/**
 *
 * @param {vec2} v
 */
RigidShape.prototype.setVelocity = function (v) {
    this.mVelocity = v;
};

/**
 *
 * @return {number}
 */
RigidShape.prototype.getRestitution = function () {
    return this.mRestitution;
};

/**
 *
 * @param {number} r
 */
RigidShape.prototype.setRestitution = function (r) {
    this.mRestitution = r;
};

/**
 *
 * @return {number}
 */
RigidShape.prototype.getFriction = function () {
    return this.mFriction;
};

/**
 *
 * @param {number} f
 */
RigidShape.prototype.setFriction = function (f) {
    this.mFriction = f;
};

/**
 *
 * @return {[number,number]}
 */
RigidShape.prototype.getAcceleration = function () {
    return this.mAcceleration;
};

/**
 *
 * @param {[number,number]} g
 */
RigidShape.prototype.setAcceleration = function (g) {
    this.mAcceleration = g;
};