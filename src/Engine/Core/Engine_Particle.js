/**
 * Created by Laca on 2017. 05. 16..
 */
/* globals vec2 */
"use strict";

var gEngine = gEngine || {};

gEngine.Particle = (function () {
    var mSystemAcceleration = [0, -50.0];

    var mFrom1to2 = [0, 0];
    var mVec = [0, 0];
    var mNormal = [0, 0];

    /**
     *
     * @param {RigidCircle} circShape
     * @param {Particle} particle
     */
    var resolveCirclePos = function (circShape, particle) {
        var collided = false;
        var pos = particle.getPosition();
        var cPos = circShape.getPosition();

        vec2.subtract(mFrom1to2, pos, cPos);
        var dist = vec2.length(mFrom1to2);
        if (dist < circShape.getRadius()) {
            vec2.scale(mFrom1to2, mFrom1to2, 1 / dist);
            vec2.scaleAndAdd(pos, cPos, mFrom1to2, circShape.getRadius());
            collided = true;
        }
        return collided;
    };

    /**
     *
     * @param {RigidRectangle} rectShape
     * @param {Particle} paricle
     */
    var resolveRectPos = function (rectShape, paricle) {
        var collided = false;
        var alongX = rectShape.getWidth() / 2;
        var alongY = rectShape.getHeight() / 2;

        var pos = paricle.getPosition();
        var rPos = rectShape.getPosition();
        var rMinX = rPos[0] - alongX;
        var rMaxX = rPos[0] + alongX;
        var rMinY = rPos[1] - alongY;
        var rMaxY = rPos[1] + alongY;

        collided = rMinX < pos[0] && rMinY < pos[1] && rMaxX > pos[0] && rMaxY > pos[1];
        if (collided) {
            vec2.subtract(mFrom1to2, pos, rPos);
            mVec[0] = mFrom1to2[0];
            mVec[1] = mFrom1to2[1];

            if (Math.abs(mFrom1to2[0] - alongX) < Math.abs(mFrom1to2[1] - alongY)) {
                mNormal[0] = 0;
                mNormal[1] = 1;
                if (mVec[0] > 0) {
                    mVec[0] = alongX;
                } else {
                    mVec[0] = -alongX;
                }
            } else {
                mNormal[0] = 1;
                mNormal[1] = 0;
                if (mVec[1] > 0) {
                    mVec[1] = alongY;
                } else {
                    mVec[1] = -alongY;
                }
            }
            vec2.subtract(mVec, mVec, mFrom1to2);
            vec2.add(pos, pos, mVec);
        }
        return collided;
    };

    /**
     *
     * @param {GameObject} obj
     * @param {GameObjectSet} pSet
     */
    var processObjSet = function (obj, pSet) {
        var s1 = obj.getPhysicsComponent();
        for (var i = 0; i < pSet.size(); i++) {
            var p = pSet.getObjectAt(i).getPhysicsComponent();
            s1.resolveParticleCollision(p);
        }
    };

    /**
     *
     * @param {GameObjectSet} objSet
     * @param {GameObjectSet} pSet
     */
    var processSetSet = function (objSet, pSet) {
        for (var i = 0; i < objSet.size(); i++) {
            processObjSet(objSet.getObjectAt(i), pSet);
        }
    };

    /**
     *
     * @return {[number,*]}
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

    var mPublic = {
        getSystemAcceleration: getSystemAcceleration,
        setSystemAcceleration: setSystemAcceleration,
        resolveCirclePos: resolveCirclePos,
        resolveRectPos: resolveRectPos,
        processObjSet: processObjSet,
        processSetSet: processSetSet
    };
    return mPublic;
}());