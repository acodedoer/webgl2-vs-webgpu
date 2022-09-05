export const vertexShaderSource:string = `#version 300 es
in vec4 a_position;
out vec4 out_color;

void main(){
    gl_Position = a_position;
    out_color = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

export const fragmentShaderSource:string = `#version 300 es
precision highp float;
in vec4 out_color;
out vec4 outColor;

void main(){
    outColor = out_color;
}
`