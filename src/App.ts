import Vec3 from './Common/Vec3'
import { WebGLRaytracer } from "./Raytracer/WebGLRaytracer"
import { Scene } from "./Scene/Scene"
import { Camera } from "./Scene/Camera"
import { AnimationLoop } from "./App/AnimationLoop"
import { SceneObject } from "./Scene/Object";



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
    keys: { [name:string]: boolean }

    constructor() {
        console.log("run");
        this.prepareInput();
        this.prepareCanvas();

        this.raytracer = new WebGLRaytracer(this.canvas);
        this.camera = new Camera(new Vec3(0, 10, -49), new Vec3(0, 0, 0), Math.PI/3, Math.PI/3*(this.canvas.height/this.canvas.width));
        this.loop = new AnimationLoop();

        this.raytracer.passCamera("camera", this.camera);

        this.prepareScenes();

        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

        let buttons = document.querySelectorAll("button.scene");
        for (let i=0;i<buttons.length;i++) {
            buttons.item(i).addEventListener("click", (e: Event) => {
                this.setScene(this.scenes[(e.target as HTMLElement).id]);
            });
        }

        let fpsElement = document.querySelector(".fpsValue");
        this.loop.start(this.update.bind(this), (fps: number) => {
            if (fpsElement) {
                fpsElement.innerHTML = fps.toString();
            }
        })
        
    }

    private prepareScenes() {
        this.scenes.push(new Scene1());
        this.scenes.push(new Scene2());
        this.scenes.push(new Scene3());

        this.setScene(this.scenes[0]);
    }

    private prepareCanvas() {
        this.canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
        this.canvas.width = this.canvas.clientHeight;
        this.canvas.height = this.canvas.clientHeight;
    }

    update(dt: number, start: number, now: number) {

        this.updateInput(dt);

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

    prepareInput() {
        this.keys = {};
        this.keys['Space'] = false;
        this.keys['ArrowUp'] = false;
        this.keys['ArrowDown'] = false;
        this.keys['ArrowLeft'] = false;
        this.keys['ArrowRight'] = false;
    }

    updateInput(dt: number) {
        let v = 0.05;
        if (this.keys['Space']) {
            this.loop.togglePause();
        }
        if (this.keys['ArrowUp']) {
            this.camera.pos.add(this.camera.basis.front.scale(v*dt));
        }
        if (this.keys['ArrowDown']) {
            this.camera.pos.subtract(this.camera.basis.front.scale(v*dt));
        }
        if (this.keys['ArrowRight']) {
            this.camera.pos.add(this.camera.basis.right.scale(v*dt));
        }
        if (this.keys['ArrowLeft']) {
            this.camera.pos.subtract(this.camera.basis.right.scale(v*dt));
        }
    }

    onKeyUp(e: KeyboardEvent) {
        this.keys[e.key] = false;
    }

    onKeyDown(e: KeyboardEvent) {
        this.keys[e.key] = true;
    }
    
    onMouseMove(e: MouseEvent) {
        if (e.buttons == 1) {
            this.camera.yaw += e.movementX*0.01;
            this.camera.pitch += e.movementY*0.01;   
        }
    }
}



let app = new App();






