/**
 * Created by Laca on 2017. 04. 18..
 */
"use strict";

/**
 *
 * @param myTexture
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
 * @param vpMatrix
 */
TextureRenderable.prototype.draw = function (vpMatrix) {
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this, vpMatrix);
};

TextureRenderable.prototype.getTexture = function () {
    return this.mTexture;
};
TextureRenderable.prototype.setTexture = function (t) {
    this.mTexture = t;
};

