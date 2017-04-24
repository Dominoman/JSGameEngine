/**
 * Created by Laca on 2017. 04. 21..
 */
"use strict";

/**
 *
 * @param {string} spriteTexture
 * @param {Number} atY
 * @constructor
 */
function Minion(spriteTexture, atY) {
    this.kDelta = 0.2;
    this.mMinion = new SpriteAnimateRenderable(spriteTexture);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(Math.random() * 100, atY);
    this.mMinion.getXform().setSize(12, 9.6);
    this.mMinion.setSpriteSequence(512, 0, 204, 164, 5, 0);
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(15);
    GameObject.call(this, this.mMinion);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

/**
 *
 */
Minion.prototype.update = function () {
    this.mMinion.updateAnimation();
    var xForm = this.getXform();
    xForm.incXPosBy(-this.kDelta);
    if (xForm.getXPos() < 0) {
        xForm.setXPos(100);
        xForm.setYPos(65 * Math.random());
    }
};