/**
 * Created by Laca on 2017. 04. 13..
 */
"use strict";

var gEngine = gEngine || {};

gEngine.Core = (function () {
    var mGL = null;
    var getGL = function () {
        return mGL;
    };

    /**
     *
     * @param {string} htmlCanvasID
     * @param {Scene} myGame
     */
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.DefaultResources.initialize(function () {
            startScene(myGame);
        });
        gEngine.AudioClips.initAudioContext();
    };

    /**
     *
     * @param {string} htmlCanvasID
     */
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        mGL = canvas.getContext("webgl", {alpha: false}) || canvas.getContext("experimental-webgl", {alpha: false});
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
    };

    /**
     *
     * @param {Number[]} color
     */
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };

    /**
     *
     * @param {Scene} myGame
     */
    var startScene = function (myGame) {
        myGame.loadScene.call(myGame);
        gEngine.GameLoop.start(myGame);
    };

    /**
     *
     * @param {Object} subClass
     * @param {Object} superClass
     */
    var inheritPrototype=function (subClass,superClass) {
        var prototype=Object.create(superClass.prototype);
        prototype.constructor=subClass;
        subClass.prototype=prototype
    };

    /**
     *
     */
    var cleanUp = function () {
        gEngine.VertexBuffer.cleanUp();
        gEngine.DefaultResources.cleanUp();
    };

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype:inheritPrototype,
        startScene: startScene,
        cleanUp: cleanUp
    };

    return mPublic;
}());