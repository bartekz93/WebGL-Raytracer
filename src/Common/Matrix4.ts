import Vec3 from '../Common/Vec3'

export default class Matrix4
{
    data: Array<number>;

    constructor(data: Array<number> = undefined) {
        if (data) {
            this.data = data;
        }
        else {
            this.data = new Array(16);
        }
    }


    public getValue(x: number, y: number) {
        return this.data[y*4+x];
    }

    public setValue(x: number, y: number, value: number) {
        this.data[y*4+x] = value;
    }

    public setValues(values: Array<number>) {
        for (let i=0;i<16;i++) {
            this.data[i] = values[i];
        }
    }

    public set(mat: Array<number>)
    {
        for (let i=0;i<16;i++) {
            this.data[i] = mat[i];
        }
    }

    public mul(mat: Matrix4)
    {
        let sum = 0.0;
        let buffer = new Array<number>(16);
		for (let i=0;i<4;i++)
		{
			for (let k=0;k<4;k++)
			{
				sum = 0.0;
				for (let j=0;j<4;j++)
				{
					sum += this.getValue(j, i) * mat.getValue(k, j);
				}
                buffer[i*4+k] = sum;
			}
		}
        this.data = buffer;
		return this;
	}

    public rotationX(a: number) {
        let cos = Math.cos(a);
        let sin = Math.sin(a);

        this.setValues([
            1.0,    0.0,    0.0,    0.0, 
            0.0,    cos,    sin,    0.0,
            0.0,    -sin,   cos,    0.0,
            0.0,    0.0,    0.0,    1.0
        ]);

        return this;
    }

    public rotationY(a: number) {
        let cos = Math.cos(a);
        let sin = Math.sin(a);

        this.setValues([
            cos,    0.0,    -sin,    0.0, 
            0.0,    1.0,    0.0,    0.0,
            sin,    0.0,    cos,    0.0,
            0.0,    0.0,    0.0,    1.0
        ]);

        return this;
    }

    public rotationZ(a: number) {
        let cos = Math.cos(a);
        let sin = Math.sin(a);

        this.setValues([
            cos,    sin,    0.0,    0.0, 
            -sin,   cos,    0.0,    0.0,
            0.0,    0.0,    1.0,    0.0,
            0.0,    0.0,    0.0,    1.0
        ]);

        return this;
    }

    public transpose() {
        let tmp = 0;
        for (let i=0;i<4;i++) {
            for (let j=i+1;j<4;j++) {
                tmp = this.getValue(i, j);
                this.setValue(i, j, this.getValue(j, i));
                this.setValue(j, i, tmp);
            }
        }

        return this;
    }

    public identity() {
        this.setValues([
            1.0,    0.0,    0.0,    0.0, 
            0.0,    1.0,    0.0,    0.0,
            0.0,    0.0,    1.0,    0.0,
            0.0,    0.0,    0.0,    1.0
        ]);

        return this;
    }

    public rollPitchYaw(pos: Vec3, roll: number, pitch: number, yaw: number) {

        let cos_y = Math.cos(yaw);
        let sin_y = Math.sin(yaw);
        let cos_p = Math.cos(pitch);
        let sin_p = Math.sin(pitch);
        let cos_r = Math.cos(roll);
        let sin_r = Math.sin(roll);

        this.setValues([
            cos_r*cos_y+sin_r*sin_p*sin_y,      sin_r*cos_p,    -sin_y*cos_r+sin_r*sin_p*cos_y,     0.0,
            -sin_r*cos_y+cos_r*sin_p*sin_y,     cos_r*cos_p,    sin_r*sin_y+cos_r*sin_p*cos_y,      0.0,
            cos_p*sin_y,                        -sin_p,         cos_p*cos_y,                        0.0,
            pos.x,                              pos.y,          pos.z,                              1.0
        ]);
    }

    public equal(mat: Matrix4, e: number = 0.001) {
        for (let i=0;i<16;i++) {
            if (Math.abs(this.data[i] - mat.data[i]) > 0.001) {
                return false;
            }
        }
        return true;
    }

    public toString() {
        return this.data.join(', ');
    }



}