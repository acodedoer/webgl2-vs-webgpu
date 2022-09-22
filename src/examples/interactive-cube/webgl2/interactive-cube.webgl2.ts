import { vertexShaderSource, fragmentShaderSource } from "./shader.interactive-cube.webgl"
import { vertexShaderSource as vertexShaderSourceVertices, fragmentShaderSource as fragmentShaderSourceVertices} from "../../cube-with-distinct-vertex-colors/webgl2/shader.cube-with-distinct-vertex-colors.webgl"
import { vertexShaderSource as vertexShaderSourceFaces, fragmentShaderSource as fragmentShaderSourceFaces} from "../../cube-with-distinct-face-colors/webgl2/shader.cube-with-distinct-face-colors.webgl"
import { createShader, createProgram, initialiseGL, createGL2Buffer, setGL2Attribute } from "../../../helpers/webgl2"
import {createTransforms, createViewProjectionPerspective, cubeTextureCoord, cubeCompleteVertexData, resizeCanvasToDisplaySize, cubeFaceColorData, cubeUniqueVertexData, cubeIndexData} from "../../../helpers/common"
import { mat4 } from "gl-matrix";
const webGL2DrawCubeAnimated = () => {
    /*******************************************************************/
    /****************           Initialise GL           ****************/
    /*******************************************************************/
    const obj = initialiseGL();
    const gl = obj[0] as WebGL2RenderingContext;
    const canvas = obj[1] as HTMLCanvasElement;
    
    let vertexShader:WebGLShader;
    let fragmentShader:WebGLShader;
    let program:WebGLProgram;
    let drawSize:number;
    let cubeVertices:number[]
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    let material = "texture";

    const setCubeBasedOnMaterial = () => {
      switch (material){
        case "texture":
              /*******************************************************************/
              /**************** Create Shaders and Shader Program ****************/
              /*******************************************************************/
              vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource) as WebGLShader;
              fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader;
              program = createProgram(gl,fragmentShader,vertexShader) as WebGLProgram;
              gl.useProgram(program);
              /*******************************************************************/
              /****************           Create Buffers         ****************/
              /*******************************************************************/
              cubeVertices = cubeCompleteVertexData;
              drawSize=cubeVertices.length;
              createGL2Buffer(gl,cubeVertices,gl.ARRAY_BUFFER,gl.STATIC_DRAW);
              setGL2Attribute(gl,program,"a_position",3,gl.FLOAT,false,12,0);
              createGL2Buffer(gl,cubeTextureCoord,gl.ARRAY_BUFFER,gl.STATIC_DRAW);
              setGL2Attribute(gl, program, "a_texcoord",2, gl.FLOAT, true,0,0);
              /*******************************************************************/
              /**********                  Create Texture                *********/
              /*******************************************************************/
              const texture = gl.createTexture();
              gl.activeTexture(gl.TEXTURE0 + 0);
              gl.bindTexture(gl.TEXTURE_2D, texture);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 255, 0, 255]));
              const image = new Image();
              image.crossOrigin = "anonymous"
              image.src = "./assets/webgl_single_texture.png";
              image.addEventListener('load', function() {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.generateMipmap(gl.TEXTURE_2D);
                requestAnimationFrame(drawScene)
              });
              break;
        case "distinct-vertex-colors":
              /*******************************************************************/
              /**************** Create Shaders and Shader Program ****************/
              /*******************************************************************/
              vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSourceVertices) as WebGLShader;
              fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceVertices) as WebGLShader;
              program = createProgram(gl,fragmentShader,vertexShader) as WebGLProgram;
              gl.useProgram(program);
              /*******************************************************************/
              /****************           Create Buffers         ****************/
              /*******************************************************************/
              cubeVertices = cubeUniqueVertexData;
              drawSize=cubeIndexData.length;
              createGL2Buffer(gl,cubeVertices,gl.ARRAY_BUFFER,gl.STATIC_DRAW);
              createGL2Buffer(gl, cubeIndexData, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
              setGL2Attribute(gl,program,"a_position",3,gl.FLOAT,false,24,0);
              setGL2Attribute(gl,program,"a_color",3,gl.FLOAT,false,24,12);
              break;
        case "distinct-face-colors":
              /*******************************************************************/
              /**************** Create Shaders and Shader Program ****************/
              /*******************************************************************/
              vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSourceFaces) as WebGLShader;
              fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceFaces) as WebGLShader;
              program = createProgram(gl,fragmentShader,vertexShader) as WebGLProgram;
              gl.useProgram(program);
              /*******************************************************************/
              /****************           Create Buffers         ****************/
              /*******************************************************************/
              drawSize=cubeCompleteVertexData.length;
              createGL2Buffer(gl,cubeCompleteVertexData,gl.ARRAY_BUFFER,gl.STATIC_DRAW);
              setGL2Attribute(gl,program,"a_position",3,gl.FLOAT,false,12,0);

              createGL2Buffer(gl,cubeFaceColorData, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
              setGL2Attribute(gl,program,"a_color",3,gl.FLOAT,false,12,0);
          break;
        default :
          return 0;
      }
    }

    setCubeBasedOnMaterial();
    
    /*******************************************************************/
    /**********                 Clear Screen                 ***********/
    /*******************************************************************/
    resizeCanvasToDisplaySize(canvas);

    /*******************************************************************/
    /**********     Generate Model View Projection Matrix      *********/
    /*******************************************************************/
    const modelMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    let vpMatrix = mat4.create();
    const vp = createViewProjectionPerspective(canvas.width/canvas.height);
    vpMatrix = vp.viewProjectionMatrix;

    /*******************************************************************/
    /********** Create Transform Variables and Change Listeners*********/
    /*******************************************************************/
    let tX = 0;
    let tY = 0;
    let tZ = 0;
    let sX = 1;
    let sY = 1;
    let sZ = 1;
    let rX = 0;
    let rY = 0;
    let rZ = 0;

    const controls = document.getElementById("controls-container") as HTMLElement;
    controls.style.display="block";
    document.getElementById("translate-x")?.addEventListener("input", (e:any)=>{
      tX = e?.target?.value;
      // drawScene();
    })  
    document.getElementById("translate-y")?.addEventListener("input", (e:any)=>{
      tY = e?.target?.value;
      // drawScene();
    })  
    document.getElementById("translate-z")?.addEventListener("input", (e:any)=>{
      tZ = e?.target?.value;
      // drawScene();
    })  
    document.getElementById("scale-x")?.addEventListener("input", (e:any)=>{
      sX = e?.target?.value;
      // drawScene();
    })  
    document.getElementById("scale-y")?.addEventListener("input", (e:any)=>{
      sY = e?.target?.value;
      // drawScene();
    })  
    document.getElementById("scale-z")?.addEventListener("input", (e:any)=>{
      sZ = e?.target?.value;
      // drawScene();
    })  
    document.getElementById("rotate-x")?.addEventListener("input", (e:any)=>{
      rX = e?.target?.value * (Math.PI/180);
      // drawScene();
    })  
    document.getElementById("rotate-y")?.addEventListener("input", (e:any)=>{
      rY = e?.target?.value * (Math.PI/180);
      // drawScene();
    })  
    document.getElementById("rotate-z")?.addEventListener("input", (e:any)=>{
      rZ = e?.target?.value * (Math.PI/180);
      // drawScene();
    })  
    document.getElementById("material")?.addEventListener("change", (e:any)=>{
      material = e?.target?.value;
      setCubeBasedOnMaterial();
      // drawScene();
    })  
    window.addEventListener('resize', () => resizeCanvasToDisplaySize(canvas));

    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/
    let fpsContainer:HTMLElement = document.createElement('div');
    fpsContainer = document.getElementById("fps") as HTMLElement;
    let fps = 1;
    const times:any = [];
    const drawScene = (timestamp:any) => {
      while (times.length > 0 && times[0] <= timestamp - 1000) {
        times.shift();
      }
      times.push(timestamp);
      fps = times.length;
      fpsContainer.innerText = fps.toString();

      createTransforms(modelMatrix,[tX,tY,tZ],[rX,rY,rZ], [sX,sY,sZ]);
      mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);
      const mvpMatrixLocation = gl.getUniformLocation(program,"u_matrix");
      gl.uniformMatrix4fv(mvpMatrixLocation,false, mvpMatrix);
      gl.clearColor(0,0,0,0); 
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.CULL_FACE);
      const primitiveType = gl.TRIANGLES; 
      const drawOffset = 0;

      if(material=="distinct-vertex-colors"){
        let indexType = gl.UNSIGNED_SHORT;
        gl.drawElements(primitiveType, drawSize, indexType, drawOffset);
      }
      else{
        gl.drawArrays(primitiveType, drawOffset, drawSize);
      }
      requestAnimationFrame(drawScene);
    }
    requestAnimationFrame(drawScene)

}

export default webGL2DrawCubeAnimated;