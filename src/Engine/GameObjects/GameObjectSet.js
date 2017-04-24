/**
 * Created by Laca on 2017. 04. 20..
 */
"use strict";

/**
 *
 * @constructor
 */
function GameObjectSet() {
    this.mSet = [];
}

/**
 *
 * @return {Number}
 */
GameObjectSet.prototype.size = function () {
    return this.mSet.length;
};

/**
 *
 * @param {Number} index
 * @return {GameObject}
 */
GameObjectSet.prototype.getObjectAt = function (index) {
    return this.mSet[index]
};

/**
 *
 * @param {GameObject} obj
 */
GameObjectSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj)
};

/**
 *
 */
GameObjectSet.prototype.update = function () {
    for (var i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update()
    }
};

/**
 *
 * @param {Camera} aCamera
 */
GameObjectSet.prototype.draw = function (aCamera) {
    for (var i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};