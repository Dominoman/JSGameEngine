/**
 * Created by Laca on 2017. 05. 03..
 */
/* globals vec4 */
"use strict";

/**
 *
 * @constructor
 */
function Material() {
    this.mKa = vec4.fromValues(0.0, 0.0, 0.0, 0);
    this.mKs = vec4.fromValues(0.2, 0.2, 0.2, 1);
    this.mKd = vec4.fromValues(1.0, 1.0, 1.0, 1);
    this.mShininess = 20;
}

/**
 *
 * @param {vec4} a
 */
Material.prototype.setAmbient = function (a) {
    this.mKa = vec4.clone(a);
};

/**
 *
 * @return {vec4|*}
 */
Material.prototype.getAmbient = function () {
    return this.mKa;
};

/**
 *
 * @param {vec4} d
 */
Material.prototype.setDiffuse = function (d) {
    this.mKd = vec4.clone(d);
};

/**
 *
 * @return {vec4|*}
 */
Material.prototype.getDiffuse = function () {
    return this.mKd;
};

/**
 *
 * @param {vec4} s
 */
Material.prototype.setSpecular = function (s) {
    this.mKs = vec4.clone(s);
};

/**
 *
 * @return {vec4|*}
 */
Material.prototype.getSpecular = function () {
    return this.mKs;
};

/**
 *
 * @param {number} s
 */
Material.prototype.setShininess = function (s) {
    this.mShininess = s;
};

/**
 *
 * @return {number}
 */
Material.prototype.getShininess = function () {
    return this.mShininess;
};

