export const vertexShaderSource:string = `#version 300 es
in vec4 a_position; //position data recieved from buffer
in vec4 a_color;  //also recieve color from buffer
out vec4 out_color; //pass color to fragment shader
void main(){
    gl_Position = a_position; //assign data from buffer to special vertex shader variable for setting the positon of a vertex
    out_color = a_color;
}
`;

export const fragmentShaderSource:string = `#version 300 es
precision highp float;

in vec4 out_color; //the output for the fragment shader
out vec4 outColor; //the output for the fragment shader
void main(){
    outColor = out_color;
}
`