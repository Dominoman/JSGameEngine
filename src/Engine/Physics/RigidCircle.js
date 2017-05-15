/**
 * Created by Laca on 2017. 05. 09..
 */
/* globals RigidShape,LineRenderable,vec2,gEngine */
"use strict";

/**
 *
 *
 * @param {Transform} xform
 * @param {number} r
 * @constructor
 */
function RigidCircle(xform, r) {
    RigidShape.call(this, xform);
    this.kNumSides = 16;
    this.mSides = new LineRenderable();
    this.mRadius = r;
}
gEngine.Core.inheritPrototype(RigidCircle, RigidShape);


/**
 *
 *
 * @param {Camera} aCamera
 */
RigidCircle.prototype.draw = function (aCamera) {
    if (!this.mDrawBounds) {
        return;
    }

    RigidShape.prototype.draw.call(this, aCamera);
    var pos = this.getPosition();
    var prevPoint = vec2.clone(pos);
    var deltaTheta = (Math.PI * 2.0) / this.kNumSides;
    var theta = deltaTheta;
    prevPoint[0] += this.mRadius;
    for (var i = 1; i <= this.kNumSides; i++) {
        var x = pos[0] + this.mRadius * Math.cos(theta);
        var y = pos[1] + this.mRadius * Math.sin(theta);

        this.mSides.setFirstVertex(prevPoint[0], prevPoint[1]);
        this.mSides.setSecondVertex(x, y);
        this.mSides.draw(aCamera);

        theta = theta + deltaTheta;
        prevPoint[0] = x;
        prevPoint[1] = y;
    }
};

/**
 *
 * @returns {number}
 */
RigidCircle.prototype.rigidType = function () {
    return RigidShape.eRigidType.eRigidCircle;
};

/**
 *
 * @returns {number|*}
 */
RigidCircle.prototype.getRadius = function () {
    return this.mRadius;
};

/**
 *
 * @param {Array} color
 */
RigidCircle.prototype.setColor = function (color) {
    RigidShape.prototype.setColor.call(this, color);
    this.mSides.setColor(color);
};

