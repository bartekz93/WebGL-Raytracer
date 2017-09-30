import SceneEntity from './SceneEntity'
import Vec3 from '../Common/Vec3'
import Color from '../Common/Color'

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
    public isDirty: boolean;
}



export class Sphere extends Object {

    r: number;

    constructor(pos: Vec3, radius: number) {
        super();
        this.pos = pos;
        this.r = radius;
    }
}


export class Plane extends Object {

    normal: Vec3;

    constructor(pos: Vec3, normal: Vec3) {
        super();
        this.pos = pos;
        this.normal = normal;
    }
}