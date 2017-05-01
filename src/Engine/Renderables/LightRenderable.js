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
    this.mLight = null;
}
gEngine.Core.inheritPrototype(LightRenderable, SpriteAnimateRenderable);

/**
 *
 * @param {Camera} aCamera
 */
LightRenderable.prototype.draw = function (aCamera) {
    this.mShader.setLight(this.mLight);
    SpriteAnimateRenderable.prototype.draw.call(this, aCamera);
};

/**
 *
 * @return {Light}
 */
LightRenderable.prototype.getLight = function () {
    return this.mLight;
};

/**
 *
 * @param {Light} l
 */
LightRenderable.prototype.addLight = function (l) {
    this.mLight = l;
};