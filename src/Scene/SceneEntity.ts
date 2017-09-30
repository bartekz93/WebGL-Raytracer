import OrthogonalBasis from "../Common/OrthogonalBasis"
import Vec3 from "../Common/Vec3"
import Matrix4 from "../Common/Matrix4"

export default class SceneEntity {
    public basis: OrthogonalBasis;
    private _pos: Vec3;
    private _yaw: number;
    private _pitch: number;
    private _roll: number;
    private _transformation: Matrix4;
    private dirty: boolean;

    constructor() {
        this.dirty = true;
        this._transformation = new Matrix4();
        this._pitch = 0.0;
        this._roll = 0.0;
        this._yaw = 0.0;
    }

    set pos(p: Vec3) {
        this._pos = p;
        this.dirty = true;
    }

    set yaw(yaw: number) {
        this._yaw = yaw;
        this.dirty = true;
    }

    set pitch(pitch: number) {
        this._pitch = pitch;
        this.dirty = true;
    }

    set roll(roll: number) {
        this._roll = roll;
        this.dirty = true;
    }

    get yaw() {
        return this._yaw;
    }

    get pitch() {
        return this._pitch;
    }

    get roll() {
        return this._roll;
    }

    get pos() {
        this.dirty = true;
        return this._pos;
    }

    private clampTo360(angle: number)
    {
	    while (angle > 2*3.1415) angle -= 2*3.1415;
	    while (angle < 0.0)	  angle += 2*3.1415;
    }
    
    get transformation() {
        if (this.dirty) {
            this.clampTo360(this._yaw);
            this.clampTo360(this._pitch);
            this.clampTo360(this._roll);

            this._transformation.rollPitchYaw(this._pos, this._roll, this._pitch, this._yaw);

            this.basis.right.set(1.0, 0.0, 0.0);
            this.basis.up.set(0.0, 1.0, 0.0);
            this.basis.front.set(0.0, 0.0, 1.0);

            this.basis.front.transformAsRow(this._transformation, 0.0).normalize();
            this.basis.right.transformAsRow(this._transformation, 0.0).normalize();
            this.basis.up.transformAsRow(this._transformation, 0.0).normalize();

            this.dirty = false;
        }

        return this._transformation;
    }
}