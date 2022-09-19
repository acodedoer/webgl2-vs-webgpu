import shader from './shader.cube-with-texture.wgsl'
import { initialiseGPU, createGPUBuffer } from '../../../helpers/webgpu';
import { createTransforms, createViewProjectionPerspective, cubeCompleteVertexData, cubeFaceColorData, cubeIndexData, cubeTextureCoord, cubeUniqueVertexData } from '../../../helpers/common';
import { mat4 } from 'gl-matrix';
import ts from 'typescript';
const webGPUDrawCubeWithTexture = async () => {
    /*******************************************************************/
    /****************           Initialise GPU          ****************/
    /*******************************************************************/
    const gpu = await initialiseGPU();
    const format = 'bgra8unorm';
    const device = gpu.device;


    /*******************************************************************/
    /****** Create Buffers to Store Vertices & Texture Coordinates *****/
    /*******************************************************************/
    const cubeData = new Float32Array(cubeCompleteVertexData);
    const textureData = new Float32Array(cubeTextureCoord);
    const vertexBuffer = createGPUBuffer(device, cubeData, GPUBufferUsage.VERTEX);
    const textureBuffer = createGPUBuffer(device, textureData, GPUBufferUsage.VERTEX);
    const numberOfVertices = cubeData.length;


    /*******************************************************************/
    /**********                  Create Texture                *********/
    /*******************************************************************/
    const image = new Image();
    image.src = "./assets/webgpu_single_texture.png";
    await image.decode();
    const imageBitmap = await createImageBitmap(image);

    const texture = device.createTexture({
        size: [imageBitmap.width, imageBitmap.height,1],
        format: 'rgba8unorm',
        usage: GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT
    });

    const sampler = device.createSampler({
        minFilter: 'linear',
        magFilter: 'linear',
        addressModeU: 'repeat',
        addressModeV: 'repeat'
    });

    device.queue.copyExternalImageToTexture(
        {source: imageBitmap},
        {texture: texture},
        [imageBitmap.width, imageBitmap.height]
    );

    /*******************************************************************/
    /*****                  Create Bind Group Layout               *****/
    /** COMMENTED OUT BECAUSE PIPELINE LAYOUT CAN BE SET TO AUTO(135) **/
    /******************************************************************
    const uniformBindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer:{
                    type:"uniform"
                }
            },
            {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                texture:{
                    multisampled:false,
                    viewDimension:undefined,
                    sampleType:"float"
                }
            },
            {
                binding: 2,
                visibility: GPUShaderStage.FRAGMENT,
                sampler:{
                   type:"filtering",
                }
            }
            
        ]
    });*/


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
                    arrayStride:8,            
                    attributes:[
                        {
                            shaderLocation:1,   
                            format:"float32x2",
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
        layout: 'auto'
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
            },
            {
                binding:1,
                resource:sampler
            },
            {
                binding:2,
                resource:texture.createView()
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
    renderPass.setVertexBuffer(1, textureBuffer);
    renderPass.setBindGroup(0, uniformBindGroup);
    renderPass.draw(numberOfVertices/3);                          
    renderPass.end(); 
    device.queue.submit([commandEncoder.finish()]) 
}

export default webGPUDrawCubeWithTexture;