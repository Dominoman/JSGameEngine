/**
 * Created by Laca on 2017. 05. 10..
 */
/* globals RigidCircle, vec2, RigidShape */
"use strict";

/**
 *
 * @param {vec2} pos
 * @return {boolean}
 */
RigidCircle.prototype.containsPos = function (pos) {
    var dist = vec2.distance(this.getPosition(), pos);
    return dist < this.getRadius();
};


/**
 *
 * @param {RigidCircle} c1
 * @param {RigidCircle} c2
 * @return {boolean}
 */
RigidCircle.prototype.collidedCircCirc = function (c1, c2) {
    var vecToCenter = [0, 0];
    vec2.sub(vecToCenter, c1.getPosition(), c2.getPosition());
    var rSum = c1.getRadius() + c2.getRadius();
    return vec2.squaredLength(vecToCenter) < (rSum * rSum);
};

/**
 *
 * @param {RigidShape} otherShape
 * @return {boolean}
 */
RigidCircle.prototype.collided = function (otherShape) {
    var status = false;
    switch (otherShape.rigidType()) {
        case RigidShape.eRigidType.eRigidCircle:
            status = this.collidedCircCirc(this, otherShape);
            break;
        case RigidShape.eRigidType.eRigidRectangle:
            status = this.collidedRectCirc(otherShape, this);
            break;
    }
    return status;
};

/**
 *
 * @param {vec2} pos
 * @return {boolean}
 */
RigidCircle.prototype.containsShape = function (pos) {
    var dist = vec2.distance(this.getPosition(), pos);
    return dist < this.getRadius();
};