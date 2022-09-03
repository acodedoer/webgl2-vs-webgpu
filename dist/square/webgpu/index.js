import shader from './shader.wgsl';
import { resizeCanvasToDisplaySize } from "../webgl2";
const checkGPU = () => {
    let result = '';
    if (!navigator.gpu) {
        result = "Your current browser does not support WebGPU";
    }
    return result;
};
const initGPU = async (id = "canvas-webGPU") => {
    var _a;
    const status = checkGPU();
    if (status !== '') {
        throw ('No WebGPU Support');
    }
    const canvas = document.getElementById(id);
    const adapter = await ((_a = navigator.gpu) === null || _a === void 0 ? void 0 : _a.requestAdapter()); //the gpu
    const device = await (adapter === null || adapter === void 0 ? void 0 : adapter.requestDevice()); //provides a connection to the adapter(the gpu)
    const context = canvas.getContext("webgpu");
    resizeCanvasToDisplaySize(canvas);
    const devicePixelRatio = window.devicePixelRatio || 1;
    const size = [
        canvas.clientWidth * devicePixelRatio,
        canvas.clientHeight * devicePixelRatio
    ];
    canvas.width = size[0];
    canvas.height = size[1];
    const format = await navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        alphaMode: "premultiplied", device, format
    });
    return { device, canvas, format, context };
};
export const webgpuDrawSquare = async () => {
    //check WebGPU support, configure context, a gpu object
    const gpu = await initGPU();
    const format = 'bgra8unorm';
    const device = gpu.device;
    const context = gpu.context;
    //create an array to store the triangle vertices
    //since we are dealing with 2d, we need just x and y coordinates
    //we are dealing with clip space at this point, so coordinates should be from -1 to 1
    const positions = new Float32Array([
        -0.5, -0.5,
        0.0, 0.5,
        0.5, -0.5
    ]);
    //create a position buffer(a buffer stores data) for use in the vertex shader
    //store the array of vertices into the buufer
    const positionBuffer = device.createBuffer({
        size: positions.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true
    });
    new Float32Array(positionBuffer.getMappedRange()).set(positions);
    positionBuffer.unmap();
    //create and setup a render pipeline which controls the vertex and fragment shader stages
    //specify vertex and fragment shaders, specify primitive topology to draw, specify no bindGrouplayouts
    //spefiy the position buufer in the buffers property of th evertex shader
    let pipeline;
    pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "vs_main",
            buffers: [
                {
                    arrayStride: 8,
                    attributes: [{
                            shaderLocation: 0,
                            format: "float32x2",
                            offset: 0
                        }
                    ]
                }
            ]
        },
        fragment: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "fs_main",
            targets: [{ format }]
        },
        primitive: {
            topology: "triangle-list"
        },
        layout: device.createPipelineLayout({
            bindGroupLayouts: []
        })
    });
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
                view: textureView,
                clearValue: { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
                loadOp: 'clear',
                storeOp: 'store'
            }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, positionBuffer);
    renderPass.draw(3, 1, 0, 0);
    renderPass.end(); //no more instructions 
    device.queue.submit([commandEncoder.finish()]); //submit to the gpu's queue to execute
};
//# sourceMappingURL=index.js.map