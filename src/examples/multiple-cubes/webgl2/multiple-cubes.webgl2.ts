import { vertexShaderSource, fragmentShaderSource } from "./shader.multiple-cubes.webgl"
import { createShader, createProgram, initialiseGL, createGL2Buffer, setGL2Attribute } from "../../../helpers/webgl2"
import {createTransforms, createViewProjectionPerspective, cubeIndexData, cubeCompleteVertexData, resizeCanvasToDisplaySize, cubeFaceColorData, FPS, GUI} from "../../../helpers/common"
import { mat4 } from "gl-matrix";
const webGL2DrawMultipleCubes = () => {
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
    /**********       Create Buffers & Set Attributes        ***********/
    /*******************************************************************/
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const cubeVertices:number[] = cubeCompleteVertexData;

    createGL2Buffer(gl,cubeVertices,gl.ARRAY_BUFFER,gl.STATIC_DRAW);
    setGL2Attribute(gl,program,"a_position",3,gl.FLOAT,false,12,0);

    const cubeColors:number[] = cubeFaceColorData;
    createGL2Buffer(gl,cubeColors, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
    setGL2Attribute(gl,program,"a_color",3,gl.FLOAT,false,12,0);

    resizeCanvasToDisplaySize(canvas);
    let rows = 1
    const updateRows = (value:number) => rows = value;
    let columns = 1
    const updateColumns = (value:number) => columns = value;

    GUI.show()
    GUI.add("range","rows",[1,100],1,updateRows);
    GUI.add("range","columns",[1,100],1,updateColumns);

    /*******************************************************************/
    /**********     Generate Model View Projection Matrix      *********/
    /*******************************************************************/
    const modelMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    let vpMatrix = mat4.create();
    const vp = createViewProjectionPerspective(canvas.width/canvas.height, [0,25,50]);
    vpMatrix = vp.viewProjectionMatrix;
    const [fpsContainer, fps, times] = FPS.getContainer();

    const drawScene = (timestamp:number) => {
        gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0,0.0,0.0,0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        FPS.display(timestamp,times,fps,fpsContainer);

        for(let i = 1; i<=rows; i++){
            for(let j = -columns/2; j<columns/2; j++){
                createTransforms(modelMatrix,[j*6, 0, -i*6],[0,0,0]);
                mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);
                const mvpMatrixLocation = gl.getUniformLocation(program,"u_matrix");
                gl.uniformMatrix4fv(mvpMatrixLocation,false, mvpMatrix);
                
                /*******************************************************************/
                /**********                    DRAW                        *********/
                /*******************************************************************/                 
                const primitiveType = gl.TRIANGLES; 
                const drawOffset = 0;
                gl.drawArrays(primitiveType, drawOffset, cubeVertices.length);
            }
        }
        requestAnimationFrame(drawScene);
    }
    requestAnimationFrame(drawScene);

}

export default webGL2DrawMultipleCubes;