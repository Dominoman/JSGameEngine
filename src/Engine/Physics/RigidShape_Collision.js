/**
 * Created by Laca on 2017. 05. 09..
 */
/*globals RigidShape, vec2 */
"use strict";

/**
 *
 * @param {RigidRectangle} rect1shape
 * @param {RigidCircle} circ2shape
 * @returns {boolean}
 */
RigidShape.prototype.collidedRectCirc = function (rect1shape, circ2shape) {
    var rect1pos = rect1shape.getPosition();
    var circ2pos = circ2shape.getPosition();

    if (rect1shape.containsPos(circ2pos) || circ2shape.containsPos(rect1pos)) {
        return true;
    }
    var vFrom1to2 = [0, 0];
    vec2.subtract(vFrom1to2, circ2pos, rect1pos);
    var vec = vec2.clone(vFrom1to2);

    var alongX = rect1shape.getWidth() / 2;
    var alongY = rect1shape.getHeight() / 2;

    vec[0] = this.clamp(vec[0], -alongX, alongX);
    vec[1] = this.clamp(vec[1], -alongY, alongY);

    var normal = [0, 0];
    vec2.subtract(normal, vFrom1to2, vec);

    var distSqr = vec2.squaredLength(normal);
    var rSqr = circ2shape.getRadius() * circ2shape.getRadius();

    return distSqr < rSqr;
};

/**
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
RigidShape.prototype.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};

