import { vertexShaderSource, fragmentShaderSource } from "./shader.cube-with-distinct-vertex-colors.webgl"
import { createShader, createProgram, initialiseGL, createGL2Buffer, setGL2Attribute } from "../../../helpers/webgl2"
import {createTransforms, createViewProjectionPerspective, cubeIndexData, cubeVertexData, resizeCanvasToDisplaySize} from "../../../helpers/common"
import { mat4 } from "gl-matrix";
const webGL2DrawCubeWithDistinctVertexColors = () => {
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
    gl.useProgram(program); 
    
    /*******************************************************************/
    /**********Create Vertex Buffer & Store Vertices & Colors***********/
    /*******************************************************************/
    const cubeVertices:number[] = cubeVertexData;
    createGL2Buffer(gl,cubeVertexData,gl.ARRAY_BUFFER,gl.STATIC_DRAW);


    /*******************************************************************/
    /**********          Setup Vertex Array Object             *********/
    /*******************************************************************/
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    setGL2Attribute(gl,program,"a_position",3,gl.FLOAT,false,24,0);
    setGL2Attribute(gl,program,"a_color",3,gl.FLOAT,false,24,12);
        
    
    /*******************************************************************/
    /**********             Create Index Buffer               *********/
    /*******************************************************************/
    const cubeIndices = cubeIndexData;
    createGL2Buffer(gl, cubeIndices, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
    resizeCanvasToDisplaySize(canvas);

    /*******************************************************************/
    /**********     Generate Model View Projection Matrix      *********/
    /*******************************************************************/
    const modelMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    let vpMatrix = mat4.create();
    const vp = createViewProjectionPerspective(canvas.width/canvas.height);
    vpMatrix = vp.viewProjectionMatrix;

    createTransforms(modelMatrix,[0,0,-2],[-2.44,0.46,0]);
    mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);
    const mvpMatrixLocation = gl.getUniformLocation(program,"u_matrix");
    gl.uniformMatrix4fv(mvpMatrixLocation,false, mvpMatrix);
    
    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/ 
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
    gl.clearColor(1.0,1.0,1.0,1.0); 
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    

    const primitiveType = gl.TRIANGLES; 
    const drawOffset = 0;
    const count = cubeIndices.length;
    let indexType = gl.UNSIGNED_SHORT;
    gl.drawElements(primitiveType, count, indexType, drawOffset);
}

export default webGL2DrawCubeWithDistinctVertexColors;