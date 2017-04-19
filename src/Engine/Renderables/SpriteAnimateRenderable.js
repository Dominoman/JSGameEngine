/**
 * Created by Laca on 2017. 04. 19..
 */
"use strict";

SpriteAnimateRenderable.eAnimationType = Object.freeze({
    eAnimateRight: 0,
    eAnimateLeft: 1,
    eAnimateSwing: 2
});

/**
 *
 * @param myTexture
 * @constructor
 */
function SpriteAnimateRenderable(myTexture) {
    SpriteRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());

    this.mFirstElmLeft = 0.0;
    this.mElmTop = 1.0;
    this.mElmWidth = 1.0;
    this.mElmHeight = 1.0;
    this.mWidthPadding = 0.0;
    this.mNumElems = 1;

    this.mAnimationType = SpriteAnimateRenderable.eAnimationType.eAnimateRight;
    this.mUpdateInterval = 1;

    this.mCurrentAnimAdvance = -1;
    this.mCurrentElm = 0;

    this._initAnimation();
}
gEngine.Core.inheritPrototype(SpriteAnimateRenderable, SpriteRenderable);

/**
 *
 * @param animationType
 */
SpriteAnimateRenderable.prototype.setAnimationType = function (animationType) {
    this.mAnimationType = animationType;
    this.mCurrentAnimAdvance = -1;
    this.mCurrentElm = 0;
    this._initAnimation();
};

/**
 *
 * @private
 */
SpriteAnimateRenderable.prototype._initAnimation = function () {
    this.mCurrentTick = 0;
    switch (this.mAnimationType) {
        case SpriteAnimateRenderable.eAnimationType.eAnimateRight:
            this.mCurrentElm = 0;
            this.mCurrentAnimAdvance = 1;
            break;
        case SpriteAnimateRenderable.eAnimationType.eAnimateSwing:
            this.mCurrentAnimAdvance = -this.mCurrentAnimAdvance;
            this.mCurrentElm += 2 * this.mCurrentAnimAdvance;
            break;
        case SpriteAnimateRenderable.eAnimationType.eAnimateLeft:
            this.mCurrentElm = this.mNumElems - 1;
            this.mCurrentAnimAdvance = -1;
            break;
    }
    this._setSpriteElement();
};

/**
 *
 * @private
 */
SpriteAnimateRenderable.prototype._setSpriteElement = function () {
    var left = this.mFirstElmLeft + this.mCurrentElm * (this.mElmWidth + this.mWidthPadding);
    SpriteAnimateRenderable.prototype.setElementUVCoordinate.call(this, left, left + this.mElmWidth, this.mElmTop - this.mElmHeight, this.mElmTop);
};

/**
 *
 * @param topPixel
 * @param rightPixel
 * @param elmWidthInPixel
 * @param elmHeightInPixel
 * @param numElements
 * @param wPaddingInPixel
 */
SpriteAnimateRenderable.prototype.setSpriteSequence = function (topPixel, rightPixel, elmWidthInPixel, elmHeightInPixel, numElements, wPaddingInPixel) {
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    var imageW = texInfo.mWidth;
    var imageH = texInfo.mHeight;
    this.mNumElems = numElements;
    this.mFirstElmLeft = rightPixel / imageW;
    this.mElmTop = topPixel / imageH;
    this.mElmWidth = elmWidthInPixel / imageW;
    this.mElmHeight = elmHeightInPixel / imageH;
    this.mWidthPadding = wPaddingInPixel / imageW;
    this._initAnimation();
};

/**
 *
 * @param tickInterval
 */
SpriteAnimateRenderable.prototype.setAnimationSpeed = function (tickInterval) {
    this.mUpdateInterval = tickInterval;
};

/**
 *
 * @param deltaInterval
 */
SpriteAnimateRenderable.prototype.incAnimationSpeed = function (deltaInterval) {
    this.mUpdateInterval += deltaInterval;
};

/**
 *
 */
SpriteAnimateRenderable.prototype.updateAnimation = function () {
    this.mCurrentTick++;
    if (this.mCurrentTick >= this.mUpdateInterval) {
        this.mCurrentTick = 0;
        this.mCurrentElm += this.mCurrentAnimAdvance;
        if (this.mCurrentElm >= 0 && this.mCurrentElm < this.mNumElms) {
            this._setSpriteElement();
        } else {
            this._initAnimation();
        }
    }
};