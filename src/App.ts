import Vec3 from './Common/Vec3'
import { WebGLRaytracer } from "./Raytracer/WebGLRaytracer"
import { Scene } from "./Scene/Scene"
import { Camera } from "./Scene/Camera"
import { AnimationLoop } from "./App/AnimationLoop"
import { Object } from "./Scene/Object";



import { Scene1 } from "./App/Scenes/Scene1"
import { Scene2 } from "./App/Scenes/Scene2"
import { Scene3 } from "./App/Scenes/Scene3"

class App {

    canvas: HTMLCanvasElement;
    raytracer: WebGLRaytracer;
    scenes: Array<Scene> = [];
    currentScene: Scene;
    camera: Camera;
    loop: AnimationLoop;

    constructor() {
        console.log("run");
        this.prepareCanvas();

        this.raytracer = new WebGLRaytracer(this.canvas);
        this.camera = new Camera(new Vec3(0, 10, -49), new Vec3(0, 0, 0), Math.PI/3, Math.PI/3*(this.canvas.height/this.canvas.width));
        this.loop = new AnimationLoop();

        this.raytracer.passCamera("camera", this.camera);

        this.prepareScenes();

        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.addEventListener("keydown", this.onKeyDown.bind(this));

        let buttons = document.querySelectorAll("button.scene");
        for (let i=0;i<buttons.length;i++) {
            buttons.item(i).addEventListener("click", (e: MouseEvent) => {
                this.setScene(this.scenes[(e.target as HTMLElement).id]);    
            });
        }

        let fpsElement = document.querySelector(".fpsValue");
        this.loop.start(this.update.bind(this), (fps: number) => {
            fpsElement.innerHTML = fps.toString();
        })
        
    }

    private prepareScenes() {
        this.scenes.push(new Scene1());
        this.scenes.push(new Scene2());
        this.scenes.push(new Scene3());

        this.setScene(this.scenes[0]);
    }

    private prepareCanvas() {
        let w = window.innerWidth;
        let h = window.innerHeight;

        h = Math.min(window.innerHeight/1.28, 600);
        w = h;
        
        this.canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
        this.canvas.width = w;
        this.canvas.height = h;
    }

    update(dt: number, start: number, now: number) {

        this.currentScene.update(dt, start, now);
        
        this.currentScene.objects.forEach((obj, index) => {
            if (obj.isDirty) {
                this.raytracer.passObject(`objects[${index}]`, obj);
                obj.isDirty = false;
            } 
        });

        this.raytracer.passCamera("camera", this.camera);
        this.raytracer.passLight("light", this.currentScene.light);
    
        this.raytracer.draw();
    }

    setScene(scene: Scene) {
        this.currentScene = scene;
        scene.build();
        
        this.raytracer.setNumberOfObjects(scene.objects.length);
        scene.objects.forEach((obj, index) => {
            this.raytracer.passObject(`objects[${index}]`, obj);
            obj.isDirty = false;
        });
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.keyCode == 32) {
            this.loop.togglePause();
        }
    
        if (e.keyCode == 38) {
            this.camera.pos.add(this.camera.basis.front);
        }
        if (e.keyCode == 40) {
            this.camera.pos.subtract(this.camera.basis.front);
        }
        if (e.keyCode == 39) {
            this.camera.pos.add(this.camera.basis.right);
        }
        if (e.keyCode == 37) {
            this.camera.pos.subtract(this.camera.basis.right);
        }
    }
    
    onMouseMove(e: MouseEvent) {
        if (e.buttons == 1) {
            this.camera.yaw += e.movementX*0.01;
            this.camera.pitch += e.movementY*0.01;   
        }
    }
}



let app = new App();






