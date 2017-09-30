import Color from "../../Common/Color"
import Vec3 from '../../Common/Vec3'
import { Scene } from '../../Scene/Scene'
import { Object, Sphere, Plane, Material } from "../../Scene/Object";

export class Scene1 extends Scene {
    
        bottom = new Plane(new Vec3(0.0, -5.0, 0.0), new Vec3(0.0, 1.0, 0.0));  //podloga
        top = new Plane(new Vec3(0.0, 80.0, 0.0), new Vec3(0.0, -1.0, 0.0));
        front = new Plane(new Vec3(0.0, 0.0, 80.0), new Vec3(0.0, 0.0, -1.0)); //przod
        back = new Plane(new Vec3(0.0, 0.0, -80.0), new Vec3(0.0, 0.0, 1.0)); // tyl
        leftPlane = new Plane(new Vec3(-80.0, 0.0, 0.0), new Vec3(1.0, 0.0, 0.0)); // 
        rightPlane = new Plane(new Vec3(80.0, 0.0, 0.0), new Vec3(-1.0, 0.0, 0.0)); // 
        s1 = new Sphere(new Vec3(0.0, 0.0, 0.0), 5);
        s2 = new Sphere(new Vec3(-12.0, 0.0, 0.0), 5);
        s3 = new Sphere(new Vec3(-24.0, 0.0, 0.0), 5);
        s4 = new Sphere(new Vec3(12.0, 0.0, 0.0), 5);
        s5 = new Sphere(new Vec3(24.0, 0.0, 0.0), 5);
    
        
        build() {
            if (this.isBuilt) return;
    
            let yellow = new Material(Color.yellow);
            let blue = new Material(Color.blue);
            let green = new Material(new Color(51, 255, 51));
            let white = new Material(Color.white);
            let red = new Material(Color.red);
            let redmirror = new Material(Color.red, 0, 0.4)
            let yellowmirror = new Material(Color.yellow, 0, 0.4);
    
            this.s1.material = yellowmirror;
            this.s2.material = red;
            this.s3.material = green;
            this.s4.material = blue;
            this.s5.material = white;
            this.front.material = white;
            this.bottom.material = redmirror;
            this.back.material = white;
            this.leftPlane.material = green;
            this.rightPlane.material = blue;
            this.top.material = yellow;
    
            this.objects.push(this.s1);
            this.objects.push(this.s2);
            this.objects.push(this.s3);
            this.objects.push(this.s4);
            this.objects.push(this.s5);
            this.objects.push(this.front);
            this.objects.push(this.bottom);
            this.objects.push(this.back);
            this.objects.push(this.leftPlane);
            this.objects.push(this.rightPlane);
            this.objects.push(this.top);

            this.light = new Vec3(0, 20, -20);
    
            this.isBuilt = true;
        }
    
        update(dt: number, start: number, now: number) {
            
            
        }
    }