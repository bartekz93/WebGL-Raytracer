import { Object } from "../Scene/Object"
import  Vec3  from "../Common/Vec3"

export abstract class Scene {
    objects: Array<Object> = [];
    light: Vec3;
    isBuilt: boolean;

    constructor() {
        this.isBuilt = false;
    }

    abstract build();
    abstract update(dt: number, start: number, now: number);
}