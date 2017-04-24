/**
 * Created by Laca on 2017. 04. 19..
 */
"use strict";

/**
 *
 * @param {string} aString
 * @constructor
 */
function FontRenderable(aString) {
    this.mFont = gEngine.DefaultResources.getDefaultFont();
    this.mOneChar = new SpriteRenderable(this.mFont + ".png");
    this.mXform = new Transform();
    this.mText = aString;
}

/**
 *
 * @param {Camera} aCamera
 */
FontRenderable.prototype.draw = function (aCamera) {
    var widthOfOneChar = this.mXform.getWidth() / this.mText.length;
    var heightOfOneChar = this.mXform.getHeight();
    var yPos = this.mXform.getYPos();

    var xPos = this.mXform.getXPos() - widthOfOneChar / 2 + widthOfOneChar * 0.5;
    for (var charIndex = 0; charIndex < this.mText.length; charIndex++) {
        var aChar = this.mText.charCodeAt(charIndex);
        var charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);
        this.mOneChar.setElementUVCoordinate(charInfo.mTexCoordLeft, charInfo.mTexCoordRight, charInfo.mTexCoordBottom, charInfo.mTexCoordTop);

        var xSize = widthOfOneChar * charInfo.mCharWidth;
        var ySize = heightOfOneChar * charInfo.mCharHeight;
        this.mOneChar.getXform().setSize(xSize, ySize);

        var xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
        var yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;
        this.mOneChar.getXform().setPosition(xPos - xOffset, yPos, yOffset);
        this.mOneChar.draw(aCamera);
        xPos += widthOfOneChar;
    }
};

FontRenderable.prototype.getXform = function () {
    return this.mXform;
};
FontRenderable.prototype.getText = function () {
    return this.mText;
};
FontRenderable.prototype.setText = function (t) {
    this.mText = t;
    this.setTextHeight(this.getXform().getHeight());
};
FontRenderable.prototype.getFont = function () {
    return this.mFont;
};
FontRenderable.prototype.setFont = function (f) {
    this.mFont = f;
    this.mOneChar.setTexture(this.mFont + ".png");
};
FontRenderable.prototype.getColor = function () {
    return this.mOneChar.getColor();
};
FontRenderable.prototype.setColor = function (c) {
    this.mOneChar.setColor(c)
};

/**
 *
 * @param {Number} h
 */
FontRenderable.prototype.setTextHeight = function (h) {
    var charInfo = gEngine.Fonts.getCharInfo(this.mFont, "A".charCodeAt(0));
    var w = h * charInfo.mAspectRatio;
    this.getXform().setSize(w * this.mText.length, h);
};