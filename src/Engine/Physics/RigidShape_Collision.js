/**
 * Created by Laca on 2017. 05. 09..
 */
/*globals RigidShape, vec2, gEngine */
"use strict";

/**
 *
 * @param {RigidRectangle} rect1Shape
 * @param {RigidCircle} circ2Shape
 * @param {CollisionInfo} collisionInfo
 * @returns {boolean}
 */
RigidShape.prototype.collidedRectCirc = function (rect1Shape, circ2Shape, collisionInfo) {
    var rect1Pos = rect1Shape.getXform().getPosition();
    var circ2Pos = circ2Shape.getXform().getPosition();
    var vFrom1to2 = [0, 0];
    vec2.subtract(vFrom1to2, circ2Pos, rect1Pos);

    var vec = vec2.clone(vFrom1to2);

    var alongX = rect1Shape.getWidth() / 2;
    var alongY = rect1Shape.getHeight() / 2;

    vec[0] = this.clamp(vec[0], -alongX, alongX);
    vec[1] = this.clamp(vec[1], -alongY, alongY);

    var isInside = false;
    if (rect1Shape.containsPos(circ2Pos)) {
        isInside = true;
        // Find closest axis
        if (Math.abs(vFrom1to2[0] - alongX) < Math.abs(vFrom1to2[1] - alongY)) {
            // Clamp to closest side
            if (vec[0] > 0) {
                vec[0] = alongX;
            } else {
                vec[0] = -alongX;
            }
        } else { // y axis is shorter
            // Clamp to closest side
            if (vec[1] > 0) {
                vec[1] = alongY;
            } else {
                vec[1] = -alongY;
            }
        }
    }

    var normal = [0, 0];
    vec2.subtract(normal, vFrom1to2, vec);

    var distSqr = vec2.squaredLength(normal);
    var rSqr = circ2Shape.getRadius() * circ2Shape.getRadius();

    if (distSqr > rSqr && !isInside) {
        return false;
    }

    var len = Math.sqrt(distSqr);
    vec2.scale(normal, normal, 1 / len);
    var depth;
    if (isInside) {
        vec2.scale(normal, normal, -1);
        depth = circ2Shape.getRadius() + len;
    } else {
        depth = circ2Shape.getRadius() - len;
    }

    collisionInfo.setNormal(normal);
    collisionInfo.setDepth(depth);

    return true;
};

/**
 *
 * @param {Particle} aParticle
 */
RigidShape.prototype.resolveParticleCollision = function (aParticle) {
    var status = false;
    switch (this.rigidType()) {
        case RigidShape.eRigidType.eRigidCircle:
            status = gEngine.Particle.resolveCirclePos(this, aParticle);
            break;
        case RigidShape.eRigidType.eRigidRectangle:
            status = gEngine.Particle.resolveRectPos(this, aParticle);
            break;
    }
    return status;
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

