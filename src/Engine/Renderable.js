/**
 * Created by Laca on 2017. 04. 13..
 */
"use strict";

/**
 *
 * @param shader
 * @constructor
 */
function Renderable(shader) {
    this.mShader = shader;
    this.mColor = [1, 1, 1, 1];
    this.mXform = new Transform();
}

Renderable.prototype.getXform = function () {
    return this.mXform;
};

/**
 *
 */
Renderable.prototype.draw = function () {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function (color) {
    this.mColor = color;
};
Renderable.prototype.getColor = function () {
    return this.mColor;
};

