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
 * @param {vec2} xDir
 * @param {vec2} yDir
 * @private
 */
TextureRenderable.prototype._indexToWCPosition = function (returnWCPos, i, j, xDir, yDir) {
    var x = i * this.mXform.getWidth() / (this.mTexWidth - 1);
    var y = j * this.mXform.getHeight() / (this.mTexHeight - 1);
    var xDisp = x - this.mXform.getWidth() * 0.5;
    var yDisp = y - this.mXform.getHeight() * 0.5;
    var xDirDisp = [];
    var yDirDisp = [];
    vec2.scale(xDirDisp, xDir, xDisp);
    vec2.scale(yDirDisp, yDir, yDisp);
    vec2.add(returnWCPos, this.mXform.getPosition(), xDirDisp);
    vec2.add(returnWCPos, returnWCPos, yDirDisp);
};

/**
 *
 * @param {vec2}returnIndex
 * @param {vec2} wcPos
 * @param {vec2} xDir
 * @param {vec2} yDir
 * @private
 */
TextureRenderable.prototype._wcPositionToIndex = function (returnIndex, wcPos, xDir, yDir) {
    var delta = [];
    vec2.sub(delta, wcPos, this.mXform.getPosition());
    var xDisp = vec2.dot(delta, xDir);
    var yDisp = vec2.dot(delta, yDir);
    returnIndex[0] = this.mTexWidth * (xDisp / this.mXform.getWidth());
    returnIndex[1] = this.mTexWidth * (yDisp / this.mXform.getHeight());

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
    var xIndex = 0, yIndex;
    var otherIndex = [0, 0];

    var xDir = [1, 0];
    var yDir = [0, 1];
    var otherXDir = [1, 0];
    var otherYDir = [0, 1];

    vec2.rotate(xDir, xDir, this.mXform.getRotationInRad());
    vec2.rotate(yDir, yDir, this.mXform.getRotationInRad());
    vec2.rotate(otherXDir, otherXDir, other.mXform.getRotationInRad());
    vec2.rotate(otherYDir, otherYDir, other.mXform.getRotationInRad());

    while (!pixelTouch && (xIndex < this.mTexWidth)) {
        yIndex = 0;
        while (!pixelTouch && yIndex < this.mTexHeight) {
            if (this._pixelAlphaValue(xIndex, yIndex) > 0) {
                this._indexToWCPosition(wcTouchPos, xIndex, yIndex, xDir, yDir);
                other._wcPositionToIndex(otherIndex, wcTouchPos, otherXDir, otherYDir);
                if ((otherIndex[0] > 0) && (otherIndex[0] < other.mTexWidth) && (otherIndex[1] > 0) && (otherIndex[1] < other.mTexHeight)) {
                    pixelTouch = other._pixelAlphaValue(otherIndex[0], otherIndex[1]) > 0;
                }
            }
            yIndex++;
        }
        xIndex++;
    }
    return pixelTouch;
};
