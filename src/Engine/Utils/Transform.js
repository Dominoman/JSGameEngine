/**
 * Created by Laca on 2017. 04. 15..
 */
/* globals vec2, vec3, mat4*/
"use strict";

/**
 *
 * @constructor
 */
function Transform() {
    this.mPosition = vec2.fromValues(0, 0);
    this.mScale = vec2.fromValues(1, 1);
    this.mZ = 0.0;
    this.mRotationInRad = 0.0;
}

/**
 *
 * @param {Transform} aXform
 */
Transform.prototype.cloneTo = function (aXform) {
    aXform.mPosition = vec2.clone(this.mPosition);
    aXform.mScale = vec2.clone(this.mScale);
    aXform.mZ = this.mZ;
    aXform.mRotationInRad = this.mRotationInRad;
};

/**
 *
 * @param {number} xPos
 * @param {number} yPos
 */
Transform.prototype.setPosition = function (xPos, yPos) {
    this.setXPos(xPos);
    this.setYPos(yPos);
};

/**
 *
 * @return {vec2|*}
 */
Transform.prototype.getPosition = function () {
    return this.mPosition;
};

/**
 *
 * @returns {vec3}
 */
Transform.prototype.get3DPosition = function () {
    return vec3.fromValues(this.getXPos(), this.getYPos(), this.getZPos());
};

/**
 *
 * @param {number} d
 */
Transform.prototype.setZPos = function (d) {
    this.mZ = d;
};

/**
 *
 * @returns {number|*}
 */
Transform.prototype.getZPos = function () {
    return this.mZ;
};

/**
 *
 * @param {number} delta
 */
Transform.prototype.incZPosBy = function (delta) {
    this.mZ += delta;
};

/**
 *
 * @return {number}
 */
Transform.prototype.getXPos = function () {
    return this.mPosition[0];
};

/**
 *
 * @param {number} xPos
 */
Transform.prototype.setXPos = function (xPos) {
    this.mPosition[0] = xPos;
};

/**
 *
 * @param {number} delta
 */
Transform.prototype.incXPosBy = function (delta) {
    this.mPosition[0] += delta;
};

/**
 *
 * @return {number}
 */
Transform.prototype.getYPos = function () {
    return this.mPosition[1];
};

/**
 *
 * @param {number} yPos
 */
Transform.prototype.setYPos = function (yPos) {
    this.mPosition[1] = yPos;
};

/**
 *
 * @param {number} delta
 */
Transform.prototype.incYPosBy = function (delta) {
    this.mPosition[1] += delta;
};

/**
 *
 * @param {number} width
 * @param {number} height
 */
Transform.prototype.setSize = function (width, height) {
    this.setWidth(width);
    this.setHeight(height);
};

/**
 *
 * @return {vec2|*}
 */
Transform.prototype.getSize = function () {
    return this.mScale;
};

/**
 *
 * @param {number} delta
 */
Transform.prototype.incSizeBy = function (delta) {
    this.incWidthBy(delta);
    this.incHeightBy(delta);
};

/**
 *
 * @return {number}
 */
Transform.prototype.getWidth = function () {
    return this.mScale[0];
};

/**
 *
 * @param {number} width
 */
Transform.prototype.setWidth = function (width) {
    this.mScale[0] = width;
};

/**
 *
 * @param {number} delta
 */
Transform.prototype.incWidthBy = function (delta) {
    this.mScale[0] += delta;
};

/**
 *
 * @return {number}
 */
Transform.prototype.getHeight = function () {
    return this.mScale[1];
};

/**
 *
 * @param {number} height
 */
Transform.prototype.setHeight = function (height) {
    this.mScale[1] = height;
};

/**
 *
 * @param {number} delta
 */
Transform.prototype.incHeightBy = function (delta) {
    this.mScale[1] += delta;
};

/**
 *
 * @param {number} rotationInRadians
 */
Transform.prototype.setRotationInRad = function (rotationInRadians) {
    this.mRotationInRad = rotationInRadians;
    while (this.mRotationInRad > (2 * Math.PI)) {
        this.mRotationInRad -= (2 * Math.PI);
    }
};

/**
 *
 * @param {number} rotationInDegree
 */
Transform.prototype.setRotationInDegree = function (rotationInDegree) {
    this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
};

/**
 *
 * @param {number} deltaDegree
 */
Transform.prototype.incRotationByDegree = function (deltaDegree) {
    this.incRotationByRad(deltaDegree * Math.PI / 180.0);
};

/**
 *
 * @param {number} deltaRad
 */
Transform.prototype.incRotationByRad = function (deltaRad) {
    this.setRotationInRad(this.mRotationInRad + deltaRad);
};

/**
 *
 * @return {number}
 */
Transform.prototype.getRotationInRad = function () {
    return this.mRotationInRad;
};

/**
 *
 * @return {number}
 */
Transform.prototype.getRotationInDegree = function () {
    return this.mRotationInRad * 180.0 / Math.PI;
};

/**
 *
 * @returns {mat4}
 */
Transform.prototype.getXform = function () {
    var matrix = mat4.create();
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
    return matrix;
};

/**
 *
 * @returns {mat4}
 */
Transform.prototype.getXform = function () {
    var matrix = mat4.create();
    mat4.translate(matrix, matrix, this.get3DPosition());
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
    return matrix;
};