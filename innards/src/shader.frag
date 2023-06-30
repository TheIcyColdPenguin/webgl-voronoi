#version 300 es

precision highp float;

#define NUM_POINTS 100

out vec4 out_color;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_points[NUM_POINTS];

void main() {
    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;
    
    float dist = 1.0 / 0.0; // inf
    
    for(int i = 0; i < NUM_POINTS; i ++ ) {
        dist = min(dist, distance(uv, u_points[i]));
    }
    
    dist = dist + 1.0 / (u_time * 100000.0);
    
    vec3 col = vec3(dist);
    out_color = vec4(col, 1.0);
}