/**
 * Created by Laca on 2017. 04. 15..
 */
/* globals SimpleShader, TextureShader, SpriteShader, LightShader, IllumShader, ShadowCasterShader, LineShader, vec4 */
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

    var kIllumFS = "src/GLSLShaders/IllumFS.glsl";
    var mIllumShader = null;

    /**
     *
     * @return {IllumShader}
     */
    var getIllumShader = function () {
        return mIllumShader;
    };

    var kShadowReceiverFS = "src/GLSLShaders/ShadowReceiverFS.glsl";
    var mShadowReceiverShader = null;

    var kShadowCasterFS = "src/GLSLShaders/ShadowCasterFS.glsl";
    var mShadowCasterShader = null;

    /**
     *
     * @returns {SpriteShader}
     */
    var getShadowReceiverShader = function () {
        return mShadowReceiverShader;
    };

    /**
     *
     * @returns {ShadowCasterShader}
     */
    var getShadowCasterShader = function () {
        return mShadowCasterShader;
    };

    var kLineFS = "src/GLSLShaders/LineFS.glsl";
    var mLineShader = null;

    /**
     *
     * @return {LineShader}
     */
    var getLineShader = function () {
        return mLineShader;
    };

    var kParticleFS = "src/GLSLShaders/ParticleFS.glsl";
    var mParticeShader = null;

    /**
     *
     * @return {ParticleShader}
     */
    var getParticleShader = function () {
        return mParticeShader;
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
        mIllumShader = new IllumShader(kTextureVS, kIllumFS);
        mShadowReceiverShader = new SpriteShader(kTextureVS, kShadowReceiverFS);
        mShadowCasterShader = new ShadowCasterShader(kTextureVS, kShadowCasterFS);
        mLineShader = new LineShader(kSimpleVS, kLineFS);
        mParticeShader = new TextureShader(kTextureVS, kParticleFS);
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
        gEngine.TextFileLoader.loadTextFile(kIllumFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kShadowReceiverFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kShadowCasterFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kLineFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kParticleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
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
        mIllumShader.cleanUp();
        mShadowCasterShader.cleanUp();
        mShadowReceiverShader.cleanUp();
        mLineShader.cleanUp();
        mParticeShader.cleanUp();

        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);
        gEngine.TextFileLoader.unloadTextFile(kLightFS);
        gEngine.TextFileLoader.unloadTextFile(kIllumFS);
        gEngine.TextFileLoader.unloadTextFile(kShadowReceiverFS);
        gEngine.TextFileLoader.unloadTextFile(kShadowCasterFS);
        gEngine.TextFileLoader.unloadTextFile(kLineFS);
        gEngine.TextFileLoader.unloadTextFile(kParticleFS);
        gEngine.Fonts.unloadFont(kDefaultFont);
    };

    var mPublic = {
        initialize: _initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        getLightShader: getLightShader,
        getIllumShader: getIllumShader,
        getShadowReceiverShader: getShadowReceiverShader,
        getShadowCasterShader: getShadowCasterShader,
        getLineShader: getLineShader,
        getParticleShader: getParticleShader,
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

