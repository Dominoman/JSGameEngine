/**
 * Created by Laca on 2017. 05. 02..
 */
/* globals LightRenderable,Renderable,gEngine,Material */
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
    this.mMaterial = new Material();
}
gEngine.Core.inheritPrototype(IllumRenderable, LightRenderable);

/**
 *
 * @param {Camera} aCamera
 */
IllumRenderable.prototype.draw = function (aCamera) {
    gEngine.Textures.activateNormalMap(this.mNormalMap);
    this.mShader.setMaterialAndCameraPos(this.mMaterial, aCamera.getPosInPixelSpace());
    LightRenderable.prototype.draw.call(this, aCamera);
};

/**
 *
 * @return {Material}
 */
IllumRenderable.prototype.getMaterial = function () {
    return this.mMaterial;
};

