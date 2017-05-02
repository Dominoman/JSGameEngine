/**
 * Created by Laca on 2017. 04. 27..
 */
/* globals SpriteShader,gEngine,vec4,vec3,ShaderLightAtIndex */
"use strict";

/**
 *
 * @param {string} vertexShaderPath
 * @param {string} fragmentShaderPath
 * @constructor
 */
function LightShader(vertexShaderPath, fragmentShaderPath) {
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);
    this.mLights = null;

    //*******WARNING***************
    // this number MUST correspond to the GLSL uLight[] array size
    // (for LightFS.glsl and IllumFS.glsl)
    //*******WARNING********************
    this.kGLSLiLightArraySize = 4;    // <-- make sure this is the same as LightFS.glsl

    this.mShaderLights = [];
    for (var i = 0; i < this.kGLSLiLightArraySize; i++) {
        var ls = new ShaderLightAtIndex(this.mCompiledShader, i);
        this.mShaderLights.push(ls);
    }
}
gEngine.Core.inheritPrototype(LightShader, SpriteShader);

/**
 *
 * @param l
 */
LightShader.prototype.setLights = function (l) {
    this.mLights = l;
};

/**
 *
 * @param {number[]} pixelColor
 * @param {Camera} aCamera
 */
LightShader.prototype.activateShader = function (pixelColor, aCamera) {
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);

    var numLight = 0;
    if (this.mLights !== null) {
        while (numLight < this.mLights.length) {
            this.mShaderLights[numLight].loadToShader(aCamera, this.mLights[numLight]);
            numLight++;
        }
    }
    while (numLight < this.kGLSLiLightArraySize) {
        this.mShaderLights[numLight].switchOfLight();
        numLight++;
    }
};
