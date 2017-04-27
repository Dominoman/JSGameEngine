/**
 * Created by Laca on 2017. 04. 15..
 */
"use strict";

var gEngine = gEngine || {};

/**
 *
 */
gEngine.Input = (function () {
    var kKeys = {
        // arrows
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,

        // space bar
        Space: 32,

        // numbers
        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five: 53,
        Six: 54,
        Seven: 55,
        Eight: 56,
        Nine: 57,

        // Alphabets
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,

        LastKeyCode: 222
    };

    var kMouseButton = {
        Left: 0,
        Middle: 1,
        Right: 2
    };

    var mKeyPreviousState = [];
    var mIsKeyPressed = [];
    var mIsKeyClicked = [];

    var mCanvas = null;
    var mButtonPreviousState = [];
    var mIsButtonPressed = [];
    var mIsButtonClicked = [];
    var mMousePosX = -1;
    var mMousePosY = -1;

    /**
     *
     * @param {Event} event
     * @private
     */
    var _onKeyDown = function (event) {
        mIsKeyPressed[event.keyCode] = true;
    };

    /**
     *
     * @param {Event} event
     * @private
     */
    var _onKeyUp = function (event) {
        mIsKeyPressed[event.keyCode] = false;
    };

    /**
     *
     * @param {Event} event
     * @private
     */
    var _onMouseMove = function (event) {
        var inside = false;
        var bBox = mCanvas.getBoundingClientRect();
        var x = Math.round((event.clientX - bBox.left) * (mCanvas.width / bBox.width));
        var y = Math.round((event.clientY - bBox.top) * (mCanvas.width / bBox.width));

        if (x >= 0 && x < mCanvas.width && y >= 0 && y < mCanvas.height) {
            mMousePosX = x;
            mMousePosY = mCanvas.height - 1 - y;
            inside = true;
        }
        return inside;
    };

    /**
     *
     * @param {Event} event
     * @private
     */
    var _onMouseDown = function (event) {
        if (_onMouseMove(event))
            mIsButtonPressed[event.button] = true;
    };

    /**
     *
     * @param {Event} event
     * @private
     */
    var _onMouseUp = function (event) {
        _onMouseMove(event);
        mIsButtonPressed[event.button] = false;
    };

    /**
     *
     */
    var initialize = function (canvasID) {
        for (var i = 0; i < kKeys.LastKeyCode; i++) {
            mIsKeyPressed[i] = false;
            mKeyPreviousState[i] = false;
            mIsKeyClicked[i] = false;
        }

        window.addEventListener('keyup', _onKeyUp);
        window.addEventListener('keydown', _onKeyDown);

        for (i = 0; i < 3; i++) {
            mButtonPreviousState[i] = false;
            mIsButtonPressed[i] = false;
            mIsButtonClicked[i] = false;
        }

        window.addEventListener('mousedown', _onMouseDown);
        window.addEventListener('mouseup', _onMouseUp);
        window.addEventListener('mousemove', _onMouseMove);
        mCanvas = document.getElementById(canvasID);
    };

    /**
     *
     */
    var update = function () {
        for (var i = 0; i < kKeys.LastKeyCode; i++) {
            mIsKeyClicked[i] = !mKeyPreviousState[i] && mIsKeyPressed[i];
            mKeyPreviousState[i] = mIsKeyPressed[i];
        }
        for (i = 0; i < 3; i++) {
            mIsButtonClicked[i] = !mButtonPreviousState[i] && mIsButtonPressed[i];
            mButtonPreviousState[i] = mIsButtonPressed[i];
        }
    };

    /**
     *
     * @param {number} keyCode
     * @return {boolean}
     */
    var isKeyPressed = function (keyCode) {
        return mIsKeyPressed[keyCode];
    };

    /**
     *
     * @param {number} keyCode
     * @return {boolean}
     */
    var isKeyClicked = function (keyCode) {
        return mIsKeyClicked[keyCode];
    };

    /**
     *
     * @param {number} button
     * @return {boolean}
     */
    var isButtonPressed = function (button) {
        return mIsButtonPressed[button];
    };

    /**
     *
     * @param {number} button
     * @return {boolean}
     */
    var isButtonClicked = function (button) {
        return mIsButtonClicked[button];
    };

    /**
     *
     * @return {number}
     */
    var getMouseX = function () {
        return mMousePosX;
    };

    /**
     *
     * @return {number}
     */
    var getMouseY = function () {
        return mMousePosY;
    };

    var mPublic = {
        initialize: initialize,
        update: update,
        isKeyPressed: isKeyPressed,
        isKeyClicked: isKeyClicked,
        keys: kKeys,
        isButtonPressed: isButtonPressed,
        isButtonClicked: isButtonClicked,
        getMousePosX: getMouseX,
        getMousePosY: getMouseY,
        mouseButton: kMouseButton
    };
    return mPublic;
}());