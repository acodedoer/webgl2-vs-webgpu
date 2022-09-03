const createShader = (gl:WebGL2RenderingContext, type:number, source:string) => {
    const shader:WebGLShader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
        return shader;
    }
    else console.log(gl.getShaderInfoLog(shader))

    gl.deleteShader(shader);
}

export default createShader;