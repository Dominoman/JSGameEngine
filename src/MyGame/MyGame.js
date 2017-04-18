/**
 * Created by Laca on 2017. 04. 13..
 */
"use strict";

/**
 *
 * @constructor
 */
function MyGame() {
    this.kPortal = "assets/minion_portal.png";
    this.kCollector = "assets/minion_collector.png";

    this.mCamera = null;
    this.mHero = null;
    this.mPortal = null;
    this.mCollector = null;
}
gEngine.Core.inheritPrototype(MyGame,Scene);

/**
 *
 */
MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPortal);
    gEngine.Textures.loadTexture(this.kCollector);
};

/**
 *
 */
MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPortal);
    gEngine.Textures.unloadTexture(this.kCollector);

    var nextLevel=new BlueLevel();
    gEngine.Core.startScene(nextLevel);
};

/**
 *
 */
MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(20, 60), // position of the camera
        20, // width of camera
        [20, 40, 600, 300] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    // sets the background to gray
    // Step B: Create the game objects
    this.mPortal = new TextureRenderable(this.kPortal);
    this.mPortal.setColor([1, 0, 0, 0.2]); // tints red
    this.mPortal.getXform().setPosition(25, 60);
    this.mPortal.getXform().setSize(3, 3);

    this.mCollector = new TextureRenderable(this.kCollector);
    this.mCollector.setColor([0, 0, 0, 0]); // No tinting
    this.mCollector.getXform().setPosition(15, 60);
    this.mCollector.getXform().setSize(3, 3);

    // Step C: Create the hero object in blue
    this.mHero = new Renderable();
    this.mHero.setColor([0, 0, 1, 1]);
    this.mHero.getXform().setPosition(20, 60);
    this.mHero.getXform().setSize(2, 3);
};

/**
 *
 */
MyGame.prototype.update = function () {
    // let's only allow the movement of hero,
    // and if hero moves too far off, this level ends, we will
    // load the next level
    var deltaX = 0.05;
    var xform = this.mHero.getXform();

    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) {  // this is the left-bound of the window
            gEngine.GameLoop.stop();
        }
    }

    // continously change texture tinting
    var c = this.mPortal.getColor();
    var ca = c[3] + deltaX;
    if (ca > 1) {
        ca = 0;
    }
    c[3] = ca;
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
    this.mPortal.draw(this.mCamera.getVPMatrix());
    this.mHero.draw(this.mCamera.getVPMatrix());
    this.mCollector.draw(this.mCamera.getVPMatrix());
};