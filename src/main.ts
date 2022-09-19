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

/***************************************************************************/
/***************      Cube with Distinct Face COlors      ****************/
/***************************************************************************/
if(squareButtoWebGL2!==null)webGL2DrawSquare();
const cube_with_distinct_face_colorsButtoWebGPU:HTMLElement|null = document.getElementById("webGPUTab-cube-with-distinct-face-colors");
cube_with_distinct_face_colorsButtoWebGPU?.addEventListener("click",async ()=>{
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webGPUDrawCubeWithDistinctFaceColors();
})
const cube_with_distinct_face_colorsButtoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-cube-with-distinct-face-colors");
cube_with_distinct_face_colorsButtoWebGL2?.addEventListener("click",async ()=>{
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webGL2DrawCubeWithDistinctFaceColors();
})
if(cube_with_distinct_face_colorsButtoWebGL2!==null)webGL2DrawCubeWithDistinctFaceColors();

/***************************************************************************/
/***************      Cube with Distinct Vertex COlors      ****************/
/***************************************************************************/
if(squareButtoWebGL2!==null)webGL2DrawSquare();
const cube_with_distinct_vertex_colorsButtoWebGPU:HTMLElement|null = document.getElementById("webGPUTab-cube-with-distinct-vertex-colors");
cube_with_distinct_vertex_colorsButtoWebGPU?.addEventListener("click",async ()=>{
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webGPUDrawCubeWithDistinctVertexColors();
})
const cube_with_distinct_vertex_colorsButtoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-cube-with-distinct-vertex-colors");
cube_with_distinct_vertex_colorsButtoWebGL2?.addEventListener("click",async ()=>{
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webGL2DrawCubeWithDistinctVertexColors();
})
if(cube_with_distinct_vertex_colorsButtoWebGL2!==null)webGL2DrawCubeWithDistinctVertexColors();


/***************************************************************************/
/***************             Cube with Texture             ****************/
/***************************************************************************/
if(squareButtoWebGL2!==null)webGL2DrawSquare();
const cube_with_textureButtoWebGPU:HTMLElement|null = document.getElementById("webGPUTab-cube-with-texture");
cube_with_textureButtoWebGPU?.addEventListener("click",async ()=>{
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webGPUDrawCubeWithTexture();
})
const cube_with_textureButtoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-cube-with-texture");
cube_with_textureButtoWebGL2?.addEventListener("click",async ()=>{
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webGL2DrawCubeWithTexture();
})
if(cube_with_textureButtoWebGL2!==null)webGL2DrawCubeWithTexture();

/***************************************************************************/
/***************                Cube Animated               ****************/
/***************************************************************************/
if(squareButtoWebGL2!==null)webGL2DrawSquare();
const interactiveCubeButtoWebGPU:HTMLElement|null = document.getElementById("webGPUTab-interactive-cube");
interactiveCubeButtoWebGPU?.addEventListener("click",async ()=>{
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webGPUDrawInteractiveCube();
})
const interactiveCubeButtoWebGL2:HTMLElement|null = document.getElementById("webGL2Tab-interactive-cube");
interactiveCubeButtoWebGL2?.addEventListener("click",async ()=>{
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webGL2DrawInteractiveCube();
})
if(interactiveCubeButtoWebGL2!==null)webGL2DrawInteractiveCube();