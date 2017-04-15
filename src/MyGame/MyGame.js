/**
 * Created by Laca on 2017. 04. 13..
 */
"use strict";

/**
 *
 * @constructor
 */
function MyGame() {
    this.kSceneFile = "assets/scene.xml";
    this.mSqSet = [];

    this.mCamera = null;
}

/**
 *
 */
MyGame.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

/**
 *
 */
MyGame.prototype.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};

/**
 *
 */
MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSqSet);
};

/**
 *
 */
MyGame.prototype.update = function () {
// For this very simple game, let's move the white square and pulse the red
    var whiteXform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
// Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (whiteXform.getXPos() > 30) // the right-bound of the window
            whiteXform.setPosition(10, 60);
        whiteXform.incXPosBy(deltaX);
    }
// Step B: test for white square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
        whiteXform.incRotationByDegree(1);
    var redXform = this.mSqSet[1].getXform();
// Step C: test for pulsing the red square
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (redXform.getWidth() > 5)
            redXform.setSize(2, 2);
        redXform.incSizeBy(0.05);
    }
};

/**
 *
 */
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    for (var i = 0; i < this.mSqSet.length; i++)
        this.mSqSet[i].draw(this.mCamera.getVPMatrix())
};