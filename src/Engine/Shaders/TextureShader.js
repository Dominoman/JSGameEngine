/**
 * Created by Laca on 2017. 04. 18..
 */
/* globals SimpleShader,gEngine*/
"use strict";

/**
 *
 * @param {string} vertexShaderPath
 * @param {string} fragmentShaderPath
 * @constructor
 */
function TextureShader(vertexShaderPath, fragmentShaderPath) {
    SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);
    this.mShaderTextureCoordAttribute = null;
    this.mSampleRef = null;
    var gl = gEngine.Core.getGL();
    this.mSampleRef = gl.getUniformLocation(this.mCompiledShader, "uSampler");
    this.mShaderTextureCoordAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
}
gEngine.Core.inheritPrototype(TextureShader, SimpleShader);

/**
 *
 * @param {Number[]} pixelColor
 * @param {Camera} aCamera
 */
TextureShader.prototype.activateShader = function (pixelColor, aCamera) {
    SimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(this.mSampleRef, 0);
};

