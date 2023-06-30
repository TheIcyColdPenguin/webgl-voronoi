#version 300 es

precision highp float;

out vec4 out_color;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 col = vec2(sin(uv.xy * 30.0 + u_time * 4.0));
    out_color = vec4(col, 1.0, 1.0);
}