import { vertexShaderSource, fragmentShaderSource } from "./shader.square.webgl"
import { createShader, createProgram, initialiseGL } from "../../helpers/webgl2"
import {resizeCanvasToDisplaySize} from "../../helpers/common"
const webGL2DrawSquare = () => {

     //get webgl rendering context
    const obj = initialiseGL();
    const gl = obj[0] as WebGL2RenderingContext;
    const canvas = obj[1] as HTMLCanvasElement;

    //create vertex and fragment shaders, and link them into a shader program
    //the vertex shader used takes in position and color for each vertex of the triangle
    //the fragment shader used recieves a color from the vertex shader for each vertex of the triangle
    const vertexShader:WebGLShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource) as WebGLShader;
    const fragmentShader:WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader;
    const program:WebGLProgram = createProgram(gl,fragmentShader,vertexShader) as WebGLProgram;

    const data:number[] = [
        -0.5,-0.5, 1.0,0.0,0.0,
        -0.5, 0.5, 0.0,1.0,0.0,
        0.5, -0.5, 0.0,1.0,0.0,
        -0.5, 0.5, 0.0,1.0,0.0,
        0.5, -0.5, 0.0,1.0,0.0,
        0.5,0.5, 1.0,0.0,0.0,
    ];

    const dataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program,"a_position");
    const colorAttributeLocation = gl.getAttribLocation(program,"a_color");
    
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 20;
    let offset = 0;

    gl.vertexAttribPointer(positionAttributeLocation,size, type, normalize, stride, offset);

    gl.enableVertexAttribArray(positionAttributeLocation);
    size = 3;
    type = gl.FLOAT;
    normalize = false;
    stride = 20;
    offset = 8;
    
    gl.vertexAttribPointer(colorAttributeLocation,size, type, normalize, stride, offset);
    gl.enableVertexAttribArray(colorAttributeLocation);
    resizeCanvasToDisplaySize(canvas);

    gl.viewport(0,0,gl.canvas.width, gl.canvas.height); //convert clip space to pixels
    gl.clearColor(1.0,1.0,1.0,1.0); //background color
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program); //use shader program with shaders linked

    const primitiveType = gl.TRIANGLES; //draw triangles with the 3 vertices passed to the vertex shader
    const drawOffset = 0;
    const count = 6;
    gl.drawArrays(primitiveType, drawOffset, count);
}

export default webGL2DrawSquare;