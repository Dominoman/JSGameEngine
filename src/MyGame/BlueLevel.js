/**
 * Created by Laca on 2017. 04. 18..
 */
"use strict";

/**
 *
 * @constructor
 */
function BlueLevel() {
    this.kSceneFile="assets/BlueLevel.xml";
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
    this.mSqSet=[];
    this.mCamera=null;
}
gEngine.Core.inheritPrototype(BlueLevel,Scene);

/**
 *
 */
BlueLevel.prototype.loadScene=function () {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

/**
 *
 */
BlueLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    gEngine.AudioClips.playBackgroundAudio(this.kBGClip);
    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSqSet);
};

/**
 *
 */
BlueLevel.prototype.update = function () {
// For this very simple game, let's move the white square and pulse the red
    var whiteXform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
// Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);
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
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
        gEngine.AudioClips.playACue(this.kCue);
        redXform.incXPosBy(-deltaX);
        if(redXform.getXPos()<11){
            gEngine.GameLoop.stop();
        }
    }
};

/**
 *
 */
BlueLevel.prototype.unloadScene=function () {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.stopBackgroundAuido();
    gEngine.AudioClips.unloadAudio(this.kBGClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    var nextLevel=new MyGame();
    gEngine.Core.startScene(nextLevel);
};

/**
 *
 */
BlueLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    for (var i = 0; i < this.mSqSet.length; i++)
        this.mSqSet[i].draw(this.mCamera.getVPMatrix())
};
