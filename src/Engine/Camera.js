/**
 * Created by Laca on 2017. 04. 15..
 */
"use strict";

/**
 *
 * @param wcCenter
 * @param wcWidth
 * @param viewportArray
 * @constructor
 */
function Camera(wcCenter, wcWidth, viewportArray) {
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray;
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    this.mBGColor = [0.8, 0.8, 0.8, 1];
}

Camera.prototype.setWCCenter = function (xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera.prototype.getWCCenter = function () {
    return this.mWCCenter;
};
Camera.prototype.setWCWidth = function (width) {
    this.mWCWidth = width;
};

Camera.prototype.setViewport = function (viewportArray) {
    this.mViewport = viewportArray;
};
Camera.prototype.getViewport = function () {
    return this.mViewport;
};

Camera.prototype.setBackgroundColor = function (newColor) {
    this.mBGColor = newColor;
};
Camera.prototype.getBackgroundColor = function () {
    return this.mBGColor;
};

Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};

/**
 *
 */
Camera.prototype.setupViewProjection = function () {
    var gl = gEngine.Core.getGL();
    gl.viewport(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
    gl.scissor(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
    gl.clearColor(this.mBGColor[0], this.mBGColor[1], this.mBGColor[2], this.mBGColor[3]);
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    mat4.lookAt(this.mViewMatrix,
        [this.mWCCenter[0], this.mWCCenter[1], 10],
        [this.mWCCenter[0], this.mWCCenter[1], 0],
        [0, 1, 0]);

    var halfWCWidth = 0.5 * this.mWCWidth;
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];

    mat4.ortho(this.mProjMatrix, -halfWCWidth, halfWCWidth, -halfWCHeight, halfWCHeight, this.mNearPlane, this.mFarPlane);
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
};