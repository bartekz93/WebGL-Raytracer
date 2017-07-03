import Camera from 'Scene/Camera'
import Color from 'Common/Color';
import Vec3 from 'Common/Vec3'
import {Object, Sphere, Plane, Material} from 'Scene/Object';

let canvas = document.querySelector('#myCanvas') as HTMLCanvasElement;
let gl = canvas.getContext("webgl");

//let w = Math.min(window.innerWidth, window.innerHeight);
//let h = w;

let w = window.innerWidth;
let h = window.innerHeight;

//console.log(w);
w = 600;
h = 600;

canvas.width = w;
canvas.height = h;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
        return shader;
    }
     
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

let t1 = new Date().getMilliseconds();

let vertexShaderSource = document.querySelector("#vs").textContent;
let fragmentShaderSource = document.querySelector("#ps").textContent;
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

let program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, "a_position");



let positions = [
  -1,  1, //let-top
   1,  1, //right-top
   1, -1, //right-bottom
  -1, -1  //left-bottom
];

let indices = [ 0, 1, 3, 1, 2, 3 ];
let texCoords = [ 
    0, 0,
    1, 0,
    1, 1,
    0, 1,
]


let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

let indicesBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);

let camera = new Camera(new Vec3(0, 0, -49), new Vec3(0, 0, 0), Math.PI/3, Math.PI/3*(canvas.height/canvas.width));
let objects = new Array<Object>();


let mRed = new Material(Color.red, 0, 0.2);
let mBlue = new Material(Color.blue, 0, 0.5);
let mGreen = new Material(Color.green, 0, 0);
let mWhite = new Material(Color.white);
let mMirror = new Material(Color.blue, 0, 0.4);
let mYellow = new Material(Color.yellow, 0);
let mRedSolid = new Material(Color.red, 0);

let s1 = new Sphere(new Vec3(-10, 0.0, 0.0), 5);
let s2 = new Sphere(new Vec3(0, -13.0, -30.0), 10);
let s3 = new Sphere(new Vec3(0, 10.0, -10.0), 5);

let ceil = new Plane(new Vec3(0, 50, 0), new Vec3(0, -1, 0));
let floor = new Plane(new Vec3(0, -5, 0), new Vec3(0, 1, 0));
let front = new Plane(new Vec3(0, 0, 50), new Vec3(0, 0, -1));
let back = new Plane(new Vec3(0, 0, -50), new Vec3(0, 0, 1));
let right = new Plane(new Vec3(50, 0, 0), new Vec3(-1, 0, 0));
let left = new Plane(new Vec3(-50, 0, 0), new Vec3(1, 0, 0));

s1.material = mRed;
s2.material = mGreen;
s3.material = mBlue;

ceil.material = mWhite;
floor.material = mMirror;
right.material = mYellow;
left.material = mGreen;
front.material = mRedSolid;
back.material = mWhite;

objects.push(s1);
//objects.push(s2);
objects.push(s3);
objects.push(ceil);
objects.push(floor);
objects.push(front);
objects.push(back);
objects.push(right);
objects.push(left);

function passCamera(name: string, camera: Camera) {
    let posLoc = gl.getUniformLocation(program, `${name}.pos`);
    let lookDirLoc = gl.getUniformLocation(program, `${name}.lookDir`);
    let zNearLoc = gl.getUniformLocation(program, `${name}.zNear`);
    let screenWLoc = gl.getUniformLocation(program, `${name}.screenW`);
    let screenHLoc = gl.getUniformLocation(program, `${name}.screenH`);


    gl.uniform3fv(posLoc, camera.pos.data);
    gl.uniform3fv(lookDirLoc, camera.basis.front.data);
    gl.uniform1f(zNearLoc, camera.zNear);
    gl.uniform1f(screenWLoc, camera.screenW);
    gl.uniform1f(screenHLoc, camera.screenH);
}

function passMaterial(name: string, mat: Material) 
{
    let colorLoc = gl.getUniformLocation(program, `${name}.color`);
    let specLoc = gl.getUniformLocation(program, `${name}.specular`);
    let reflLoc = gl.getUniformLocation(program, `${name}.reflection`);

    gl.uniform3f(colorLoc, mat.color.r/255.0, mat.color.g/255.0, mat.color.b/255.0);
    gl.uniform1f(specLoc, mat.specular);
    gl.uniform1f(reflLoc, mat.reflection);
}

function passObject(name: string, obj: Object)
{
    if (obj instanceof Sphere) 
    {
        let sphere = obj as Sphere;
        let typeLoc = gl.getUniformLocation(program, `${name}.type`);
        let posLoc = gl.getUniformLocation(program, `${name}.pos`);
        let rLoc = gl.getUniformLocation(program, `${name}.r`);

        gl.uniform1i(typeLoc, 0);
        gl.uniform3fv(posLoc, sphere.pos.data);
        gl.uniform1f(rLoc, sphere.r);
    }
    else if (obj instanceof Plane) 
    {
        let plane = obj as Plane;
        let typeLoc = gl.getUniformLocation(program, `${name}.type`);
        let posLoc = gl.getUniformLocation(program, `${name}.pos`);
        let normalLoc = gl.getUniformLocation(program, `${name}.normal`);

        gl.uniform1i(typeLoc, 1);
        gl.uniform3fv(posLoc, plane.pos.data);
        gl.uniform3fv(normalLoc, plane.normal.data);
    }

    passMaterial(`${name}.mat`, obj.material);
}

passCamera("camera", camera);

objects.forEach((obj, index) => {
    passObject(`objects[${index}]`, obj);
});

t1 = new Date().getMilliseconds();

//passCameraData(camera);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

var start = null
var last = null
var stop = false;
var frames = 0;
var fps = 0;
var second = 0;
let fpsElement = document.querySelector(".fpsValue");
function render(now) 
{
    if (!start) {
		start = now;
		last = now;
	}

    if (stop == true) {
        return;
    }

	var dt = now - last;

    second += dt;
	last = now;

    objects[0].pos.x = Math.sin((now-start)*0.001)*10;
    objects[0].pos.z = Math.sin((now-start)*0.001)*20;
    passObject("objects[0]", objects[0]);
    passCamera("camera", camera);

    gl.drawElements(gl.TRIANGLES, 6,  gl.UNSIGNED_SHORT, 0);

    frames++;
	if (second > 1000) {
        fpsElement.textContent = frames.toString();
		frames = 0;
		second = 0;
	}
	
	requestAnimationFrame(render);
}

requestAnimationFrame(render);

addEventListener('keydown', function(e) {
	if (e.keyCode == 32) {
		stop = !stop;
		
		if (stop == false) requestAnimationFrame(render);
	}
});











