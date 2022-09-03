//vertex shader
struct Ouput{
    @builtin(position) Position: vec4<f32>,
    @location(0) vColor : vec4<f32>
};

@vertex
fn vs_main(@location(1) pos: vec4<f32>, @location(2) col: vec4<f32>) -> Ouput{
    var position = pos;
    var color = col;

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