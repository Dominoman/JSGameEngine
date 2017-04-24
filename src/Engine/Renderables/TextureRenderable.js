/**
 * Created by Laca on 2017. 04. 18..
 */
"use strict";

/**
 *
 * @param {string} myTexture
 * @constructor
 */
function TextureRenderable(myTexture) {
    Renderable.call(this);
    Renderable.prototype.setColor(this, [1, 1, 1, 0]);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader());
    this.mTexture = myTexture;
}
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

/**
 *
 * @param {Camera} aCamera
 */
TextureRenderable.prototype.draw = function (aCamera) {
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this, aCamera);
};

TextureRenderable.prototype.getTexture = function () {
    return this.mTexture;
};
TextureRenderable.prototype.setTexture = function (t) {
    this.mTexture = t;
};

