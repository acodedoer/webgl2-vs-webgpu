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

export default createProgram;