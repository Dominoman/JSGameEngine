/**
 * Created by Laca on 2017. 05. 09..
 */
/* globals gEngine, ShadowCaster */
"use strict";
/**
 *
 * @param {GameObject} theReceiverObject
 * @constructor
 */
function ShadowReceiver(theReceiverObject) {
    this.kShadowStencilBit = 0x01;
    this.kShadowStencilMask = 0xFF;
    this.mReceiverShader = gEngine.DefaultResources.getShadowReceiverShader();
    this.mReceiver = theReceiverObject;
    this.mShadowCaster = [];
}

/**
 *
 * @param {Renderable} lgtRenderable
 */
ShadowReceiver.prototype.addShadowCaster = function (lgtRenderable) {
    var c = new ShadowCaster(lgtRenderable, this.mReceiver);
    this.mShadowCaster.push(c);
};

/**
 *
 * @param {Camera} aCamera
 */
ShadowReceiver.prototype.draw = function (aCamera) {
    this.mReceiver.draw(aCamera);

    this._shadowRecieverStencilOn();
    var s = this.mReceiver.getRenderable().swapShader(this.mReceiverShader);
    this.mReceiver.draw(aCamera);
    this.mReceiver.getRenderable().swapShader(s);
    this._shadowRecieverStencilOff();

    for (var c = 0; c < this.mShadowCaster.length; c++) {
        this.mShadowCaster[c].draw(aCamera);
    }
    this._shadowRecieverStencilDisable();
};

