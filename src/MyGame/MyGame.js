/**
 * Created by Laca on 2017. 04. 13..
 */
"use strict";

/**
 *
 * @constructor
 */
function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    // The camera to view the scene
    this.mCamera = null;

    // For echo message
    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mMinionset = null;
    this.mDyePack = null;
}
gEngine.Core.inheritPrototype(MyGame,Scene);

/**
 *
 */
MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
};

/**
 *
 */
MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
};

/**
 *
 * @param {FontRenderable} font
 * @param {Number} posX
 * @param {Number} posY
 * @param {Number[]} color
 * @param {Number} textH
 * @private
 */
MyGame.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

/**
 *
 */
MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mDyePack = new DyePack(this.kMinionSprite);
    this.mMinionset = new GameObjectSet();
    for (var i = 0; i < 5; i++) {
        var randomY = Math.random() * 65;
        var aMinion = new Minion(this.kMinionSprite, randomY);
        this.mMinionset.addToSet(aMinion);
    }
    this.mHero = new Hero(this.kMinionSprite);
    this.mMsg = new FontRenderable("Status message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight();
};

/**
 *
 */
MyGame.prototype.update = function () {
    this.mHero.update();
    this.mMinionset.update();
    this.mDyePack.update();
};

/**
 *
 */
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: draw everything
    this.mHero.draw(this.mCamera);
    this.mMinionset.draw(this.mCamera);
    this.mDyePack.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};