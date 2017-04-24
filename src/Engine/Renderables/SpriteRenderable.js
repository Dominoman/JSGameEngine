/**
 * Created by Laca on 2017. 04. 18..
 */
"use strict";

/**
 *
 * @param {string} myTexture
 * @constructor
 */
function SpriteRenderable(myTexture) {
    TextureRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());
    this.mTexLeft = 0.0;
    this.mTexRight = 1.0;
    this.mTexTop = 1.0;
    this.mTexBottom = 0.0;
}
gEngine.Core.inheritPrototype(SpriteRenderable, TextureRenderable);

SpriteRenderable.eTexCoordArray = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

/**
 *
 * @param {Number} left
 * @param {Number} right
 * @param {Number} bottom
 * @param {Number} top
 */
SpriteRenderable.prototype.setElementPixelPositions = function (left, right, bottom, top) {
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    var imageW = texInfo.mWidth;
    var imageH = texInfo.mHeight;

    this.mTexLeft = left / imageW;
    this.mTexRight = right / imageW;
    this.mTexBottom = bottom / imageH;
    this.mTexTop = top / imageH;
};

/**
 *
 * @return {Number[]}
 */
SpriteRenderable.prototype.getElementUVCoordinateArray = function () {
    return [
        this.mTexRight, this.mTexTop,
        this.mTexLeft, this.mTexTop,
        this.mTexRight, this.mTexBottom,
        this.mTexLeft, this.mTexBottom
    ];
};

/**
 *
 * @param {Number} left
 * @param {Number} right
 * @param {Number} bottom
 * @param {Number} top
 */
SpriteRenderable.prototype.setElementUVCoordinate = function (left, right, bottom, top) {
    this.mTexLeft = left;
    this.mTexRight = right;
    this.mTexBottom = bottom;
    this.mTexTop = top;
};

/**
 *
 * @param {Number[]} pixelColor
 * @param {Camera} aCamera
 */
SpriteRenderable.prototype.draw = function (pixelColor, aCamera) {
    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
    TextureRenderable.prototype.draw.call(this, pixelColor, aCamera);
};