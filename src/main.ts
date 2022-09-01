import { webgl2DrawTriangle } from "./triangle/webgl2";
import { webgpuDrawTriangle } from "./triangle/webgpu"

const removeOtherScene = (sceneType:string) => {
    const sceneParent = document.getElementById(sceneType) as HTMLElement;
    sceneParent?.childNodes.forEach((node)=>{
        if(node.nodeName==="CANVAS"){
            node.remove()
        }
    })
}
const setThisScene = (sceneType:string) => {
    let needsSetup = true;
    const sceneParent = document.getElementById(sceneType) as HTMLElement;
    sceneParent?.childNodes.forEach((node)=>{
        if(node.nodeName==="CANVAS"){
            needsSetup = false;
        }
    })

    if(needsSetup){
        const canvas = document.createElement("canvas");
        canvas.id="canvas-"+sceneType;
        sceneParent.appendChild(canvas);
    }
}

const triangleButtoWebGPU:HTMLElement|null = document.getElementById("webGPUTab-triangle");
triangleButtoWebGPU?.addEventListener("click",async ()=>{
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webgpuDrawTriangle();
})
const triangleButtoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-triangle");
triangleButtoWebGL2?.addEventListener("click",async ()=>{
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webgl2DrawTriangle();
})
if(triangleButtoWebGL2!==null)webgl2DrawTriangle();