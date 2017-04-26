/**
 * Created by Laca on 2017. 04. 26..
 */
"use strict";

/**
 *
 * @private
 */
SpriteRenderable.prototype._setTexInfo = function () {
    var imageW = this.mTextureInfo.mWidth;
    var imageH = this.mTextureInfo.mHeight;

    this.mTexLeftIndex = this.mTexLeft * imageW;
    this.mTexBottomIndex = this.mTexBottom * imageH;

    this.mTexWidth = (this.mTexRight - this.mTexLeft) * imageW + 1;
    this.mTexHeight = (this.mTexTop - this.mTexBottom) * imageH + 1;
};