/**
 * Created by Laca on 2017. 04. 28..
 */
/* globals SpriteAnimateRenderable, Renderable, gEngine */
"use strict";

/**
 *
 * @param {string} myTexture
 * @constructor
 */
function LightRenderable(myTexture) {
    SpriteAnimateRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getLightShader());
    this.mLights = [];
}
gEngine.Core.inheritPrototype(LightRenderable, SpriteAnimateRenderable);

/**
 *
 * @param {Camera} aCamera
 */
LightRenderable.prototype.draw = function (aCamera) {
    this.mShader.setLights(this.mLights);
    SpriteAnimateRenderable.prototype.draw.call(this, aCamera);
};

/**
 *
 * @param {number} index
 * @return {Light}
 */
LightRenderable.prototype.getLightAt = function (index) {
    return this.mLights[index];
};

/**
 *
 * @param {Light} l
 */
LightRenderable.prototype.addLight = function (l) {
    this.mLights.push(l);
};