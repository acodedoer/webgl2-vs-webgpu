const initialiseGL = (id="canvas-webGL2") => {
        //get webgl rendering context
        const canvas:HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement;
        const gl:WebGL2RenderingContext = canvas.getContext("webgl2") as WebGL2RenderingContext;
        return [gl,canvas];
}

export default initialiseGL;