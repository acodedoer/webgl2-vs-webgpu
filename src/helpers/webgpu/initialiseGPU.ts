const checkGPU = () => {
    let result = '';
    if(!navigator.gpu){
        result = "Your current browser does not support WebGPU";
    }
    return result;
}

const initialiseGPU = async (id="canvas-webGPU") => {
    const status = checkGPU();
    if(status!==''){
        window.alert('No WebGPU Support');
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