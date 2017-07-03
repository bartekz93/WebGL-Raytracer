export default class Vec2
{
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    public add(v: Vec2): Vec2 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public subtract(v: Vec2) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public yx() {
        let tmp = this.x;
        this.x = this.y;
        this.y = tmp;
        return this;
    }

    public scale(f: number) {
        this.x *= f;
        this.y *= f;
        return this;
    }

    public normalize() {
        let l = this.length();
        this.x /= l; 
        this.y /= l;
        return this;
    }

    public dot(v: Vec2) {
        return this.x*v.x+this.y*v.y;
    }

    public length() {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }
};