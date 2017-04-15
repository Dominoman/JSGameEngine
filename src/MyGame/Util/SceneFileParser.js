/**
 * Created by Laca on 2017. 04. 15..
 */
"use strict";

/**
 *
 * @param sceneFilePath
 * @constructor
 */
function SceneFileParser(sceneFilePath) {
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

/**
 *
 * @param tagElm
 * @returns {NodeList}
 * @private
 */
SceneFileParser.prototype._getElm = function (tagElm) {
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if (theElm.length === 0)
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    return theElm;
};

/**
 *
 * @returns {Camera}
 */
SceneFileParser.prototype.parseCamera = function () {
    var camElm = this._getElm("Camera");
    var cx = Number(camElm[0].getAttribute("CenterX"));
    var cy = Number(camElm[0].getAttribute("CenterY"));
    var w = Number(camElm[0].getAttribute("Width"));
    var viewport = camElm[0].getAttribute("Viewport").split(" ");
    var bgColor = camElm[0].getAttribute("BgColor").split(" ");
    for (var j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }
    var cam = new Camera(vec2.fromValues(cx, cy), w, viewport);
    cam.setBackgroundColor(bgColor);
    return cam;
};

/**
 *
 * @param sqSet
 */
SceneFileParser.prototype.parseSquares = function (sqSet) {
    var elm = this._getElm("Square");
    for (var i = 0; i < elm.length; i++) {
        var x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        var y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        var w = Number(elm.item(i).attributes.getNamedItem("Width").value);
        var h = Number(elm.item(i).attributes.getNamedItem("Height").value);
        var r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
        var c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
        var sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
        for (var j = 0; j < 3; j++) {
            c[j] = Number(c[j]);
        }
        sq.setColor(c);
        sq.getXform().setPosition(x, y);
        sq.getXform().setRotationInDegree(r);
        sq.getXform().setSize(w, h);
        sqSet.push(sq);
    }
};

