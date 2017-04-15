/**
 * Created by Laca on 2017. 04. 15..
 */
"use strict";

var gEngine = gEngine || {};

gEngine.TextFileLoader = (function () {
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });

    /**
     *
     * @param fileName
     * @param fileType
     * @param callbackFunction
     */
    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!gEngine.ResourceMap.isAssetLoaded(fileName)) {
            gEngine.ResourceMap.asyncLoadRequested(fileName);
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status !== 200) {
                    alert(fileName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded by a web-server.]");
                }
            };
            req.open('GET', fileName, true);
            req.setRequestHeader('Content-type', 'text/xml');
            req.onload = function () {
                var fileContent = null;
                if (fileType === eTextFileType.eXMLFile) {
                    var parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, "text/xml");
                } else {
                    fileContent = req.responseText;
                }
                gEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);
                if (callbackFunction !== null && callbackFunction !== undefined)
                    callbackFunction(fileName);
            };
            req.send();
        } else {
            if (callbackFunction !== null && callbackFunction !== undefined)
                callbackFunction(fileName);
        }
    };

    /**
     *
     * @param fileName
     */
    var unloadTextFile = function (fileName) {
        gEngine.ResourceMap.unloadAsset(fileName);
    };

    var mPublic = {
        loadTextFile: loadTextFile,
        unloadTextFile: unloadTextFile,
        eTextFileType: eTextFileType
    };
    return mPublic;
}());