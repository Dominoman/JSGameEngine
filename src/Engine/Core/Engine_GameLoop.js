/**
 * Created by Laca on 2017. 04. 15..
 */
"use strict";

var gEngine = gEngine || {};

/**
 *
 */
gEngine.GameLoop = (function () {
    var kFPS = 60;
    var kMPF = 1000 / kFPS;

    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    var mIsLoopRunning = false;
    var mMyGame = null;

    /**
     *
     * @private
     */
    var _runLoop = function () {
        if (mIsLoopRunning) {
            requestAnimationFrame(function () {
                _runLoop.call(mMyGame);
            });
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            while (mLagTime >= kMPF && mIsLoopRunning) {
                this.update();
                mLagTime -= kMPF;
            }
            this.draw();
        }
    };

    /**
     *
     * @param myGame
     */
    var start = function (myGame) {
        mMyGame = myGame;
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        mIsLoopRunning = true;
        requestAnimationFrame(function () {
            _runLoop.call(mMyGame)
        });
    };

    var mPublic = {
        start: start
    };
    return mPublic;
}());