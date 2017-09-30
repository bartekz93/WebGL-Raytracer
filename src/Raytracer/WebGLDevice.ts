export class Geometry {
    positions: Array<number>;
    indices: Array<number>;
}

export class WebGLDevice {
    gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    private createShader(type: number, source: string) {
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        let success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    
        if (success) {
            return shader;
        }
         
        console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    createVertexShader(source: string) {
        return this.createShader(this.gl.VERTEX_SHADER, source);
    }

    createFragmentShader(source: string) {
        return this.createShader(this.gl.FRAGMENT_SHADER, source);
    }

    createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        let program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
    
        var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    
        if (success) {
            return program;
        }
    
        console.log(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }

    setGeometry(geom: Geometry) {
        let positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(geom.positions), this.gl.STATIC_DRAW);

        if (geom.indices && geom.indices.length > 0) {
            let indicesBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geom.indices), this.gl.STATIC_DRAW);
        }
    }
}