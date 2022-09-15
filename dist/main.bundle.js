(()=>{"use strict";const e=()=>{const e=document.getElementById("canvas-webGL2"),t=e.getContext("webgl2"),r=t.createShader(t.VERTEX_SHADER);t.shaderSource(r,"#version 300 es\nin vec4 a_position;\nout vec4 out_color;\n\nvoid main(){\n    gl_Position = a_position;\n    out_color = vec4(1.0, 0.0, 0.0, 1.0);\n}\n"),t.compileShader(r);let n=t.getShaderParameter(r,t.COMPILE_STATUS);n||console.log(t.getShaderInfoLog(r));const o=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(o,"#version 300 es\nprecision highp float;\nin vec4 out_color;\nout vec4 outColor;\n\nvoid main(){\n    outColor = out_color;\n}\n"),t.compileShader(o),n=t.getShaderParameter(o,t.COMPILE_STATUS),n||console.log(t.getShaderInfoLog(o));const a=t.createProgram();t.attachShader(a,r),t.attachShader(a,o),t.linkProgram(a),n=t.getProgramParameter(a,t.LINK_STATUS),n||console.log(t.getProgramInfoLog(a));const i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-.5,-.5,0,.5,.5,-.5]),t.STATIC_DRAW);const c=t.getAttribLocation(a,"a_position"),s=t.createVertexArray();t.bindVertexArray(s),t.enableVertexAttribArray(c);const u=t.FLOAT;t.vertexAttribPointer(c,2,u,!1,0,0);const l=e.clientWidth,d=e.clientHeight;(e.width!==l||e.height!==d)&&(e.width=l,e.height=d),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(a);const f=t.TRIANGLES;t.drawArrays(f,0,3)},t="struct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(0) pos: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n\r\n    var color = vec4<f32>(0.0,0.0,1.0,1.0);\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",r=(e="canvas-webGL2")=>{const t=document.getElementById(e);return[t.getContext("webgl2"),t]},n=(e,t,r)=>{const n=e.createShader(t);if(e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))return n;console.log(e.getShaderInfoLog(n)),e.deleteShader(n)},o=(e,t,r)=>{const n=e.createProgram();if(e.attachShader(n,t),e.attachShader(n,r),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;e.deleteProgram(n)},a=e=>{const t=e.clientWidth,r=e.clientHeight,n=e.width!==t||e.height!==r;return n&&(e.width=t,e.height=r),n},i=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec4 a_color; \nout vec4 out_color;\nvoid main(){\n    gl_Position = a_position;\n    out_color = a_color;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color;\nout vec4 outColor;\nvoid main(){\n    outColor = out_color;\n}\n"),u=o(t,s,c),l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-.5,-.5,1,0,0,-.5,.5,0,1,0,.5,-.5,0,1,0,-.5,.5,0,1,0,.5,-.5,0,1,0,.5,.5,1,0,0]),t.STATIC_DRAW);const d=t.getAttribLocation(u,"a_position"),f=t.getAttribLocation(u,"a_color"),v=t.createVertexArray();t.bindVertexArray(v),t.enableVertexAttribArray(d);let g=2,p=t.FLOAT,m=!1,h=20,b=0;t.vertexAttribPointer(d,g,p,m,h,b),t.enableVertexAttribArray(d),g=3,p=t.FLOAT,m=!1,h=20,b=8,t.vertexAttribPointer(f,g,p,m,h,b),t.enableVertexAttribArray(f),a(i),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(u);const A=t.TRIANGLES;t.drawArrays(A,0,6)},c="//vertex shader\r\nstruct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(1) pos: vec4<f32>, @location(2) col: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n    var color = col;\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n//fragment shader\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",s=async(e="canvas-webGPU")=>{var t;if(""!==(()=>{let e="";return navigator.gpu||(e="Your current browser does not support WebGPU"),e})()){const e=document.getElementById("webGPU");e&&(e.innerHTML="<h2>Your browser does not support WebGPU!<h2>")}const r=document.getElementById(e),n=await(null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter()),o=await(null==n?void 0:n.requestDevice()),a=r.getContext("webgpu"),i=r.clientWidth,c=r.clientHeight;(r.width!==i||r.height!==c)&&(r.width=i,r.height=c);const s=await navigator.gpu.getPreferredCanvasFormat();return a.configure({alphaMode:"premultiplied",device:o,format:s}),{device:o,canvas:r,format:s,context:a}},u=(e,t,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const n=e.createBuffer({size:t.byteLength,usage:r,mappedAtCreation:!0});return r===GPUBufferUsage.VERTEX?new Float32Array(n.getMappedRange()).set(t):new Uint32Array(n.getMappedRange()).set(t),n.unmap(),n},l="//vertex shader\r\nstruct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(1) pos: vec4<f32>, @location(2) col: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n    var color = col;\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n//fragment shader\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",d=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec4 a_color;\nout vec4 out_color;\nvoid main(){\n    gl_Position = a_position;\n    out_color = a_color;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color;\nout vec4 outColor;\nvoid main(){\n    outColor = out_color;\n}\n"),u=o(t,s,c),l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-.5,-.5,1,0,0,-.5,.5,0,0,1,.5,-.5,0,0,1,.5,.5,1,0,0]),t.STATIC_DRAW);const d=t.getAttribLocation(u,"a_position"),f=t.getAttribLocation(u,"a_color"),v=t.createVertexArray();t.bindVertexArray(v),t.enableVertexAttribArray(d);let g=2,p=t.FLOAT,m=!1,h=20,b=0;t.vertexAttribPointer(d,g,p,m,h,b),t.enableVertexAttribArray(d),g=3,p=t.FLOAT,m=!1,h=20,b=8,t.vertexAttribPointer(f,g,p,m,h,b),t.enableVertexAttribArray(f);const A=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,A),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,3,1,2]),t.STATIC_DRAW),a(i),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(u);const w=t.TRIANGLES;let y=t.UNSIGNED_SHORT;t.drawElements(w,6,y,0)},f=(e,t,r,n)=>{const o=e.createBuffer();return e.bindBuffer(r,o),e.bufferData(r,r===e.ARRAY_BUFFER?new Float32Array(t):new Uint16Array(t),n),o},v=(e,t,r,n,o,a,i,c)=>{const s=e.getAttribLocation(t,r);e.vertexAttribPointer(s,n,o,a,i,c),e.enableVertexAttribArray(s)},g=[-1,-1,1,0,0,1,1,-1,1,1,0,1,1,1,1,1,1,1,-1,1,1,0,1,1,-1,-1,-1,0,0,0,1,-1,-1,1,0,0,1,1,-1,1,1,0,-1,1,-1,0,1,0],p=[0,1,2,2,3,0,1,5,6,6,2,1,4,7,6,6,5,4,0,3,7,7,4,0,3,2,6,6,7,3,0,4,5,5,1,0];var m=1e-6,h="undefined"!=typeof Float32Array?Float32Array:Array;function b(){var e=new h(16);return h!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function A(e,t,r){var n=t[0],o=t[1],a=t[2],i=t[3],c=t[4],s=t[5],u=t[6],l=t[7],d=t[8],f=t[9],v=t[10],g=t[11],p=t[12],m=t[13],h=t[14],b=t[15],A=r[0],w=r[1],y=r[2],E=r[3];return e[0]=A*n+w*c+y*d+E*p,e[1]=A*o+w*s+y*f+E*m,e[2]=A*a+w*u+y*v+E*h,e[3]=A*i+w*l+y*g+E*b,A=r[4],w=r[5],y=r[6],E=r[7],e[4]=A*n+w*c+y*d+E*p,e[5]=A*o+w*s+y*f+E*m,e[6]=A*a+w*u+y*v+E*h,e[7]=A*i+w*l+y*g+E*b,A=r[8],w=r[9],y=r[10],E=r[11],e[8]=A*n+w*c+y*d+E*p,e[9]=A*o+w*s+y*f+E*m,e[10]=A*a+w*u+y*v+E*h,e[11]=A*i+w*l+y*g+E*b,A=r[12],w=r[13],y=r[14],E=r[15],e[12]=A*n+w*c+y*d+E*p,e[13]=A*o+w*s+y*f+E*m,e[14]=A*a+w*u+y*v+E*h,e[15]=A*i+w*l+y*g+E*b,e}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});const w=(e=1,t=[0,0,4],r=[0,0,0],n=[0,1,0])=>{const o=b(),a=b(),i=b();var c,s,u,l,d,f,v,g,p,h,w,y,E,_,P,R,T,x,L,U,S,B,C;return function(e,t,r,n,o){var a,i=1/Math.tan(t/2);e[0]=i/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=i,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=o&&o!==1/0?(a=1/(n-o),e[10]=(o+n)*a,e[14]=2*o*n*a):(e[10]=-1,e[14]=-2*n)}(a,2*Math.PI/5,e,.1,100),c=o,u=r,l=n,P=(s=t)[0],R=s[1],T=s[2],x=l[0],L=l[1],U=l[2],S=u[0],B=u[1],C=u[2],Math.abs(P-S)<m&&Math.abs(R-B)<m&&Math.abs(T-C)<m?function(e){e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(c):(w=P-S,y=R-B,E=T-C,d=L*(E*=_=1/Math.hypot(w,y,E))-U*(y*=_),f=U*(w*=_)-x*E,v=x*y-L*w,(_=Math.hypot(d,f,v))?(d*=_=1/_,f*=_,v*=_):(d=0,f=0,v=0),g=y*v-E*f,p=E*d-w*v,h=w*f-y*d,(_=Math.hypot(g,p,h))?(g*=_=1/_,p*=_,h*=_):(g=0,p=0,h=0),c[0]=d,c[1]=g,c[2]=w,c[3]=0,c[4]=f,c[5]=p,c[6]=y,c[7]=0,c[8]=v,c[9]=h,c[10]=E,c[11]=0,c[12]=-(d*P+f*R+v*T),c[13]=-(g*P+p*R+h*T),c[14]=-(w*P+y*R+E*T),c[15]=1),A(i,a,o),{viewMatrix:o,projectionMatrix:a,viewProjectionMatrix:i,cameraOption:{eye:t,center:r,zoomMax:100,zoomSpeed:2}}},y=(e,t=[0,0,0],r=[0,0,0],n=[1,1,1])=>{const o=b(),a=b(),i=b(),c=b(),s=b();var u,l;l=t,(u=c)[0]=1,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=1,u[6]=0,u[7]=0,u[8]=0,u[9]=0,u[10]=1,u[11]=0,u[12]=l[0],u[13]=l[1],u[14]=l[2],u[15]=1,function(e,t){var r=Math.sin(t),n=Math.cos(t);e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=r,e[7]=0,e[8]=0,e[9]=-r,e[10]=n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(o,r[0]),function(e,t){var r=Math.sin(t),n=Math.cos(t);e[0]=n,e[1]=0,e[2]=-r,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=r,e[9]=0,e[10]=n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(a,r[1]),function(e,t){var r=Math.sin(t),n=Math.cos(t);e[0]=n,e[1]=r,e[2]=0,e[3]=0,e[4]=-r,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(i,r[2]),function(e,t){e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(s,n),A(e,o,s),A(e,a,e),A(e,i,e),A(e,c,e)},E=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec4 a_color;\nuniform mat4 u_matrix;\nout vec4 out_color;\nvoid main(){\n    gl_Position = u_matrix * a_position;\n    out_color = a_color;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color;\nout vec4 outColor;\nvoid main(){\n    outColor = out_color;\n}\n"),u=o(t,s,c);t.useProgram(u),f(t,g,t.ARRAY_BUFFER,t.STATIC_DRAW);const l=t.createVertexArray();t.bindVertexArray(l),v(t,u,"a_position",3,t.FLOAT,!1,24,0),v(t,u,"a_color",3,t.FLOAT,!1,24,12);const d=p;f(t,d,t.ELEMENT_ARRAY_BUFFER,t.STATIC_DRAW),a(i);const m=b(),h=b();let E=b();E=w(i.width/i.height).viewProjectionMatrix,y(m,[0,0,-2],[-2.44,.46,0]),A(h,E,m);const _=t.getUniformLocation(u,"u_matrix");t.uniformMatrix4fv(_,!1,h),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.enable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);const P=t.TRIANGLES,R=d.length;let T=t.UNSIGNED_SHORT;t.drawElements(P,R,T,0)},_="// vertex shader\n\nstruct Uniforms {\n    mvpMatrix : mat4x4<f32>\n};\n@binding(0) @group(0) var<uniform> uniforms : Uniforms;\n\nstruct Output {\n    @builtin(position) Position : vec4<f32>,\n    @location(0) vColor : vec4<f32>\n};\n\n@vertex\nfn vs_main(@location(0) pos: vec4<f32>, @location(1) color: vec4<f32>) -> Output {\n    var output: Output;\n    output.Position = uniforms.mvpMatrix * pos;\n    output.vColor = color;\n    return output;\n}\n\n// fragment shader\n\n @fragment\nfn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {\n    return vColor;\n}",P=e=>{const t=document.getElementById(e);null==t||t.childNodes.forEach((e=>{"CANVAS"===e.nodeName&&e.remove()}))},R=e=>{let t=!0;const r=document.getElementById(e);if(null==r||r.childNodes.forEach((e=>{"CANVAS"===e.nodeName&&(t=!1)})),t){const t=document.createElement("canvas");t.id="canvas-"+e,r.appendChild(t)}},T=document.getElementById("webGPUTab-triangle");null==T||T.addEventListener("click",(async()=>{P("webGL2"),R("webGPU"),await(async()=>{var e;if(!navigator.gpu){const e=document.getElementById("webGPU");e&&(e.innerHTML="<h2>Your browser does not support WebGPU!<h2>")}const r=document.getElementById("canvas-webGPU"),n=await(null===(e=navigator.gpu)||void 0===e?void 0:e.requestAdapter()),o=await(null==n?void 0:n.requestDevice()),a=r.getContext("webgpu");a.configure({alphaMode:"premultiplied",device:o,format:await navigator.gpu.getPreferredCanvasFormat()});const i=r.clientWidth,c=r.clientHeight;(r.width!==i||r.height!==c)&&(r.width=i,r.height=c);const s=new Float32Array([-.5,-.5,0,.5,.5,-.5]),u=o.createBuffer({size:s.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});let l;new Float32Array(u.getMappedRange()).set(s),u.unmap(),l=o.createRenderPipeline({vertex:{module:o.createShaderModule({code:t}),entryPoint:"vs_main",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,format:"float32x2",offset:0}]}]},fragment:{module:o.createShaderModule({code:t}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:o.createPipelineLayout({bindGroupLayouts:[]})});const d=o.createCommandEncoder(),f=a.getCurrentTexture().createView(),v=d.beginRenderPass({colorAttachments:[{view:f,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});v.setPipeline(l),v.setVertexBuffer(0,u),v.draw(3,1,0,0),v.end(),o.queue.submit([d.finish()])})()}));const x=document.getElementById("webGL2Tab-triangle");null==x||x.addEventListener("click",(async()=>{P("webGPU"),R("webGL2"),e()})),null!==x&&e();const L=document.getElementById("webGPUTab-square");null==L||L.addEventListener("click",(async()=>{P("webGL2"),R("webGPU"),await(async()=>{const e=await s(),t=e.device,r=e.context,n=new Float32Array([-.5,-.5,0,0,1,-.5,.5,0,1,0,.5,-.5,0,1,0,-.5,.5,0,1,0,.5,-.5,0,1,0,.5,.5,0,0,1]),o=u(t,n,GPUBufferUsage.VERTEX);let a=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:c}),entryPoint:"vs_main",buffers:[{arrayStride:20,attributes:[{shaderLocation:1,format:"float32x2",offset:0},{shaderLocation:2,format:"float32x3",offset:8}]}]},fragment:{module:t.createShaderModule({code:c}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:t.createPipelineLayout({bindGroupLayouts:[]})});const i=t.createCommandEncoder(),l=r.getCurrentTexture().createView(),d=i.beginRenderPass({colorAttachments:[{view:l,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});d.setPipeline(a),d.setVertexBuffer(0,o),d.draw(6,1,0,0),d.end(),t.queue.submit([i.finish()])})()}));const U=document.getElementById("webGL2Tab-square");null==U||U.addEventListener("click",(async()=>{P("webGPU"),R("webGL2"),i()})),null!==U&&i();const S=document.getElementById("webGPUTab-square-with-indexed-vertices");null==S||S.addEventListener("click",(async()=>{P("webGL2"),R("webGPU"),await(async()=>{const e=await s(),t=e.device,r=e.context,n=new Float32Array([-.5,-.5,0,0,1,-.5,.5,1,0,0,.5,-.5,1,0,0,.5,.5,0,0,1]),o=u(t,n,GPUBufferUsage.VERTEX),a=new Uint32Array([0,1,2,3,2,1]),i=t.createBuffer({size:a.byteLength,usage:GPUBufferUsage.INDEX,mappedAtCreation:!0});new Uint32Array(i.getMappedRange()).set(a),i.unmap();let c=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:l}),entryPoint:"vs_main",buffers:[{arrayStride:20,attributes:[{shaderLocation:1,format:"float32x2",offset:0},{shaderLocation:2,format:"float32x3",offset:8}]}]},fragment:{module:t.createShaderModule({code:l}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:t.createPipelineLayout({bindGroupLayouts:[]})});const d=t.createCommandEncoder(),f=r.getCurrentTexture().createView(),v=d.beginRenderPass({colorAttachments:[{view:f,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});v.setPipeline(c),v.setVertexBuffer(0,o),v.setIndexBuffer(i,"uint32"),v.drawIndexed(6,1,0,0),v.end(),t.queue.submit([d.finish()])})()}));const B=document.getElementById("webGL2Tab-square-with-indexed-vertices");null==B||B.addEventListener("click",(async()=>{P("webGPU"),R("webGL2"),d()})),null!==B&&d(),null!==U&&i();const C=document.getElementById("webGPUTab-cube-with-distinct-vertex-colors");null==C||C.addEventListener("click",(async()=>{P("webGL2"),R("webGPU"),await(async()=>{const e=await s(),t=e.device,r=new Float32Array(g),n=u(t,r,GPUBufferUsage.VERTEX),o=new Uint32Array(p),a=o.length,i=u(t,o,GPUBufferUsage.INDEX),c=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});let l=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:_}),entryPoint:"vs_main",buffers:[{arrayStride:24,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x3",offset:12}]}]},fragment:{module:t.createShaderModule({code:_}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},layout:t.createPipelineLayout({bindGroupLayouts:[c]})});const d=t.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),f=t.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:d,offset:0,size:64}}]}),v=b(),m=b();let h=b();h=w(e.canvas.width/e.canvas.height).viewProjectionMatrix,y(v,[0,0,-2],[2.44,-.46,0]),A(m,h,v),t.queue.writeBuffer(d,0,m);const E=t.createCommandEncoder(),P=e.context.getCurrentTexture().createView(),R=t.createTexture({size:[e.canvas.width,e.canvas.height,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),T=E.beginRenderPass({colorAttachments:[{view:P,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:R.createView({aspect:"all"}),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",depthReadOnly:!1}});T.setPipeline(l),T.setVertexBuffer(0,n),T.setIndexBuffer(i,"uint32"),T.setBindGroup(0,f),T.drawIndexed(a),T.end(),t.queue.submit([E.finish()])})()}));const G=document.getElementById("webGL2Tab-cube-with-distinct-vertex-colors");null==G||G.addEventListener("click",(async()=>{P("webGPU"),R("webGL2"),E()})),null!==G&&E()})();
//# sourceMappingURL=main.bundle.js.map