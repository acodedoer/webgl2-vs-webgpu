import shader from './shader.square.webgpu.wgsl'
import { initialiseGPU, createGPUBuffer } from '../../../helpers/webgpu';
const webGPUDrawSquare = async () => {
    /*******************************************************************/
    /****************           Initialise GPU          ****************/
    /*******************************************************************/
    const gpu = await initialiseGPU();
    const format = 'bgra8unorm';
    const device = gpu.device;
    const context = gpu.context;

    /*******************************************************************/
    /**********Create Vertex Buffer & Store Vertices & Colors**********/
    /*******************************************************************/
    const data:Float32Array = new Float32Array([
        -0.5,-0.5, 0.0,0.0,1.0,
        -0.5, 0.5, 0.0,1.0,0.0,
        0.5, -0.5, 0.0,1.0,0.0,
        -0.5, 0.5, 0.0,1.0,0.0,
        0.5, -0.5, 0.0,1.0,0.0,
        0.5,0.5, 0.0,0.0,1.0,
    ]);

    const dataBuffer = createGPUBuffer(device, data, GPUBufferUsage.VERTEX);

    /*******************************************************************/
    /*****Setup Render Pipeline for Vertex & Fragment Shader Stages*****/
    /*******************************************************************/
    let pipeline = device.createRenderPipeline({
        vertex:{
            module: device.createShaderModule({
                code:shader
            }),
            entryPoint: "vs_main",
            buffers:[
                {
                    arrayStride:20,            
                    attributes:[
                        {
                            shaderLocation:1,   
                            format:"float32x2",
                            offset:0            
                        },
                        {
                            shaderLocation:2,   
                            format:"float32x3",
                            offset:8            
                        }
                ]
                }
            ]
        },
        fragment:{
            module:device.createShaderModule({
                code:shader
            }),
            entryPoint:"fs_main",
            targets:[{format}]
        },
        primitive:{
            topology:"triangle-list"
        },
        layout: device.createPipelineLayout({
            bindGroupLayouts:[]
        })
    })

    /*******************************************************************/
    /**********             Create Command Encoder             *********/
    /*******************************************************************/
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({ 
        colorAttachments: [{
            view:textureView,
            clearValue:{r:0.0, g:0.0, b:0.0, a:0.0},
            loadOp: 'clear',
            storeOp:'store'
        }]
    })

    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, dataBuffer);          
    renderPass.draw(6,1,0,0);                           
    
    renderPass.end(); 
    device.queue.submit([commandEncoder.finish()]) 
}

export default webGPUDrawSquare;