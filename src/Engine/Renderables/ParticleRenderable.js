/**
 * Created by Laca on 2017. 05. 16..
 */
/* globals TextureRenderable, Renderable, gEngine */
"use strict";

/**
 *
 *
 * @param {string} myTexture
 * @constructor
 */
function ParticleRenderable(myTexture) {
    TextureRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getParticleShader());
}
gEngine.Core.inheritPrototype(ParticleRenderable, TextureRenderable);
