import { webgl2DrawTriangle } from "./triangle/webgl2";
import { webgpuDrawTriangle } from "./triangle/webgpu"
import { webGL2DrawSquare } from "./square/webgl2";
import { webGPUDrawSquare } from "./square/webgpu";
import {webGPUDrawSquareWithIndexedVertices} from "./square-with-indexed-vertices/webgpu";
import {webGL2DrawSquareWithIndexedVertices} from "./square-with-indexed-vertices/webgl2";

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
/*****************************************************************************/
/***************                    Triangle                  ****************/
/*****************************************************************************/
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


/***************************************************************************/
/***************                    Square                  ****************/
/***************************************************************************/
const squareButtoWebGPU:HTMLElement|null = document.getElementById("webGPUTab-square");
squareButtoWebGPU?.addEventListener("click",async ()=>{
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webGPUDrawSquare();
})
const squareButtoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-square");
squareButtoWebGL2?.addEventListener("click",async ()=>{
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webGL2DrawSquare();
})

/***************************************************************************/
/***************        Square with Indexed Vertices        ****************/
/***************************************************************************/
if(squareButtoWebGL2!==null)webGL2DrawSquare();
const square_with_index_verticesButtoWebGPU:HTMLElement|null = document.getElementById("webGPUTab-square-with-indexed-vertices");
square_with_index_verticesButtoWebGPU?.addEventListener("click",async ()=>{
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webGPUDrawSquareWithIndexedVertices();
})
const square_with_index_verticesButtoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-square-with-indexed-vertices");
square_with_index_verticesButtoWebGL2?.addEventListener("click",async ()=>{
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webGL2DrawSquareWithIndexedVertices();
})
if(square_with_index_verticesButtoWebGL2!==null)webGL2DrawSquareWithIndexedVertices();