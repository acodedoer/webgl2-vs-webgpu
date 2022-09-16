import shader from './shader.cube-with-distinct-face-colors.wgsl'
import { initialiseGPU, createGPUBuffer } from '../../../helpers/webgpu';
import { createTransforms, createViewProjectionPerspective, cubeCompleteVertexData, cubeFaceColorData, cubeIndexData, cubeUniqueVertexData } from '../../../helpers/common';
import { mat4 } from 'gl-matrix';
const webGPUDrawCubeWithDistinctFaceColors = async () => {
    /*******************************************************************/
    /****************           Initialise GPU          ****************/
    /*******************************************************************/
    const gpu = await initialiseGPU();
    const format = 'bgra8unorm';
    const device = gpu.device;


    /*******************************************************************/
    /******Create Vertex & Color Buffers to Store Vertices & Colors*****/
    /*******************************************************************/
    const cubeData = new Float32Array(cubeCompleteVertexData);
    const colorData = new Float32Array(cubeFaceColorData);
    const vertexBuffer = createGPUBuffer(device, cubeData, GPUBufferUsage.VERTEX);
    const colorBuffer = createGPUBuffer(device, colorData, GPUBufferUsage.VERTEX);
    const numberOfVertices = cubeData.length;


    
    /*******************************************************************/
    /****Create Uniform Bind Group Layout to Pass Uniform to Shader*****/
    /*******************************************************************/
    const uniformBindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer:{
                    type:"uniform"
                }
            }
        ]
    });

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
                    arrayStride:12,            
                    attributes:[
                        {
                            shaderLocation:0,   
                            format:"float32x3",
                            offset:0            
                        }
                    ],
                },
                {
                    arrayStride:12,            
                    attributes:[
                        {
                            shaderLocation:1,   
                            format:"float32x3",
                            offset:0            
                        }
                    ],
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
        depthStencil:{
            format:"depth24plus",
            depthWriteEnabled: true,
            depthCompare: "less"
        },
        layout: device.createPipelineLayout({bindGroupLayouts:[uniformBindGroupLayout]})
    })


    /*******************************************************************/
    /********** Create Uniform Buffer & Uniform Bind Group *************/
    /*******************************************************************/
    const uniformBuffer = device.createBuffer({
        size: 64,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const uniformBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: uniformBuffer,
                    offset: 0,
                    size: 64
                }
            }
        ]
    });


    /*******************************************************************/
    /**********     Generate Model View Projection Matrix      *********/
    /*******************************************************************/
    const modelMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    let vpMatrix = mat4.create();
    const vp = createViewProjectionPerspective(gpu.canvas.width/gpu.canvas.height);
    vpMatrix = vp.viewProjectionMatrix;

    createTransforms(modelMatrix,[0,0,-2],[2.44,-0.46,0]);
    mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);


    /*******************************************************************/
    /*********************     Pass Uniforms      **********************/
    /*******************************************************************/
    device.queue.writeBuffer(uniformBuffer, 0, mvpMatrix as ArrayBuffer);


    /*******************************************************************/
    /**********             Create Command Encoder             *********/
    /*******************************************************************/
    const commandEncoder = device.createCommandEncoder();
    const textureView = gpu.context.getCurrentTexture().createView();
    const depthTexture = device.createTexture({
        size: [gpu.canvas.width, gpu.canvas.height, 1],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view:textureView,
            clearValue:{r:1.0, g:1.0, b:1.0, a:1.0},
            loadOp: 'clear',
            storeOp:'store'
        }],
        depthStencilAttachment:{
            view: depthTexture.createView({
                aspect:"all"
            }),
            depthClearValue: 1.0,
            depthLoadOp: "clear",
            depthStoreOp: "store",
            depthReadOnly: false,
        }
        
    })

    
    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setVertexBuffer(1, colorBuffer);
    renderPass.setBindGroup(0, uniformBindGroup);
    renderPass.draw(numberOfVertices/3);                          
    renderPass.end(); 
    device.queue.submit([commandEncoder.finish()]) 
}

export default webGPUDrawCubeWithDistinctFaceColors;