/**
 * Created by Laca on 2017. 04. 13..
 */
"use strict";

var gEngine = gEngine || {};

/**
 *
 */
gEngine.VertexBuffer = (function () {
    var mSquareVertexBuffer = null;
    var mTextureCoordBuffer = null;

    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    var textureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    /**
     *
     * @return {WebGLBuffer}
     */
    var getGLVertexRef = function () {
        return mSquareVertexBuffer;
    };

    /**
     *
     * @return {WebGLBuffer}
     */
    var getGLTexCoordRef = function () {
        return mTextureCoordBuffer;
    };

    /**
     *
     */
    var initialize = function () {
        var gl = gEngine.Core.getGL();
        mSquareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
        mTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    };

    /**
     *
     */
    var cleanUp = function () {
        var gl = gEngine.Core.getGL();
        gl.deleteBuffer(mSquareVertexBuffer);
        gl.deleteBuffer(mTextureCoordBuffer);
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTexCoordRef: getGLTexCoordRef,
        cleanUp: cleanUp
    };
    return mPublic;
}());