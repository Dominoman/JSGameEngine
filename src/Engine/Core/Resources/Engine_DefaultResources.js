/**
 * Created by Laca on 2017. 04. 15..
 */
/* globals SimpleShader, TextureShader, SpriteShader, LightShader, vec4 */
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

    var kLightFS = "src/GLSLShaders/LightFS.glsl";
    var mLightShader = null;

    /**
     *
     * @return {LightShader}
     */
    var getLightShader = function () {
        return mLightShader;
    };

    var kDefaultFont = "assets/fonts/system-default-font";

    /**
     *
     * @return {string}
     */
    var getDefaultFont = function () {
        return kDefaultFont;
    };

    var mGlobalAmbientColor = [0.3, 0.3, 0.3, 1];
    var mGlobalAmbientIntensity = 1;

    /**
     *
     * @return {[number,number,number,number]}
     */
    var getGlobalAmbientColor = function () {
        return mGlobalAmbientColor;
    };

    /**
     *
     * @param {[number,number,number,number]} v
     */
    var setGlobalAmbientColor = function (v) {
        mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3]);
    };

    /**
     *
     * @return {number}
     */
    var getGlobalAmbientIntensity = function () {
        return mGlobalAmbientIntensity;
    };

    /**
     *
     * @param {number} v
     */
    var setGlobalAmbientIntensity = function (v) {
        mGlobalAmbientIntensity = v;
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
        mLightShader = new LightShader(kTextureVS, kLightFS);
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
        gEngine.TextFileLoader.loadTextFile(kLightFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
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
        mLightShader.cleanUp();

        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);
        gEngine.TextFileLoader.unloadTextFile(kLightFS);

        gEngine.Fonts.unloadFont(kDefaultFont);
    };

    var mPublic = {
        initialize: _initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        getLightShader: getLightShader,
        getDefaultFont: getDefaultFont,
        getGlobalAmbientColor: getGlobalAmbientColor,
        setGlobalAmbientColor: setGlobalAmbientColor,
        getGlobalAmbientIntensity: getGlobalAmbientIntensity,
        setGlobalAmbientIntensity: setGlobalAmbientIntensity,
        cleanUp: cleanUp
    };
    return mPublic;
}());

/**
 * @callback createShaderCallback
 */

