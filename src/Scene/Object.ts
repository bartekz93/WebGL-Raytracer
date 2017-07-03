import SceneEntity from './SceneEntity'
import Vec3 from '../Common/Vec3'
import Color from '../Common/Color'
import Ray from '../Raytracer/Ray'
import HitTestResult from '../Raytracer/HitTestResult'

export class Material {
    specular: number;
    reflection: number;
    color: Color;

    constructor(color: Color, specular=0, reflection=0) {
        this.color = color;
        this.reflection = reflection;
        this.specular = specular;
    }
}

export abstract class Object extends SceneEntity {
    public material: Material;

    abstract HitTest(ray: Ray): HitTestResult;
    abstract GetNormalInPoint(point: Vec3): Vec3;
}



export class Sphere extends Object {

    r: number;

    constructor(pos: Vec3, radius: number) {
        super();
        this.pos = pos;
        this.r = radius;
    }

    public HitTest(ray: Ray): HitTestResult {

        let b = ray.start.clone().subtract(this.pos).scale(2).dot(ray.dir);
        let a = ray.start.clone().subtract(this.pos);
        let c = a.dot(a) - this.r*this.r;
        let d = b*b - 4*c;

	    let t1 = (-b + Math.sqrt(d)) / 2; 
	    let t2 = (-b - Math.sqrt(d)) / 2;

	    if (d >= 0)
	    {
		    if (t1 > 0.0 && t2 > 0.0) {
                return new HitTestResult(true, Math.min(t1, t2), ray, this);
            }
	    }

	    return new HitTestResult(false, -1.0, ray, this);
    }

    public GetNormalInPoint(point: Vec3): Vec3 {
        return point.clone().subtract(this.pos).normalize();
    }

}


export class Plane extends Object {

    normal: Vec3;

    constructor(pos: Vec3, normal: Vec3) {
        super();
        this.pos = pos;
        this.normal = normal;
    }

    public HitTest(ray: Ray): HitTestResult {
        let dist = this.pos.clone().subtract(ray.start).dot(this.normal) / ray.dir.clone().dot(this.normal);

	    if (dist > 0)
	    {
            return new HitTestResult(true, dist, ray, this);
	    }
	    return new HitTestResult(false, -1.0, ray, this);
	}

	public GetNormalInPoint(p: Vec3)
	{
		return this.normal;
	}

}