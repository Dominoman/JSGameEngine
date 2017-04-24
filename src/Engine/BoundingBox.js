/**
 * Created by Laca on 2017. 04. 24..
 */
"use strict";

/**
 *
 * @param {vec2} centerPos
 * @param {number} w
 * @param {number} h
 * @constructor
 */
function BoundingBox(centerPos, w, h) {
    this.mLL = vec2.fromValues(0, 0);
    this.setBounds(centerPos, w, h);
}

/**
 *
 * @param {vec2} centepPos
 * @param {number} w
 * @param {number} h
 */
BoundingBox.prototype.setBounds = function (centepPos, w, h) {
    this.mWidth = w;
    this.mHeight = h;
    this.mLL[0] = centepPos[0] - w / 2;
    this.mLL[1] = centepPos[1] - h / 2;
};

BoundingBox.eboundCollideStatus = Object.freeze({
    eCollideLeft: 1,
    eCollideRight: 2,
    eCollideTop: 4,
    eCollideBottom: 8,
    eInside: 16,
    eOutside: 0
});

/**
 *
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
BoundingBox.prototype.containsPoint = function (x, y) {
    return x > this.minX() && x < this.maxX() && y > this.minY() && y < this.maxY();
};

/**
 *
 * @param {BoundingBox} otherBound
 * @return {boolean}
 */
BoundingBox.prototype.intersectBound = function (otherBound) {
    return this.minX() < otherBound.maxX() && this.maxX() > otherBound.minX() && this.minY() < otherBound.maxY() && this.maxY() > otherBound.minY();
};

/**
 *
 * @param {BoundingBox} otherBound
 * @return {number}
 */
BoundingBox.prototype.boundCollideStatus = function (otherBound) {
    var status = BoundingBox.eboundCollideStatus.eOutside;
    if (this.intersectBound(otherBound)) {
        if (otherBound.minX() < this.minX())
            status |= BoundingBox.eboundCollideStatus.eCollideLeft;
        if (otherBound.maxX() > this.maxX())
            status |= BoundingBox.eboundCollideStatus.eCollideRight;
        if (otherBound.minY() < this.minY())
            status |= BoundingBox.eboundCollideStatus.eCollideBottom;
        if (otherBound.maxY() > this.maxY())
            status |= BoundingBox.eboundCollideStatus.eCollideTop;
        if (status === BoundingBox.eboundCollideStatus.eOutside)
            status = BoundingBox.eboundCollideStatus.eInside;
    }
    return status;
};

/**
 *
 * @return {number}
 */
BoundingBox.prototype.minX = function () {
    return this.mLL[0];
};

/**
 *
 * @return {number}
 */
BoundingBox.prototype.maxX = function () {
    return this.mLL[0] + this.mWidth;
};

/**
 *
 * @return {number}
 */
BoundingBox.prototype.minY = function () {
    return this.mLL[1];
};

/**
 *
 * @return {number}
 */
BoundingBox.prototype.maxY = function () {
    return this.mLL[1] + this.mHeight;
};