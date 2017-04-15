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
     */
    var unloadAsset = function (rName) {
        if (rName in mResourceMap)
            delete mResourceMap[rName];
    };

    var mPublic = {
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,

        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };
    return mPublic;
}());