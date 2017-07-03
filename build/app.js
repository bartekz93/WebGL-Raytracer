var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("Common/Vec3", ["require", "exports"], function (require, exports) {
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
        return Vec3;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Vec3;
});
define("Common/OrthogonalBasis", ["require", "exports", "Common/Vec3"], function (require, exports, Vec3_1) {
    "use strict";
    var OrthogonalBasis = (function () {
        function OrthogonalBasis() {
            this.right = new Vec3_1.default(1, 0, 0);
            this.up = new Vec3_1.default(0, 1, 0);
            this.front = new Vec3_1.default(0, 0, 1);
        }
        return OrthogonalBasis;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OrthogonalBasis;
    ;
});
define("Scene/SceneEntity", ["require", "exports"], function (require, exports) {
    "use strict";
    var SceneEntity = (function () {
        function SceneEntity() {
        }
        return SceneEntity;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SceneEntity;
});
define("Scene/Camera", ["require", "exports", "Scene/SceneEntity", "Common/Vec3", "Common/OrthogonalBasis"], function (require, exports, SceneEntity_1, Vec3_2, OrthogonalBasis_1) {
    "use strict";
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(pos, lookAt, fovX, fovY, zNear, zFar) {
            if (fovX === void 0) { fovX = Math.PI / 3; }
            if (fovY === void 0) { fovY = Math.PI / 3; }
            if (zNear === void 0) { zNear = 10; }
            if (zFar === void 0) { zFar = 100; }
            _super.call(this);
            this.pos = pos;
            this.fovX = fovX;
            this.fovY = fovY;
            this.zNear = zNear;
            this.zFar = zFar;
            this.basis = new OrthogonalBasis_1.default();
            this.basis.right = new Vec3_2.default(-1.0, 0.0, 0.0);
            this.basis.front = lookAt.clone().subtract(pos).normalize();
            this.basis.up = this.basis.right.clone().cross(this.basis.front);
            this.screenW = Math.tan(fovX / 2.0) * 2 * this.zNear;
            this.screenH = Math.tan(fovY / 2.0) * 2 * this.zNear;
        }
        return Camera;
    }(SceneEntity_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Camera;
    ;
});
define("Common/Color", ["require", "exports"], function (require, exports) {
    "use strict";
    var Color = (function () {
        function Color(r, g, b, a) {
            if (a === void 0) { a = 255; }
            this.set(r, g, b, a);
        }
        Object.defineProperty(Color, "red", {
            get: function () {
                return new Color(255, 0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "yellow", {
            get: function () {
                return new Color(255, 255, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "green", {
            get: function () {
                return new Color(0, 255, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "white", {
            get: function () {
                return new Color(255, 255, 255);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "blue", {
            get: function () {
                return new Color(0, 0, 255);
            },
            enumerable: true,
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
            return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
        };
        return Color;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Color;
});
define("Raytracer/Ray", ["require", "exports"], function (require, exports) {
    "use strict";
    var Ray = (function () {
        function Ray() {
        }
        Ray.prototype.set = function (start, lookAt) {
            this.start = start;
            this.dir = lookAt.clone().subtract(start).normalize(); // norm(lookAt - start)
        };
        return Ray;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ray;
});
define("Raytracer/HitTestResult", ["require", "exports"], function (require, exports) {
    "use strict";
    var HitTestResult = (function () {
        function HitTestResult(result, distance, ray, object) {
            this.result = result;
            this.distance = distance;
            this.ray = ray;
            this.object = object;
            if (this.result) {
                this.hitPoint = this.ray.start.clone().add(this.ray.dir.clone().scale(this.distance));
            }
        }
        return HitTestResult;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = HitTestResult;
});
define("Scene/Object", ["require", "exports", "Scene/SceneEntity", "Raytracer/HitTestResult"], function (require, exports, SceneEntity_2, HitTestResult_1) {
    "use strict";
    var Material = (function () {
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
    var Object = (function (_super) {
        __extends(Object, _super);
        function Object() {
            _super.apply(this, arguments);
        }
        return Object;
    }(SceneEntity_2.default));
    exports.Object = Object;
    var Sphere = (function (_super) {
        __extends(Sphere, _super);
        function Sphere(pos, radius) {
            _super.call(this);
            this.pos = pos;
            this.r = radius;
        }
        Sphere.prototype.HitTest = function (ray) {
            var b = ray.start.clone().subtract(this.pos).scale(2).dot(ray.dir);
            var a = ray.start.clone().subtract(this.pos);
            var c = a.dot(a) - this.r * this.r;
            var d = b * b - 4 * c;
            var t1 = (-b + Math.sqrt(d)) / 2;
            var t2 = (-b - Math.sqrt(d)) / 2;
            if (d >= 0) {
                if (t1 > 0.0 && t2 > 0.0) {
                    return new HitTestResult_1.default(true, Math.min(t1, t2), ray, this);
                }
            }
            return new HitTestResult_1.default(false, -1.0, ray, this);
        };
        Sphere.prototype.GetNormalInPoint = function (point) {
            return point.clone().subtract(this.pos).normalize();
        };
        return Sphere;
    }(Object));
    exports.Sphere = Sphere;
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(pos, normal) {
            _super.call(this);
            this.pos = pos;
            this.normal = normal;
        }
        Plane.prototype.HitTest = function (ray) {
            var dist = this.pos.clone().subtract(ray.start).dot(this.normal) / ray.dir.clone().dot(this.normal);
            if (dist > 0) {
                return new HitTestResult_1.default(true, dist, ray, this);
            }
            return new HitTestResult_1.default(false, -1.0, ray, this);
        };
        Plane.prototype.GetNormalInPoint = function (p) {
            return this.normal;
        };
        return Plane;
    }(Object));
    exports.Plane = Plane;
});
define("App", ["require", "exports", "Scene/Camera", "Common/Color", "Common/Vec3", "Scene/Object"], function (require, exports, Camera_1, Color_1, Vec3_3, Object_1) {
    "use strict";
    var canvas = document.querySelector('#myCanvas');
    var gl = canvas.getContext("webgl");
    //let w = Math.min(window.innerWidth, window.innerHeight);
    //let h = w;
    var w = window.innerWidth;
    var h = window.innerHeight;
    //console.log(w);
    w = 600;
    h = 600;
    canvas.width = w;
    canvas.height = h;
    function createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    function createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
    var t1 = new Date().getMilliseconds();
    var vertexShaderSource = document.querySelector("#vs").textContent;
    var fragmentShaderSource = document.querySelector("#ps").textContent;
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    var program = createProgram(gl, vertexShader, fragmentShader);
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var positions = [
        -1, 1,
        1, 1,
        1, -1,
        -1, -1 //left-bottom
    ];
    var indices = [0, 1, 3, 1, 2, 3];
    var texCoords = [
        0, 0,
        1, 0,
        1, 1,
        0, 1,
    ];
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    var camera = new Camera_1.default(new Vec3_3.default(0, 0, -49), new Vec3_3.default(0, 0, 0), Math.PI / 3, Math.PI / 3 * (canvas.height / canvas.width));
    var objects = new Array();
    var mRed = new Object_1.Material(Color_1.default.red, 0, 0.2);
    var mBlue = new Object_1.Material(Color_1.default.blue, 0, 0.5);
    var mGreen = new Object_1.Material(Color_1.default.green, 0, 0);
    var mWhite = new Object_1.Material(Color_1.default.white);
    var mMirror = new Object_1.Material(Color_1.default.blue, 0, 0.4);
    var mYellow = new Object_1.Material(Color_1.default.yellow, 0);
    var mRedSolid = new Object_1.Material(Color_1.default.red, 0);
    var s1 = new Object_1.Sphere(new Vec3_3.default(-10, 0.0, 0.0), 5);
    var s2 = new Object_1.Sphere(new Vec3_3.default(0, -13.0, -30.0), 10);
    var s3 = new Object_1.Sphere(new Vec3_3.default(0, 10.0, -10.0), 5);
    var ceil = new Object_1.Plane(new Vec3_3.default(0, 50, 0), new Vec3_3.default(0, -1, 0));
    var floor = new Object_1.Plane(new Vec3_3.default(0, -5, 0), new Vec3_3.default(0, 1, 0));
    var front = new Object_1.Plane(new Vec3_3.default(0, 0, 50), new Vec3_3.default(0, 0, -1));
    var back = new Object_1.Plane(new Vec3_3.default(0, 0, -50), new Vec3_3.default(0, 0, 1));
    var right = new Object_1.Plane(new Vec3_3.default(50, 0, 0), new Vec3_3.default(-1, 0, 0));
    var left = new Object_1.Plane(new Vec3_3.default(-50, 0, 0), new Vec3_3.default(1, 0, 0));
    s1.material = mRed;
    s2.material = mGreen;
    s3.material = mBlue;
    ceil.material = mWhite;
    floor.material = mMirror;
    right.material = mYellow;
    left.material = mGreen;
    front.material = mRedSolid;
    back.material = mWhite;
    objects.push(s1);
    //objects.push(s2);
    objects.push(s3);
    objects.push(ceil);
    objects.push(floor);
    objects.push(front);
    objects.push(back);
    objects.push(right);
    objects.push(left);
    function passCamera(name, camera) {
        var posLoc = gl.getUniformLocation(program, name + ".pos");
        var lookDirLoc = gl.getUniformLocation(program, name + ".lookDir");
        var zNearLoc = gl.getUniformLocation(program, name + ".zNear");
        var screenWLoc = gl.getUniformLocation(program, name + ".screenW");
        var screenHLoc = gl.getUniformLocation(program, name + ".screenH");
        gl.uniform3fv(posLoc, camera.pos.data);
        gl.uniform3fv(lookDirLoc, camera.basis.front.data);
        gl.uniform1f(zNearLoc, camera.zNear);
        gl.uniform1f(screenWLoc, camera.screenW);
        gl.uniform1f(screenHLoc, camera.screenH);
    }
    function passMaterial(name, mat) {
        var colorLoc = gl.getUniformLocation(program, name + ".color");
        var specLoc = gl.getUniformLocation(program, name + ".specular");
        var reflLoc = gl.getUniformLocation(program, name + ".reflection");
        gl.uniform3f(colorLoc, mat.color.r / 255.0, mat.color.g / 255.0, mat.color.b / 255.0);
        gl.uniform1f(specLoc, mat.specular);
        gl.uniform1f(reflLoc, mat.reflection);
    }
    function passObject(name, obj) {
        if (obj instanceof Object_1.Sphere) {
            var sphere = obj;
            var typeLoc = gl.getUniformLocation(program, name + ".type");
            var posLoc = gl.getUniformLocation(program, name + ".pos");
            var rLoc = gl.getUniformLocation(program, name + ".r");
            gl.uniform1i(typeLoc, 0);
            gl.uniform3fv(posLoc, sphere.pos.data);
            gl.uniform1f(rLoc, sphere.r);
        }
        else if (obj instanceof Object_1.Plane) {
            var plane = obj;
            var typeLoc = gl.getUniformLocation(program, name + ".type");
            var posLoc = gl.getUniformLocation(program, name + ".pos");
            var normalLoc = gl.getUniformLocation(program, name + ".normal");
            gl.uniform1i(typeLoc, 1);
            gl.uniform3fv(posLoc, plane.pos.data);
            gl.uniform3fv(normalLoc, plane.normal.data);
        }
        passMaterial(name + ".mat", obj.material);
    }
    passCamera("camera", camera);
    objects.forEach(function (obj, index) {
        passObject("objects[" + index + "]", obj);
    });
    t1 = new Date().getMilliseconds();
    //passCameraData(camera);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    var start = null;
    var last = null;
    var stop = false;
    var frames = 0;
    var fps = 0;
    var second = 0;
    var fpsElement = document.querySelector(".fpsValue");
    function render(now) {
        if (!start) {
            start = now;
            last = now;
        }
        if (stop == true) {
            return;
        }
        var dt = now - last;
        second += dt;
        last = now;
        objects[0].pos.x = Math.sin((now - start) * 0.001) * 10;
        objects[0].pos.z = Math.sin((now - start) * 0.001) * 20;
        passObject("objects[0]", objects[0]);
        passCamera("camera", camera);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        frames++;
        if (second > 1000) {
            fpsElement.textContent = frames.toString();
            frames = 0;
            second = 0;
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    addEventListener('keydown', function (e) {
        if (e.keyCode == 32) {
            stop = !stop;
            if (stop == false)
                requestAnimationFrame(render);
        }
    });
});
//# sourceMappingURL=app.js.map