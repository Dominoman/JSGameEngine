/**
 * Created by Laca on 2017. 04. 13..
 */
/* globals gEngine, alert,WebGLProgram */
"use strict";

/**
 *
 * @param {string} vertexShaderPath
 * @param {string} fragmentShaderPath
 * @constructor
 */
function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelColor = null;
    this.mModelTransform = null;
    this.mViewProjTransform = null;
    this.mGlobalAmbientColor = null;
    this.mGlobalAmbientIntensity = null;

    var gl = gEngine.Core.getGL();

    this.mVertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
    this.mFragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader (" + vertexShaderPath + "/" + fragmentShaderPath + ")");
        return null;
    }
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    this.mGlobalAmbientColor = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientColor");
    this.mGlobalAmbientIntensity = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientIntensity");
}

/**
 *
 * @param {string} filePath
 * @param {Number} shaderType
 * @private
 */
SimpleShader.prototype._compileShader = function (filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    var shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);
    var compiledShader = gl.createShader(shaderType);
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader) + " (" + filePath + ")");
    }
    return compiledShader;
};

/**
 *
 * @param {Number[]} pixelColor
 * @param {Camera} aCamera
 */
SimpleShader.prototype.activateShader = function (pixelColor, aCamera) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, aCamera.getVPMatrix());
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
    gl.uniform4fv(this.mGlobalAmbientColor, gEngine.DefaultResources.getGlobalAmbientColor());
    gl.uniform1f(this.mGlobalAmbientIntensity, gEngine.DefaultResources.getGlobalAmbientIntensity());
};

/**
 *
 * @param {mat4} modelTransform
 */
SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
    var gl = gEngine.Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

/**
 *
 * @return {WebGLProgram|*|null}
 */
SimpleShader.prototype.getShader = function () {
    return this.mCompiledShader;
};

/**
 *
 */
SimpleShader.prototype.cleanUp = function () {
    var gl = gEngine.Core.getGL();
    gl.detachShader(this.mCompiledShader, this.mVertexShader);
    gl.detachShader(this.mCompiledShader, this.mFragmentShader);
    gl.deleteShader(this.mVertexShader);
    gl.deleteShader(this.mFragmentShader);
};