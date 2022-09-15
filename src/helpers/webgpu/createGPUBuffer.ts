export const createGPUBuffer = (device:GPUDevice, data: Float32Array |Uint32Array, usageFlag:GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST) => {
    const buffer = device.createBuffer({
        size: data.byteLength,
        usage:usageFlag,
        mappedAtCreation: true
    });

    if(usageFlag === GPUBufferUsage.VERTEX)new Float32Array(buffer.getMappedRange()).set(data);
    else new Uint32Array(buffer.getMappedRange()).set(data);
    buffer.unmap();
    return buffer;
}
