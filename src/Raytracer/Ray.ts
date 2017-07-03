import Vec3 from '../Common/Vec3'

export default class Ray {
    start: Vec3;
    dir: Vec3;

    public set(start: Vec3, lookAt: Vec3) {
        this.start = start;
        this.dir = lookAt.clone().subtract(start).normalize(); // norm(lookAt - start)
    }
}