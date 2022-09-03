import { webgl2DrawTriangle } from "./triangle/webgl2";
import { webgpuDrawTriangle } from "./triangle/webgpu";
const removeOtherScene = (sceneType) => {
    const sceneParent = document.getElementById(sceneType);
    sceneParent === null || sceneParent === void 0 ? void 0 : sceneParent.childNodes.forEach((node) => {
        if (node.nodeName === "CANVAS") {
            node.remove();
        }
    });
};
const setThisScene = (sceneType) => {
    let needsSetup = true;
    const sceneParent = document.getElementById(sceneType);
    sceneParent === null || sceneParent === void 0 ? void 0 : sceneParent.childNodes.forEach((node) => {
        if (node.nodeName === "CANVAS") {
            needsSetup = false;
        }
    });
    if (needsSetup) {
        const canvas = document.createElement("canvas");
        canvas.id = "canvas-" + sceneType;
        sceneParent.appendChild(canvas);
    }
};
const triangleButtoWebGPU = document.getElementById("webGPUTab-triangle");
triangleButtoWebGPU === null || triangleButtoWebGPU === void 0 ? void 0 : triangleButtoWebGPU.addEventListener("click", async () => {
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webgpuDrawTriangle();
});
const triangleButtoWebGL2 = document.getElementById("webGL2Tab-triangle");
triangleButtoWebGL2 === null || triangleButtoWebGL2 === void 0 ? void 0 : triangleButtoWebGL2.addEventListener("click", async () => {
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webgl2DrawTriangle();
});
if (triangleButtoWebGL2 !== null)
    webgl2DrawTriangle();
const squareButtoWebGPU = document.getElementById("webGPUTab-square");
squareButtoWebGPU === null || squareButtoWebGPU === void 0 ? void 0 : squareButtoWebGPU.addEventListener("click", async () => {
    removeOtherScene("webGL2");
    setThisScene("webGPU");
    await webgpuDrawTriangle();
});
const squareButtoWebGL2 = document.getElementById("webGL2Tab-square");
squareButtoWebGL2 === null || squareButtoWebGL2 === void 0 ? void 0 : squareButtoWebGL2.addEventListener("click", async () => {
    removeOtherScene("webGPU");
    setThisScene("webGL2");
    webgl2DrawTriangle();
});
if (squareButtoWebGL2 !== null)
    webgl2DrawTriangle();
//# sourceMappingURL=main.js.map