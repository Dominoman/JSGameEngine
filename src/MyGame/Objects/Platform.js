/**
 * Created by Laca on 2017. 05. 11..
 */
/* globals TextureRenderable, GameObject, RigidRectangle,gEngine*/
"use strict";

function Platform(texture, atX, atY) {
    this.mPlatform = new TextureRenderable(texture);

    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setSize(30, 3.75);
    // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

    var rigidShape = new RigidRectangle(this.getXform(), 25, 5);
    rigidShape.setDrawBounds(true);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Platform, GameObject);