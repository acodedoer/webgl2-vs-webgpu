import shaderTexture from '../../cube-with-texture/webgpu/shader.cube-with-texture.wgsl'
import shaderVertices from '../../cube-with-distinct-vertex-colors/webgpu/shader.cube-with-distinct-vertex-colors.wgsl'
import shaderFaces from '../../cube-with-distinct-face-colors/webgpu/shader.cube-with-distinct-face-colors.wgsl'
import { initialiseGPU, createGPUBuffer } from '../../../helpers/webgpu';
import { createTransforms, createViewProjectionPerspective, cubeCompleteVertexData, cubeFaceColorData, cubeIndexData, cubeTextureCoord, cubeUniqueVertexData } from '../../../helpers/common';
import { mat4 } from 'gl-matrix';
const webGPUDrawCubeAnimated = async () => {
    /*******************************************************************/
    /****************           Initialise GPU          ****************/
    /*******************************************************************/
    const gpu = await initialiseGPU();
    const format = 'bgra8unorm';
    const device = gpu.device;


    /*******************************************************************/
    /****************     Declare Required Variables    ****************/
    /*******************************************************************/
    let cubeData!: Float32Array;
    let textureData!: Float32Array;
    let colorData!: Float32Array;
    let vertexBuffer!: GPUBuffer; 
    let textureBuffer!: GPUBuffer;
    let colorBuffer!: GPUBuffer;
    let indexBuffer!: GPUBuffer;
    let indexData!: Uint32Array;
    let drawSize: number =0;
    let pipeline!:GPURenderPipeline;
    let material ="texture";

    let uniformBindGroup!:GPUBindGroup;
    const uniformBuffer = device.createBuffer({
        size: 64,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    /*******************************************************************/
    /****************  Setup Pipeline Based on Material ****************/
    /*******************************************************************/
    const setCubeBasedOnMaterial = async() =>{
    switch (material){
        case "texture":
            /*******************************************************************/
            /****** Create Buffers to Store Vertices & Texture Coordinates *****/
            /*******************************************************************/
            cubeData = new Float32Array(cubeCompleteVertexData);
            textureData = new Float32Array(cubeTextureCoord);
            vertexBuffer = createGPUBuffer(device, cubeData, GPUBufferUsage.VERTEX);
            textureBuffer = createGPUBuffer(device, textureData, GPUBufferUsage.VERTEX);
            drawSize = cubeData.length/3;
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
            /*****Setup Render Pipeline for Vertex & Fragment Shader Stages*****/
            /*******************************************************************/
            pipeline = device.createRenderPipeline({
                vertex:{
                    module: device.createShaderModule({
                        code:shaderTexture
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
                        code:shaderTexture
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
            uniformBindGroup = device.createBindGroup({
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
            break;
        case "distinct-vertex-colors":
            /*******************************************************************/
            /******       Create Buffers to Store Vertices & Indices       *****/
            /*******************************************************************/
            cubeData = new Float32Array(cubeUniqueVertexData);
            vertexBuffer = createGPUBuffer(device, cubeData, GPUBufferUsage.VERTEX);
            indexData = new Uint32Array(cubeIndexData)
            drawSize = indexData.length;
            indexBuffer = createGPUBuffer(device, indexData, GPUBufferUsage.INDEX);
            /*******************************************************************/
            /*****Setup Render Pipeline for Vertex & Fragment Shader Stages*****/
            /*******************************************************************/
            pipeline = device.createRenderPipeline({
                vertex:{
                    module: device.createShaderModule({
                        code:shaderVertices
                    }),
                    entryPoint: "vs_main",
                    buffers:[
                        {
                            arrayStride:24,            
                            attributes:[
                                {
                                    shaderLocation:0,   
                                    format:"float32x3",
                                    offset:0            
                                },
                                {
                                    shaderLocation:1,  
                                    format:"float32x3",
                                    offset:12            
                                }
                        ]
                        }
                    ]
                },
                fragment:{
                    module:device.createShaderModule({
                        code:shaderVertices
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
                layout: "auto"
            })
            /*******************************************************************/
            /********** Create Uniform Buffer & Uniform Bind Group *************/
            /*******************************************************************/
            uniformBindGroup = device.createBindGroup({
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
            break
        case "distinct-face-colors":
            /*******************************************************************/
            /******       Create Buffers to Store Vertices & Colors        *****/
            /*******************************************************************/
            cubeData = new Float32Array(cubeCompleteVertexData);
            colorData = new Float32Array(cubeFaceColorData);
            vertexBuffer = createGPUBuffer(device, cubeData, GPUBufferUsage.VERTEX);
            colorBuffer = createGPUBuffer(device, colorData, GPUBufferUsage.VERTEX);
            drawSize = cubeData.length/3;indexBuffer = createGPUBuffer(device, indexData, GPUBufferUsage.INDEX);
            /*******************************************************************/
            /*****Setup Render Pipeline for Vertex & Fragment Shader Stages*****/
            /*******************************************************************/
            pipeline = device.createRenderPipeline({
                vertex:{
                    module: device.createShaderModule({
                        code:shaderFaces
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
                        code:shaderFaces
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
                layout: "auto"
            })
            /*******************************************************************/
            /********** Create Uniform Buffer & Uniform Bind Group *************/
            /*******************************************************************/
            uniformBindGroup = device.createBindGroup({
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
            break
        default:
            return;
    }
    }
    await setCubeBasedOnMaterial();

    /*******************************************************************/
    /********** Create Transform Variables and Change Listeners*********/
    /*******************************************************************/
    let tX = 0;
    let tY = 0;
    let tZ = 0;
    let sX = 1;
    let sY = 1;
    let sZ = 1;
    let rX = 0;
    let rY = 0;
    let rZ = 0;
    document.getElementById("translate-x")?.addEventListener("input", (e:any)=>{
      tX = e?.target?.value;
    //   drawScene();
    })  
    document.getElementById("translate-y")?.addEventListener("input", (e:any)=>{
      tY = e?.target?.value;
    //   drawScene();
    })  
    document.getElementById("translate-z")?.addEventListener("input", (e:any)=>{
      tZ = e?.target?.value;
    //   drawScene();
    })  
    document.getElementById("scale-x")?.addEventListener("input", (e:any)=>{
      sX = e?.target?.value;
    //   drawScene();
    })  
    document.getElementById("scale-y")?.addEventListener("input", (e:any)=>{
      sY = e?.target?.value;
    //   drawScene();
    })  
    document.getElementById("scale-z")?.addEventListener("input", (e:any)=>{
      sZ = e?.target?.value;
    //   drawScene();
    })  
    document.getElementById("rotate-x")?.addEventListener("input", (e:any)=>{
      rX = e?.target?.value * (Math.PI/180);
    //   drawScene();
    })  
    document.getElementById("rotate-y")?.addEventListener("input", (e:any)=>{
      rY = e?.target?.value * (Math.PI/180);
    //   drawScene();
    })  
    document.getElementById("rotate-z")?.addEventListener("input", (e:any)=>{
      rZ = e?.target?.value * (Math.PI/180);
    //   drawScene();
    })  
    document.getElementById("material")?.addEventListener("change", async (e:any)=>{
      material = e?.target?.value;
      await setCubeBasedOnMaterial();
    //   drawScene();
    })  


    /*******************************************************************/
    /**********             Create Command Encoder             *********/
    /*******************************************************************/
    let textureView = gpu.context.getCurrentTexture().createView();
    const depthTexture = device.createTexture({
        size: [gpu.canvas.width, gpu.canvas.height, 1],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });


    const renderPassDescription = {
        colorAttachments: [{
            view:textureView,
            clearValue:{r:0.0, g:0.0, b:0.0, a:0.0},
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
    };
    let fpsContainer:HTMLElement = document.createElement('div');
    fpsContainer = document.getElementById("fps") as HTMLElement;
    let fps = 1;
    const times:any = [];
    const drawScene = (timestamp:any) => {
      while (times.length > 0 && times[0] <= timestamp - 1000) {
        times.shift();
      }
      times.push(timestamp);
      fps = times.length;
      fpsContainer.innerText = fps.toString();

        textureView = gpu.context.getCurrentTexture().createView();
        renderPassDescription.colorAttachments[0].view = textureView;

        const commandEncoder = device.createCommandEncoder();
        const renderPass = commandEncoder.beginRenderPass(renderPassDescription as GPURenderPassDescriptor);
    /*******************************************************************/
    /**********     Generate Model View Projection Matrix      *********/
    /*******************************************************************/
    const modelMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    let vpMatrix = mat4.create();
    const vp = createViewProjectionPerspective(gpu.canvas.width/gpu.canvas.height);
    vpMatrix = vp.viewProjectionMatrix;

    createTransforms(modelMatrix,[tX,tY,tZ],[rX,rY,rZ], [sX,sY,sZ]);
    mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);


    /*******************************************************************/
    /*********************     Pass Uniforms      **********************/
    /*******************************************************************/
    device.queue.writeBuffer(uniformBuffer, 0, mvpMatrix as ArrayBuffer);
    
    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    if(material==="distinct-vertex-colors"){
        renderPass.setIndexBuffer(indexBuffer,"uint32");
        renderPass.setBindGroup(0, uniformBindGroup);
        renderPass.drawIndexed(drawSize);  
    }
    else{
        if(material==="distinct-face-colors") renderPass.setVertexBuffer(1, colorBuffer);
        else renderPass.setVertexBuffer(1, textureBuffer);
        renderPass.setBindGroup(0, uniformBindGroup);
        renderPass.draw(drawSize);                          
    }
    renderPass.end(); 
    device.queue.submit([commandEncoder.finish()])
    requestAnimationFrame(drawScene);
}
requestAnimationFrame(drawScene);
}

export default webGPUDrawCubeAnimated;