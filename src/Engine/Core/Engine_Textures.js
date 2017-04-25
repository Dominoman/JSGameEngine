/**
 * Created by Laca on 2017. 04. 18..
 */
"use strict";

/**
 *
 * @param {string} name
 * @param {number} w
 * @param {number} h
 * @param {*} id
 * @constructor
 */
function TextureInfo(name, w, h, id) {
    this.mName = name;
    this.mWidth = w;
    this.mHeight = h;
    this.mGLTexID = id;
    this.mColorArray = null;
}

var gEngine = gEngine || {};

/**
 *
 */
gEngine.Textures = (function () {

    /**
     *
     * @param {string} textureName
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
     * @param {string} textureName
     */
    var unloadTexture = function (textureName) {
        var gl = gEngine.Core.getGL();
        var texinfo = gEngine.ResourceMap.retrieveAsset(textureName);
        gl.deleteTexture(texinfo.mGLTexID);
        gEngine.ResourceMap.unloadAsset(textureName);
    };

    /**
     *
     * @param {string} textureName
     * @param {Image} image
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
     * @param {string} textureName
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
     * @param {string} textureName
     * @return {TextureInfo}
     */
    var getTextureInfo = function (textureName) {
        return gEngine.ResourceMap.retrieveAsset(textureName);
    };

    /**
     *
     * @param {string} textureName
     * @return {Uint8Array|*}
     */
    var getColorArray = function (textureName) {
        var texInfo = getTextureInfo(textureName);
        if (texInfo.mColorArray === null) {
            var gl = gEngine.Core.getGL();
            var fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texInfo.mGLTexID, 0);
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
                var pixels = new Uint8Array(texInfo.mWidth * texInfo.mHeight * 4);
                gl.readPixels(0, 0, texInfo.mWidth, texInfo.mHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                texInfo.mColorArray = pixels;
            } else {
                alert("WARNING: Engine.Textures.getColorArray() failed!");
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteFramebuffer(fb);
        }
        return texInfo.mColorArray;
    };

    var mPublic = {
        loadTexture: loadTexture,
        unloadTexture: unloadTexture,
        activateTexture: activateTexture,
        deactivateTexture: deacivateTexture,
        getTextureInfo: getTextureInfo,
        getColorArray: getColorArray

    };
    return mPublic;
}());