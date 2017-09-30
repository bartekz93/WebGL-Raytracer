define("src/Common/Vec3", ["require", "exports"], function (require, exports) {
    "use strict";
    var Vec3 = (function () {
        function Vec3(x, y, z) {
            this.data = new Array(3);
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Object.defineProperty(Vec3.prototype, "x", {
            get: function () {
                return this.data[0];
            },
            set: function (x) {
                this.data[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3.prototype, "y", {
            get: function () {
                return this.data[1];
            },
            set: function (y) {
                this.data[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3.prototype, "z", {
            get: function () {
                return this.data[2];
            },
            set: function (z) {
                this.data[2] = z;
            },
            enumerable: true,
            configurable: true
        });
        Vec3.prototype.clone = function () {
            return new Vec3(this.x, this.y, this.z);
        };
        Vec3.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        Vec3.prototype.add = function (v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        };
        Vec3.prototype.subtract = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        };
        Vec3.prototype.xzy = function () {
            return this.set(this.x, this.z, this.y);
        };
        Vec3.prototype.yxz = function () {
            return this.set(this.y, this.x, this.z);
        };
        Vec3.prototype.yzx = function () {
            return this.set(this.y, this.z, this.x);
        };
        Vec3.prototype.zxy = function () {
            return this.set(this.z, this.x, this.y);
        };
        Vec3.prototype.zyx = function () {
            return this.set(this.z, this.y, this.x);
        };
        Vec3.prototype.scale = function (f) {
            this.x *= f;
            this.y *= f;
            this.z *= f;
            return this;
        };
        Vec3.prototype.normalize = function () {
            var l = this.length();
            this.x /= l;
            this.y /= l;
            this.z /= l;
            return this;
        };
        Vec3.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        };
        Vec3.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        };
        Vec3.prototype.cross = function (v) {
            this.set(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
            return this;
        };
        Vec3.prototype.reflect = function (normal) {
            this.subtract(normal.clone().scale(2.0 * this.clone().dot(normal)));
            return this;
        };
        Vec3.prototype.transformAsRow = function (mat) {
            var x, y, z;
            x = this.x * mat.data[0] + this.y * mat.data[4] + this.z * mat.data[8] + mat.data[12];
            y = this.x * mat.data[1] + this.y * mat.data[5] + this.z * mat.data[9] + mat.data[13];
            z = this.x * mat.data[2] + this.y * mat.data[6] + this.z * mat.data[10] + mat.data[14];
            this.set(x, y, z);
            return this;
        };
        Vec3.prototype.transformAsColumn = function (mat) {
            var x, y, z;
            x = this.x * mat.data[0] + this.y * mat.data[1] + this.z * mat.data[2] + mat.data[3];
            y = this.x * mat.data[4] + this.y * mat.data[5] + this.z * mat.data[6] + mat.data[7];
            z = this.x * mat.data[8] + this.y * mat.data[9] + this.z * mat.data[10] + mat.data[11];
            this.set(x, y, z);
            return this;
        };
        Vec3.prototype.equal = function (v, e) {
            if (e === void 0) { e = 0.001; }
            for (var i = 0; i < 3; i++) {
                if (Math.abs(this.data[i] - v.data[i]) > e) {
                    return false;
                }
            }
            return true;
        };
        Vec3.prototype.toString = function () {
            return this.x + ", " + this.y + ", " + this.z;
        };
        return Vec3;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Vec3;
});
define("src/Common/Matrix4", ["require", "exports"], function (require, exports) {
    "use strict";
    var Matrix4 = (function () {
        function Matrix4(data) {
            if (data === void 0) { data = undefined; }
            if (data) {
                this.data = data;
            }
            else {
                this.data = new Array(16);
            }
        }
        Matrix4.prototype.getValue = function (x, y) {
            return this.data[y * 4 + x];
        };
        Matrix4.prototype.setValue = function (x, y, value) {
            this.data[y * 4 + x] = value;
        };
        Matrix4.prototype.set = function (mat) {
            for (var i = 0; i < 16; i++) {
                this.data[i] = mat[i];
            }
        };
        Matrix4.prototype.mul = function (mat) {
            var sum = 0.0;
            var buffer = new Array(16);
            for (var i = 0; i < 4; i++) {
                for (var k = 0; k < 4; k++) {
                    sum = 0.0;
                    for (var j = 0; j < 4; j++) {
                        sum += this.getValue(j, i) * mat.getValue(k, j);
                    }
                    buffer[i * 4 + k] = sum;
                }
            }
            this.data = buffer;
            return this;
        };
        Matrix4.prototype.rotationX = function (a) {
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            this.data[0] = 1.0;
            this.data[1] = 0.0;
            this.data[2] = 0.0;
            this.data[3] = 0.0;
            this.data[4] = 0.0;
            this.data[5] = cos;
            this.data[6] = sin;
            this.data[7] = 0.0;
            this.data[8] = 0.0;
            this.data[9] = -sin;
            this.data[10] = cos;
            this.data[11] = 0.0;
            this.data[12] = 0.0;
            this.data[13] = 0.0;
            this.data[14] = 0.0;
            this.data[15] = 1.0;
            return this;
        };
        Matrix4.prototype.rotationY = function (a) {
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            this.data[0] = cos;
            this.data[1] = 0.0;
            this.data[2] = -sin;
            this.data[3] = 0.0;
            this.data[4] = 0.0;
            this.data[5] = 1.0;
            this.data[6] = 0.0;
            this.data[7] = 0.0;
            this.data[8] = sin;
            this.data[9] = 0.0;
            this.data[10] = cos;
            this.data[11] = 0.0;
            this.data[12] = 0.0;
            this.data[13] = 0.0;
            this.data[14] = 0.0;
            this.data[15] = 1.0;
            return this;
        };
        Matrix4.prototype.rotationZ = function (a) {
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            this.data[0] = cos;
            this.data[1] = sin;
            this.data[2] = 0.0;
            this.data[3] = 0.0;
            this.data[4] = -sin;
            this.data[5] = cos;
            this.data[6] = 0.0;
            this.data[7] = 0.0;
            this.data[8] = 0.0;
            this.data[9] = 0.0;
            this.data[10] = 1.0;
            this.data[11] = 0.0;
            this.data[12] = 0.0;
            this.data[13] = 0.0;
            this.data[14] = 0.0;
            this.data[15] = 1.0;
            return this;
        };
        Matrix4.prototype.transpose = function () {
            var tmp = 0;
            for (var i = 0; i < 4; i++) {
                for (var j = i + 1; j < 4; j++) {
                    tmp = this.getValue(i, j);
                    this.setValue(i, j, this.getValue(j, i));
                    this.setValue(j, i, tmp);
                }
            }
            return this;
        };
        Matrix4.prototype.rotationAxis = function (v, a) {
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            this.data[0] = cos + v.x * v.x * (1.0 - cos);
            this.data[1] = v.y * v.x * (1.0 - cos) - v.z * sin;
            this.data[2] = v.z * v.x * (1.0 - cos) + v.y * sin;
            this.data[3] = 0.0;
            this.data[4] = v.y * v.x * (1.0 - cos) + v.z * sin;
            this.data[5] = cos + v.y * v.y * (1.0 - cos);
            this.data[6] = v.y * v.z * (1.0 - cos) - v.x * sin;
            this.data[7] = 0.0;
            this.data[8] = v.z * v.x * (1 - cos) - v.y * sin;
            this.data[9] = v.z * v.y * (1 - cos) + v.x * sin;
            this.data[10] = cos + v.z * v.z * (1.0 - cos);
            this.data[11] = 0.0;
            this.data[12] = 0.0;
            this.data[13] = 0.0;
            this.data[14] = 0.0;
            this.data[15] = 1.0;
            return this;
        };
        Matrix4.prototype.identity = function () {
            this.data[0] = 1.0;
            this.data[1] = 0.0;
            this.data[2] = 0.0;
            this.data[3] = 0.0;
            this.data[4] = 0.0;
            this.data[5] = 1.0;
            this.data[6] = 0.0;
            this.data[7] = 0.0;
            this.data[8] = 0.0;
            this.data[9] = 0.0;
            this.data[10] = 1.0;
            this.data[11] = 0.0;
            this.data[12] = 0.0;
            this.data[13] = 0.0;
            this.data[14] = 0.0;
            this.data[15] = 1.0;
            return this;
        };
        Matrix4.prototype.setTransformation = function (pos, yaw, pitch, roll) {
            var cos_a = Math.cos(yaw);
            var sin_a = Math.sin(yaw);
            var cos_b = Math.cos(pitch);
            var sin_b = Math.sin(pitch);
            var cos_c = Math.cos(roll);
            var sin_c = Math.sin(roll);
            this.data[0] = cos_a * cos_b;
            this.data[1] = cos_a * sin_b * sin_c - sin_a * cos_c;
            this.data[2] = cos_a * sin_b * cos_c + sin_a * sin_c;
            this.data[3] = 0.0;
            this.data[4] = sin_a * cos_b;
            this.data[5] = sin_a * sin_b * sin_c + cos_a * cos_c;
            this.data[6] = sin_a * sin_b * cos_c - cos_a * sin_c;
            this.data[7] = 0.0;
            this.data[8] = -sin_b;
            this.data[9] = cos_b * sin_c;
            this.data[10] = cos_b * cos_c;
            this.data[11] = 0.0;
            //this.identity();
            this.data[12] = pos.x;
            this.data[13] = pos.y;
            this.data[14] = pos.z;
            this.data[15] = 1.0;
        };
        Matrix4.prototype.equal = function (mat, e) {
            if (e === void 0) { e = 0.001; }
            for (var i = 0; i < 16; i++) {
                if (Math.abs(this.data[i] - mat.data[i]) > 0.001) {
                    return false;
                }
            }
            return true;
        };
        Matrix4.prototype.toString = function () {
            return this.data.join(', ');
        };
        return Matrix4;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Matrix4;
});
define("tests/MatrixTest", ["require", "exports", "src/Common/Matrix4", "src/Common/Vec3"], function (require, exports, Matrix4_1, Vec3_1) {
    "use strict";
    describe("Matrix", function () {
        it("should be transposed", function () {
            var m = new Matrix4_1.default([
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, 16
            ]);
            var transposed = new Matrix4_1.default([
                1, 5, 9, 13,
                2, 6, 10, 14,
                3, 7, 11, 15,
                4, 8, 12, 16,
            ]);
            expect(m.transpose().equal(transposed)).toBe(true);
        });
        it("should be multiplicated by other matrix", function () {
            var m = new Matrix4_1.default([
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, 16
            ]);
            var b = new Matrix4_1.default([
                1, 5, 9, 13,
                2, 6, 10, 14,
                3, 7, 11, 15,
                4, 8, 12, 16,
            ]);
            var c = new Matrix4_1.default([
                30.000, 70.000, 110.000, 150.000,
                70.000, 174.000, 278.000, 382.000,
                110.000, 278.000, 446.000, 614.000,
                150.000, 382.000, 614.000, 846.00
            ]);
            expect(m.mul(b).equal(c)).toBe(true);
        });
        it("should be multiplicated by vector as a row", function () {
            var m = new Matrix4_1.default([
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, 16
            ]);
            var v = new Vec3_1.default(4.32, 6.12, 12.2);
            var result = new Vec3_1.default(157.720, 181.360, 205.000);
            expect(v.transformAsRow(m).equal(result)).toBe(true);
        });
        it("should be multiplicated by vector as a column", function () {
            var m = new Matrix4_1.default([
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, 16
            ]);
            var v = new Vec3_1.default(4.32, 6.12, 12.2);
            var result = new Vec3_1.default(57.160, 151.720, 246.280);
            expect(v.transformAsColumn(m).equal(result)).toBe(true);
        });
    });
});
define("tests/Tests", ["require", "exports", "tests/MatrixTest"], function (require, exports) {
    "use strict";
});
//# sourceMappingURL=tests.js.map