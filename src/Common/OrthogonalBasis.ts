import Vec3 from "./Vec3"

export default class OrthogonalBasis
{
	public right: Vec3;
    public up: Vec3;
    public front: Vec3;

	constructor() {
        this.right = new Vec3(1, 0, 0);
        this.up = new Vec3(0, 1, 0);
        this.front = new Vec3(0, 0, 1);
    }
};