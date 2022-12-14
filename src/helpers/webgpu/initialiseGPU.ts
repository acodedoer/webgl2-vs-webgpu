const checkGPU = () => {
    let result = '';
    if(!navigator.gpu){
        result = "Your current browser does not support WebGPU";
    }
    return result;
}

const initialiseGPU = async (id="canvas-webGPU") => {
    const status = checkGPU();
    let fpsContainer:HTMLElement = document.createElement('div');
    let controlsContainer:HTMLElement = document.createElement('div');
    fpsContainer = document.getElementById("fps-container") as HTMLElement;
    controlsContainer = document.getElementById("controls-container") as HTMLElement;
    if(status!==''){
        const canvasParent = document.getElementById("webGPU");
        canvasParent? canvasParent.innerHTML="<h2>Your browser does not support WebGPU!<h2>":null;
        fpsContainer.style.display="none";
        controlsContainer.style.display="none"
    }
    
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const adapter = await navigator.gpu?.requestAdapter(); //the gpu
    const device = await adapter?.requestDevice() as GPUDevice; //provides a connection to the adapter(the gpu)
    const context = canvas.getContext("webgpu") as unknown as GPUCanvasContext;
    
    //adjust size of canvas
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
    if (needResize) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }

    const format = await navigator.gpu.getPreferredCanvasFormat();

    context.configure({
        alphaMode:"premultiplied", device, format
    })

    return {device, canvas, format, context}
}

export default initialiseGPU;