/**
 * Created by Laca on 2017. 04. 15..
 */
"use strict";

var gEngine = gEngine || {};

/**
 *
 */
gEngine.DefaultResources = (function () {
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    var mConstColorShader = null;

    /**
     *
     * @return {SimpleShader}
     */
    var getConstColorShader = function () {
        return mConstColorShader;
    };

    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";
    var mTextureShader = null;

    /**
     *
     * @return {TextureShader}
     */
    var getTextureShader = function () {
        return mTextureShader;
    };

    var mSpriteShader = null;
    /**
     *
     * @return {SpriteShader}
     */
    var getSpriteShader = function () {
        return mSpriteShader;
    };

    var kDefaultFont = "assets/fonts/system-default-font";

    /**
     *
     * @return {string}
     */
    var getDefaultFont = function () {
        return kDefaultFont;
    };


    /**
     *
     * @param {createShaderCallback} callBackFunction
     * @private
     */
    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
        callBackFunction();
    };

    /**
     *
     * @param {createShaderCallback} callBackFunction
     * @private
     */
    var _initialize = function (callBackFunction) {
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.Fonts.loadFont(kDefaultFont);
        gEngine.ResourceMap.setLoadCompleteCallback(function () {
            _createShaders(callBackFunction);
        });
    };

    /**
     *
     */
    var cleanUp = function () {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();

        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);

        gEngine.Fonts.unloadFont(kDefaultFont);
    };

    var mPublic = {
        initialize: _initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        getDefaultFont: getDefaultFont,
        cleanUp: cleanUp
    };
    return mPublic;
}());

/**
 * @callback createShaderCallback
 */

