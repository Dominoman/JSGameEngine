/**
 * Created by Laca on 2017. 04. 18..
 */
/* globals TextureShader, SimpleShader, gEngine */
"use strict";

/**
 *
 * @param {string} vertexShaderPath
 * @param {string} fragmentShaderPath
 * @constructor
 */
function SpriteShader(vertexShaderPath, fragmentShaderPath) {
    TextureShader.call(this, vertexShaderPath, fragmentShaderPath);
    this.mTexCoordBuffer = null;
    var initTexCoord = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];
    var gl = gEngine.Core.getGL();
    this.mTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord), gl.DYNAMIC_DRAW);
}
gEngine.Core.inheritPrototype(SpriteShader, TextureShader);

/**
 *
 * @param {Number[]} texCoord
 */
SpriteShader.prototype.setTextureCoordinate = function (texCoord) {
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
};

/**
 *
 * @param {Number[]} pixelColor
 * @param {Camera} aCamera
 */
SpriteShader.prototype.activateShader = function (pixelColor, aCamera) {
    SimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
};

/**
 *
 */
SpriteShader.prototype.cleanUp = function () {
    var gl = gEngine.Core.getGL();
    gl.deleteBuffer(this.mTexCoordBuffer);
    SimpleShader.prototype.cleanUp.call(this);
};

/**
 *
 * @param {Light} l
 */
SpriteShader.prototype.setLights = function (l) {
};

/**
 *
 * @param m
 * @param p
 */
SpriteShader.prototype.setMaterialAndCameraPos = function (m, p) {
};