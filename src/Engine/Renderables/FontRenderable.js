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
    // we will draw the text string by calling to mOneChar for each of the
    // chars in the mText string.
    var widthOfOneChar = this.mXform.getWidth() / this.mText.length;
    var heightOfOneChar = this.mXform.getHeight();
    // this.mOneChar.getXform().setRotationInRad(this.mXform.getRotationInRad());
    var yPos = this.mXform.getYPos();

    // center position of the first char
    var xPos = this.mXform.getXPos() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
    var charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
    for (charIndex = 0; charIndex < this.mText.length; charIndex++) {
        aChar = this.mText.charCodeAt(charIndex);
        charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);

        // set the texture coordinate
        this.mOneChar.setElementUVCoordinate(charInfo.mTexCoordLeft, charInfo.mTexCoordRight,
            charInfo.mTexCoordBottom, charInfo.mTexCoordTop);

        // now the size of the char
        xSize = widthOfOneChar * charInfo.mCharWidth;
        ySize = heightOfOneChar * charInfo.mCharHeight;
        this.mOneChar.getXform().setSize(xSize, ySize);

        // how much to offset from the center
        xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
        yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;

        this.mOneChar.getXform().setPosition(xPos - xOffset, yPos - yOffset);

        this.mOneChar.draw(aCamera);

        xPos += widthOfOneChar;
    }
};

/**
 *
 * @return {Transform}
 */
FontRenderable.prototype.getXform = function () {
    return this.mXform;
};

/**
 *
 * @return {string|*}
 */
FontRenderable.prototype.getText = function () {
    return this.mText;
};

/**
 *
 * @param {string} t
 */
FontRenderable.prototype.setText = function (t) {
    this.mText = t;
    this.setTextHeight(this.getXform().getHeight());
};

/**
 *
 * @return {*}
 */
FontRenderable.prototype.getFont = function () {
    return this.mFont;
};

/**
 *
 * @param f
 */
FontRenderable.prototype.setFont = function (f) {
    this.mFont = f;
    this.mOneChar.setTexture(this.mFont + ".png");
};

/**
 *  @return {Array}
 */
FontRenderable.prototype.getColor = function () {
    return this.mOneChar.getColor();
};

/**
 *
 * @param {Array} c
 */
FontRenderable.prototype.setColor = function (c) {
    this.mOneChar.setColor(c)
};

/**
 *
 * @param {Number} h
 */
FontRenderable.prototype.setTextHeight = function (h) {
    var charInfo = gEngine.Fonts.getCharInfo(this.mFont, "A".charCodeAt(0)); // this is for "A"
    var w = h * charInfo.mCharAspectRatio;
    this.getXform().setSize(w * this.mText.length, h);
};