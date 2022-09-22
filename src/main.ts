import { webgl2DrawTriangle } from "./examples/triangle/webgl2";
import { webgpuDrawTriangle } from "./examples/triangle/webgpu"
import { webGL2DrawSquare } from "./examples/square/webgl2";
import { webGPUDrawSquare } from "./examples/square/webgpu";
import {webGPUDrawSquareWithIndexedVertices} from "./examples/square-with-indexed-vertices/webgpu";
import {webGL2DrawSquareWithIndexedVertices} from "./examples/square-with-indexed-vertices/webgl2";
import {webGPUDrawCubeWithDistinctVertexColors, webGL2DrawCubeWithDistinctVertexColors} from "./examples/cube-with-distinct-vertex-colors";
import { webGPUDrawCubeWithDistinctFaceColors, webGL2DrawCubeWithDistinctFaceColors } from "./examples/cube-with-distinct-face-colors";
import { webGPUDrawCubeWithTexture, webGL2DrawCubeWithTexture } from "./examples/cube-with-texture";
import { webGPUDrawInteractiveCube, webGL2DrawInteractiveCube } from "./examples/interactive-cube";
import { webGPUDrawMultipleCubes, webGL2DrawMultipleCubes } from "./examples/multiple-cubes";

const examplesObject = [
    {webgl2Function:webgl2DrawTriangle, webgpuFunction:webgpuDrawTriangle, idPrefix:"triangle"},
    {webgl2Function:webGL2DrawSquare, webgpuFunction:webGPUDrawSquare, idPrefix:"square"},
    {webgl2Function:webGL2DrawSquareWithIndexedVertices, webgpuFunction:webGPUDrawSquareWithIndexedVertices, idPrefix:"square-with-indexed-vertices"},
    {webgl2Function:webGPUDrawCubeWithDistinctVertexColors, webgpuFunction:webGPUDrawCubeWithDistinctVertexColors, idPrefix:"cube-with-distinct-vertex-colors"},
    {webgl2Function:webGL2DrawCubeWithDistinctFaceColors, webgpuFunction:webGPUDrawCubeWithDistinctFaceColors, idPrefix:"cube-with-distinct-face-colors"},
    {webgl2Function:webGL2DrawCubeWithTexture, webgpuFunction:webGPUDrawCubeWithTexture, idPrefix:"cube-with-texture"},
    {webgl2Function:webGL2DrawInteractiveCube, webgpuFunction:webGPUDrawInteractiveCube, idPrefix:"interactive-cube"},
    {webgl2Function:webGL2DrawMultipleCubes, webgpuFunction:webGPUDrawMultipleCubes, idPrefix:"multiple-cubes"},
]
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

examplesObject.forEach((example)=> {
    const buttonWebGPU:HTMLElement|null = document.getElementById("webGPUTab-"+example.idPrefix);
    buttonWebGPU?.addEventListener("click",async ()=>{
        removeOtherScene("webGL2");
        setThisScene("webGPU");
        await example.webgpuFunction();
    })
    const buttoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-"+example.idPrefix);
    buttoWebGL2?.addEventListener("click",async ()=>{
        removeOtherScene("webGPU");
        setThisScene("webGL2");
        example.webgl2Function();
    })
    if(buttoWebGL2!==null)example.webgl2Function();
})