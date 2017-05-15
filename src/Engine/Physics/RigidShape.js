/**
 * Created by Laca on 2017. 05. 09..
 */
/* globals LineRenderable */
"use strict";

RigidShape.eRigidType = Object.freeze({
    eRigidAbstract: 0,
    eRigidCircle: 1,
    eRigidRectangle: 2
});

/**
 *
 * @param {Transform} xform
 * @constructor
 */
function RigidShape(xform) {
    this.mXform = xform;
    this.kPadding = 0.25;
    this.mPositionMark = new LineRenderable();
    this.mDrawBounds = false;
}

/**
 *
 * @param {Camera} aCamera
 */
RigidShape.prototype.draw = function (aCamera) {
    if (!this.mDrawBounds) {
        return;
    }

    var x = this.mXform.getXPos();
    var y = this.mXform.getYPos();

    this.mPositionMark.setFirstVertex(x - this.kPadding, y + this.kPadding);
    this.mPositionMark.setSecondVertex(x + this.kPadding, y - this.kPadding);
    this.mPositionMark.draw(aCamera);

    this.mPositionMark.setFirstVertex(x + this.kPadding, y + this.kPadding);
    this.mPositionMark.setSecondVertex(x - this.kPadding, y - this.kPadding);
    this.mPositionMark.draw(aCamera);
};


/**
 *
 */
RigidShape.prototype.update = function () {
};

/**
 *
 * @returns {number}
 */
RigidShape.prototype.rigidType = function () {
    return RigidShape.eRigidType.eRigidAbstract;
};

/**
 *
 * @returns {vec2|*}
 */
RigidShape.prototype.getPosition = function () {
    return this.mXform.getPosition();
};

/**
 *
 * @param {number} x
 * @param {number} y
 */
RigidShape.prototype.setPosition = function (x, y) {
    this.mXform.setPosition(x, y);
};

/**
 *
 * @returns {Transform|*}
 */
RigidShape.prototype.getXform = function () {
    return this.mXform;
};

/**
 *
 * @param {Transform} xform
 */
RigidShape.prototype.setXform = function (xform) {
    this.mXform = xform;
};

/**
 *
 * @param {Array} c
 */
RigidShape.prototype.setColor = function (c) {
    this.mPositionMark.setColor(c);
};

/**
 *
 * @returns {Array|(number|number|number|number)[]|*}
 */
RigidShape.prototype.getColor = function () {
    return this.mPositionMark.getColor();
};

/**
 *
 * @param {boolean} d
 */
RigidShape.prototype.setDrawBounds = function (d) {
    this.mDrawBounds = d;
};

/**
 *
 * @returns {boolean|*}
 */
RigidShape.prototype.getDrawBounds = function () {
    return this.mDrawBounds;
};