/**
 * Created by Laca on 2017. 05. 16..
 */
/* globals GameObjectSet, gEngine */
"use strict";

function ParticleGameObjectSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(ParticleGameObjectSet, GameObjectSet);

/**
 *
 * @param {Camera} aCamera
 */
ParticleGameObjectSet.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    gl.blendFunc(gl.ONE, gl.ONE);
    GameObjectSet.prototype.draw.call(this, aCamera);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};

/**
 *
 */
ParticleGameObjectSet.prototype.update = function () {
    GameObjectSet.prototype.update.call(this);

    for (var i = 0; i < this.size(); i++) {
        var obj = this.getObjectAt(i);
        if (obj.hasExpired()) {
            this.removeFromSet(obj);        //TODO:Ez jó?
        }
    }
};
