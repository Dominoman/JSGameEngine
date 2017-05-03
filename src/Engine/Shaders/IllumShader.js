/**
 * Created by Laca on 2017. 05. 02..
 */
/* globals LightShader,gEngine */
"use strict";

/**
 *
 * @param {string} vertexPath
 * @param {string} fragmentPath
 * @constructor
 */
function IllumShader(vertexPath, fragmentPath) {
    LightShader.call(this, vertexPath, fragmentPath);
    var gl = gEngine.Core.getGL();
    this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uNormalSampler");
}
gEngine.Core.inheritPrototype(IllumShader, LightShader);

/**
 *
 * @param {number[]} pixelColor
 * @param {Camera} aCamera
 */
IllumShader.prototype.activateShader = function (pixelColor, aCamera) {
    LightShader.prototype.activateShader.call(this, pixelColor, aCamera);
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mNormalSamplerRef, 1);
};