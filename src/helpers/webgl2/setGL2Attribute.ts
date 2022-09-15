export const setGL2Attribute = (gl:WebGL2RenderingContext,program: WebGLProgram,attribute:string, size:number, type:number, normalize: boolean, stride:number, offset:number) => {
    const attributeLocation = gl.getAttribLocation(program,attribute);
    gl.vertexAttribPointer(attributeLocation,size, type, normalize, stride, offset);
    gl.enableVertexAttribArray(attributeLocation);
}