/**
 * Created by Laca on 2017. 04. 13..
 */
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

Renderable.prototype.setColor = function (color) {
    this.mColor = color;
};
Renderable.prototype.getColor = function () {
    return this.mColor;
};
Renderable.prototype._setShader = function (s) {
    this.mShader = s;
};
