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
    var _getConstColorShader = function () {
        return mConstColorShader;
    };

    /**
     *
     * @param callBackFunction
     * @private
     */
    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };

    /**
     *
     * @param callBackFunction
     * @private
     */
    var _initialize = function (callBackFunction) {
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.ResourceMap.setLoadCompleteCallback(function () {
            _createShaders(callBackFunction);
        });
    };

    var mPublic = {
        initialize: _initialize,
        getConstColorShader: _getConstColorShader
    };
    return mPublic;
}());