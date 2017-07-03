export default class Color
{
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    static get red() {
        return new Color(255, 0, 0);
    }

    static get yellow() {
        return new Color(255, 255, 0);
    }

    static get green() {
        return new Color(0, 255, 0);
    }

    static get white() {
        return new Color(255, 255, 255);
    }

    static get blue() {
        return new Color(0, 0, 255);
    }

    constructor(r, g, b, a=255) {
        this.set(r, g, b, a);
    }

    public clone(): Color {
        return new Color(this.r, this.g, this.b, this.a);
    }

    public set(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.clamp();
    }

    public subtract(c: Color) {
        this.r -= c.r;
        this.g -= c.g;
        this.b -= c.b;
        this.a -= c.a;
        this.clamp();
        return this;
    }

    public add(c: Color) {
        this.r += c.r;
        this.g += c.g;
        this.b += c.b;
        this.a += c.a;
        this.clamp();
        return this;
    }

    public scale(s: number) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        this.a *= s;
        this.clamp();
        return this;
    }

    public scaleRgb(s: number) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        this.clamp();
        return this;
    }

    private clamp() {
        this.r = Math.floor(Math.min(Math.max(0, this.r)));
        this.g = Math.floor(Math.min(Math.max(0, this.g)));
        this.b = Math.floor(Math.min(Math.max(0, this.b)));
        this.a = Math.floor(Math.min(Math.max(0, this.a)));
    }

    public toString(){
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}