import { vertexShaderSource, fragmentShaderSource } from "./shader.square.webgl"
import { createShader, createProgram, initialiseGL } from "../../../helpers/webgl2"
import {resizeCanvasToDisplaySize} from "../../../helpers/common"
const webGL2DrawSquare = () => {

    /*******************************************************************/
    /****************           Initialise GL           ****************/
    /*******************************************************************/
    const obj = initialiseGL();
    const gl = obj[0] as WebGL2RenderingContext;
    const canvas = obj[1] as HTMLCanvasElement;

    /*******************************************************************/
    /**************** Create Shaders and Shader Program ****************/
    /*******************************************************************/
    const vertexShader:WebGLShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource) as WebGLShader;
    const fragmentShader:WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader;
    const program:WebGLProgram = createProgram(gl,fragmentShader,vertexShader) as WebGLProgram;

    /*******************************************************************/
    /**********Create Vertex Buffer & Store Vertices & Colors***********/
    /*******************************************************************/
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

    /*******************************************************************/
    /**********          Setup Vertex Array Object             *********/
    /*******************************************************************/
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

    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/ 
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
    gl.clearColor(1.0,1.0,1.0,1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    const primitiveType = gl.TRIANGLES;
    const drawOffset = 0;
    const count = 6;
    gl.drawArrays(primitiveType, drawOffset, count);
}

export default webGL2DrawSquare;