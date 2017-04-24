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
    this.mBrain = null;

    // mode of running:
    //   H: Player drive brain
    //   J: Dye drive brain, immediate orientation change
    //   K: Dye drive brain, gradual orientation change
    this.mMode = 'H';
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
    // sets the background to gray

    // Create the brain
    this.mBrain = new Brain(this.kMinionSprite);

    //  Create the hero object
    this.mHero = new Hero(this.kMinionSprite);

    // For echoing
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
};

/**
 *
 */
MyGame.prototype.update = function () {
    var msg = "Brian modes [H:keys,J:immediate,K:gradual";
    var rate = 1;

    this.mHero.update();

    switch (this.mMode) {
        case 'H':
            this.mBrain.update();
            break;
        case 'K':
            rate = 0.02;
        case 'J':
            this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);
            GameObject.prototype.update.call(this.mBrain);
            break;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H))
        this.mMode = 'H';
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J))
        this.mMode = 'J';
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K))
        this.mMode = 'K';

    this.mMsg.setText(msg + this.mMode);
};

/**
 *
 */
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mHero.draw(this.mCamera);
    this.mBrain.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};