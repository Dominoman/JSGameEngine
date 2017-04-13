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
    this.mConstColorShader = shader;
    this.mColor = [1, 1, 1, 1];
}

/**
 *
 */
Renderable.prototype.draw = function () {
    var gl = gEngine.Core.getGL();
    this.mConstColorShader.activateShader(this.mColor);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function (color) {
    this.mColor = color;
};
Renderable.prototype.getColor = function () {
    return this.mColor;
};

