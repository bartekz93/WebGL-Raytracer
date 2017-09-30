import  Vec3  from "../Common/Vec3"
import { Geometry } from "./WebGLDevice"
import { WebGLDevice } from "./WebGLDevice"
import { Shaders } from "./Shaders"
import { Camera } from "../Scene/Camera"
import { Object, Sphere, Plane, Material } from "../Scene/Object";

export class WebGLRaytracer {    
    gl: WebGLRenderingContext;
    device: WebGLDevice;
    quad: Geometry;
    program: WebGLProgram;

    numReflections: number = 4;
    numObjects: number = 11;

    constructor(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("experimental-webgl");
        
        if (!this.gl) {
            this.gl = canvas.getContext("webgl");
        }
        
        if (!this.gl) {
            alert("Your browser do not supports WebGL!");
        }

        this.device = new WebGLDevice(this.gl);
        this.init();
    }

    private prepareGeometry() {
        this.quad = new Geometry();
        this.quad.positions = [
            -1,  1, //let-top
             1,  1, //right-top
             1, -1, //right-bottom
            -1, -1  //left-bottom
        ];
        this.quad.indices = [ 0, 1, 3, 1, 2, 3 ];

        this.device.setGeometry(this.quad);
    }

    public setNumberOfObjects(numObjects: number) {
        if (numObjects != this.numObjects) {
            this.numObjects = numObjects;
            this.prepareShaders();
        }
    }

    private prepareShaders() {

        let vertexShader = this.device.createVertexShader(Shaders.vertex());
        let fragmentShader = this.device.createFragmentShader(Shaders.fragment(this.numObjects, this.numReflections));
        this.program = this.device.createProgram(vertexShader, fragmentShader);

        let positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.useProgram(this.program);
    }

    draw() {
        this.gl.drawElements(this.gl.TRIANGLES, 6,  this.gl.UNSIGNED_SHORT, 0);
    }

    init() {
        this.prepareGeometry();
        this.prepareShaders();
        

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    passLight(name: string, light: Vec3) {
        let lightLoc = this.gl.getUniformLocation(this.program, `${name}`);
        this.gl.uniform3fv(lightLoc, light.data);
    }
    
    passCamera(name: string, camera: Camera) {
        let posLoc = this.gl.getUniformLocation(this.program, `${name}.pos`);
        let frontLoc = this.gl.getUniformLocation(this.program, `${name}.front`);
        let upLoc = this.gl.getUniformLocation(this.program, `${name}.up`);
        let rightLoc = this.gl.getUniformLocation(this.program, `${name}.right`);
        let zNearLoc = this.gl.getUniformLocation(this.program, `${name}.zNear`);
        let screenWLoc = this.gl.getUniformLocation(this.program, `${name}.screenW`);
        let screenHLoc = this.gl.getUniformLocation(this.program, `${name}.screenH`);
        let cameraWorld = this.gl.getUniformLocation(this.program, `${name}.worldMat`);
    
        this.gl.uniform3fv(posLoc, camera.pos.data);
        this.gl.uniform3fv(frontLoc, camera.basis.front.data);
        this.gl.uniform3fv(upLoc, camera.basis.up.data);
        this.gl.uniform3fv(rightLoc, camera.basis.right.data);
        this.gl.uniform1f(zNearLoc, camera.zNear);
        this.gl.uniform1f(screenWLoc, camera.screenW);
        this.gl.uniform1f(screenHLoc, camera.screenH);
        this.gl.uniformMatrix4fv(cameraWorld, false, camera.transformation.data);
    }
    
    passMaterial(name: string, mat: Material) 
    {
        let colorLoc = this.gl.getUniformLocation(this.program, `${name}.color`);
        let specLoc = this.gl.getUniformLocation(this.program, `${name}.specular`);
        let reflLoc = this.gl.getUniformLocation(this.program, `${name}.reflection`);
    
        this.gl.uniform3f(colorLoc, mat.color.r/255.0, mat.color.g/255.0, mat.color.b/255.0);
        this.gl.uniform1f(specLoc, mat.specular);
        this.gl.uniform1f(reflLoc, mat.reflection);
    }
    
    passObject(name: string, obj: Object)
    {
        if (!obj) {
            let typeLoc = this.gl.getUniformLocation(this.program, `${name}.type`);
            this.gl.uniform1i(typeLoc, 0);
            return;
        }
        if (obj instanceof Sphere) 
        {
            let sphere = obj as Sphere;
            let typeLoc = this.gl.getUniformLocation(this.program, `${name}.type`);
            let posLoc = this.gl.getUniformLocation(this.program, `${name}.pos`);
            let rLoc = this.gl.getUniformLocation(this.program, `${name}.r`);
    
            this.gl.uniform1i(typeLoc, 1);
            this.gl.uniform3fv(posLoc, sphere.pos.data);
            this.gl.uniform1f(rLoc, sphere.r);
        }
        else if (obj instanceof Plane) 
        {
            let plane = obj as Plane;
            let typeLoc = this.gl.getUniformLocation(this.program, `${name}.type`);
            let posLoc = this.gl.getUniformLocation(this.program, `${name}.pos`);
            let normalLoc = this.gl.getUniformLocation(this.program, `${name}.normal`);
    
            this.gl.uniform1i(typeLoc, 2);
            this.gl.uniform3fv(posLoc, plane.pos.data);
            this.gl.uniform3fv(normalLoc, plane.normal.data);
        }
    
        this.passMaterial(`${name}.mat`, obj.material);
    }
}
    