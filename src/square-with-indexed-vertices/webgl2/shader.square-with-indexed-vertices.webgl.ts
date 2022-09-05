export const vertexShaderSource:string = `#version 300 es
in vec4 a_position;
in vec4 a_color;
out vec4 out_color;
void main(){
    gl_Position = a_position;
    out_color = a_color;
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