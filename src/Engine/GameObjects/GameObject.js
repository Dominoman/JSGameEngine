/**
 * Created by Laca on 2017. 04. 20..
 */
"use strict";

/**
 *
 * @param {Renderable} renderableObj
 * @constructor
 */
function GameObject(renderableObj) {
    this.mRenderComponent = renderableObj;
}

/**
 * @return {Transform}
 */
GameObject.prototype.getXform = function () {
    return this.mRenderComponent.getXform();
};

GameObject.prototype.update = function () {
};

/**
 *
 * @return {Renderable|*}
 */
GameObject.prototype.getRenderable = function () {
    return this.mRenderComponent;
};

/**
 *
 * @param {Camera} aCamera
 */
GameObject.prototype.draw = function (aCamera) {
    this.mRenderComponent.draw(aCamera);
};

