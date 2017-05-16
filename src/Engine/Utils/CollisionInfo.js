/**
 * Created by Laca on 2017. 05. 15..
 */
/* globals vec2 */
"use strict";

/**
 *
 * @constructor
 */
function CollisionInfo() {
    this.mDepth = 0;
    this.mNormal = vec2.fromValues(0, 0);
}

/**
 *
 * @param {number} s
 */
CollisionInfo.prototype.setDepth = function (s) {
    this.mDepth = s;
};

/**
 *
 * @return {number|*}
 */
CollisionInfo.prototype.getDepth = function () {
    return this.mDepth;
};

/**
 *
 * @param {vec2} s
 */
CollisionInfo.prototype.setNormal = function (s) {
    this.mNormal = s;
};

/**
 *
 * @return {vec2|*}
 */
CollisionInfo.prototype.getNormal = function () {
    return this.mNormal;
};