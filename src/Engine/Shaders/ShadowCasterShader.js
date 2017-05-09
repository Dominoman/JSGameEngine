/**
 * Created by Laca on 2017. 05. 08..
 */
/* globals SpriteShader, ShaderLightAtIndex, gEngine */
"use strict";

/**
 *
 * @param {string} vertexShaderPath
 * @param {string} fragmentShaderPath
 * @constructor
 */
function ShadowCasterShader(vertexShaderPath, fragmentShaderPath) {
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);
    this.mLight = null;
    this.mShaderLight = new ShaderLightAtIndex(this.mCompiledShader, 0);
}
gEngine.Core.inheritPrototype(ShadowCasterShader, SpriteShader);

/**
 *
 * @param {number[]} pixelColor
 * @param {Camera} aCamera
 */
ShadowCasterShader.prototype.activateShader = function (pixelColor, aCamera) {
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    this.mShaderLight.loadToShader(aCamera, this.mLight);
};

/**
 *
 * @param {Light} l
 */
ShadowCasterShader.prototype.setLight = function (l) {
    this.mLight = l;
};

