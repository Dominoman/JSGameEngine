/**
 * Created by Laca on 2017. 04. 25..
 */
"use strict";

/**
 *
 * @param {GameObject} otherObj
 * @param {vec2} wcTouchPos
 * @return {boolean}
 */
GameObject.prototype.pixelTouches = function (otherObj, wcTouchPos) {
    var pixelTouch = false;
    var myRen = this.getRenderable();
    var otherRen = otherObj.getRenderable();

    if (typeof myRen.pixelTouches === "function" && typeof otherRen.pixelTouches === "function") {
        var otherBbox = otherObj.getBBox();
        if (otherBbox.intersectBound(this.getBBox())) {
            myRen.setColorArray();
            otherRen.setColorArray();
            pixelTouch = myRen.pixelTouches(otherRen, wcTouchPos);
        }
    }
    return pixelTouch;
};