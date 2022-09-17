(()=>{"use strict";const e=()=>{const e=document.getElementById("canvas-webGL2"),t=e.getContext("webgl2"),r=t.createShader(t.VERTEX_SHADER);t.shaderSource(r,"#version 300 es\nin vec4 a_position;\nout vec4 out_color;\n\nvoid main(){\n    gl_Position = a_position;\n    out_color = vec4(1.0, 0.0, 0.0, 1.0);\n}\n"),t.compileShader(r);let n=t.getShaderParameter(r,t.COMPILE_STATUS);n||console.log(t.getShaderInfoLog(r));const o=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(o,"#version 300 es\nprecision highp float;\nin vec4 out_color;\nout vec4 outColor;\n\nvoid main(){\n    outColor = out_color;\n}\n"),t.compileShader(o),n=t.getShaderParameter(o,t.COMPILE_STATUS),n||console.log(t.getShaderInfoLog(o));const a=t.createProgram();t.attachShader(a,r),t.attachShader(a,o),t.linkProgram(a),n=t.getProgramParameter(a,t.LINK_STATUS),n||console.log(t.getProgramInfoLog(a));const i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-.5,-.5,0,.5,.5,-.5]),t.STATIC_DRAW);const c=t.getAttribLocation(a,"a_position"),s=t.createVertexArray();t.bindVertexArray(s),t.enableVertexAttribArray(c);const u=t.FLOAT;t.vertexAttribPointer(c,2,u,!1,0,0);const l=e.clientWidth,d=e.clientHeight;(e.width!==l||e.height!==d)&&(e.width=l,e.height=d),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(a);const f=t.TRIANGLES;t.drawArrays(f,0,3)},t="struct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(0) pos: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n\r\n    var color = vec4<f32>(0.0,0.0,1.0,1.0);\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",r=(e="canvas-webGL2")=>{const t=document.getElementById(e);return[t.getContext("webgl2"),t]},n=(e,t,r)=>{const n=e.createShader(t);if(e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))return n;console.log(e.getShaderInfoLog(n)),e.deleteShader(n)},o=(e,t,r)=>{const n=e.createProgram();if(e.attachShader(n,t),e.attachShader(n,r),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;e.deleteProgram(n)},a=e=>{const t=e.clientWidth,r=e.clientHeight,n=e.width!==t||e.height!==r;return n&&(e.width=t,e.height=r),n},i=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec4 a_color; \nout vec4 out_color;\nvoid main(){\n    gl_Position = a_position;\n    out_color = a_color;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color;\nout vec4 outColor;\nvoid main(){\n    outColor = out_color;\n}\n"),u=o(t,s,c),l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-.5,-.5,1,0,0,-.5,.5,0,1,0,.5,-.5,0,1,0,-.5,.5,0,1,0,.5,-.5,0,1,0,.5,.5,1,0,0]),t.STATIC_DRAW);const d=t.getAttribLocation(u,"a_position"),f=t.getAttribLocation(u,"a_color"),v=t.createVertexArray();t.bindVertexArray(v),t.enableVertexAttribArray(d);let p=2,m=t.FLOAT,g=!1,h=20,b=0;t.vertexAttribPointer(d,p,m,g,h,b),t.enableVertexAttribArray(d),p=3,m=t.FLOAT,g=!1,h=20,b=8,t.vertexAttribPointer(f,p,m,g,h,b),t.enableVertexAttribArray(f),a(i),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(u);const A=t.TRIANGLES;t.drawArrays(A,0,6)},c="//vertex shader\r\nstruct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(1) pos: vec4<f32>, @location(2) col: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n    var color = col;\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n//fragment shader\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",s=async(e="canvas-webGPU")=>{var t;if(""!==(()=>{let e="";return navigator.gpu||(e="Your current browser does not support WebGPU"),e})()){const e=document.getElementById("webGPU");e&&(e.innerHTML="<h2>Your browser does not support WebGPU!<h2>")}const r=document.getElementById(e),n=await(null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter()),o=await(null==n?void 0:n.requestDevice()),a=r.getContext("webgpu"),i=r.clientWidth,c=r.clientHeight;(r.width!==i||r.height!==c)&&(r.width=i,r.height=c);const s=await navigator.gpu.getPreferredCanvasFormat();return a.configure({alphaMode:"premultiplied",device:o,format:s}),{device:o,canvas:r,format:s,context:a}},u=(e,t,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const n=e.createBuffer({size:t.byteLength,usage:r,mappedAtCreation:!0});return r===GPUBufferUsage.VERTEX?new Float32Array(n.getMappedRange()).set(t):new Uint32Array(n.getMappedRange()).set(t),n.unmap(),n},l="//vertex shader\r\nstruct Ouput{\r\n    @builtin(position) Position: vec4<f32>,\r\n    @location(0) vColor : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(1) pos: vec4<f32>, @location(2) col: vec4<f32>) -> Ouput{\r\n    var position = pos;\r\n    var color = col;\r\n\r\n    var output: Ouput;\r\n    output.Position = position;\r\n    output.vColor = color;\r\n    return output;\r\n}\r\n\r\n//fragment shader\r\n@fragment\r\nfn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32>{\r\n    return vColor;\r\n}",d=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec4 a_color;\nout vec4 out_color;\nvoid main(){\n    gl_Position = a_position;\n    out_color = a_color;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color;\nout vec4 outColor;\nvoid main(){\n    outColor = out_color;\n}\n"),u=o(t,s,c),l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-.5,-.5,1,0,0,-.5,.5,0,0,1,.5,-.5,0,0,1,.5,.5,1,0,0]),t.STATIC_DRAW);const d=t.getAttribLocation(u,"a_position"),f=t.getAttribLocation(u,"a_color"),v=t.createVertexArray();t.bindVertexArray(v),t.enableVertexAttribArray(d);let p=2,m=t.FLOAT,g=!1,h=20,b=0;t.vertexAttribPointer(d,p,m,g,h,b),t.enableVertexAttribArray(d),p=3,m=t.FLOAT,g=!1,h=20,b=8,t.vertexAttribPointer(f,p,m,g,h,b),t.enableVertexAttribArray(f);const A=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,A),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,3,1,2]),t.STATIC_DRAW),a(i),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(u);const _=t.TRIANGLES;let E=t.UNSIGNED_SHORT;t.drawElements(_,6,E,0)},f="// vertex shader\n\nstruct Uniforms {\n    mvpMatrix : mat4x4<f32>\n};\n@binding(0) @group(0) var<uniform> uniforms : Uniforms;\n\nstruct Output {\n    @builtin(position) Position : vec4<f32>,\n    @location(0) vColor : vec4<f32>\n};\n\n@vertex\nfn vs_main(@location(0) pos: vec4<f32>, @location(1) color: vec4<f32>) -> Output {\n    var output: Output;\n    output.Position = uniforms.mvpMatrix * pos;\n    output.vColor = color;\n    return output;\n}\n\n// fragment shader\n\n @fragment\nfn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {\n    return vColor;\n}",v=[-1,-1,1,0,0,1,1,-1,1,1,0,1,1,1,1,1,1,1,-1,1,1,0,1,1,-1,-1,-1,0,0,0,1,-1,-1,1,0,0,1,1,-1,1,1,0,-1,1,-1,0,1,0],p=[0,1,2,2,3,0,1,5,6,6,2,1,4,7,6,6,5,4,0,3,7,7,4,0,3,2,6,6,7,3,0,4,5,5,1,0],m=[-1,-1,1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1],g=[0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1],h=[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1];var b=1e-6,A="undefined"!=typeof Float32Array?Float32Array:Array;function _(){var e=new A(16);return A!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function E(e,t,r){var n=t[0],o=t[1],a=t[2],i=t[3],c=t[4],s=t[5],u=t[6],l=t[7],d=t[8],f=t[9],v=t[10],p=t[11],m=t[12],g=t[13],h=t[14],b=t[15],A=r[0],_=r[1],E=r[2],w=r[3];return e[0]=A*n+_*c+E*d+w*m,e[1]=A*o+_*s+E*f+w*g,e[2]=A*a+_*u+E*v+w*h,e[3]=A*i+_*l+E*p+w*b,A=r[4],_=r[5],E=r[6],w=r[7],e[4]=A*n+_*c+E*d+w*m,e[5]=A*o+_*s+E*f+w*g,e[6]=A*a+_*u+E*v+w*h,e[7]=A*i+_*l+E*p+w*b,A=r[8],_=r[9],E=r[10],w=r[11],e[8]=A*n+_*c+E*d+w*m,e[9]=A*o+_*s+E*f+w*g,e[10]=A*a+_*u+E*v+w*h,e[11]=A*i+_*l+E*p+w*b,A=r[12],_=r[13],E=r[14],w=r[15],e[12]=A*n+_*c+E*d+w*m,e[13]=A*o+_*s+E*f+w*g,e[14]=A*a+_*u+E*v+w*h,e[15]=A*i+_*l+E*p+w*b,e}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});const w=(e=1,t=[0,0,4],r=[0,0,0],n=[0,1,0])=>{const o=_(),a=_(),i=_();var c,s,u,l,d,f,v,p,m,g,h,A,w,T,x,y,P,R,U,B,L,S,G;return function(e,t,r,n,o){var a,i=1/Math.tan(t/2);e[0]=i/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=i,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=o&&o!==1/0?(a=1/(n-o),e[10]=(o+n)*a,e[14]=2*o*n*a):(e[10]=-1,e[14]=-2*n)}(a,2*Math.PI/5,e,.1,100),c=o,u=r,l=n,x=(s=t)[0],y=s[1],P=s[2],R=l[0],U=l[1],B=l[2],L=u[0],S=u[1],G=u[2],Math.abs(x-L)<b&&Math.abs(y-S)<b&&Math.abs(P-G)<b?function(e){e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(c):(h=x-L,A=y-S,w=P-G,d=U*(w*=T=1/Math.hypot(h,A,w))-B*(A*=T),f=B*(h*=T)-R*w,v=R*A-U*h,(T=Math.hypot(d,f,v))?(d*=T=1/T,f*=T,v*=T):(d=0,f=0,v=0),p=A*v-w*f,m=w*d-h*v,g=h*f-A*d,(T=Math.hypot(p,m,g))?(p*=T=1/T,m*=T,g*=T):(p=0,m=0,g=0),c[0]=d,c[1]=p,c[2]=h,c[3]=0,c[4]=f,c[5]=m,c[6]=A,c[7]=0,c[8]=v,c[9]=g,c[10]=w,c[11]=0,c[12]=-(d*x+f*y+v*P),c[13]=-(p*x+m*y+g*P),c[14]=-(h*x+A*y+w*P),c[15]=1),E(i,a,o),{viewMatrix:o,projectionMatrix:a,viewProjectionMatrix:i,cameraOption:{eye:t,center:r,zoomMax:100,zoomSpeed:2}}},T=(e,t=[0,0,0],r=[0,0,0],n=[1,1,1])=>{const o=_(),a=_(),i=_(),c=_(),s=_();var u,l;l=t,(u=c)[0]=1,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=1,u[6]=0,u[7]=0,u[8]=0,u[9]=0,u[10]=1,u[11]=0,u[12]=l[0],u[13]=l[1],u[14]=l[2],u[15]=1,function(e,t){var r=Math.sin(t),n=Math.cos(t);e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=r,e[7]=0,e[8]=0,e[9]=-r,e[10]=n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(o,r[0]),function(e,t){var r=Math.sin(t),n=Math.cos(t);e[0]=n,e[1]=0,e[2]=-r,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=r,e[9]=0,e[10]=n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(a,r[1]),function(e,t){var r=Math.sin(t),n=Math.cos(t);e[0]=n,e[1]=r,e[2]=0,e[3]=0,e[4]=-r,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(i,r[2]),function(e,t){e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(s,n),E(e,o,s),E(e,a,e),E(e,i,e),E(e,c,e)},x=(e,t,r,n)=>{const o=e.createBuffer();return e.bindBuffer(r,o),e.bufferData(r,r===e.ARRAY_BUFFER?new Float32Array(t):new Uint16Array(t),n),o},y=(e,t,r,n,o,a,i,c)=>{const s=e.getAttribLocation(t,r);e.vertexAttribPointer(s,n,o,a,i,c),e.enableVertexAttribArray(s)},P=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec4 a_color;\nuniform mat4 u_matrix;\nout vec4 out_color;\nvoid main(){\n    gl_Position = u_matrix * a_position;\n    out_color = a_color;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color;\nout vec4 outColor;\nvoid main(){\n    outColor = out_color;\n}\n"),u=o(t,s,c);t.useProgram(u),x(t,v,t.ARRAY_BUFFER,t.STATIC_DRAW);const l=t.createVertexArray();t.bindVertexArray(l),y(t,u,"a_position",3,t.FLOAT,!1,24,0),y(t,u,"a_color",3,t.FLOAT,!1,24,12);const d=p;x(t,d,t.ELEMENT_ARRAY_BUFFER,t.STATIC_DRAW),a(i);const f=_(),m=_();let g=_();g=w(i.width/i.height).viewProjectionMatrix,T(f,[0,0,-2],[-2.44,.46,0]),E(m,g,f);const h=t.getUniformLocation(u,"u_matrix");t.uniformMatrix4fv(h,!1,m),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.enable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);const b=t.TRIANGLES,A=d.length;let P=t.UNSIGNED_SHORT;t.drawElements(b,A,P,0)},R="// vertex shader\n\nstruct Uniforms {\n    mvpMatrix : mat4x4<f32>\n};\n@binding(0) @group(0) var<uniform> uniforms : Uniforms;\n\nstruct Output {\n    @builtin(position) Position : vec4<f32>,\n    @location(0) vColor : vec4<f32>\n};\n\n@vertex\nfn vs_main(@location(0) pos: vec4<f32>, @location(1) color: vec4<f32>) -> Output {\n    var output: Output;\n    output.Position = uniforms.mvpMatrix * pos;\n    output.vColor = color;\n    return output;\n}\n\n// fragment shader\n\n @fragment\nfn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {\n    return vColor;\n}",U=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec4 a_color;\nuniform mat4 u_matrix;\nout vec4 out_color;\nvoid main(){\n    gl_Position = u_matrix * a_position;\n    out_color = a_color;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec4 out_color;\nout vec4 outColor;\nvoid main(){\n    outColor = out_color;\n}\n"),u=o(t,s,c);t.useProgram(u);const l=t.createVertexArray();t.bindVertexArray(l);const d=m;x(t,d,t.ARRAY_BUFFER,t.STATIC_DRAW),y(t,u,"a_position",3,t.FLOAT,!1,12,0),x(t,h,t.ARRAY_BUFFER,t.STATIC_DRAW),y(t,u,"a_color",3,t.FLOAT,!1,12,0),a(i);const f=_(),v=_();let p=_();p=w(i.width/i.height).viewProjectionMatrix,T(f,[0,0,-2],[-2.44,.46,0]),E(v,p,f);const g=t.getUniformLocation(u,"u_matrix");t.uniformMatrix4fv(g,!1,v),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(1,1,1,1),t.enable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);const b=t.TRIANGLES;t.drawArrays(b,0,d.length)},B="// vertex shader\n\nstruct Uniforms {\n    mvpMatrix : mat4x4<f32>\n};\n@binding(0) @group(0) var<uniform> uniforms : Uniforms;\n\nstruct Output {\n    @builtin(position) Position : vec4<f32>,\n    @location(0) vTextureCoord : vec2<f32>\n};\n\n@vertex\nfn vs_main(@location(0) pos: vec4<f32>, @location(1) textureCoord: vec2<f32>) -> Output {\n    var output: Output;\n    output.Position = uniforms.mvpMatrix * pos;\n    output.vTextureCoord = textureCoord;\n    return output;\n}\n\n// fragment shader\n@binding(1) @group(0) var textureSampler : sampler;\n@binding(2) @group(0) var textureData : texture_2d<f32>;\n @fragment\nfn fs_main(@location(0) vTextureCoord: vec2<f32>) -> @location(0) vec4<f32> {\n    let color: vec4<f32> = (textureSample(textureData, textureSampler, vTextureCoord)).rgba;\n    return color;\n}",L=()=>{const e=r(),t=e[0],i=e[1],c=n(t,t.VERTEX_SHADER,"#version 300 es\nin vec4 a_position;\nin vec2 a_texcoord;\nuniform mat4 u_matrix;\n\nout vec2 v_texcoord;\nvoid main(){\n    gl_Position = u_matrix * a_position;\n    v_texcoord = a_texcoord;\n}\n"),s=n(t,t.FRAGMENT_SHADER,"#version 300 es\nprecision highp float;\n\nin vec2 v_texcoord;\nout vec4 outColor;\n\nuniform sampler2D u_texture;\nvoid main(){\n    outColor = texture(u_texture, v_texcoord);\n}\n"),u=o(t,s,c);t.useProgram(u);const l=t.createVertexArray();t.bindVertexArray(l);const d=m;x(t,d,t.ARRAY_BUFFER,t.STATIC_DRAW),y(t,u,"a_position",3,t.FLOAT,!1,12,0),x(t,g,t.ARRAY_BUFFER,t.STATIC_DRAW),y(t,u,"a_texcoord",2,t.FLOAT,!0,0,0),a(i);const f=t.createTexture();t.activeTexture(t.TEXTURE0+0),t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,255,0,255]));var v=new Image;v.crossOrigin="anonymous",v.src="./assets/webgl_single_texture.png",v.addEventListener("load",(function(){t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,v),t.generateMipmap(t.TEXTURE_2D)}));const p=_(),h=_();let b=_();b=w(i.width/i.height).viewProjectionMatrix,T(p,[0,0,-2],[-2.44,.46,0]),E(h,b,p);const A=t.getUniformLocation(u,"u_matrix");t.uniformMatrix4fv(A,!1,h);const P=()=>{t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.enable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.CULL_FACE);const e=t.TRIANGLES;t.drawArrays(e,0,d.length),requestAnimationFrame(P)};requestAnimationFrame(P)},S=e=>{const t=document.getElementById(e);null==t||t.childNodes.forEach((e=>{"CANVAS"===e.nodeName&&e.remove()}))},G=e=>{let t=!0;const r=document.getElementById(e);if(null==r||r.childNodes.forEach((e=>{"CANVAS"===e.nodeName&&(t=!1)})),t){const t=document.createElement("canvas");t.id="canvas-"+e,r.appendChild(t)}},C=document.getElementById("webGPUTab-triangle");null==C||C.addEventListener("click",(async()=>{S("webGL2"),G("webGPU"),await(async()=>{var e;if(!navigator.gpu){const e=document.getElementById("webGPU");e&&(e.innerHTML="<h2>Your browser does not support WebGPU!<h2>")}const r=document.getElementById("canvas-webGPU"),n=await(null===(e=navigator.gpu)||void 0===e?void 0:e.requestAdapter()),o=await(null==n?void 0:n.requestDevice()),a=r.getContext("webgpu");a.configure({alphaMode:"premultiplied",device:o,format:await navigator.gpu.getPreferredCanvasFormat()});const i=r.clientWidth,c=r.clientHeight;(r.width!==i||r.height!==c)&&(r.width=i,r.height=c);const s=new Float32Array([-.5,-.5,0,.5,.5,-.5]),u=o.createBuffer({size:s.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});let l;new Float32Array(u.getMappedRange()).set(s),u.unmap(),l=o.createRenderPipeline({vertex:{module:o.createShaderModule({code:t}),entryPoint:"vs_main",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,format:"float32x2",offset:0}]}]},fragment:{module:o.createShaderModule({code:t}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:o.createPipelineLayout({bindGroupLayouts:[]})});const d=o.createCommandEncoder(),f=a.getCurrentTexture().createView(),v=d.beginRenderPass({colorAttachments:[{view:f,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});v.setPipeline(l),v.setVertexBuffer(0,u),v.draw(3,1,0,0),v.end(),o.queue.submit([d.finish()])})()}));const F=document.getElementById("webGL2Tab-triangle");null==F||F.addEventListener("click",(async()=>{S("webGPU"),G("webGL2"),e()})),null!==F&&e();const M=document.getElementById("webGPUTab-square");null==M||M.addEventListener("click",(async()=>{S("webGL2"),G("webGPU"),await(async()=>{const e=await s(),t=e.device,r=e.context,n=new Float32Array([-.5,-.5,0,0,1,-.5,.5,0,1,0,.5,-.5,0,1,0,-.5,.5,0,1,0,.5,-.5,0,1,0,.5,.5,0,0,1]),o=u(t,n,GPUBufferUsage.VERTEX);let a=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:c}),entryPoint:"vs_main",buffers:[{arrayStride:20,attributes:[{shaderLocation:1,format:"float32x2",offset:0},{shaderLocation:2,format:"float32x3",offset:8}]}]},fragment:{module:t.createShaderModule({code:c}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:t.createPipelineLayout({bindGroupLayouts:[]})});const i=t.createCommandEncoder(),l=r.getCurrentTexture().createView(),d=i.beginRenderPass({colorAttachments:[{view:l,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});d.setPipeline(a),d.setVertexBuffer(0,o),d.draw(6,1,0,0),d.end(),t.queue.submit([i.finish()])})()}));const I=document.getElementById("webGL2Tab-square");null==I||I.addEventListener("click",(async()=>{S("webGPU"),G("webGL2"),i()})),null!==I&&i();const O=document.getElementById("webGPUTab-square-with-indexed-vertices");null==O||O.addEventListener("click",(async()=>{S("webGL2"),G("webGPU"),await(async()=>{const e=await s(),t=e.device,r=e.context,n=new Float32Array([-.5,-.5,0,0,1,-.5,.5,1,0,0,.5,-.5,1,0,0,.5,.5,0,0,1]),o=u(t,n,GPUBufferUsage.VERTEX),a=new Uint32Array([0,1,2,3,2,1]),i=t.createBuffer({size:a.byteLength,usage:GPUBufferUsage.INDEX,mappedAtCreation:!0});new Uint32Array(i.getMappedRange()).set(a),i.unmap();let c=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:l}),entryPoint:"vs_main",buffers:[{arrayStride:20,attributes:[{shaderLocation:1,format:"float32x2",offset:0},{shaderLocation:2,format:"float32x3",offset:8}]}]},fragment:{module:t.createShaderModule({code:l}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},layout:t.createPipelineLayout({bindGroupLayouts:[]})});const d=t.createCommandEncoder(),f=r.getCurrentTexture().createView(),v=d.beginRenderPass({colorAttachments:[{view:f,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});v.setPipeline(c),v.setVertexBuffer(0,o),v.setIndexBuffer(i,"uint32"),v.drawIndexed(6,1,0,0),v.end(),t.queue.submit([d.finish()])})()}));const V=document.getElementById("webGL2Tab-square-with-indexed-vertices");null==V||V.addEventListener("click",(async()=>{S("webGPU"),G("webGL2"),d()})),null!==V&&d(),null!==I&&i();const D=document.getElementById("webGPUTab-cube-with-distinct-face-colors");null==D||D.addEventListener("click",(async()=>{S("webGL2"),G("webGPU"),await(async()=>{const e=await s(),t=e.device,r=new Float32Array(m),n=new Float32Array(h),o=u(t,r,GPUBufferUsage.VERTEX),a=u(t,n,GPUBufferUsage.VERTEX),i=r.length,c=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});let l=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:R}),entryPoint:"vs_main",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:12,attributes:[{shaderLocation:1,format:"float32x3",offset:0}]}]},fragment:{module:t.createShaderModule({code:R}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},layout:t.createPipelineLayout({bindGroupLayouts:[c]})});const d=t.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),f=t.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:d,offset:0,size:64}}]}),v=_(),p=_();let g=_();g=w(e.canvas.width/e.canvas.height).viewProjectionMatrix,T(v,[0,0,-2],[2.44,-.46,0]),E(p,g,v),t.queue.writeBuffer(d,0,p);const b=t.createCommandEncoder(),A=e.context.getCurrentTexture().createView(),x=t.createTexture({size:[e.canvas.width,e.canvas.height,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),y=b.beginRenderPass({colorAttachments:[{view:A,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:x.createView({aspect:"all"}),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",depthReadOnly:!1}});y.setPipeline(l),y.setVertexBuffer(0,o),y.setVertexBuffer(1,a),y.setBindGroup(0,f),y.draw(i/3),y.end(),t.queue.submit([b.finish()])})()}));const N=document.getElementById("webGL2Tab-cube-with-distinct-face-colors");null==N||N.addEventListener("click",(async()=>{S("webGPU"),G("webGL2"),U()})),null!==N&&U(),null!==I&&i();const H=document.getElementById("webGPUTab-cube-with-distinct-vertex-colors");null==H||H.addEventListener("click",(async()=>{S("webGL2"),G("webGPU"),await(async()=>{const e=await s(),t=e.device,r=new Float32Array(v),n=u(t,r,GPUBufferUsage.VERTEX),o=new Uint32Array(p),a=o.length,i=u(t,o,GPUBufferUsage.INDEX),c=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});let l=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:f}),entryPoint:"vs_main",buffers:[{arrayStride:24,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x3",offset:12}]}]},fragment:{module:t.createShaderModule({code:f}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},layout:t.createPipelineLayout({bindGroupLayouts:[c]})});const d=t.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),m=t.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:d,offset:0,size:64}}]}),g=_(),h=_();let b=_();b=w(e.canvas.width/e.canvas.height).viewProjectionMatrix,T(g,[0,0,-2],[2.44,-.46,0]),E(h,b,g),t.queue.writeBuffer(d,0,h);const A=t.createCommandEncoder(),x=e.context.getCurrentTexture().createView(),y=t.createTexture({size:[e.canvas.width,e.canvas.height,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),P=A.beginRenderPass({colorAttachments:[{view:x,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:y.createView({aspect:"all"}),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",depthReadOnly:!1}});P.setPipeline(l),P.setVertexBuffer(0,n),P.setIndexBuffer(i,"uint32"),P.setBindGroup(0,m),P.drawIndexed(a),P.end(),t.queue.submit([A.finish()])})()}));const X=document.getElementById("webGL2Tab-cube-with-distinct-vertex-colors");null==X||X.addEventListener("click",(async()=>{S("webGPU"),G("webGL2"),P()})),null!==X&&P(),null!==I&&i();const Y=document.getElementById("webGPUTab-cube-with-texture");null==Y||Y.addEventListener("click",(async()=>{S("webGL2"),G("webGPU"),await(async()=>{const e=await s(),t=e.device,r=new Float32Array(m),n=new Float32Array(g),o=u(t,r,GPUBufferUsage.VERTEX),a=u(t,n,GPUBufferUsage.VERTEX),i=r.length,c=new Image;c.src="./assets/webgpu_single_texture.png",await c.decode();const l=await createImageBitmap(c),d=t.createTexture({size:[l.width,l.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),f=t.createSampler({minFilter:"linear",magFilter:"linear",addressModeU:"repeat",addressModeV:"repeat"});t.queue.copyExternalImageToTexture({source:l},{texture:d},[l.width,l.height]);let v=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:B}),entryPoint:"vs_main",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:8,attributes:[{shaderLocation:1,format:"float32x2",offset:0}]}]},fragment:{module:t.createShaderModule({code:B}),entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},layout:"auto"});const p=t.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),h=t.createBindGroup({layout:v.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:p,offset:0,size:64}},{binding:1,resource:f},{binding:2,resource:d.createView()}]}),b=_(),A=_();let x=_();x=w(e.canvas.width/e.canvas.height).viewProjectionMatrix,T(b,[0,0,-2],[2.44,-.46,0]),E(A,x,b),t.queue.writeBuffer(p,0,A);const y=t.createCommandEncoder(),P=e.context.getCurrentTexture().createView(),R=t.createTexture({size:[e.canvas.width,e.canvas.height,1],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),U=y.beginRenderPass({colorAttachments:[{view:P,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:R.createView({aspect:"all"}),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",depthReadOnly:!1}});U.setPipeline(v),U.setVertexBuffer(0,o),U.setVertexBuffer(1,a),U.setBindGroup(0,h),U.draw(i/3),U.end(),t.queue.submit([y.finish()])})()}));const q=document.getElementById("webGL2Tab-cube-with-texture");null==q||q.addEventListener("click",(async()=>{S("webGPU"),G("webGL2"),L()})),null!==q&&L()})();
//# sourceMappingURL=main.bundle.js.map