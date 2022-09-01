import { vertexShaderSource, fragmentShaderSource } from "./shader";
export const resizeCanvasToDisplaySize = (canvas:HTMLCanvasElement) => {
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
    if (needResize) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
    return needResize;
}
const createShader = (gl:WebGL2RenderingContext, type:number, source:string) => {
    const shader:WebGLShader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
        return shader;
    }

    gl.deleteShader(shader);
}
const createProgram = (gl:WebGLRenderingContext, vertexShader:WebGLShader, fragmentShader:WebGLShader) => {
    const program:WebGLProgram = gl.createProgram() as WebGLProgram;
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success){
        return program;
    }
    gl.deleteProgram(program);
}

export const webgl2DrawTriangle = () => {
    //get webgl rendering context
    const canvas:HTMLCanvasElement = document.getElementById("canvas-webGL2") as HTMLCanvasElement;
    const gl:WebGL2RenderingContext = canvas.getContext("webgl2") as WebGL2RenderingContext;

    //create vertex and fragment shaders, and link them into a shader program
    //the vertex shader used takes in vertex positions for drawing the triangle
    //the fragment shader used has a predefined color for coloring the triangle
    const vertexShader:WebGLShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource) as WebGLShader;
    const fragmentShader:WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader;
    const program:WebGLProgram = createProgram(gl,fragmentShader,vertexShader) as WebGLProgram;

    //look up the position attribute location, create a position buffer(a buffer stores data) and bind the buffer
    //binding the position buffer means its can be referenced through th ebind point moving forward
    const positionAttributeLocation:number = gl.getAttribLocation(program, "a_position");
    const positionBuffer:WebGLBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    //create an array to store the triangle vertices
    //since we are dealing with 2d, we need just x and y coordinates
    //the array should have 6 elements i.e. 3 points each with x and y coordinates
    //we are dealing with clip space at this point, so coordinates should be from -1 to 1
    const positions:number[] = [
        -0.5,-0.5,
        0.0, 0.5,
        0.5, -0.5
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //create a VAO to specify how the position attribute gets data from the buffer
    //bind the created VAO so that all settings applied moving forward apply to it
    //we use make sure we enable the attribute, using the attribute's loctaion
    const vao:WebGLVertexArrayObject = gl.createVertexArray() as WebGLVertexArrayObject;
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    //note that the position buffer will be automatically binded to the attribute 
    //and the settings specifed will be used to get data from the buffer to the attribute
    gl.vertexAttribPointer(positionAttributeLocation,size, type, normalize, stride, offset);

    resizeCanvasToDisplaySize(canvas); //adjust size of canvas
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height); //convert clip space to pixels
    gl.clearColor(1.0,1.0,1.0,1.0); //background color
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program); //use shader program with shaders linked

    const primitiveType = gl.TRIANGLES; //draw triangles with the 3 vertices passed to the vertex shader
    const drawOffset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, drawOffset, count);
}
