/**
 * Created by Laca on 2017. 04. 18..
 */
"use strict";

/**
 *
 * @param name
 * @param w
 * @param h
 * @param id
 * @constructor
 */
function TextureInfo(name, w, h, id) {
    this.mName = name;
    this.mWidth = w;
    this.mHeight = h;
    this.mGLTexID = id;
}

var gEngine = gEngine || {};

/**
 *
 */
gEngine.Textures = (function () {

    /**
     *
     * @param textureName
     */
    var loadTexture = function (textureName) {
        if (!gEngine.ResourceMap.isAssetLoaded(textureName)) {
            var img = new Image();
            gEngine.ResourceMap.asyncLoadRequested(textureName);
            img.onload = function () {
                _processLoadedImage(textureName, img);
            };
            img.src = textureName;
        } else {
            gEngine.ResourceMap.incAssetRefCount(textureName);
        }
    };

    /**
     *
     * @param textureName
     */
    var unloadTexture = function (textureName) {
        var gl = gEngine.Core.getGL();
        var texinfo = gEngine.ResourceMap.retrieveAsset(textureName);
        gl.deleteTexture(texinfo.mGLTexID);
        gEngine.ResourceMap.unloadAsset(textureName);
    };

    /**
     *
     * @param textureName
     * @param image
     * @private
     */
    var _processLoadedImage = function (textureName, image) {
        var gl = gEngine.Core.getGL();
        var textureID = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureID);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D, null);
        var texInfo = new TextureInfo(textureName, image.naturalWidth, image.naturalHeight, textureID);
        gEngine.ResourceMap.asyncLoadCompleted(textureName, texInfo);
    };

    /**
     *
     * @param textureName
     */
    var activateTexture = function (textureName) {
        var gl = gEngine.Core.getGL();
        var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
        gl.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    };

    /**
     *
     */
    var deacivateTexture = function () {
        var gl = gEngine.Core.getGL();
        gl.bindTexture(gl.TEXTURE_2D, null);
    };

    /**
     *
     * @param textureName
     * @return {*}
     */
    var getTextureInfo = function (textureName) {
        return gEngine.ResourceMap.retrieveAsset(textureName);
    };

    var mPublic = {
        loadTexture: loadTexture,
        unloadTexture: unloadTexture,
        activateTexture: activateTexture,
        deactivateTexture: deacivateTexture,
        getTextureInfo: getTextureInfo

    };
    return mPublic;
}());