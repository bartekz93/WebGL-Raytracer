import Ray from '../Raytracer/Ray'
import { Object } from '../Scene/Object'
import Vec3 from '../Common/Vec3'

export default class HitTestResult {
    result: boolean;
    distance: number;
    ray: Ray;
    object: Object;
    hitPoint: Vec3;

    constructor(result: boolean, distance: number, ray: Ray, object: Object) {
        this.result = result;
        this.distance = distance;
        this.ray = ray;
        this.object = object;
        if (this.result) {
            this.hitPoint = this.ray.start.clone().add(this.ray.dir.clone().scale(this.distance));
        }
    }
}