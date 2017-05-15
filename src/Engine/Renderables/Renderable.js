/**
 * Created by Laca on 2017. 04. 13..
 */
/* globals gEngine, Transform */
"use strict";

/**
 *
 * @constructor
 */
function Renderable() {
    this.mShader = gEngine.DefaultResources.getConstColorShader();
    this.mColor = [1, 1, 1, 1];
    this.mXform = new Transform();
}

Renderable.prototype.getXform = function () {
    return this.mXform;
};

/**
 *
 * @param {Camera} aCamera
 */
Renderable.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, aCamera);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

/**
 *
 * @param {Array} color
 */
Renderable.prototype.setColor = function (color) {
    this.mColor = color;
};

/**
 *
 * @returns {Array|[number,number,number,number]|*}
 */
Renderable.prototype.getColor = function () {
    return this.mColor;
};

/**
 *
 * @param {SimpleShader} s
 * @private
 */
Renderable.prototype._setShader = function (s) {
    this.mShader = s;
};

/**
 *
 * @param {SimpleShader} s
 * @returns {SimpleShader|*}
 */
Renderable.prototype.swapShader = function (s) {
    var out = this.mShader;
    this.mShader = s;
    return out;
};