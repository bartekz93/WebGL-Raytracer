
export class Shaders {
    
    public static fragment(objectsNum: number=7, reflectionDepth: number=3) {

        return `precision mediump float;
		
		varying vec4 v_color;
		
		//enum Object type
		#define SPHERE 1
		#define PLANE 2
		
		#define OBJECTSNUM ${objectsNum}
		#define REFLDEPTH ${reflectionDepth}
		
		struct Material 
		{
			vec3 color;
			float specular;
			float reflection;
			float refraction;
		};
		
		struct Object {
			int type;
			vec3 pos;
			float r;
			vec3 normal;
			Material mat;
		};
		
		struct Ray {
			vec3 start;
			vec3 dir;
		};
		
		struct Camera {
			vec3 pos;
			
			vec3 front;
			vec3 right;
			vec3 up;
		
			float zNear;
			float screenW;
			float screenH;
			mat4 worldMat;
		};
		
		uniform Camera camera;
		uniform Object objects[OBJECTSNUM];
		uniform vec3 light;
		
		
		void CreateRay(in vec3 start, in vec3 dir, out Ray ray)
		{
			ray.start = start;
			ray.dir = dir;
		}
		
		vec3 GetNormalInPoint(in Object obj, vec3 point) 
		{
			if (obj.type == SPHERE) {
				return normalize(point - obj.pos);
			}
			else if (obj.type == PLANE) {
				return obj.normal;
			}
		}
		
		float ComputeDiffuse(vec3 lightPos, vec3 cameraPos, vec3 pointPos, in Object obj) 
		{
			vec3 toCamera = normalize(cameraPos - pointPos);
			vec3 toLight = normalize(lightPos - pointPos);
			vec3 normal = GetNormalInPoint(obj, pointPos);
		
			float attenuation = max(min(1.0 - length(lightPos - pointPos) / 200.0, 1.0), 0.0);
			
			float scale = 5.0;
		
			if (obj.type == PLANE && obj.normal.y == 1.0) {
				if ((mod(pointPos.x / scale, 2.0) < 1.0 && mod(pointPos.z / scale, 2.0) > 1.0) || 
				(mod(pointPos.x / scale, 2.0) > 1.0 && mod(pointPos.z / scale, 2.0) < 1.0)) {
					return dot(normal, toLight)*0.4*attenuation;	
				}
			}
		
		
			return min(max(dot(normal, toLight)*attenuation, 0.0), 1.0);
		}
		
		float SphereHitTest(in Object sphere, Ray ray)
		{
			float b = dot((ray.start - sphere.pos)*2.0, ray.dir);
			float c = dot((ray.start - sphere.pos), (ray.start - sphere.pos)) - pow(sphere.r, 2.0);
		
			float d = pow(b, 2.0) - 4.0*c;
		
			float t1 = (-b + sqrt(d)) / 2.0; 
			float t2 = (-b - sqrt(d)) / 2.0;
		
			if (d >= 0.0)
			{
				if (t1 > 0.0 && t2 > 0.0) return min(t1, t2);
			}
		
			return -1.0;
		}
		
		float PlaneHitTest(in Object plane, Ray ray)
		{
			return dot(plane.pos - ray.start, plane.normal) / dot(ray.dir, plane.normal);
		}
		
		float HitTest(Object obj, Ray ray) 
		{
			if (obj.type == SPHERE) {
				return SphereHitTest(obj, ray);
			}
			else if (obj.type == PLANE) {
				return PlaneHitTest(obj, ray);
			}
		}
		
		
		float CastRay(Ray ray, int except, out vec3 hitPoint, out Object hitObject, out int objIndex)
		{
			float minDist = -1.0;
			float dist;
		
			for (int j=0;j<OBJECTSNUM;j++) {
				
				if (j == except) continue;
		
				dist = HitTest(objects[j], ray);
				if (dist > 0.0  && (minDist < 0.0 || dist < minDist)) {
					minDist = dist;
					hitObject = objects[j];
					objIndex = j;
				}
			}
		
			if (minDist > 0.0) 
			{
				hitPoint = ray.start+ray.dir*minDist;
				return minDist;
			}
		
			return -1.0;
		}
		
		
		void main() {
			
		
			vec3 pixel;
		
			pixel.x = v_color.x * camera.screenW/2.0;
			pixel.y = v_color.y * camera.screenH/2.0;
			pixel.z = camera.zNear;
			pixel = (camera.worldMat * vec4(pixel, 1.0)).xyz;
			
		
			Ray ray, shadowRay;
		
			vec3 hitPoint;
			vec3 shadowHitPoint;
			Object hitObject;
			Object shadowCaster;
			int hitObjIndex;
			float cumulatedDiffuse = 1.0;
			float cumulatedReflection = 1.0;
			vec3 color = vec3(0.0, 0.0, 0.0);
			int lastObject = -1;
			float dist = -1.0;
		
			for (int i=0;i<REFLDEPTH;i++)
			{
				if (i > 0) {
					if (hitObject.mat.reflection > 0.0) {
						vec3 n = GetNormalInPoint(hitObject, hitPoint);
						CreateRay(hitPoint, normalize(reflect(ray.dir, n)), ray);
					}
				}
				else {
					CreateRay(camera.pos, normalize(pixel - camera.pos), ray);
				}
		
				if (CastRay(ray, lastObject, hitPoint, hitObject, hitObjIndex) > 0.0) {
		
					lastObject = hitObjIndex;
					CreateRay(hitPoint, normalize(light - hitPoint), shadowRay);
					dist = CastRay(shadowRay, lastObject, shadowHitPoint, shadowCaster, hitObjIndex);
					if (dist > 0.0 && dist < length(light - hitPoint)) {
						cumulatedDiffuse *= 0.7;
					}
		
					cumulatedDiffuse *= ComputeDiffuse(light, camera.pos, hitPoint, hitObject);
					color += hitObject.mat.color*cumulatedDiffuse*cumulatedReflection*(1.0-hitObject.mat.reflection);
					cumulatedReflection *= hitObject.mat.reflection;
		
					if (!(hitObject.mat.reflection > 0.0)) {
						break;
					}
				}
			}
		
			gl_FragColor = vec4(color, 1);
		}`;
	}
	
	public static vertex() {
		return `attribute vec4 a_position;
		
		varying vec4 v_color;
		
		void main() {
		
			gl_Position = a_position;
			v_color = a_position;
		}`;
	}
}