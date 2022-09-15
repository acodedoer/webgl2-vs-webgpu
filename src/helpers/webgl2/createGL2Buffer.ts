export const createGL2Buffer = (gl:WebGL2RenderingContext, data:number[], bufferType:number, drawType:number ) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, bufferType===gl.ARRAY_BUFFER?new Float32Array(data):new Uint16Array(data), drawType);
    return buffer;
}