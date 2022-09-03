import { vertexShaderSource, fragmentShaderSource } from "./shader";
export const resizeCanvasToDisplaySize = (canvas) => {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width !== displayWidth ||
        canvas.height !== displayHeight;
    if (needResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
};
const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    gl.deleteShader(shader);
};
const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    gl.deleteProgram(program);
};
export const webgl2DrawSquare = () => {
    //get webgl rendering context
    const canvas = document.getElementById("canvas-webGL2");
    const gl = canvas.getContext("webgl2");
    //create vertex and fragment shaders, and link them into a shader program
    //the vertex shader used takes in vertex positions for drawing the triangle
    //the fragment shader used has a predefined color for coloring the triangle
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, fragmentShader, vertexShader);
    //look up the position attribute location, create a position buffer(a buffer stores data) and bind the buffer
    //binding the position buffer means its can be referenced through th ebind point moving forward
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //create an array to store the triangle vertices
    //since we are dealing with 2d, we need just x and y coordinates
    //the array should have 6 elements i.e. 3 points each with x and y coordinates
    //we are dealing with clip space at this point, so coordinates should be from -1 to 1
    const positions = [
        -0.5, -0.5,
        0.0, 0.5,
        0.5, -0.5
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    //create a VAO to specify how the position attribute gets data from the buffer
    //bind the created VAO so that all settings applied moving forward apply to it
    //we use make sure we enable the attribute, using the attribute's loctaion
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    //note that the position buffer will be automatically binded to the attribute 
    //and the settings specifed will be used to get data from the buffer to the attribute
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    resizeCanvasToDisplaySize(canvas); //adjust size of canvas
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); //convert clip space to pixels
    gl.clearColor(1.0, 1.0, 1.0, 1.0); //background color
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program); //use shader program with shaders linked
    const primitiveType = gl.TRIANGLES; //draw triangles with the 3 vertices passed to the vertex shader
    const drawOffset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, drawOffset, count);
};
//# sourceMappingURL=index.js.map