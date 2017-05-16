/**
 * Created by Laca on 2017. 05. 15..
 */
/* globals CollisionInfo, vec2 */
"use strict";

var gEngine = gEngine || {};

gEngine.Physics = (function () {

    var mRelaxationCount = 15;
    var mRelaxationOffset = 1 / mRelaxationCount;
    var mPosCorrectionRate = 0.8;
    var mSystemAcceleration = [0, -50];

    var mRelaxationLoopCount = 0;
    var mHasOneCollision = false;
    var mCollisionInfo = null;

    /**
     *
     */
    var initialize = function () {
        mCollisionInfo = new CollisionInfo();
    };

    /**
     *
     * @param {RigidShape} s1
     * @param {RigidShape} s2
     * @param {CollisionInfo} collisionInfo
     * @private
     */
    var _positionalCorrection = function (s1, s2, collisionInfo) {
        var s1InvMass = s1.getInvMass();
        var s2InvMass = s2.getInvMass();
        var num = collisionInfo.getDepth() / (s1InvMass + s2InvMass) * mPosCorrectionRate;
        var correctionAmount = [0, 0];
        vec2.scale(correctionAmount, collisionInfo.getNormal(), num);

        var ca = [0, 0];
        vec2.scale(ca, correctionAmount, s1InvMass);
        var s1Pos = s1.getPosition();
        vec2.subtract(s1Pos, s1Pos, ca);

        vec2.scale(ca, correctionAmount, s2InvMass);
        var s2Pos = s2.getPosition();
        vec2.add(s2Pos, s2Pos, ca);
    };

    /**
     *
     * @param {vec2} n
     * @param {vec2} v
     * @param {number} f
     * @param {number} m
     * @private
     */
    var _applyFriction = function (n, v, f, m) {
        var tangent = vec2.fromValues(n[1], -n[0]);
        var tComponent = vec2.dot(v, tangent);
        if (Math.abs(tComponent) < 0.01) {
            return;
        }

        f *= m * mRelaxationOffset;
        if (tComponent < 0) {
            vec2.scale(tangent, tangent, -f);
        } else {
            vec2.scale(tangent, tangent, f);
        }
        vec2.sub(v, v, tangent);
    };

    /**
     *
     * @param {RigidShape} s1
     * @param {RigidShape} s2
     * @param {CollisionInfo} collisionInfo
     */
    var resolveCollision = function (s1, s2, collisionInfo) {
        mHasOneCollision = true;

        _positionalCorrection(s1, s2, collisionInfo);

        var s1V = s1.getVelocity();
        var s2V = s2.getVelocity();

        var n = collisionInfo.getNormal();
        _applyFriction(n, s1V, s1.getFriction(), s1.getInvMass());
        _applyFriction(n, s2V, s2.getFriction(), s2.getInvMass());

        var relativeVelocity = [0, 0];
        vec2.sub(relativeVelocity, s2V, s1V);

        var rVelocityInNormal = vec2.dot(relativeVelocity, n);
        if (rVelocityInNormal > 0) {
            return;
        }

        var newRestitution = Math.min(s1.getRestitution(), s2.getRestitution());
        var j = -(1 + newRestitution) * rVelocityInNormal;
        j = j / (s1.getInvMass() + s2.getInvMass());

        var impulse = [0, 0];
        vec2.scale(impulse, collisionInfo.getNormal(), j);

        var newImpulse = [0, 0];
        vec2.scale(newImpulse, impulse, s1.getInvMass());
        vec2.sub(s1V, s1V, newImpulse);

        vec2.scale(newImpulse, impulse, s2.getInvMass());
        vec2.add(s2V, s2V, newImpulse);
    };

    /**
     *
     */
    var beginRelaxation = function () {
        mRelaxationLoopCount = mRelaxationCount;
        mHasOneCollision = true;
    };

    /**
     * @return {boolean}
     */
    var continueRelaxation = function () {
        var oneCollision = mHasOneCollision;
        mHasOneCollision = false;
        mRelaxationLoopCount = mRelaxationLoopCount - 1;
        return mRelaxationLoopCount > 0 && oneCollision;
    };

    /**
     *
     * @param {GameObject} obj1
     * @param {GameObject} obj2
     */
    var processObjObj = function (obj1, obj2) {
        var s1 = obj1.getPhysicsComponent();
        var s2 = obj2.getPhysicsComponent();
        if (s1 === s2) {
            return;
        }

        beginRelaxation();
        while (continueRelaxation()) {
            if (s1.collided(s2, mCollisionInfo)) {
                resolveCollision(s1, s2, mCollisionInfo);
            }
        }
    };

    /**
     *
     * @param {GameObject} obj
     * @param {GameObjectSet} set
     */
    var processObjSet = function (obj, set) {
        var s1 = obj.getPhysicsComponent();
        beginRelaxation();
        while (continueRelaxation()) {
            for (var i = 0; i < set.size(); i++) {
                var s2 = set.getObjectAt(i).getPhysicsComponent();
                if (s1 !== s2 && s1.collided(s2, mCollisionInfo)) {
                    resolveCollision(s1, s2, mCollisionInfo);
                }
            }
        }
    };

    /**
     *
     * @param {GameObjectSet} set1
     * @param {GameObjectSet} set2
     */
    var processSetSet = function (set1, set2) {
        beginRelaxation();
        while (continueRelaxation()) {
            for (var i = 0; i < set1.size(); i++) {
                var s1 = set1.getObjectAt(i).getPhysicsComponent();
                for (var j = 0; j < set2.size(); j++) {
                    var s2 = set2.getObjectAt(j).getPhysicsComponent();
                    if (s1 !== s2 && s1.collided(s2, mCollisionInfo)) {
                        resolveCollision(s1, s2, mCollisionInfo);
                    }
                }
            }
        }
    };

    /**
     *
     * @param {GameObjectSet} set
     */
    var processSelfSet = function (set) {
        beginRelaxation();
        while (continueRelaxation()) {
            for (var i = 0; i < set.size() - 1; i++) {
                var s1 = set.getObjectAt(i).getPhysicsComponent();
                for (var j = i + 1; j < set.size(); j++) {
                    var s2 = set.getObjectAt(j).getPhysicsComponent();
                    if (s1 !== s2 && s1.collided(s2, mCollisionInfo)) {
                        resolveCollision(s1, s2, mCollisionInfo);
                    }
                }
            }
        }
    };

    /**
     *
     * @return {[number,number]}
     */
    var getSystemAcceleration = function () {
        return mSystemAcceleration;
    };

    /**
     *
     * @param {[number,number]} g
     */
    var setSystemAcceleration = function (g) {
        mSystemAcceleration = g;
    };

    /**
     *
     * @return {number}
     */
    var getRelaxationCorrectionRate = function () {
        return mPosCorrectionRate;
    };

    /**
     *
     * @param {number} r
     */
    var setRelaxationCorrectionRate = function (r) {
        if (r <= 0 || r >= 1) {
            r = 0.8;
        }
        mPosCorrectionRate = r;
    };

    /**
     *
     * @return {number}
     */
    var getRelaxationLoopCount = function () {
        return mRelaxationLoopCount;
    };

    /**
     *
     * @param {number} c
     */
    var setRelaxationLoopCount = function (c) {
        if (c <= 0)
            c = 1;
        mRelaxationCount = c;
        mRelaxationOffset = 1 / mRelaxationCount;
    };

    var mPublic = {
        initialize: initialize,
        resolveCollision: resolveCollision,
        beginRelaxation: beginRelaxation,
        continueRelaxation: continueRelaxation,
        getSystemAcceleration: getSystemAcceleration,
        setSystemAcceleration: setSystemAcceleration,
        getRelaxationCorrectionRate: getRelaxationCorrectionRate,
        setRelaxationCorrectionRate: setRelaxationCorrectionRate,
        getRelaxationLoopCount: getRelaxationLoopCount,
        setRelaxationLoopCount: setRelaxationLoopCount,
        processObjObj: processObjObj,
        processObjSet: processObjSet,
        processSetSet: processSetSet,
        processSelfSet: processSelfSet
    };
    return mPublic;
}());