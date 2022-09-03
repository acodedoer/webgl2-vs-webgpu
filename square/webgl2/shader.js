export const vertexShaderSource = `#version 300 es
in vec4 a_position; //data recieved from buffer

void main(){
    gl_Position = a_position; //assign data from buffer to special vertex shader variable for setting the positon of a vertex
}
`;
export const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 outColor; //the output for the fragment shader

void main(){
    outColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;
//# sourceMappingURL=shader.js.map