/**
 * Created by Laca on 2017. 04. 13..
 */
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

    var gl = gEngine.Core.getGL();

    this.mVertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
    this.mFragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
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
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};

/**
 *
 * @param {Number[]} pixelColor
 * @param {mat4} vpMatrix
 */
SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
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