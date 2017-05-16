/**
 * Created by Laca on 2017. 05. 16..
 */
/* globals ParticleRenderable,GameObject,Particle,gEngine,vec4 */
"use strict";

/**
 *
 * @param {string} texture
 * @param {number} atX
 * @param {number} atY
 * @param {number} cyclesToLive
 * @constructor
 */
function ParticleGameObject(texture, atX, atY, cyclesToLive) {
    var renderableObj = new ParticleRenderable(texture);
    var xf = renderableObj.getXform();
    xf.setPosition(atX, atY);
    GameObject.call(this, renderableObj);

    var p = new Particle(xf.getPosition());
    this.setPhysicsComponent(p);

    this.mDeltaColor = [0, 0, 0, 0];
    this.mSizeDelta = 0;
    this.mCyclesToLive = cyclesToLive;
}
gEngine.Core.inheritPrototype(ParticleGameObject, GameObject);

/**
 *
 * @param {Array} f
 */
ParticleGameObject.prototype.setFinalColor = function (f) {
    vec4.sub(this.mDeltaColor, f, this.mRenderComponent.getColor());
    if (this.mCyclesToLive !== 0) {
        vec4.scale(this.mDeltaColor, this.mDeltaColor, 1 / this.mCyclesToLive);
    }
};

/**
 *
 * @param {number} d
 */
ParticleGameObject.prototype.setSizeDelta = function (d) {
    this.mSizeDelta = d;
};

/**
 *
 * @return {boolean}
 */
ParticleGameObject.prototype.hasExpired = function () {
    return this.mCyclesToLive < 0;
};

/**
 *
 */
ParticleGameObject.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mCyclesToLive--;
    var c = this.mRenderComponent.getColor();
    vec4.add(c, c, this.mDeltaColor);

    var xf = this.getXform();
    var s = xf.getWidth() * this.mSizeDelta;
    xf.setSize(s, s);
};