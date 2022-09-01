//vertex shader
struct Ouput{
    @builtin(position) Position: vec4<f32>,
    @location(0) vColor : vec4<f32>
};

@vertex
fn vs_main(@location(0) pos: vec4<f32>) -> Ouput{
    var position = pos;

    var color = vec4<f32>(0.0,0.0,1.0,1.0);

    var output: Ouput;
    output.Position = position;
    output.vColor = color;
    return output;
}

//fragment shader
@fragment
fn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{
    return vColor;
}