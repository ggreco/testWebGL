let gl = null;
let vertexArray = [0.0,0.5,-0.5,-0.5,0.5,-0.5];
let inputCanvas = null, outputCanvas = null;
let animationId;

function startup() {
  outputCanvas = document.getElementById("canvas2d");
  inputCanvas = document.getElementById("glCanvas");
  inputCanvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    console.warn("WebGL context lost!");
    window.cancelAnimationFrame(animationId);
  });
  inputCanvas.addEventListener("webglcontextrestored", (event) => {
    console.warn("WebGL context recovered!");
    main();
  });
  
  main();
}

function main() {
  console.log("Initializing stuff!");
  const ctx = outputCanvas.getContext("2d");
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
  gl = inputCanvas.getContext("webgl", {preserveDrawingBuffer: true} );
  const fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fshader, 'void main(void) {gl_FragColor = vec4(1.0, 0, 0, 1.0);}');
  const vshader = gl.createShader(gl.VERTEX_SHADER); 
  gl.shaderSource(vshader, 'attribute vec2 ppos; void main(void) { gl_Position = vec4(ppos.x, ppos.y, 0.0, 1.0);}');
  gl.compileShader(vshader);
  gl.compileShader(fshader);
  const program = gl.createProgram();
  gl.attachShader(program, fshader);
  gl.attachShader(program, vshader);
  gl.linkProgram(program);
  gl.useProgram(program);
  const vattrib = gl.getAttribLocation(program, 'ppos');
  gl.enableVertexAttribArray(vattrib);
  const vbuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
  const vertices = new Float32Array(vertexArray);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.vertexAttribPointer(vattrib, 2, gl.FLOAT, false, 0, 0);
  animationId = window.requestAnimationFrame(draw);
}

window.onload = startup;

function copyMe() {
  const ctx = outputCanvas.getContext('2d');
  ctx.drawImage(inputCanvas, 0, 0, inputCanvas.width, inputCanvas.height, 0, 0, outputCanvas.width, outputCanvas.height);
  console.log("Copied!");
}

let x = 0;
function draw() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  x += 0.01;
  if (x > 1.5) x = -1.5;
  let vertices = new Float32Array(vertexArray);
  vertices[0] += x;
  vertices[2] += x;
  vertices[4] += x;
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.flush();
  animationId = window.requestAnimationFrame(draw);
}