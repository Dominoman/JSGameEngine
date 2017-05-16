precision mediump float;

uniform sampler2D uSampler;
varying vec2 vTexCoord;

#define kSufficientlyOpaque 1.0

void main(void){
    vec4 texFragColor=texture2D(uSampler,vTexCoord);
    if(texFragColor.a<kSufficientlyOpaque)
        discard;
    else
        gl_FragColor=vec4(1,1,1,1);
}