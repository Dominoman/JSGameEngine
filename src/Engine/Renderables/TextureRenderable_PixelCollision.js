/**
 * Created by Laca on 2017. 04. 24..
 */
"use strict";

/**
 *
 */
TextureRenderable.prototype.setColorArray = function () {
    if (this.mColorArray === null)
        this.mColorArray = gEngine.Textures.getColorArray(this.mTexture);
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @return {number}
 * @private
 */
TextureRenderable.prototype._pixelAlphaValue = function (x, y) {
    x = x * 4;
    y = y * 4;
    return this.mColorArray[y * this.mTextureInfo.mWidth + x + 3];
};

/**
 *
 * @param {vec2} returnWCPos
 * @param {number} i
 * @param {number} j
 * @private
 */
TextureRenderable.prototype._indexToWCPosition = function (returnWCPos, i, j) {
    var x = i * this.mXform.getWidth() / (this.mTexWidth - 1);
    var y = j * this.mXform.getHeight() / (this.mTexHeight - 1);
    returnWCPos[0] = this.mXform.getXPos() + (x - this.mXform.getWidth() * 0.5);
    returnWCPos[1] = this.mXform.getYPos() + (y - this.mXform.getHeight() * 0.5);
};

/**
 *
 * @param {vec2}returnIndex
 * @param {vec2} wcPos
 * @private
 */
TextureRenderable.prototype._wcPositionToIndex = function (returnIndex, wcPos) {
    var delta = [];
    vec2.sub(delta, wcPos, this.mXform.getPosition());
    returnIndex[0] = this.mTexWidth * (delta[0] / this.mXform.getWidth());
    returnIndex[1] = this.mTexHeight * (delta[1] / this.mXform.getHeight());

    returnIndex[0] += this.mTexWidth / 2;
    returnIndex[1] += this.mTexHeight / 2;

    returnIndex[0] = Math.floor(returnIndex[0]);
    returnIndex[1] = Math.floor(returnIndex[1]);
};

/**
 *
 * @param {TextureRenderable} other
 * @param {vec2} wcTouchPos
 * @return {boolean}
 */
TextureRenderable.prototype.pixelTouches = function (other, wcTouchPos) {
    var pixelTouch = false;
    var xIndex = 0;
    var otherIndex = [0, 0];
    while (!pixelTouch && xIndex < this.mTexWidth) {
        var yIndex = 0;
        while (!pixelTouch && yIndex < this.mTexHeight) {
            if (this._pixelAlphaValue(xIndex, yIndex) > 0) {
                this._indexToWCPosition(wcTouchPos, xIndex, yIndex);
                other._wcPositionToIndex(otherIndex, wcTouchPos);
                if (otherIndex[0] > 0 && otherIndex[0] < other.mTexWidth && otherIndex[1] > 0 && otherIndex[1] < other.mTexHeight) {
                    pixelTouch = other._pixelAlphaValue(otherIndex[0], otherIndex[1]) > 0;
                }
            }
            yIndex++;
        }
        xIndex++;
    }
    return pixelTouch;
};
