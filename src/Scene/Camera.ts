import SceneEntity from './SceneEntity'
import Vec3 from '../Common/Vec3'
import OrthogonalBasis from '../Common/OrthogonalBasis'

export default class Camera extends SceneEntity
{
    fovX: number;
    fovY: number;
    zNear: number;
    zFar: number;
    screenW: number;
    screenH: number;

    constructor(pos: Vec3, lookAt: Vec3, fovX: number = Math.PI/3, fovY: number = Math.PI/3, zNear: number = 10, zFar: number = 100) {
        super();
        this.pos = pos;
        this.fovX = fovX;
        this.fovY = fovY;
        this.zNear = zNear;
        this.zFar = zFar;

        this.basis = new OrthogonalBasis();
        this.basis.right = new Vec3(-1.0, 0.0, 0.0);
        this.basis.front = lookAt.clone().subtract(pos).normalize();
        this.basis.up = this.basis.right.clone().cross(this.basis.front);

        this.screenW = Math.tan(fovX/2.0)*2*this.zNear;
        this.screenH = Math.tan(fovY/2.0)*2*this.zNear;
    }
};