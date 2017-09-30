import Matrix4 from "../Common/Matrix4"

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

    public transformAsRow(mat: Matrix4, w: number=1.0) 
    {
        let x, y, z;
        x = this.x*mat.data[0] + this.y*mat.data[4] + this.z*mat.data[8] + w*mat.data[12];
        y = this.x*mat.data[1] + this.y*mat.data[5] + this.z*mat.data[9] + w*mat.data[13];
        z = this.x*mat.data[2] + this.y*mat.data[6] + this.z*mat.data[10] + w*mat.data[14];
        this.set(x, y, z);
        return this;
    }

    public transformAsColumn(mat: Matrix4, w: number=1.0) 
    {
        let x, y, z;
        x = this.x*mat.data[0] + this.y*mat.data[1] + this.z*mat.data[2] + w*mat.data[3];
        y = this.x*mat.data[4] + this.y*mat.data[5] + this.z*mat.data[6] + w*mat.data[7];
        z = this.x*mat.data[8] + this.y*mat.data[9] + this.z*mat.data[10] + w*mat.data[11];
        this.set(x, y, z);
        return this;
    }

    public equal(v: Vec3, e: number=0.001) {
        for (let i=0;i<3;i++) {
            if (Math.abs(this.data[i] - v.data[i]) > e) {
                return false;
            }
        }
        return true;
    }

    public toString() {
        return `${this.x}, ${this.y}, ${this.z}`;
    }
}