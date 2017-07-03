
export default class Vec3
{
    public data: Array<number>;

    get x() {
        return this.data[0];
    }

    get y() {
        return this.data[1];
    }

    get z() {
        return this.data[2];
    }

    set x(x: number) {
        this.data[0] = x;
    }

    set y(y: number) {
        this.data[1] = y;
    }

    set z(z: number) {
        this.data[2] = z;
    }

    constructor(x: number, y: number, z: number) {
        this.data = new Array(3);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    public set(x: number, y: number, z: number)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    public add(v: Vec3) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    public subtract(v: Vec3) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    public xzy() {
        return this.set(this.x, this.z, this.y);
    }

    public yxz() {
        return this.set(this.y, this.x, this.z);
    }

    public yzx() {
        return this.set(this.y, this.z, this.x);
    }

    public zxy() {
        return this.set(this.z, this.x, this.y);
    }

    public zyx() {
        return this.set(this.z, this.y, this.x);
    }

    public scale(f: number) {
        this.x *= f;
        this.y *= f;
        this.z *= f;
        return this;
    }

    public normalize() {
        let l = this.length();
        this.x /= l; 
        this.y /= l;
        this.z /= l;
        return this;
    }

    public dot(v: Vec3) {
        return this.x*v.x + this.y*v.y + this.z*v.z;
    }

    public length() {
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
    }

    public cross(v: Vec3) {
        this.set(   this.y*v.z - this.z*v.y,
                    this.z*v.x - this.x*v.z,
                    this.x*v.y - this.y*v.x     );
        return this;
    }

    public reflect(normal: Vec3)
    {
        this.subtract(normal.clone().scale(2.0*this.clone().dot(normal)));
        return this;
    }
}