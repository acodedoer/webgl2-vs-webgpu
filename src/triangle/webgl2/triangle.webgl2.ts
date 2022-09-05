import { vertexShaderSource, fragmentShaderSource } from "./shader";

const webgl2DrawTriangle = () => {
    /*******************************************************************/
    /****************           Initialise GL           ****************/
    /*******************************************************************/
    const canvas:HTMLCanvasElement = document.getElementById("canvas-webGL2") as HTMLCanvasElement;
    const gl:WebGL2RenderingContext = canvas.getContext("webgl2") as WebGL2RenderingContext;


    /*******************************************************************/
    /**************** Create Shaders and Shader Program ****************/
    /*******************************************************************/
    const vertexShader:WebGLShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    gl.shaderSource(vertexShader,vertexShaderSource);
    gl.compileShader(vertexShader);
    let success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if(!success){
        console.log(gl.getShaderInfoLog(vertexShader))
    }

    const fragmentShader:WebGLShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fragmentShader,fragmentShaderSource);
    gl.compileShader(fragmentShader);
    success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if(!success){
        console.log(gl.getShaderInfoLog(fragmentShader))
    }

    const program:WebGLProgram = gl.createProgram() as WebGLProgram;
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program)
    success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(!success){
        console.log(gl.getProgramInfoLog(program))
    }

    /*******************************************************************/
    /**********Create Vertex Buffer & Store Triangle's Vertices*********/
    /*******************************************************************/
    const positionBuffer:WebGLBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions:number[] = [
        -0.5,-0.5,
        0.0, 0.5,
        0.5, -0.5
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    /*******************************************************************/
    /**********          Setup Vertex Array Object             *********/
    /*******************************************************************/
    const positionAttributeLocation:number = gl.getAttribLocation(program, "a_position");
    const vao:WebGLVertexArrayObject = gl.createVertexArray() as WebGLVertexArrayObject;
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation,size, type, normalize, stride, offset);

    /*******************************************************************/
    /**********                Resize Canvas                   *********/
    /*******************************************************************/
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width  !== displayWidth || canvas.height !== displayHeight;
    if (needResize) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }


    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/   
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
    gl.clearColor(1.0,1.0,1.0,1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    const primitiveType = gl.TRIANGLES;
    const drawOffset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, drawOffset, count);
}

export default webgl2DrawTriangle;