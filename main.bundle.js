(()=>{"use strict";const e=(e,t,r)=>{const o=e.createShader(t);if(e.shaderSource(o,r),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS))return o;e.deleteShader(o)},t=()=>{const t=document.getElementById("canvas-webGL2"),r=t.getContext("webgl2"),o=e(r,r.VERTEX_SHADER,"#version 300 es\nin vec4 a_position; //data recieved from buffer\n\nvoid main(){\n    gl_Position = a_position; //assign data from buffer to special vertex shader variable for setting the positon of a vertex\n}\n"),n=((e,t,r)=>{const o=e.createProgram();if(e.attachShader(o,t),e.attachShader(o,r),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS))return o;e.deleteProgram(o)})(r,e(r,r.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nout vec4 outColor; //the output for the fragment shader\n\nvoid main(){\n    outColor = vec4(1.0, 0.0, 0.0, 1.0);\n}\n"),o),a=r.getAttribLocation(n,"a_position"),i=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-.5,-.5,0,.5,.5,-.5]),r.STATIC_DRAW);const c=r.createVertexArray();r.bindVertexArray(c),r.enableVertexAttribArray(a);const s=r.FLOAT;r.vertexAttribPointer(a,2,s,!1,0,0);const l=t.clientWidth,u=t.clientHeight;(t.width!==l||t.height!==u)&&(t.width=l,t.height=u),r.viewport(0,0,r.canvas.width,r.canvas.height),r.clearColor(1,1,1,1),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(n);const d=r.TRIANGLES;r.drawArrays(d,0,3)},r="//vertex shader\r\nstruct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(0) pos: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n\r\n    var color = vec4<f32>(0.0,0.0,1.0,1.0);\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n//fragment shader\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",o=(e,t,r)=>{const o=e.createShader(t);if(e.shaderSource(o,r),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS))return o;console.log(e.getShaderInfoLog(o)),e.deleteShader(o)},n=()=>{const e=((e="canvas-webGL2")=>{const t=document.getElementById(e);return[t.getContext("webgl2"),t]})(),t=e[0],r=e[1],n=o(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position; //position data recieved from buffer\nin vec4 a_color;  //also recieve color from buffer\nout vec4 out_color; //pass color to fragment shader\nvoid main(){\n    gl_Position = a_position; //assign data from buffer to special vertex shader variable for setting the positon of a vertex\n    out_color = a_color;\n}\n"),a=((e,t,r)=>{const o=e.createProgram();if(e.attachShader(o,t),e.attachShader(o,r),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS))return o;e.deleteProgram(o)})(t,o(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color; //the output for the fragment shader\nout vec4 outColor; //the output for the fragment shader\nvoid main(){\n    outColor = out_color;\n}\n"),n),i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-.5,-.5,1,0,0,-.5,.5,0,1,0,.5,-.5,0,1,0,-.5,.5,0,1,0,.5,-.5,0,1,0,.5,.5,1,0,0]),t.STATIC_DRAW);const c=t.getAttribLocation(a,"a_position"),s=t.getAttribLocation(a,"a_color"),l=t.createVertexArray();t.bindVertexArray(l),t.enableVertexAttribArray(c);let u=2,d=t.FLOAT,f=!1,g=20,v=0;t.vertexAttribPointer(c,u,d,f,g,v),t.enableVertexAttribArray(c),u=3,d=t.FLOAT,f=!1,g=20,v=8,t.vertexAttribPointer(s,u,d,f,g,v),t.enableVertexAttribArray(s),(e=>{const t=e.clientWidth,r=e.clientHeight,o=e.width!==t||e.height!==r;o&&(e.width=t,e.height=r)})(r),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(a);const m=t.TRIANGLES;t.drawArrays(m,0,6)},a="//vertex shader\r\nstruct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(1) pos: vec4<f32>, @location(2) col: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n    var color = col;\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n//fragment shader\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",i=async()=>{const e=await(async(e="canvas-webGPU")=>{var t;""!==(()=>{let e="";return navigator.gpu||(e="Your current browser does not support WebGPU"),e})()&&window.alert("No WebGPU Support");const r=document.getElementById(e),o=await(null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter()),n=await(null==o?void 0:o.requestDevice()),a=r.getContext("webgpu"),i=r.clientWidth,c=r.clientHeight;(r.width!==i||r.height!==c)&&(r.width=i,r.height=c);const s=await navigator.gpu.getPreferredCanvasFormat();return a.configure({alphaMode:"premultiplied",device:n,format:s}),{device:n,canvas:r,format:s,context:a}})(),t=e.device,r=e.context,o=((e,t,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=e.createBuffer({size:t.byteLength,usage:r,mappedAtCreation:!0});return new Float32Array(o.getMappedRange()).set(t),o.unmap(),o})(t,new Float32Array([-.5,-.5,0,0,1,-.5,.5,0,1,0,.5,-.5,0,1,0,-.5,.5,0,1,0,.5,-.5,0,1,0,.5,.5,0,0,1]),GPUBufferUsage.VERTEX);let n=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:a}),entryPoint:"vs_main",buffers:[{arrayStride:20,attributes:[{shaderLocation:1,format:"float32x2",offset:0},{shaderLocation:2,format:"float32x3",offset:8}]}]},fragment:{module:t.createShaderModule({code:a}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:t.createPipelineLayout({bindGroupLayouts:[]})});const i=t.createCommandEncoder(),c=r.getCurrentTexture().createView(),s=i.beginRenderPass({colorAttachments:[{view:c,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});s.setPipeline(n),s.setVertexBuffer(0,o),s.draw(6,1,0,0),s.end(),t.queue.submit([i.finish()])},c=e=>{const t=document.getElementById(e);null==t||t.childNodes.forEach((e=>{"CANVAS"===e.nodeName&&e.remove()}))},s=e=>{let t=!0;const r=document.getElementById(e);if(null==r||r.childNodes.forEach((e=>{"CANVAS"===e.nodeName&&(t=!1)})),t){const t=document.createElement("canvas");t.id="canvas-"+e,r.appendChild(t)}},l=document.getElementById("webGPUTab-triangle");null==l||l.addEventListener("click",(async()=>{c("webGL2"),s("webGPU"),await(async()=>{const e=await(async(e="canvas-webGPU")=>{var t;""!==(()=>{let e="";return navigator.gpu||(e="Your current browser does not support WebGPU"),e})()&&window.alert("No WebGPU Support");const r=document.getElementById(e),o=await(null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter()),n=await(null==o?void 0:o.requestDevice()),a=r.getContext("webgpu"),i=r.clientWidth,c=r.clientHeight;(r.width!==i||r.height!==c)&&(r.width=i,r.height=c);const s=await navigator.gpu.getPreferredCanvasFormat();return a.configure({alphaMode:"premultiplied",device:n,format:s}),{device:n,canvas:r,format:s,context:a}})(),t=e.device,o=e.context,n=new Float32Array([-.5,-.5,0,.5,.5,-.5]),a=t.createBuffer({size:n.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});let i;new Float32Array(a.getMappedRange()).set(n),a.unmap(),i=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:r}),entryPoint:"vs_main",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,format:"float32x2",offset:0}]}]},fragment:{module:t.createShaderModule({code:r}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:t.createPipelineLayout({bindGroupLayouts:[]})});const c=t.createCommandEncoder(),s=o.getCurrentTexture().createView(),l=c.beginRenderPass({colorAttachments:[{view:s,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});l.setPipeline(i),l.setVertexBuffer(0,a),l.draw(3,1,0,0),l.end(),t.queue.submit([c.finish()])})()}));const u=document.getElementById("webGL2Tab-triangle");null==u||u.addEventListener("click",(async()=>{c("webGPU"),s("webGL2"),t()})),null!==u&&t();const d=document.getElementById("webGPUTab-square");null==d||d.addEventListener("click",(async()=>{c("webGL2"),s("webGPU"),await i()}));const f=document.getElementById("webGL2Tab-square");null==f||f.addEventListener("click",(async()=>{c("webGPU"),s("webGL2"),n()})),null!==f&&n()})();
//# sourceMappingURL=main.bundle.js.map