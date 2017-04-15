/**
 * Created by Laca on 2017. 04. 13..
 */
"use strict";

function MyGame(htmlCanvasID) {
    gEngine.Core.initializeWebGL(htmlCanvasID);
    this.mShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");

    gEngine.Core.clearCanvas([0, 0.8, 0.1]);

    this.mWhiteSq = new Renderable(this.mShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mWhiteSq.getXform().setPosition(-0.25, 0.25);
    this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radians
    this.mWhiteSq.getXform().setSize(1.2, 1.2);
    this.mWhiteSq.draw();

    this.mRedSq = new Renderable(this.mShader);
    this.mRedSq.setColor([1, 0, 0, 1]);
    this.mRedSq.getXform().setXPos(0.25); // to show alternative to setPosition
    this.mRedSq.getXform().setYPos(-0.25); // it is possible to setX/Y separately
    this.mRedSq.getXform().setRotationInDegree(45); // this is in Degree
    this.mRedSq.getXform().setWidth(0.4); // to show alternative to setSize
    this.mRedSq.getXform().setHeight(0.4); // that it is possible to width/height separately
    this.mRedSq.draw();
}