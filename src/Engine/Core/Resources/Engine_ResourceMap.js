/**
 * Created by Laca on 2017. 04. 15..
 */
"use strict";

var gEngine = gEngine || {};

/**
 *
 */
gEngine.ResourceMap = (function () {
    /**
     *
     * @param rName
     * @constructor
     */
    var MapEntry = function (rName) {
        this.mAsset = rName;
        this.mRefCount = 1;
    };

    var mResourceMap = {};
    var mNumOutstandingLoads = 0;
    var mLoadCompleteCallback = null;

    /**
     *
     * @private
     */
    var _checkForAllLoadCompleted = function () {
        if (mNumOutstandingLoads === 0 && mLoadCompleteCallback !== null) {
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    };

    /**
     *
     * @param funct
     */
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        _checkForAllLoadCompleted();
    };

    /**
     *
     * @param rName
     */
    var asyncLoadRequested = function (rName) {
        mResourceMap[rName] = new MapEntry(rName);
        ++mNumOutstandingLoads;
    };

    /**
     *
     * @param rName
     * @param loadedAsset
     */
    var asyncLoadCompleted = function (rName, loadedAsset) {
        if (!isAssetLoaded(rName))
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    };

    var isAssetLoaded = function (rName) {
        return rName in mResourceMap;
    };

    /**
     *
     * @param rName
     * @returns {*}
     */
    var retrieveAsset = function (rName) {
        var r = null;
        if (rName in mResourceMap)
            r = mResourceMap[rName].mAsset;
        return r;
    };

    /**
     *
     * @param rName
     * @return int
     */
    var unloadAsset = function (rName) {
        var c = 0;
        if (rName in mResourceMap) {
            mResourceMap[rName].mRefCount -= 1;
            c = mResourceMap[rName].mRefCount;
            if (c === 0) {
                delete mResourceMap[rName];
            }
        }
        return c;
    };

    /**
     *
     * @param rName
     */
    var incAssetRefCount = function (rName) {
        mResourceMap[rName].mRefCount += 1;
    };

    var mPublic = {
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,

        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded,
        incAssetRefCount: incAssetRefCount
    };
    return mPublic;
}());