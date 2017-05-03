/**
 * Created by Laca on 2017. 04. 15..
 */
/* global CameraState, mat4, vec3, vec2, gEngine, BoundingBox */
"use strict";

/**
 *
 * @constructor
 */
function PerRenderCache() {
    this.mWCToPixelRatio = 1;  // WC to pixel transformation
    this.mCameraOrgX = 1; // Lower-left corner of camera in WC
    this.mCameraOrgY = 1;
    this.mCameraPosInPixelSpace = vec3.fromValues(0, 0, 0);
}

/**
 *
 * @param {vec2} wcCenter
 * @param {number} wcWidth
 * @param {array} viewportArray
 * @param {number} bound
 * @constructor
 */
function Camera(wcCenter, wcWidth, viewportArray, bound) {
    // WC and viewport position and size
    this.mCameraState = new CameraState(wcCenter, wcWidth);
    this.mCameraShake = null;

    this.mViewport = [];  // [x, y, width, height]
    this.mViewportBound = 0;
    if (bound !== undefined) {
        this.mViewportBound = bound;
    }
    this.mScissorBound = [];  // use for bounds
    this.setViewport(viewportArray, this.mViewportBound);
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    this.kCameraZ = 10;

    // transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    // background color
    this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha

    // per-rendering cached information
    // needed for computing transforms for shaders
    // updated each time in SetupViewProjection()
    this.mRenderCache = new PerRenderCache();
    // SHOULD NOT be used except
    // xform operations during the rendering
    // Client game should not access this!
}

Camera.eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
});

/**
 *
 * @param {number} xPos
 * @param {number} yPos
 */
Camera.prototype.setWCCenter = function (xPos, yPos) {
    var p = vec2.fromValues(xPos, yPos);
    this.mCameraState.setCenter(p);
};

/**
 *
 * @return {vec2}
 */
Camera.prototype.getWCCenter = function () {
    return this.mCameraState.getCenter();
};

/**
 *
 * @param {number} width
 */
Camera.prototype.setWCWidth = function (width) {
    this.mCameraState.setWidth(width);
};

/**
 *
 * @return {number}
 */
Camera.prototype.getWCWidth = function () {
    return this.mCameraState.getWidth();
};

/**
 *
 * @return {number}
 */
Camera.prototype.getWCHeight = function () {
    return this.mCameraState.getWidth() * this.mViewport[Camera.eViewport.eHeight] / this.mViewport[Camera.eViewport.eWidth];
};

/**
 *
 * @param {array} viewportArray
 * @param {number} bound
 */
Camera.prototype.setViewport = function (viewportArray, bound) {
    if (bound === undefined) {
        bound = this.mViewportBound;
    }
    this.mViewport[0] = viewportArray[0] + bound;
    this.mViewport[1] = viewportArray[1] + bound;
    this.mViewport[2] = viewportArray[2] - 2 * bound;
    this.mViewport[3] = viewportArray[3] - 2 * bound;
    this.mScissorBound[0] = viewportArray[0];
    this.mScissorBound[1] = viewportArray[1];
    this.mScissorBound[2] = viewportArray[2];
    this.mScissorBound[3] = viewportArray[3];
};

/**
 *
 * @return {array|*}
 */
Camera.prototype.getViewport = function () {
    var out = [];
    out[0] = this.mScissorBound[0];
    out[1] = this.mScissorBound[1];
    out[2] = this.mScissorBound[2];
    out[3] = this.mScissorBound[3];
    return out;
};

/**
 *
 * @param {Array|[number,number,number,number]|*} newColor
 */
Camera.prototype.setBackgroundColor = function (newColor) {
    this.mBGColor = newColor;
};

/**
 *
 * @return {Array|[number,number,number,number]|*}
 */
Camera.prototype.getBackgroundColor = function () {
    return this.mBGColor;
};

/**
 *
 * @return {mat4|*}
 */
Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};

/**
 *
 * @return {vec3|*}
 */
Camera.prototype.getPosInPixelSpace = function () {
    return this.mRenderCache.mCameraPosInPixelSpace;
};

/**
 *
 */
Camera.prototype.setupViewProjection = function () {
    var gl = gEngine.Core.getGL();
    gl.viewport(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
    gl.scissor(this.mScissorBound[0], this.mScissorBound[1], this.mScissorBound[2], this.mScissorBound[3]);
    gl.clearColor(this.mBGColor[0], this.mBGColor[1], this.mBGColor[2], this.mBGColor[3]);
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    var center = [];
    if (this.mCameraShake !== null) {
        center = this.mCameraShake.getCenter();
    } else {
        center = this.getWCCenter();
    }

    mat4.lookAt(this.mViewMatrix,
        [center[0], center[1], 10],
        [center[0], center[1], 0],
        [0, 1, 0]);

    var halfWCWidth = 0.5 * this.mCameraState.getWidth();
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];

    mat4.ortho(this.mProjMatrix, -halfWCWidth, halfWCWidth, -halfWCHeight, halfWCHeight, this.mNearPlane, this.mFarPlane);
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
    this.mRenderCache.mWCToPixelRatio = this.mViewport[Camera.eViewport.eWidth] / this.getWCWidth();
    this.mRenderCache.mCameraOrgX = center[0] - (this.getWCWidth() / 2);
    this.mRenderCache.mCameraOrgY = center[1] - (this.getWCHeight() / 2);
    var p = this.wcPosToPixel(this.getWCCenter());
    this.mRenderCache.mCameraPosInPixelSpace[0] = p[0];
    this.mRenderCache.mCameraPosInPixelSpace[1] = p[1];
    this.mRenderCache.mCameraPosInPixelSpace[2] = this.fakeZInPixelSpace(this.kCameraZ);
};

/**
 *
 * @param {Transform} aXform
 * @param {number} zone
 * @return {number}
 */
Camera.prototype.collideWCBound = function (aXform, zone) {
    var bbox = new BoundingBox(aXform.getPosition(), aXform.getWidth(), aXform.getHeight());
    var w = zone * this.getWCWidth();
    var h = zone * this.getWCHeight();
    var cameraBound = new BoundingBox(this.getWCCenter(), w, h);
    return cameraBound.boundCollideStatus(bbox);
};

/**
 *
 * @param {Transform} aXform
 * @param {number} zone
 * @return {number}
 */
Camera.prototype.clampAtBoundary = function (aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if (status !== BoundingBox.eboundCollideStatus.eInside) {
        var pos = aXform.getPosition();
        if ((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0)
            pos[1] = this.getWCCenter()[1] + (zone * this.getWCHeight() / 2) - aXform.getHeight() / 2;
        if ((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0)
            pos[1] = this.getWCCenter()[1] - (zone * this.getWCHeight() / 2) + aXform.getHeight() / 2;
        if ((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0)
            pos[0] = this.getWCCenter()[0] + (zone * this.getWCWidth() / 2) - aXform.getWidth() / 2;
        if ((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0)
            pos[0] = this.getWCCenter()[0] - (zone * this.getWCWidth() / 2) + aXform.getWidth() / 2;
    }
    return status;
};

