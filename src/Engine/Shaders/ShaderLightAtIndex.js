/**
 * Created by Laca on 2017. 05. 02..
 */
/* globals gEngine, vec3, WebGLProgram,Light */
"use strict";

/**
 *
 * @param {WebGLProgram} shader
 * @param {number} index
 * @constructor
 */
function ShaderLightAtIndex(shader, index) {
    this._setShaderReferences(shader, index);
}
/**
 *
 * @param {WebGLProgram} aLightShader
 * @param {number} index
 * @private
 */
ShaderLightAtIndex.prototype._setShaderReferences = function (aLightShader, index) {
    var gl = gEngine.Core.getGL();
    this.mColorRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].Color");
    this.mPosRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].Position");
    this.mDirRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].Direction");
    this.mNearRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].Near");
    this.mFarRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].Far");
    this.mInnerRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].CosInner");
    this.mOuterRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].CosOuter");
    this.mIntensityRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].Intensity");
    this.mDropOffRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].DropOff");
    this.mIsOnRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].IsOn");
    this.mLightTypeRef = gl.getUniformLocation(aLightShader, "uLights[" + index + "].LightType");
};

/**
 *
 * @param {Camera} aCamera
 * @param {Light} aLight
 */
ShaderLightAtIndex.prototype.loadToShader = function (aCamera, aLight) {
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mIsOnRef, aLight.isLightOn());
    if (aLight.isLightOn()) {
        var p = aCamera.wcPosToPixel(aLight.getPosition());
        var ic = aCamera.wcSizeToPixel(aLight.getNear());
        var oc = aCamera.wcSizeToPixel(aLight.getFar());
        var c = aLight.getColor();
        gl.uniform4fv(this.mColorRef, c);
        gl.uniform3fv(this.mPosRef, vec3.fromValues(p[0], p[1], p[2]));
        gl.uniform1f(this.mNearRef, ic);
        gl.uniform1f(this.mFarRef, oc);
        gl.uniform1f(this.mInnerRef, 0.0);
        gl.uniform1f(this.mOuterRef, 0.0);
        gl.uniform1f(this.mIntensityRef, aLight.getIntensity());
        gl.uniform1f(this.mDropOffRef, 0);
        gl.uniform1i(this.mLightTypeRef, aLight.getLightType());
        if (aLight.getLightType() === Light.eLightType.ePointLight) {
            gl.uniform3fv(this.mDirRef, vec3.fromValues(0, 0, 0));
        } else {
            var d = aCamera.wcDirToPixel(aLight.getDirection());
            gl.uniform3fv(this.mDirRef, vec3.fromValues(d[0], d[1], d[2]));
            if (aLight.getLightType() === Light.eLightType.eSpotLight) {
                gl.uniform1f(this.mInnerRef, Math.cos(0.5 * aLight.getInner()));
                gl.uniform1f(this.mOuterRef, Math.cos(0.5 * aLight.getOuter()));
                gl.uniform1f(this.mDropOffRef, aLight.getDropOff());
            }
        }
    }
};

/**
 *
 */
ShaderLightAtIndex.prototype.switchOfLight = function () {
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mIsOnRef, false);
};