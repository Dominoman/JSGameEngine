/**
 * Created by Laca on 2017. 04. 26..
 */
/* global Camera, vec2, BoundingBox, CameraShake */
"use strict";

/**
 *
 * @param {number} dx
 * @param {number} dy
 */
Camera.prototype.panBy = function (dx, dy) {
    var newC = vec2.clone(this.getWCCenter());
    newC[0] += dx;
    newC[1] += dy;
    this.mCameraState.setCenter(newC);
};

/**
 *
 * @param {number} cx
 * @param {number} cy
 */
Camera.prototype.panTo = function (cx, cy) {
    this.setWCCenter(cx, cy);
};

/**
 *
 * @param {Transform} aXform
 * @param {number} zone
 */
Camera.prototype.panWith = function (aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if (status !== BoundingBox.eboundCollideStatus.eInside) {
        var pos = aXform.getPosition();
        var newC = this.getWCCenter();
        if ((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0)
            newC[1] = pos[1] + (aXform.getHeight() / 2) - (zone * this.getWCHeight() / 2);
        if ((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0)
            newC[1] = pos[1] - (aXform.getHeight() / 2) + (zone * this.getWCHeight() / 2);
        if ((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0)
            newC[0] = pos[0] + (aXform.getWidth() / 2) - (zone * this.getWCWidth() / 2);
        if ((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0)
            newC[0] = pos[0] - (aXform.getWidth() / 2) + (zone * this.getWCWidth() / 2);
    }
};

/**
 *
 * @param {number} zoom
 */
Camera.prototype.zoomBy = function (zoom) {
    if (zoom > 0)
        this.setWCWidth(this.getWCWidth() * zoom);
};

/**
 *
 * @param {vec2} pos
 * @param {number} zoom
 */
Camera.prototype.zoomTowards = function (pos, zoom) {
    var delta = [];
    vec2.sub(delta, pos, this.getWCCenter());
    vec2.scale(delta, delta, zoom - 1);
    vec2.sub(this.getWCCenter(), this.getWCCenter(), delta);
    this.zoomBy(zoom);
};

/**
 *
 */
Camera.prototype.update = function () {
    if (this.mCameraShake !== null) {
        if (this.mCameraShake.shakeDone()) {
            this.mCameraShake = null;
        } else {
            this.mCameraShake.setRefCenter(this.getWCCenter());
            this.mCameraShake.updateShakeState();
        }
    }
    this.mCameraState.updateCameraState();
};

/**
 *
 * @param {number} stiffness
 * @param {number} duration
 */
Camera.prototype.configInterpolation = function (stiffness, duration) {
    this.mCameraState.configInterpolation(stiffness, duration);
};

/**
 *
 * @param {number} xDelta
 * @param {number} yDelta
 * @param {number} shakeFrequency
 * @param {number} duration
 */
Camera.prototype.shake = function (xDelta, yDelta, shakeFrequency, duration) {
    this.mCameraShake = new CameraShake(this.mCameraState, xDelta, yDelta, shakeFrequency, duration);
};