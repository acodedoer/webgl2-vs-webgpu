// vertex shader

struct Uniforms {
    mvpMatrix : mat4x4<f32>
};
@binding(0) @group(0) var<uniform> uniforms : Uniforms;

struct Output {
    @builtin(position) Position : vec4<f32>,
    @location(0) vTextureCoord : vec2<f32>
};

@vertex
fn vs_main(@location(0) pos: vec4<f32>, @location(1) textureCoord: vec2<f32>) -> Output {
    var output: Output;
    output.Position = uniforms.mvpMatrix * pos;
    output.vTextureCoord = textureCoord;
    return output;
}

// fragment shader
@binding(1) @group(0) var textureSampler : sampler;
@binding(2) @group(0) var textureData : texture_2d<f32>;
 @fragment
fn fs_main(@location(0) vTextureCoord: vec2<f32>) -> @location(0) vec4<f32> {
    let color: vec4<f32> = (textureSample(textureData, textureSampler, vTextureCoord)).rgba;
    return color;
}