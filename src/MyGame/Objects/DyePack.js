/**
 * Created by Laca on 2017. 04. 20..
 */
"use strict";

/**
 *
 * @param {string} spriteTexture
 * @constructor
 */
function DyePack(spriteTexture) {
    this.kRefWidth = 80;
    this.kRefHeight = 130;
    this.kDelta = 0.5;

    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
    this.mDyePack.getXform().setPosition(50, 33);
    this.mDyePack.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mDyePack);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

/**
 *
 */
DyePack.prototype.update = function () {
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        xform.incYPosBy(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        xform.incYPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(this.kDelta);
    }

    if (this.isVisible()) {
        xform.incYPosBy(-this.kDelta);
    }
};