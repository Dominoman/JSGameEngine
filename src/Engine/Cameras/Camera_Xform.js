/**
 * Created by Laca on 2017. 05. 01..
 */
/* globals Camera,vec3 */
"use strict";

/**
 *
 * @param {number} z
 */
Camera.prototype.fakeZInPixelSpace = function (z) {
    return z * this.mRenderCache.mWCToPixelRatio;
};

/**
 *
 * @param {vec3} p
 * @return {vec3}
 */
Camera.prototype.wcPosToPixel = function (p) {
    var x = this.mViewport[Camera.eViewport.eOrgX] + (p[0] - this.mRenderCache.mCameraOrgX) * this.mRenderCache.mWCToPixelRatio + 0.5;
    var y = this.mViewport[Camera.eViewport.eOrgY] + (p[1] - this.mRenderCache.mCameraOrgY) * this.mRenderCache.mWCToPixelRatio + 0.5;
    var z = this.fakeZInPixelSpace(p[2]);
    return vec3.fromValues(x, y, z);
};

/**
 *
 * @param {number} s
 * @return {number}
 */
Camera.prototype.wcSizeToPixel = function (s) {
    return s * this.mRenderCache.mWCToPixelRatio + 0.5;
};

/**
 *
 * @param {vec3} d
 * @returns {vec3}
 */
Camera.prototype.wcDirToPixel = function (d) {
    var x = d[0] * this.mRenderCache.mWCToPixelRatio;
    var y = d[1] * this.mRenderCache.mWCToPixelRatio;
    var z = d[2];
    return vec3.fromValues(x, y, z);
};