var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Common/Matrix4", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Matrix4 = /** @class */ (function () {
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
        Matrix4.prototype.setValues = function (values) {
            for (var i = 0; i < 16; i++) {
                this.data[i] = values[i];
            }
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
            this.setValues([
                1.0, 0.0, 0.0, 0.0,
                0.0, cos, sin, 0.0,
                0.0, -sin, cos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            return this;
        };
        Matrix4.prototype.rotationY = function (a) {
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            this.setValues([
                cos, 0.0, -sin, 0.0,
                0.0, 1.0, 0.0, 0.0,
                sin, 0.0, cos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            return this;
        };
        Matrix4.prototype.rotationZ = function (a) {
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            this.setValues([
                cos, sin, 0.0, 0.0,
                -sin, cos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
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
        Matrix4.prototype.identity = function () {
            this.setValues([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            return this;
        };
        Matrix4.prototype.rollPitchYaw = function (pos, roll, pitch, yaw) {
            var cos_y = Math.cos(yaw);
            var sin_y = Math.sin(yaw);
            var cos_p = Math.cos(pitch);
            var sin_p = Math.sin(pitch);
            var cos_r = Math.cos(roll);
            var sin_r = Math.sin(roll);
            this.setValues([
                cos_r * cos_y + sin_r * sin_p * sin_y, sin_r * cos_p, -sin_y * cos_r + sin_r * sin_p * cos_y, 0.0,
                -sin_r * cos_y + cos_r * sin_p * sin_y, cos_r * cos_p, sin_r * sin_y + cos_r * sin_p * cos_y, 0.0,
                cos_p * sin_y, -sin_p, cos_p * cos_y, 0.0,
                pos.x, pos.y, pos.z, 1.0
            ]);
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
    exports.default = Matrix4;
});
define("Common/Vec3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Vec3 = /** @class */ (function () {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec3.prototype, "y", {
            get: function () {
                return this.data[1];
            },
            set: function (y) {
                this.data[1] = y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec3.prototype, "z", {
            get: function () {
                return this.data[2];
            },
            set: function (z) {
                this.data[2] = z;
            },
            enumerable: false,
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
        Vec3.prototype.transformAsRow = function (mat, w) {
            if (w === void 0) { w = 1.0; }
            var x, y, z;
            x = this.x * mat.data[0] + this.y * mat.data[4] + this.z * mat.data[8] + w * mat.data[12];
            y = this.x * mat.data[1] + this.y * mat.data[5] + this.z * mat.data[9] + w * mat.data[13];
            z = this.x * mat.data[2] + this.y * mat.data[6] + this.z * mat.data[10] + w * mat.data[14];
            this.set(x, y, z);
            return this;
        };
        Vec3.prototype.transformAsColumn = function (mat, w) {
            if (w === void 0) { w = 1.0; }
            var x, y, z;
            x = this.x * mat.data[0] + this.y * mat.data[1] + this.z * mat.data[2] + w * mat.data[3];
            y = this.x * mat.data[4] + this.y * mat.data[5] + this.z * mat.data[6] + w * mat.data[7];
            z = this.x * mat.data[8] + this.y * mat.data[9] + this.z * mat.data[10] + w * mat.data[11];
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
            return "".concat(this.x, ", ").concat(this.y, ", ").concat(this.z);
        };
        return Vec3;
    }());
    exports.default = Vec3;
});
define("Raytracer/WebGLDevice", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebGLDevice = exports.Geometry = void 0;
    var Geometry = /** @class */ (function () {
        function Geometry() {
        }
        return Geometry;
    }());
    exports.Geometry = Geometry;
    var WebGLDevice = /** @class */ (function () {
        function WebGLDevice(gl) {
            this.gl = gl;
        }
        WebGLDevice.prototype.createShader = function (type, source) {
            var shader = this.gl.createShader(type);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);
            var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
            if (success) {
                return shader;
            }
            console.log(this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
        };
        WebGLDevice.prototype.createVertexShader = function (source) {
            return this.createShader(this.gl.VERTEX_SHADER, source);
        };
        WebGLDevice.prototype.createFragmentShader = function (source) {
            return this.createShader(this.gl.FRAGMENT_SHADER, source);
        };
        WebGLDevice.prototype.createProgram = function (vertexShader, fragmentShader) {
            var program = this.gl.createProgram();
            this.gl.attachShader(program, vertexShader);
            this.gl.attachShader(program, fragmentShader);
            this.gl.linkProgram(program);
            var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
            if (success) {
                return program;
            }
            console.log(this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
        };
        WebGLDevice.prototype.setGeometry = function (geom) {
            var positionBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(geom.positions), this.gl.STATIC_DRAW);
            if (geom.indices && geom.indices.length > 0) {
                var indicesBuffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geom.indices), this.gl.STATIC_DRAW);
            }
        };
        return WebGLDevice;
    }());
    exports.WebGLDevice = WebGLDevice;
});
define("Raytracer/Shaders", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shaders = void 0;
    var Shaders = /** @class */ (function () {
        function Shaders() {
        }
        Shaders.fragment = function (objectsNum, reflectionDepth) {
            if (objectsNum === void 0) { objectsNum = 7; }
            if (reflectionDepth === void 0) { reflectionDepth = 3; }
            return "precision mediump float;\n\t\t\n\t\tvarying vec4 v_color;\n\t\t\n\t\t//enum Object type\n\t\t#define SPHERE 1\n\t\t#define PLANE 2\n\t\t\n\t\t#define OBJECTSNUM ".concat(objectsNum, "\n\t\t#define REFLDEPTH ").concat(reflectionDepth, "\n\t\t\n\t\tstruct Material \n\t\t{\n\t\t\tvec3 color;\n\t\t\tfloat specular;\n\t\t\tfloat reflection;\n\t\t\tfloat refraction;\n\t\t};\n\t\t\n\t\tstruct Object {\n\t\t\tint type;\n\t\t\tvec3 pos;\n\t\t\tfloat r;\n\t\t\tvec3 normal;\n\t\t\tMaterial mat;\n\t\t};\n\t\t\n\t\tstruct Ray {\n\t\t\tvec3 start;\n\t\t\tvec3 dir;\n\t\t};\n\t\t\n\t\tstruct Camera {\n\t\t\tvec3 pos;\n\t\t\t\n\t\t\tvec3 front;\n\t\t\tvec3 right;\n\t\t\tvec3 up;\n\t\t\n\t\t\tfloat zNear;\n\t\t\tfloat screenW;\n\t\t\tfloat screenH;\n\t\t\tmat4 worldMat;\n\t\t};\n\t\t\n\t\tuniform Camera camera;\n\t\tuniform Object objects[OBJECTSNUM];\n\t\tuniform vec3 light;\n\t\t\n\t\t\n\t\tvoid CreateRay(in vec3 start, in vec3 dir, out Ray ray)\n\t\t{\n\t\t\tray.start = start;\n\t\t\tray.dir = dir;\n\t\t}\n\t\t\n\t\tvec3 GetNormalInPoint(in Object obj, vec3 point) \n\t\t{\n\t\t\tif (obj.type == SPHERE) {\n\t\t\t\treturn normalize(point - obj.pos);\n\t\t\t}\n\t\t\telse if (obj.type == PLANE) {\n\t\t\t\treturn obj.normal;\n\t\t\t}\n\t\t}\n\t\t\n\t\tfloat ComputeDiffuse(vec3 lightPos, vec3 cameraPos, vec3 pointPos, in Object obj) \n\t\t{\n\t\t\tvec3 toCamera = normalize(cameraPos - pointPos);\n\t\t\tvec3 toLight = normalize(lightPos - pointPos);\n\t\t\tvec3 normal = GetNormalInPoint(obj, pointPos);\n\t\t\n\t\t\tfloat attenuation = max(min(1.0 - length(lightPos - pointPos) / 200.0, 1.0), 0.0);\n\t\t\t\n\t\t\tfloat scale = 5.0;\n\t\t\n\t\t\tif (obj.type == PLANE && obj.normal.y == 1.0) {\n\t\t\t\tif ((mod(pointPos.x / scale, 2.0) < 1.0 && mod(pointPos.z / scale, 2.0) > 1.0) || \n\t\t\t\t(mod(pointPos.x / scale, 2.0) > 1.0 && mod(pointPos.z / scale, 2.0) < 1.0)) {\n\t\t\t\t\treturn dot(normal, toLight)*0.4*attenuation;\t\n\t\t\t\t}\n\t\t\t}\n\t\t\n\t\t\n\t\t\treturn min(max(dot(normal, toLight)*attenuation, 0.0), 1.0);\n\t\t}\n\t\t\n\t\tfloat SphereHitTest(in Object sphere, Ray ray)\n\t\t{\n\t\t\tfloat b = dot((ray.start - sphere.pos)*2.0, ray.dir);\n\t\t\tfloat c = dot((ray.start - sphere.pos), (ray.start - sphere.pos)) - pow(sphere.r, 2.0);\n\t\t\n\t\t\tfloat d = pow(b, 2.0) - 4.0*c;\n\t\t\n\t\t\tfloat t1 = (-b + sqrt(d)) / 2.0; \n\t\t\tfloat t2 = (-b - sqrt(d)) / 2.0;\n\t\t\n\t\t\tif (d >= 0.0)\n\t\t\t{\n\t\t\t\tif (t1 > 0.0 && t2 > 0.0) return min(t1, t2);\n\t\t\t}\n\t\t\n\t\t\treturn -1.0;\n\t\t}\n\t\t\n\t\tfloat PlaneHitTest(in Object plane, Ray ray)\n\t\t{\n\t\t\treturn dot(plane.pos - ray.start, plane.normal) / dot(ray.dir, plane.normal);\n\t\t}\n\t\t\n\t\tfloat HitTest(Object obj, Ray ray) \n\t\t{\n\t\t\tif (obj.type == SPHERE) {\n\t\t\t\treturn SphereHitTest(obj, ray);\n\t\t\t}\n\t\t\telse if (obj.type == PLANE) {\n\t\t\t\treturn PlaneHitTest(obj, ray);\n\t\t\t}\n\t\t}\n\t\t\n\t\t\n\t\tfloat CastRay(Ray ray, int except, out vec3 hitPoint, out Object hitObject, out int objIndex)\n\t\t{\n\t\t\tfloat minDist = -1.0;\n\t\t\tfloat dist;\n\t\t\n\t\t\tfor (int j=0;j<OBJECTSNUM;j++) {\n\t\t\t\t\n\t\t\t\tif (j == except) continue;\n\t\t\n\t\t\t\tdist = HitTest(objects[j], ray);\n\t\t\t\tif (dist > 0.0  && (minDist < 0.0 || dist < minDist)) {\n\t\t\t\t\tminDist = dist;\n\t\t\t\t\thitObject = objects[j];\n\t\t\t\t\tobjIndex = j;\n\t\t\t\t}\n\t\t\t}\n\t\t\n\t\t\tif (minDist > 0.0) \n\t\t\t{\n\t\t\t\thitPoint = ray.start+ray.dir*minDist;\n\t\t\t\treturn minDist;\n\t\t\t}\n\t\t\n\t\t\treturn -1.0;\n\t\t}\n\t\t\n\t\t\n\t\tvoid main() {\n\t\t\t\n\t\t\n\t\t\tvec3 pixel;\n\t\t\n\t\t\tpixel.x = v_color.x * camera.screenW/2.0;\n\t\t\tpixel.y = v_color.y * camera.screenH/2.0;\n\t\t\tpixel.z = camera.zNear;\n\t\t\tpixel = (camera.worldMat * vec4(pixel, 1.0)).xyz;\n\t\t\t\n\t\t\n\t\t\tRay ray, shadowRay;\n\t\t\n\t\t\tvec3 hitPoint;\n\t\t\tvec3 shadowHitPoint;\n\t\t\tObject hitObject;\n\t\t\tObject shadowCaster;\n\t\t\tint hitObjIndex;\n\t\t\tfloat cumulatedDiffuse = 1.0;\n\t\t\tfloat cumulatedReflection = 1.0;\n\t\t\tvec3 color = vec3(0.0, 0.0, 0.0);\n\t\t\tint lastObject = -1;\n\t\t\tfloat dist = -1.0;\n\t\t\n\t\t\tfor (int i=0;i<REFLDEPTH;i++)\n\t\t\t{\n\t\t\t\tif (i > 0) {\n\t\t\t\t\tif (hitObject.mat.reflection > 0.0) {\n\t\t\t\t\t\tvec3 n = GetNormalInPoint(hitObject, hitPoint);\n\t\t\t\t\t\tCreateRay(hitPoint, normalize(reflect(ray.dir, n)), ray);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tCreateRay(camera.pos, normalize(pixel - camera.pos), ray);\n\t\t\t\t}\n\t\t\n\t\t\t\tif (CastRay(ray, lastObject, hitPoint, hitObject, hitObjIndex) > 0.0) {\n\t\t\n\t\t\t\t\tlastObject = hitObjIndex;\n\t\t\t\t\tCreateRay(hitPoint, normalize(light - hitPoint), shadowRay);\n\t\t\t\t\tdist = CastRay(shadowRay, lastObject, shadowHitPoint, shadowCaster, hitObjIndex);\n\t\t\t\t\tif (dist > 0.0 && dist < length(light - hitPoint)) {\n\t\t\t\t\t\tcumulatedDiffuse *= 0.7;\n\t\t\t\t\t}\n\t\t\n\t\t\t\t\tcumulatedDiffuse *= ComputeDiffuse(light, camera.pos, hitPoint, hitObject);\n\t\t\t\t\tcolor += hitObject.mat.color*cumulatedDiffuse*cumulatedReflection*(1.0-hitObject.mat.reflection);\n\t\t\t\t\tcumulatedReflection *= hitObject.mat.reflection;\n\t\t\n\t\t\t\t\tif (!(hitObject.mat.reflection > 0.0)) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\n\t\t\tgl_FragColor = vec4(color, 1);\n\t\t}");
        };
        Shaders.vertex = function () {
            return "attribute vec4 a_position;\n\t\t\n\t\tvarying vec4 v_color;\n\t\t\n\t\tvoid main() {\n\t\t\n\t\t\tgl_Position = a_position;\n\t\t\tv_color = a_position;\n\t\t}";
        };
        return Shaders;
    }());
    exports.Shaders = Shaders;
});
define("Common/OrthogonalBasis", ["require", "exports", "Common/Vec3"], function (require, exports, Vec3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OrthogonalBasis = /** @class */ (function () {
        function OrthogonalBasis() {
            this.right = new Vec3_1.default(1, 0, 0);
            this.up = new Vec3_1.default(0, 1, 0);
            this.front = new Vec3_1.default(0, 0, 1);
        }
        return OrthogonalBasis;
    }());
    exports.default = OrthogonalBasis;
    ;
});
define("Scene/SceneEntity", ["require", "exports", "Common/Matrix4"], function (require, exports, Matrix4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SceneEntity = /** @class */ (function () {
        function SceneEntity() {
            this.dirty = true;
            this._transformation = new Matrix4_1.default();
            this._pitch = 0.0;
            this._roll = 0.0;
            this._yaw = 0.0;
        }
        Object.defineProperty(SceneEntity.prototype, "pos", {
            get: function () {
                this.dirty = true;
                return this._pos;
            },
            set: function (p) {
                this._pos = p;
                this.dirty = true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SceneEntity.prototype, "yaw", {
            get: function () {
                return this._yaw;
            },
            set: function (yaw) {
                this._yaw = yaw;
                this.dirty = true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SceneEntity.prototype, "pitch", {
            get: function () {
                return this._pitch;
            },
            set: function (pitch) {
                this._pitch = pitch;
                this.dirty = true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SceneEntity.prototype, "roll", {
            get: function () {
                return this._roll;
            },
            set: function (roll) {
                this._roll = roll;
                this.dirty = true;
            },
            enumerable: false,
            configurable: true
        });
        SceneEntity.prototype.clampTo360 = function (angle) {
            while (angle > 2 * 3.1415)
                angle -= 2 * 3.1415;
            while (angle < 0.0)
                angle += 2 * 3.1415;
        };
        Object.defineProperty(SceneEntity.prototype, "transformation", {
            get: function () {
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
            },
            enumerable: false,
            configurable: true
        });
        return SceneEntity;
    }());
    exports.default = SceneEntity;
});
define("Scene/Camera", ["require", "exports", "Scene/SceneEntity", "Common/Vec3", "Common/OrthogonalBasis"], function (require, exports, SceneEntity_1, Vec3_2, OrthogonalBasis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Camera = void 0;
    var Camera = /** @class */ (function (_super) {
        __extends(Camera, _super);
        function Camera(pos, lookAt, fovX, fovY, zNear, zFar) {
            if (fovX === void 0) { fovX = Math.PI / 3; }
            if (fovY === void 0) { fovY = Math.PI / 3; }
            if (zNear === void 0) { zNear = 10; }
            if (zFar === void 0) { zFar = 100; }
            var _this = _super.call(this) || this;
            _this.pos = pos;
            _this.fovX = fovX;
            _this.fovY = fovY;
            _this.zNear = zNear;
            _this.zFar = zFar;
            _this.basis = new OrthogonalBasis_1.default();
            _this.basis.right = new Vec3_2.default(-1.0, 0.0, 0.0);
            _this.basis.front = lookAt.clone().subtract(pos).normalize();
            _this.basis.up = _this.basis.right.clone().cross(_this.basis.front);
            _this.screenW = Math.tan(fovX / 2.0) * 2 * _this.zNear;
            _this.screenH = Math.tan(fovY / 2.0) * 2 * _this.zNear;
            return _this;
        }
        return Camera;
    }(SceneEntity_1.default));
    exports.Camera = Camera;
    ;
});
define("Common/Color", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            if (a === void 0) { a = 255; }
            this.set(r, g, b, a);
        }
        Object.defineProperty(Color, "red", {
            get: function () {
                return new Color(255, 0, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color, "yellow", {
            get: function () {
                return new Color(255, 255, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color, "green", {
            get: function () {
                return new Color(0, 255, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color, "white", {
            get: function () {
                return new Color(255, 255, 255);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color, "blue", {
            get: function () {
                return new Color(0, 0, 255);
            },
            enumerable: false,
            configurable: true
        });
        Color.prototype.clone = function () {
            return new Color(this.r, this.g, this.b, this.a);
        };
        Color.prototype.set = function (r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            this.clamp();
        };
        Color.prototype.subtract = function (c) {
            this.r -= c.r;
            this.g -= c.g;
            this.b -= c.b;
            this.a -= c.a;
            this.clamp();
            return this;
        };
        Color.prototype.add = function (c) {
            this.r += c.r;
            this.g += c.g;
            this.b += c.b;
            this.a += c.a;
            this.clamp();
            return this;
        };
        Color.prototype.scale = function (s) {
            this.r *= s;
            this.g *= s;
            this.b *= s;
            this.a *= s;
            this.clamp();
            return this;
        };
        Color.prototype.scaleRgb = function (s) {
            this.r *= s;
            this.g *= s;
            this.b *= s;
            this.clamp();
            return this;
        };
        Color.prototype.clamp = function () {
            this.r = Math.floor(Math.min(Math.max(0, this.r)));
            this.g = Math.floor(Math.min(Math.max(0, this.g)));
            this.b = Math.floor(Math.min(Math.max(0, this.b)));
            this.a = Math.floor(Math.min(Math.max(0, this.a)));
        };
        Color.prototype.toString = function () {
            return "rgba(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ", ").concat(this.a, ")");
        };
        return Color;
    }());
    exports.default = Color;
});
define("Scene/Object", ["require", "exports", "Scene/SceneEntity"], function (require, exports, SceneEntity_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Plane = exports.Sphere = exports.SceneObject = exports.Material = void 0;
    var Material = /** @class */ (function () {
        function Material(color, specular, reflection) {
            if (specular === void 0) { specular = 0; }
            if (reflection === void 0) { reflection = 0; }
            this.color = color;
            this.reflection = reflection;
            this.specular = specular;
        }
        return Material;
    }());
    exports.Material = Material;
    var SceneObject = /** @class */ (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SceneObject;
    }(SceneEntity_2.default));
    exports.SceneObject = SceneObject;
    var Sphere = /** @class */ (function (_super) {
        __extends(Sphere, _super);
        function Sphere(pos, radius) {
            var _this = _super.call(this) || this;
            _this.pos = pos;
            _this.r = radius;
            return _this;
        }
        return Sphere;
    }(SceneObject));
    exports.Sphere = Sphere;
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        function Plane(pos, normal) {
            var _this = _super.call(this) || this;
            _this.pos = pos;
            _this.normal = normal;
            return _this;
        }
        return Plane;
    }(SceneObject));
    exports.Plane = Plane;
});
define("Raytracer/WebGLRaytracer", ["require", "exports", "Raytracer/WebGLDevice", "Raytracer/WebGLDevice", "Raytracer/Shaders", "Scene/Object"], function (require, exports, WebGLDevice_1, WebGLDevice_2, Shaders_1, Object_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebGLRaytracer = void 0;
    var WebGLRaytracer = /** @class */ (function () {
        function WebGLRaytracer(canvas) {
            this.numReflections = 10;
            this.numObjects = 11;
            this.gl = canvas.getContext("experimental-webgl");
            if (!this.gl) {
                this.gl = canvas.getContext("webgl");
            }
            if (!this.gl) {
                alert("Your browser do not supports WebGL!");
            }
            this.device = new WebGLDevice_2.WebGLDevice(this.gl);
            this.init();
        }
        WebGLRaytracer.prototype.prepareGeometry = function () {
            this.quad = new WebGLDevice_1.Geometry();
            this.quad.positions = [
                -1, 1, //let-top
                1, 1, //right-top
                1, -1, //right-bottom
                -1, -1 //left-bottom
            ];
            this.quad.indices = [0, 1, 3, 1, 2, 3];
            this.device.setGeometry(this.quad);
        };
        WebGLRaytracer.prototype.setNumberOfObjects = function (numObjects) {
            if (numObjects != this.numObjects) {
                this.numObjects = numObjects;
                this.prepareShaders();
            }
        };
        WebGLRaytracer.prototype.prepareShaders = function () {
            var vertexShader = this.device.createVertexShader(Shaders_1.Shaders.vertex());
            var fragmentShader = this.device.createFragmentShader(Shaders_1.Shaders.fragment(this.numObjects, this.numReflections));
            this.program = this.device.createProgram(vertexShader, fragmentShader);
            var positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
            this.gl.enableVertexAttribArray(positionAttributeLocation);
            this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.useProgram(this.program);
        };
        WebGLRaytracer.prototype.draw = function () {
            this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        };
        WebGLRaytracer.prototype.init = function () {
            this.prepareGeometry();
            this.prepareShaders();
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            this.gl.clearColor(0, 0, 0, 0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        };
        WebGLRaytracer.prototype.passLight = function (name, light) {
            var lightLoc = this.gl.getUniformLocation(this.program, "".concat(name));
            this.gl.uniform3fv(lightLoc, light.data);
        };
        WebGLRaytracer.prototype.passCamera = function (name, camera) {
            var posLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".pos"));
            var frontLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".front"));
            var upLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".up"));
            var rightLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".right"));
            var zNearLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".zNear"));
            var screenWLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".screenW"));
            var screenHLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".screenH"));
            var cameraWorld = this.gl.getUniformLocation(this.program, "".concat(name, ".worldMat"));
            this.gl.uniform3fv(posLoc, camera.pos.data);
            this.gl.uniform3fv(frontLoc, camera.basis.front.data);
            this.gl.uniform3fv(upLoc, camera.basis.up.data);
            this.gl.uniform3fv(rightLoc, camera.basis.right.data);
            this.gl.uniform1f(zNearLoc, camera.zNear);
            this.gl.uniform1f(screenWLoc, camera.screenW);
            this.gl.uniform1f(screenHLoc, camera.screenH);
            this.gl.uniformMatrix4fv(cameraWorld, false, camera.transformation.data);
        };
        WebGLRaytracer.prototype.passMaterial = function (name, mat) {
            var colorLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".color"));
            var specLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".specular"));
            var reflLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".reflection"));
            this.gl.uniform3f(colorLoc, mat.color.r / 255.0, mat.color.g / 255.0, mat.color.b / 255.0);
            this.gl.uniform1f(specLoc, mat.specular);
            this.gl.uniform1f(reflLoc, mat.reflection);
        };
        WebGLRaytracer.prototype.passObject = function (name, obj) {
            if (!obj) {
                var typeLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".type"));
                this.gl.uniform1i(typeLoc, 0);
                return;
            }
            if (obj instanceof Object_1.Sphere) {
                var sphere = obj;
                var typeLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".type"));
                var posLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".pos"));
                var rLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".r"));
                this.gl.uniform1i(typeLoc, 1);
                this.gl.uniform3fv(posLoc, sphere.pos.data);
                this.gl.uniform1f(rLoc, sphere.r);
            }
            else if (obj instanceof Object_1.Plane) {
                var plane = obj;
                var typeLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".type"));
                var posLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".pos"));
                var normalLoc = this.gl.getUniformLocation(this.program, "".concat(name, ".normal"));
                this.gl.uniform1i(typeLoc, 2);
                this.gl.uniform3fv(posLoc, plane.pos.data);
                this.gl.uniform3fv(normalLoc, plane.normal.data);
            }
            this.passMaterial("".concat(name, ".mat"), obj.material);
        };
        return WebGLRaytracer;
    }());
    exports.WebGLRaytracer = WebGLRaytracer;
});
define("Scene/Scene", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = /** @class */ (function () {
        function Scene() {
            this.objects = [];
            this.isBuilt = false;
        }
        return Scene;
    }());
    exports.Scene = Scene;
});
define("App/AnimationLoop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimationLoop = void 0;
    var AnimationLoop = /** @class */ (function () {
        function AnimationLoop() {
            this.startTime = null;
            this.lastTime = null;
            this.isPaused = false;
            this.framesPerSecond = 0;
            this.msInSecond = 0;
        }
        AnimationLoop.prototype.togglePause = function () {
            this.isPaused = !this.isPaused;
            if (!this.isPaused) {
                requestAnimationFrame(this.step.bind(this));
            }
        };
        AnimationLoop.prototype.pause = function () {
            this.isPaused = true;
        };
        AnimationLoop.prototype.start = function (stepAction, onChangeFps) {
            this.isPaused = false;
            this.stepAction = stepAction;
            this.onChangeFPS = onChangeFps;
            requestAnimationFrame(this.step.bind(this));
        };
        AnimationLoop.prototype.step = function (now) {
            if (!this.start) {
                this.startTime = now;
                this.lastTime = now;
            }
            if (this.isPaused == true) {
                return;
            }
            var dt = now - this.lastTime;
            this.msInSecond += dt;
            this.lastTime = now;
            this.stepAction(dt, this.startTime, now);
            this.framesPerSecond++;
            if (this.msInSecond > 1000) {
                this.onChangeFPS(this.framesPerSecond);
                this.framesPerSecond = 0;
                this.msInSecond = 0;
            }
            requestAnimationFrame(this.step.bind(this));
        };
        return AnimationLoop;
    }());
    exports.AnimationLoop = AnimationLoop;
});
define("App/Scenes/Scene1", ["require", "exports", "Common/Color", "Common/Vec3", "Scene/Scene", "Scene/Object"], function (require, exports, Color_1, Vec3_3, Scene_1, Object_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene1 = void 0;
    var Scene1 = /** @class */ (function (_super) {
        __extends(Scene1, _super);
        function Scene1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bottom = new Object_2.Plane(new Vec3_3.default(0.0, -5.0, 0.0), new Vec3_3.default(0.0, 1.0, 0.0)); //podloga
            _this.top = new Object_2.Plane(new Vec3_3.default(0.0, 80.0, 0.0), new Vec3_3.default(0.0, -1.0, 0.0));
            _this.front = new Object_2.Plane(new Vec3_3.default(0.0, 0.0, 80.0), new Vec3_3.default(0.0, 0.0, -1.0)); //przod
            _this.back = new Object_2.Plane(new Vec3_3.default(0.0, 0.0, -80.0), new Vec3_3.default(0.0, 0.0, 1.0)); // tyl
            _this.leftPlane = new Object_2.Plane(new Vec3_3.default(-80.0, 0.0, 0.0), new Vec3_3.default(1.0, 0.0, 0.0)); // 
            _this.rightPlane = new Object_2.Plane(new Vec3_3.default(80.0, 0.0, 0.0), new Vec3_3.default(-1.0, 0.0, 0.0)); // 
            _this.s1 = new Object_2.Sphere(new Vec3_3.default(0.0, 0.0, 0.0), 5);
            _this.s2 = new Object_2.Sphere(new Vec3_3.default(-12.0, 0.0, 0.0), 5);
            _this.s3 = new Object_2.Sphere(new Vec3_3.default(-24.0, 0.0, 0.0), 5);
            _this.s4 = new Object_2.Sphere(new Vec3_3.default(12.0, 0.0, 0.0), 5);
            _this.s5 = new Object_2.Sphere(new Vec3_3.default(24.0, 0.0, 0.0), 5);
            return _this;
        }
        Scene1.prototype.build = function () {
            if (this.isBuilt)
                return;
            var yellow = new Object_2.Material(Color_1.default.yellow);
            var blue = new Object_2.Material(Color_1.default.blue);
            var green = new Object_2.Material(new Color_1.default(51, 255, 51));
            var white = new Object_2.Material(Color_1.default.white);
            var red = new Object_2.Material(Color_1.default.red);
            var redmirror = new Object_2.Material(Color_1.default.red, 0, 0.4);
            var yellowmirror = new Object_2.Material(Color_1.default.yellow, 0, 0.4);
            this.s1.material = yellowmirror;
            this.s2.material = red;
            this.s3.material = green;
            this.s4.material = blue;
            this.s5.material = white;
            this.front.material = white;
            this.bottom.material = redmirror;
            this.back.material = white;
            this.leftPlane.material = green;
            this.rightPlane.material = blue;
            this.top.material = yellow;
            this.objects.push(this.s1);
            this.objects.push(this.s2);
            this.objects.push(this.s3);
            this.objects.push(this.s4);
            this.objects.push(this.s5);
            this.objects.push(this.front);
            this.objects.push(this.bottom);
            this.objects.push(this.back);
            this.objects.push(this.leftPlane);
            this.objects.push(this.rightPlane);
            this.objects.push(this.top);
            this.light = new Vec3_3.default(0, 20, -20);
            this.isBuilt = true;
        };
        Scene1.prototype.update = function (dt, start, now) {
        };
        return Scene1;
    }(Scene_1.Scene));
    exports.Scene1 = Scene1;
});
define("App/Scenes/Scene2", ["require", "exports", "Common/Color", "Common/Vec3", "Scene/Scene", "Scene/Object"], function (require, exports, Color_2, Vec3_4, Scene_2, Object_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene2 = void 0;
    var Scene2 = /** @class */ (function (_super) {
        __extends(Scene2, _super);
        function Scene2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bottom = new Object_3.Plane(new Vec3_4.default(0.0, -5.0, 0.0), new Vec3_4.default(0.0, 1.0, 0.0)); //podloga
            _this.top = new Object_3.Plane(new Vec3_4.default(0.0, 80.0, 0.0), new Vec3_4.default(0.0, -1.0, 0.0));
            _this.front = new Object_3.Plane(new Vec3_4.default(0.0, 0.0, 80.0), new Vec3_4.default(0.0, 0.0, -1.0)); //przod
            _this.back = new Object_3.Plane(new Vec3_4.default(0.0, 0.0, -80.0), new Vec3_4.default(0.0, 0.0, 1.0)); // tyl
            _this.leftPlane = new Object_3.Plane(new Vec3_4.default(-80.0, 0.0, 0.0), new Vec3_4.default(1.0, 0.0, 0.0)); // 
            _this.rightPlane = new Object_3.Plane(new Vec3_4.default(80.0, 0.0, 0.0), new Vec3_4.default(-1.0, 0.0, 0.0)); // 
            _this.s1 = new Object_3.Sphere(new Vec3_4.default(-5.0, 0.0, 5.0), 5);
            _this.s2 = new Object_3.Sphere(new Vec3_4.default(5.0, 0.0, 5.0), 5);
            _this.s3 = new Object_3.Sphere(new Vec3_4.default(5.0, 0.0, -5.0), 5);
            _this.s4 = new Object_3.Sphere(new Vec3_4.default(-5.0, 0.0, -5.0), 5);
            _this.s5 = new Object_3.Sphere(new Vec3_4.default(0.0, 5 * Math.sqrt(2), 0.0), 5);
            return _this;
        }
        Scene2.prototype.build = function () {
            if (this.isBuilt)
                return;
            var yellow = new Object_3.Material(Color_2.default.yellow);
            var yellowmirror = new Object_3.Material(Color_2.default.yellow, 0, 0.4);
            var bluemirror = new Object_3.Material(Color_2.default.blue, 0, 0.4);
            var blue = new Object_3.Material(Color_2.default.blue);
            var green = new Object_3.Material(new Color_2.default(51, 255, 51));
            var greenmirror = new Object_3.Material(new Color_2.default(51, 255, 51), 0, 0.4);
            var whitemirror = new Object_3.Material(Color_2.default.white, 0, 0.4);
            var white = new Object_3.Material(Color_2.default.white);
            var red = new Object_3.Material(Color_2.default.red);
            var redmirror = new Object_3.Material(Color_2.default.red, 0, 0.4);
            this.s1.material = bluemirror;
            this.s2.material = greenmirror;
            this.s3.material = yellowmirror;
            this.s4.material = bluemirror;
            this.s5.material = redmirror;
            this.front.material = blue;
            this.bottom.material = white;
            this.back.material = green;
            this.leftPlane.material = red;
            this.rightPlane.material = red;
            this.top.material = yellow;
            this.objects.push(this.s1);
            this.objects.push(this.s2);
            this.objects.push(this.s3);
            this.objects.push(this.s4);
            this.objects.push(this.s5);
            this.objects.push(this.front);
            this.objects.push(this.bottom);
            this.objects.push(this.back);
            this.objects.push(this.leftPlane);
            this.objects.push(this.rightPlane);
            this.objects.push(this.top);
            this.light = new Vec3_4.default(0, 20, -20);
            this.isBuilt = true;
        };
        Scene2.prototype.update = function (dt, start, now) {
            var angle = (now - start) * 0.001;
            this.light.x = (Math.cos(angle) - Math.sin(angle)) * 10;
            this.light.z = (Math.cos(angle) + Math.sin(angle)) * 10;
        };
        return Scene2;
    }(Scene_2.Scene));
    exports.Scene2 = Scene2;
});
define("App/Scenes/Scene3", ["require", "exports", "Common/Color", "Common/Vec3", "Scene/Scene", "Scene/Object"], function (require, exports, Color_3, Vec3_5, Scene_3, Object_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene3 = void 0;
    var Scene3 = /** @class */ (function (_super) {
        __extends(Scene3, _super);
        function Scene3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bottom = new Object_4.Plane(new Vec3_5.default(0.0, -5.0, 0.0), new Vec3_5.default(0.0, 1.0, 0.0)); //podloga
            _this.top = new Object_4.Plane(new Vec3_5.default(0.0, 80.0, 0.0), new Vec3_5.default(0.0, -1.0, 0.0));
            _this.front = new Object_4.Plane(new Vec3_5.default(0.0, 0.0, 80.0), new Vec3_5.default(0.0, 0.0, -1.0)); //przod
            _this.back = new Object_4.Plane(new Vec3_5.default(0.0, 0.0, -80.0), new Vec3_5.default(0.0, 0.0, 1.0)); // tyl
            _this.leftPlane = new Object_4.Plane(new Vec3_5.default(-80.0, 0.0, 0.0), new Vec3_5.default(1.0, 0.0, 0.0)); // 
            _this.rightPlane = new Object_4.Plane(new Vec3_5.default(80.0, 0.0, 0.0), new Vec3_5.default(-1.0, 0.0, 0.0)); // 
            _this.s1 = new Object_4.Sphere(new Vec3_5.default(0.0, 0.0, 0.0), 5);
            _this.s2 = new Object_4.Sphere(new Vec3_5.default(-12.0, 0.0, 0.0), 5);
            _this.s3 = new Object_4.Sphere(new Vec3_5.default(-6.0, 0.0, 12.0), 5);
            _this.s4 = new Object_4.Sphere(new Vec3_5.default(12.0, 0.0, 0.0), 5);
            _this.s5 = new Object_4.Sphere(new Vec3_5.default(6.0, 0.0, 12.0), 5);
            return _this;
        }
        Scene3.prototype.build = function () {
            if (this.isBuilt)
                return;
            var yellow = new Object_4.Material(Color_3.default.yellow);
            var blue = new Object_4.Material(Color_3.default.blue);
            var bluemirror = new Object_4.Material(Color_3.default.blue, 0, 0.5);
            var green = new Object_4.Material(new Color_3.default(51, 255, 51));
            var white = new Object_4.Material(Color_3.default.white);
            var whitemirror = new Object_4.Material(Color_3.default.white, 0, 0.6);
            var red = new Object_4.Material(Color_3.default.red);
            var redmirror = new Object_4.Material(Color_3.default.red, 0, 0.4);
            var yellowmirror = new Object_4.Material(Color_3.default.yellow, 0, 0.4);
            this.s1.material = yellowmirror;
            this.s2.material = red;
            this.s3.material = green;
            this.s4.material = blue;
            this.s5.material = white;
            this.front.material = red;
            this.bottom.material = whitemirror;
            this.back.material = yellow;
            this.leftPlane.material = green;
            this.rightPlane.material = blue;
            this.top.material = white;
            this.objects.push(this.s1);
            this.objects.push(this.s2);
            this.objects.push(this.s3);
            this.objects.push(this.s4);
            this.objects.push(this.s5);
            this.objects.push(this.front);
            this.objects.push(this.bottom);
            this.objects.push(this.back);
            this.objects.push(this.leftPlane);
            this.objects.push(this.rightPlane);
            this.objects.push(this.top);
            this.light = new Vec3_5.default(0, 20, -20);
            this.isBuilt = true;
        };
        Scene3.prototype.update = function (dt, start, now) {
            var angle = (now - start) * 0.01;
            this.s2.pos.y = Math.sqrt((Math.sin(angle) + 1) / 2) * 10;
            this.s3.pos.y = Math.sqrt((Math.sin(angle + Math.PI) + 1) / 2) * 5;
            this.s4.pos.y = Math.sqrt((Math.sin(angle + Math.PI / 2) + 1) / 2) * 10;
            this.s5.pos.y = Math.sqrt((Math.sin(angle + Math.PI / 2) + 1) / 2) * 5;
            this.s2.isDirty = true;
            this.s3.isDirty = true;
            this.s4.isDirty = true;
            this.s5.isDirty = true;
        };
        return Scene3;
    }(Scene_3.Scene));
    exports.Scene3 = Scene3;
});
define("App/Scenes/Scene4", ["require", "exports", "Common/Color", "Common/Vec3", "Scene/Scene", "Scene/Object"], function (require, exports, Color_4, Vec3_6, Scene_4, Object_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene4 = void 0;
    var Scene4 = /** @class */ (function (_super) {
        __extends(Scene4, _super);
        function Scene4() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bottom = new Object_5.Plane(new Vec3_6.default(0.0, -5.0, 0.0), new Vec3_6.default(0.0, 1.0, 0.0)); //podloga
            _this.top = new Object_5.Plane(new Vec3_6.default(0.0, 80.0, 0.0), new Vec3_6.default(0.0, -1.0, 0.0));
            _this.front = new Object_5.Plane(new Vec3_6.default(0.0, 0.0, 80.0), new Vec3_6.default(0.0, 0.0, -1.0)); //przod
            _this.back = new Object_5.Plane(new Vec3_6.default(0.0, 0.0, -80.0), new Vec3_6.default(0.0, 0.0, 1.0)); // tyl
            _this.leftPlane = new Object_5.Plane(new Vec3_6.default(-80.0, 0.0, 0.0), new Vec3_6.default(1.0, 0.0, 0.0)); // 
            _this.rightPlane = new Object_5.Plane(new Vec3_6.default(80.0, 0.0, 0.0), new Vec3_6.default(-1.0, 0.0, 0.0)); // 
            _this.s1 = new Object_5.Sphere(new Vec3_6.default(0.0, 0.0, 0.0), 5);
            _this.s2 = new Object_5.Sphere(new Vec3_6.default(-12.0, 0.0, 0.0), 5);
            _this.s3 = new Object_5.Sphere(new Vec3_6.default(-24.0, 0.0, 0.0), 5);
            _this.s4 = new Object_5.Sphere(new Vec3_6.default(12.0, 0.0, 0.0), 5);
            _this.s5 = new Object_5.Sphere(new Vec3_6.default(24.0, 0.0, 0.0), 5);
            return _this;
        }
        Scene4.prototype.build = function () {
            if (this.isBuilt)
                return;
            var yellow = new Object_5.Material(Color_4.default.yellow);
            var blue = new Object_5.Material(Color_4.default.blue);
            var green = new Object_5.Material(new Color_4.default(51, 255, 51));
            var white = new Object_5.Material(Color_4.default.white);
            var red = new Object_5.Material(Color_4.default.red);
            var redmirror = new Object_5.Material(Color_4.default.red, 0, 0.4);
            var yellowmirror = new Object_5.Material(Color_4.default.yellow, 0, 0.4);
            var whitemirror = new Object_5.Material(Color_4.default.white, 2, 0.8);
            this.s1.material = yellowmirror;
            this.s2.material = red;
            this.s3.material = green;
            this.s4.material = blue;
            this.s5.material = white;
            this.front.material = whitemirror;
            this.bottom.material = redmirror;
            this.back.material = whitemirror;
            this.leftPlane.material = green;
            this.rightPlane.material = blue;
            this.top.material = yellow;
            this.objects.push(this.s1);
            this.objects.push(this.s2);
            this.objects.push(this.s3);
            this.objects.push(this.s4);
            this.objects.push(this.s5);
            this.objects.push(this.front);
            this.objects.push(this.bottom);
            this.objects.push(this.back);
            this.objects.push(this.leftPlane);
            this.objects.push(this.rightPlane);
            this.objects.push(this.top);
            this.light = new Vec3_6.default(0, 20, -20);
            this.isBuilt = true;
        };
        Scene4.prototype.update = function (dt, start, now) {
            var angle = (now - start) * 0.01;
            this.s2.pos.y = Math.sqrt((Math.sin(angle) + 1) / 2) * 10;
            this.s3.pos.y = Math.sqrt((Math.sin(angle + Math.PI) + 1) / 2) * 5;
            this.s4.pos.y = Math.sqrt((Math.sin(angle + Math.PI / 2) + 1) / 2) * 10;
            this.s5.pos.y = Math.sqrt((Math.sin(angle + Math.PI / 2) + 1) / 2) * 5;
            this.s2.isDirty = true;
            this.s3.isDirty = true;
            this.s4.isDirty = true;
            this.s5.isDirty = true;
        };
        return Scene4;
    }(Scene_4.Scene));
    exports.Scene4 = Scene4;
});
define("App", ["require", "exports", "Common/Vec3", "Raytracer/WebGLRaytracer", "Scene/Camera", "App/AnimationLoop", "App/Scenes/Scene1", "App/Scenes/Scene2", "App/Scenes/Scene3", "App/Scenes/Scene4"], function (require, exports, Vec3_7, WebGLRaytracer_1, Camera_1, AnimationLoop_1, Scene1_1, Scene2_1, Scene3_1, Scene4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
            var _this = this;
            this.scenes = [];
            console.log("run");
            this.prepareInput();
            this.prepareCanvas();
            this.raytracer = new WebGLRaytracer_1.WebGLRaytracer(this.canvas);
            this.camera = new Camera_1.Camera(new Vec3_7.default(0, 10, -49), new Vec3_7.default(0, 0, 0), Math.PI / 3, Math.PI / 3 * (this.canvas.height / this.canvas.width));
            this.loop = new AnimationLoop_1.AnimationLoop();
            this.raytracer.passCamera("camera", this.camera);
            this.prepareScenes();
            this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
            document.addEventListener("keydown", this.onKeyDown.bind(this));
            document.addEventListener("keyup", this.onKeyUp.bind(this));
            var buttons = document.querySelectorAll("button.scene");
            for (var i = 0; i < buttons.length; i++) {
                buttons.item(i).addEventListener("click", function (e) {
                    _this.setScene(_this.scenes[e.target.id]);
                });
            }
            var fpsElement = document.querySelector(".fpsValue");
            this.loop.start(this.update.bind(this), function (fps) {
                if (fpsElement) {
                    fpsElement.innerHTML = fps.toString();
                }
            });
        }
        App.prototype.prepareScenes = function () {
            this.scenes.push(new Scene1_1.Scene1());
            this.scenes.push(new Scene2_1.Scene2());
            this.scenes.push(new Scene3_1.Scene3());
            this.scenes.push(new Scene4_1.Scene4());
            this.setScene(this.scenes[0]);
        };
        App.prototype.prepareCanvas = function () {
            this.canvas = document.querySelector("#myCanvas");
            this.canvas.width = this.canvas.clientHeight;
            this.canvas.height = this.canvas.clientHeight;
        };
        App.prototype.update = function (dt, start, now) {
            var _this = this;
            this.updateInput(dt);
            this.currentScene.update(dt, start, now);
            this.currentScene.objects.forEach(function (obj, index) {
                if (obj.isDirty) {
                    _this.raytracer.passObject("objects[".concat(index, "]"), obj);
                    obj.isDirty = false;
                }
            });
            this.raytracer.passCamera("camera", this.camera);
            this.raytracer.passLight("light", this.currentScene.light);
            this.raytracer.draw();
        };
        App.prototype.setScene = function (scene) {
            var _this = this;
            this.currentScene = scene;
            scene.build();
            this.raytracer.setNumberOfObjects(scene.objects.length);
            scene.objects.forEach(function (obj, index) {
                _this.raytracer.passObject("objects[".concat(index, "]"), obj);
                obj.isDirty = false;
            });
        };
        App.prototype.prepareInput = function () {
            this.keys = {};
            this.keys['Space'] = false;
            this.keys['ArrowUp'] = false;
            this.keys['ArrowDown'] = false;
            this.keys['ArrowLeft'] = false;
            this.keys['ArrowRight'] = false;
        };
        App.prototype.updateInput = function (dt) {
            var v = 0.05;
            if (this.keys['Space']) {
                this.loop.togglePause();
            }
            if (this.keys['ArrowUp']) {
                this.camera.pos.add(this.camera.basis.front.scale(v * dt));
            }
            if (this.keys['ArrowDown']) {
                this.camera.pos.subtract(this.camera.basis.front.scale(v * dt));
            }
            if (this.keys['ArrowRight']) {
                this.camera.pos.add(this.camera.basis.right.scale(v * dt));
            }
            if (this.keys['ArrowLeft']) {
                this.camera.pos.subtract(this.camera.basis.right.scale(v * dt));
            }
        };
        App.prototype.onKeyUp = function (e) {
            this.keys[e.key] = false;
        };
        App.prototype.onKeyDown = function (e) {
            this.keys[e.key] = true;
        };
        App.prototype.onMouseMove = function (e) {
            if (e.buttons == 1) {
                this.camera.yaw += e.movementX * 0.01;
                this.camera.pitch += e.movementY * 0.01;
            }
        };
        return App;
    }());
    var app = new App();
});
//# sourceMappingURL=app.js.map