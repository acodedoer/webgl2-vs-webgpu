import shader from './shader.wgsl';

export const webgpuDrawTriangle = async () => {
    /*******************************************************************/
    /****************           Initialise GPU          ****************/
    /*******************************************************************/
    if(!navigator.gpu){
        const canvasParent = document.getElementById("webGPU");
        canvasParent? canvasParent.innerHTML="<h2>Your browser does not support WebGPU!<h2>":null;

    }
    const canvas = document.getElementById("canvas-webGPU") as HTMLCanvasElement;
    const adapter = await navigator.gpu?.requestAdapter(); 
    const device = await adapter?.requestDevice() as GPUDevice; 
    const context = canvas.getContext("webgpu") as unknown as GPUCanvasContext;
    context.configure({
        alphaMode:"premultiplied", device, format: await navigator.gpu.getPreferredCanvasFormat()
    })
    const format = 'bgra8unorm';

    /*******************************************************************/
    /**********                Resize Canvas                   *********/
    /*******************************************************************/
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width  !== displayWidth ||canvas.height !== displayHeight;
    if (needResize) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }

    /*******************************************************************/
    /**********Create Vertex Buffer & Store Triangle's Vertices*********/
    /*******************************************************************/
    const positions:Float32Array = new Float32Array([
        -0.5,-0.5,
        0.0, 0.5,
        0.5, -0.5
    ]);
    
    const positionBuffer = device.createBuffer({
        size: positions.byteLength,
        usage:GPUBufferUsage.VERTEX,
        mappedAtCreation: true
    });

    new Float32Array(positionBuffer.getMappedRange()).set(positions);
    positionBuffer.unmap();

    
    /*******************************************************************/
    /*****Setup Render Pipeline for Vertex & Fragment Shader Stages*****/
    /*******************************************************************/
    let pipeline:GPURenderPipeline;
    pipeline = device.createRenderPipeline({
        vertex:{
            module: device.createShaderModule({
                code:shader
            }),
            entryPoint: "vs_main",
            buffers:[
                {
                    arrayStride:8,
                    attributes:[{
                        shaderLocation:0,
                        format:"float32x2",
                        offset:0
                    }
                    ]
                }
            ]
        },
        fragment:{
            module: device.createShaderModule({
                code:shader
            }),
            entryPoint:"fs_main",
            targets: [{format}]
        },
        primitive: {
            topology: "triangle-list"
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
            clearValue:{r:1.0, g:1.0, b:1.0, a:1.0},
            loadOp: 'clear',
            storeOp:'store'
        }]
    })

    /*******************************************************************/
    /**********                    DRAW                        *********/
    /*******************************************************************/ 
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, positionBuffer);
    renderPass.draw(3,1,0,0);
    
    renderPass.end(); 
    device.queue.submit([commandEncoder.finish()])
}