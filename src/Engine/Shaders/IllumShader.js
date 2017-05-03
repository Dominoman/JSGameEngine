/**
 * Created by Laca on 2017. 05. 02..
 */
/* globals LightShader,gEngine,ShaderMaterial */
"use strict";

/**
 *
 * @param {string} vertexPath
 * @param {string} fragmentPath
 * @constructor
 */
function IllumShader(vertexPath, fragmentPath) {
    LightShader.call(this, vertexPath, fragmentPath);

    this.mMaterial = null;
    this.mMaterialLoader = new ShaderMaterial(this.mCompiledShader);

    var gl = gEngine.Core.getGL();

    this.mCameraPos = null;
    this.mCameraPosRef = gl.getUniformLocation(this.mCompiledShader, "uCameraPosition");

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
    this.mMaterialLoader.loadToShader(this.mMaterial);
    gl.uniform3fv(this.mCameraPosRef, this.mCameraPos);
};

/**
 *
 * @param {Material} m
 * @param {vec3} p
 */
IllumShader.prototype.setMaterialAndCameraPos = function (m, p) {
    this.mMaterial = m;
    this.mCameraPos = p;
};

