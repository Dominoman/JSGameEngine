/**
 * Created by Laca on 2017. 05. 02..
 */
/* globals LightRenderable,Renderable,gEngine */
"use strict";

/**
 *
 * @param {string} myTexture
 * @param myNormalMap
 * @constructor
 */
function IllumRenderable(myTexture, myNormalMap) {
    LightRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getIllumShader());
    this.mNormalMap = myNormalMap;
}
gEngine.Core.inheritPrototype(IllumRenderable, LightRenderable);

/**
 *
 * @param {Camera} aCamera
 */
IllumRenderable.prototype.draw = function (aCamera) {
    gEngine.Textures.activateNormalMap(this.mNormalMap);
    LightRenderable.prototype.draw.call(this, aCamera);
};

