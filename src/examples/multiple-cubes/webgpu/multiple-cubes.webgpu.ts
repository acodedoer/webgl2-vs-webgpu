import shader from './shader.multiple-cubes.wgsl'
import { initialiseGPU, createGPUBuffer } from '../../../helpers/webgpu';
import { createTransforms, createViewProjectionPerspective, cubeCompleteVertexData, cubeFaceColorData, cubeIndexData, cubeUniqueVertexData, FPS, GUI } from '../../../helpers/common';
import { mat4 } from 'gl-matrix';
const webGPUDrawMultipleCubes = async () => {
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
    let rows = 1
    let columns = 1


    const offset = 256;
    const size = 64;
    const totalSize = offset+64;
    let cubes = 1;

    let uniformBuffer:GPUBuffer;

    let uniformBindGroups:GPUBindGroup[] = [];
    const setUniforms = () => {
        uniformBindGroups = [];
        cubes = rows*columns;
        uniformBuffer= device.createBuffer({
            size: 64+((256+64)*cubes),
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        for(let i = 0; i<cubes; i++){
            const uniformBindGroup = device.createBindGroup({
                layout: pipeline.getBindGroupLayout(0),
                entries: [
                    {
                        binding: 0,
                        resource: {
                            buffer: uniformBuffer,
                            offset: i*offset,
                            size: size
                        }
                    }
                ]
            });
            uniformBindGroups.push(uniformBindGroup);
        }   
        console.log(uniformBindGroups.length)
    }
    setUniforms();
    const modelMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    let vpMatrix = mat4.create();
    const vp = createViewProjectionPerspective(gpu.canvas.width/gpu.canvas.height,[0,25,50]);
    vpMatrix = vp.viewProjectionMatrix;


    const [fpsContainer, fps, times] = FPS.getContainer();
    const drawScene = (timestamp:number) => {
        FPS.display(timestamp,times,fps,fpsContainer);
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
            
        })
        renderPass.setPipeline(pipeline);
        renderPass.setVertexBuffer(0, vertexBuffer);
        renderPass.setVertexBuffer(1, colorBuffer);
        /*******************************************************************/
        /**********     Generate Model View Projection Matrix      *********/
        /*******************************************************************/
        let count=0;
        for(let i = 1; i<=rows; i++){
            for(let j = -columns/2; j<columns/2; j++){
                
                createTransforms(modelMatrix,[j*6, 0, -i*6],[0,Math.PI/2,0]);
                mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);


                /*******************************************************************/
                /*********************     Pass Uniforms      **********************/
                /*******************************************************************/
                device.queue.writeBuffer(uniformBuffer, 256*count, mvpMatrix as ArrayBuffer);

                /*******************************************************************/
                /**********                    DRAW                        *********/
                /*******************************************************************/

                renderPass.setBindGroup(0, uniformBindGroups[count]);
                renderPass.draw(numberOfVertices/3);           
                count++;                      
            }
        }
        renderPass.end(); 
        device.queue.submit([commandEncoder.finish()])
        requestAnimationFrame(drawScene);
    }
    const updateRows = (value:number) => {rows = value; setUniforms()}
    const updateColumns = (value:number) => {columns = value; setUniforms()}

    GUI.show()
    GUI.add("range","rows",[1,100],1,updateRows);
    GUI.add("range","columns",[1,100],1,updateColumns);
    requestAnimationFrame(drawScene);
}

export default webGPUDrawMultipleCubes;