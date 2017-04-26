/**
 * Created by Laca on 2017. 04. 18..
 */
"use strict";

/**
 *
 * @param {string} myTexture
 * @constructor
 */
function TextureRenderable(myTexture) {
    Renderable.call(this);
    Renderable.prototype.setColor.call(this, [1, 1, 1, 0]);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader());
    this.mTexture = null;
    this.mTextureInfo = null;
    this.mColorArray = null;
    this.mTexWidth = 0;
    this.mTexHeight = 0;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;
    this.setTexture(myTexture);
}
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

/**
 *
 * @param {Camera} aCamera
 */
TextureRenderable.prototype.draw = function (aCamera) {
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this, aCamera);
};

/**
 *
 * @return {string}
 */
TextureRenderable.prototype.getTexture = function () {
    return this.mTexture;
};

/**
 *
 * @param {string} newTexture
 */
TextureRenderable.prototype.setTexture = function (newTexture) {
    this.mTexture = newTexture;
    this.mTextureInfo = gEngine.Textures.getTextureInfo(newTexture);
    this.mColorArray = null;
    this.mTexWidth = this.mTextureInfo.mWidth;
    this.mTexHeight = this.mTextureInfo.mHeight;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;
};

