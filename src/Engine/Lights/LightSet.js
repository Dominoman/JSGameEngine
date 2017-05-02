/**
 * Created by Laca on 2017. 05. 02..
 */
"use strict";

/**
 *
 * @constructor
 */
function LightSet() {
    this.mSet = [];
}

/**
 *
 * @return {Number}
 * @constructor
 */
LightSet.prototype.numLights = function () {
    return this.mSet.length;
};

/**
 *
 * @param {number} index
 * @return {Light}
 */
LightSet.prototype.getLightAt = function (index) {
    return this.mSet[index];
};

/**
 *
 * @param {Light} light
 */
LightSet.prototype.addToSet = function (light) {
    this.mSet.push(light);
};
