/**
 * Created by Laca on 2017. 05. 09..
 */
/* global MyGame,ShadowReceiver */
"use strict";

MyGame.prototype._setupShadow = function () {
    this.mBgShadow = new ShadowReceiver(this.mBg);
    this.mBgShadow.addShadowCaster(this.mLgtHero);
    this.mBgShadow.addShadowCaster(this.mIllumMinion);
    this.mBgShadow.addShadowCaster(this.mLgtMinion);

    this.mMinionShadow = new ShadowReceiver(this.mIllumMinion);
    this.mMinionShadow.addShadowCaster(this.mIllumHero);
    this.mMinionShadow.addShadowCaster(this.mLgtHero);
    this.mMinionShadow.addShadowCaster(this.mLgtMinion);

    this.mLgtMinionShaodw = new ShadowReceiver(this.mLgtMinion);
    this.mLgtMinionShaodw.addShadowCaster(this.mIllumHero);
    this.mLgtMinionShaodw.addShadowCaster(this.mLgtHero);
};