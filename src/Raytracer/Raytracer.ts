import Vec3 from '../Common/Vec3'
import Color from '../Common/Color'
import Camera from '../Scene/Camera'
import {Sphere, Object} from '../Scene/Object'
import SceneEntity from '../Scene/SceneEntity'
import Ray from '../Raytracer/Ray'
import HitTestResult from '../Raytracer/HitTestResult'



export default class Raytracer
{
    screenW: number;
    screenH: number;
    screenSize: number;
    bounces: number;

    colorBuffer: Array<Color>;
    objects: Array<Object>;
    canvasBuffer: ImageData;
    camera: Camera;
    hits: Array<HitTestResult>;

    constructor(w: number, h: number, bounces: number=5) {
        this.screenH = h;
        this.screenW = w;
        this.bounces = bounces;
        this.screenSize = w*h;

        this.objects = new Array<Object>();
        this.hits = new Array(this.bounces);
    }

    public setCamera(camera: Camera) {
        this.camera = camera;
    }

    public computeLightning(hitResult: HitTestResult, lightPos: Vec3): number {

        let toCamera = this.camera.pos.clone().subtract(hitResult.hitPoint).normalize();
        let toLight = lightPos.clone().subtract(hitResult.hitPoint).normalize();
        
        let dot = hitResult.object.GetNormalInPoint(hitResult.hitPoint).dot(toLight);
        return dot;
        //return hitResult.object.material.color.clone().scaleRgb(dot);
    }

    public addObject(object: Object) {
        this.objects.push(object);
    }

    public raytrace(onPixel: (x: number, y: number, color: Color) => void) {
        let halfRealW = Math.tan(this.camera.fovX/2)*this.camera.zNear;
		let halfRealH = Math.tan(this.camera.fovY/2)*this.camera.zNear;
        let pixelW = halfRealW*2/this.screenW;
        let pixelH = halfRealH*2/this.screenH;

        let pixel = new Vec3(0, 0, 0);
        let light = new Vec3(0, 13, -20);
        let ray = new Ray();
        let nearestHit: HitTestResult;
        
        let logged = false;
        for (let y=0;y<this.screenH;y++) {
            for (let x=0;x<this.screenW;x++) {

                pixel.x = -halfRealW + x * pixelW + pixelW/2;
                pixel.y = halfRealH - y * pixelH - pixelH/2;
                pixel.z = this.camera.zNear;
                pixel.add(this.camera.pos);

                ray.set(this.camera.pos, pixel);

                let iteration = 0;
                for (;iteration<this.bounces;iteration++) {
                    if (iteration > 0) {
                        let prevHitPoint = this.hits[iteration-1].hitPoint;
                        let reflected = ray.dir.reflect(this.hits[iteration-1].object.GetNormalInPoint(prevHitPoint));
                        ray.set(prevHitPoint, prevHitPoint.clone().add(reflected));
                    }

                    nearestHit = undefined;
                
                    this.objects.forEach((obj) => {
                        if (iteration == 0 || this.hits[iteration-1].object != obj) {
                            let hitTest = obj.HitTest(ray);
                            if (hitTest.result == true && (nearestHit == undefined || hitTest.distance < nearestHit.distance)) {
                                nearestHit = hitTest;
                            }
                        }
                    });

                    if (nearestHit != undefined) {
                        this.hits[iteration] = nearestHit;

                        if (this.hits[iteration].object.material.reflection == 0) {
                            break;
                        }
                    }
                }

                if (iteration < this.bounces) iteration++;

                let diffuse = this.computeLightning(this.hits[iteration-1], light);
                let color = this.hits[iteration-1].object.material.color.clone().scaleRgb(diffuse);
	            for (let j = iteration-2; j >= 0; j--)
	            {
                    let obj = this.hits[j].object;
                    diffuse = this.computeLightning(this.hits[j], light);
                    color.scaleRgb(obj.material.reflection).add(obj.material.color.clone().scaleRgb(1.0-obj.material.reflection)).scaleRgb(diffuse);
	            }

                onPixel(x, y, color);
            }
        }
    }

    public beginDraw(ctx: CanvasRenderingContext2D) {
        
    }

    public draw(ctx: CanvasRenderingContext2D) {
        
        /*
        let canvasData = ctx.getImageData(0, 0, this.screenW, this.screenH);

        for (let y=0;y<this.screenH;y++) {
            for (let x=0;x<this.screenW;x++) {
                var canvasIndex = (x + y * this.screenW) * 4;
                var bufferIndex = (x + y * this.screenW);

                canvasData.data[canvasIndex + 0] = this.colorBuffer[bufferIndex].r;
                canvasData.data[canvasIndex + 1] = this.colorBuffer[bufferIndex].g;
                canvasData.data[canvasIndex + 2] = this.colorBuffer[bufferIndex].b;
                canvasData.data[canvasIndex + 3] = this.colorBuffer[bufferIndex].a;
                
            }
        }*/

        ctx.putImageData(this.canvasBuffer, 0, 0);
    }
}

