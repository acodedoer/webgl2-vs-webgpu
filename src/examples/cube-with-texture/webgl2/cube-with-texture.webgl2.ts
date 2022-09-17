import { vertexShaderSource, fragmentShaderSource } from "./shader.cube-with-texture.webgl"
import { createShader, createProgram, initialiseGL, createGL2Buffer, setGL2Attribute } from "../../../helpers/webgl2"
import {createTransforms, createViewProjectionPerspective, cubeTextureCoord, cubeCompleteVertexData, resizeCanvasToDisplaySize, cubeFaceColorData} from "../../../helpers/common"
import { mat4 } from "gl-matrix";
const webGL2DrawCubeWithTexture = () => {
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


    createGL2Buffer(gl,cubeTextureCoord,gl.ARRAY_BUFFER,gl.STATIC_DRAW);
    setGL2Attribute(gl, program, "a_texcoord",2, gl.FLOAT, true,0,0);

    resizeCanvasToDisplaySize(canvas);

    /*******************************************************************/
    /**********                  Create Texture                *********/
    /*******************************************************************/
    const texture = gl.createTexture();

    // use texture unit 0
    gl.activeTexture(gl.TEXTURE0 + 0);
  
    // bind to the TEXTURE_2D bind point of texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 255, 0, 255]));
  
    // Asynchronously load an image
    var image = new Image();
    image.crossOrigin = "anonymous"
    image.src = "./assets/webgl_single_texture.png";
    image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
    });


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
    const drawScene = () => {
        gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
        gl.clearColor(0,0,0,0); 
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        const primitiveType = gl.TRIANGLES; 
        const drawOffset = 0;
        gl.drawArrays(primitiveType, drawOffset, cubeVertices.length);
        requestAnimationFrame(drawScene);
    }

    requestAnimationFrame(drawScene);

}

export default webGL2DrawCubeWithTexture;