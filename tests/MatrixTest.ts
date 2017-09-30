import jasmine = require("jasmine");
import Matrix4 from "../src/Common/Matrix4"
import Vec3 from "../src/Common/Vec3"

describe("Matrix", () => {
    

    it("should be transposed", () => {
        let m = new Matrix4([ 
            1,  2,  3,  4,
            5,  6,  7,  8,
            9,  10, 11, 12,
            13, 14, 15, 16
        ]);

        let transposed = new Matrix4([ 
            1,  5,  9,  13,
            2,  6,  10, 14,
            3,  7,  11, 15,
            4,  8,  12, 16,
        ]);

        expect(m.transpose().equal(transposed)).toBe(true);
    });

    it ("should be multiplicated by other matrix", () => {
        let m = new Matrix4([ 
            1,  2,  3,  4,
            5,  6,  7,  8,
            9,  10, 11, 12,
            13, 14, 15, 16
        ]);

        let b = new Matrix4([ 
            1,  5,  9,  13,
            2,  6,  10, 14,
            3,  7,  11, 15,
            4,  8,  12, 16,
        ]);

        let c = new Matrix4([
            30.000,  70.000, 110.000, 150.000,
            70.000, 174.000, 278.000, 382.000,
            110.000, 278.000, 446.000, 614.000,
            150.000, 382.000, 614.000, 846.00
        ]);

        expect(m.mul(b).equal(c)).toBe(true)
    })

    it("should be multiplicated by vector as a row", () => {
        let m = new Matrix4([ 
            1,  2,  3,  4,
            5,  6,  7,  8,
            9,  10, 11, 12,
            13, 14, 15, 16
        ]);

        let v = new Vec3(4.32, 6.12, 12.2);
        let result = new Vec3(157.720, 181.360, 205.000);

        expect(v.transformAsRow(m).equal(result)).toBe(true);
    });

    it("should be multiplicated by vector as a column", () => {
        let m = new Matrix4([ 
            1,  2,  3,  4,
            5,  6,  7,  8,
            9,  10, 11, 12,
            13, 14, 15, 16
        ]);

        let v = new Vec3(4.32, 6.12, 12.2);
        let result = new Vec3(57.160, 151.720, 246.280);

        expect(v.transformAsColumn(m).equal(result)).toBe(true);
    });
});