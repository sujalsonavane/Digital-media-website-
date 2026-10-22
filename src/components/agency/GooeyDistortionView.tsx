'use client';

import React, { useRef, useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/utils/motion';

export interface GooeyDistortionViewProps {
  imageSrc: string;
  alt: string;
  fallbackComponent?: React.ReactNode;
  className?: string;
  intensity?: number;
  chromatic?: number;
  radius?: number;
}

const VERTEX_SHADER_SOURCE = `
  precision highp float;
  attribute vec2 a_position;
  attribute vec2 a_uv;
  varying vec2 v_uv;

  void main() {
    v_uv = a_uv;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_intensity;
  uniform float u_radius;
  uniform float u_chromatic;

  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;

    // Aspect ratio correction to keep ripples proportional
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 aspectVec = vec2(aspect, 1.0);

    vec2 diff = (uv - u_mouse) * aspectVec;
    float dist = length(diff);

    // Smooth radial influence: maximum at mouse pointer, decaying gracefully to 0
    float influence = smoothstep(u_radius, 0.0, dist);

    // Velocity vector calculation
    vec2 velocity = (u_mouse - u_prevMouse) * aspectVec;

    // Harmonic concentric ripple waves
    float wave1 = sin(dist * 26.0 - u_time * 5.2);
    float wave2 = cos(dist * 14.0 - u_time * 3.8);
    float combinedWave = (wave1 * 0.65 + wave2 * 0.35);

    // Direction vector away from pointer with subtle velocity wake
    vec2 dir = dist > 0.0001 ? normalize(diff) : vec2(0.0);
    vec2 liquidDisplacement = (dir * combinedWave * 0.024 + velocity * 0.35) * influence * u_intensity;

    // Ambient micro-shimmer when hovering
    vec2 ambientFluid = vec2(
      sin(uv.y * 16.0 + u_time * 2.2),
      cos(uv.x * 16.0 + u_time * 2.2)
    ) * 0.006 * influence * u_intensity;

    vec2 finalOffset = liquidDisplacement + ambientFluid;

    // Optical chromatic separation along ripple displacement vectors
    float chromOffset = u_chromatic * influence * u_intensity * 0.012;
    vec2 uvR = clamp(uv + finalOffset + dir * chromOffset, 0.001, 0.999);
    vec2 uvG = clamp(uv + finalOffset, 0.001, 0.999);
    vec2 uvB = clamp(uv + finalOffset - dir * chromOffset, 0.001, 0.999);

    float r = texture2D(u_texture, uvR).r;
    float g = texture2D(u_texture, uvG).g;
    float b = texture2D(u_texture, uvB).b;
    float a = texture2D(u_texture, uvG).a;

    gl_FragColor = vec4(r, g, b, a);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('WebGL shader compilation warning:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function GooeyDistortionView({
  imageSrc,
  alt,
  fallbackComponent,
  className = '',
  intensity = 0.8,
  chromatic = 1.0,
  radius = 0.42,
}: GooeyDistortionViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [useWebGL, setUseWebGL] = useState(false);

  // Animation and interaction state stored in refs to avoid triggering React re-renders
  const stateRef = useRef({
    currentMouse: { x: 0.5, y: 0.5 },
    targetMouse: { x: 0.5, y: 0.5 },
    prevMouse: { x: 0.5, y: 0.5 },
    currentIntensity: 0.0,
    targetIntensity: 0.0,
    startTime: 0,
    rafId: 0,
    isHovered: false,
    isVisible: true,
    isAnimating: false,
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    texture: null as WebGLTexture | null,
    positionBuffer: null as WebGLBuffer | null,
    uvBuffer: null as WebGLBuffer | null,
    uniforms: {
      u_texture: null as WebGLUniformLocation | null,
      u_mouse: null as WebGLUniformLocation | null,
      u_prevMouse: null as WebGLUniformLocation | null,
      u_resolution: null as WebGLUniformLocation | null,
      u_time: null as WebGLUniformLocation | null,
      u_intensity: null as WebGLUniformLocation | null,
      u_radius: null as WebGLUniformLocation | null,
      u_chromatic: null as WebGLUniformLocation | null,
    },
  });

  useEffect(() => {
    // 1. Accessibility & device capability detection
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion()) return;

    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    if (isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 2. Initialize WebGL Context safely
    let gl: WebGLRenderingContext | null = null;
    try {
      gl =
        canvas.getContext('webgl', {
          alpha: true,
          antialias: true,
          premultipliedAlpha: false,
          powerPreference: 'low-power',
        }) || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    } catch {
      return;
    }

    if (!gl) return;

    const state = stateRef.current;
    state.gl = gl;

    // 3. Compile Shaders & Link Program
    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    state.program = program;
    gl.useProgram(program);

    // 4. Cache Uniform Locations
    state.uniforms = {
      u_texture: gl.getUniformLocation(program, 'u_texture'),
      u_mouse: gl.getUniformLocation(program, 'u_mouse'),
      u_prevMouse: gl.getUniformLocation(program, 'u_prevMouse'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_intensity: gl.getUniformLocation(program, 'u_intensity'),
      u_radius: gl.getUniformLocation(program, 'u_radius'),
      u_chromatic: gl.getUniformLocation(program, 'u_chromatic'),
    };

    // 5. Setup Quad Buffers [-1, 1] for Full Canvas Coverage
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const uvs = new Float32Array([
      0, 1,
      1, 1,
      0, 0,
      0, 0,
      1, 1,
      1, 0,
    ]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    state.positionBuffer = posBuffer;

    const aPosLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    state.uvBuffer = uvBuf;

    const aUvLoc = gl.getAttribLocation(program, 'a_uv');
    gl.enableVertexAttribArray(aUvLoc);
    gl.vertexAttribPointer(aUvLoc, 2, gl.FLOAT, false, 0, 0);

    // 6. Load Image as Same-Origin WebGL Texture
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const renderStaticFrame = () => {
      if (!gl || !state.program || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(state.program);

      gl.uniform2f(state.uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform2f(state.uniforms.u_mouse, state.currentMouse.x, state.currentMouse.y);
      gl.uniform2f(state.uniforms.u_prevMouse, state.prevMouse.x, state.prevMouse.y);
      gl.uniform1f(state.uniforms.u_time, 0.0);
      gl.uniform1f(state.uniforms.u_intensity, 0.0);
      gl.uniform1f(state.uniforms.u_radius, radius);
      gl.uniform1f(state.uniforms.u_chromatic, chromatic);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    img.onload = () => {
      if (!gl) return;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Clamp to edge for clean borders without wrapping artifacts
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      state.texture = texture;

      // Draw initial clean pristine frame and enable WebGL display
      setUseWebGL(true);
      renderStaticFrame();
    };

    img.src = imageSrc;

    // 7. ResizeObserver to keep canvas resolution synced with device pixel ratio
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.floor(entry.contentRect.width * dpr);
        const h = Math.floor(entry.contentRect.height * dpr);
        if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
          canvas.width = w;
          canvas.height = h;
          if (gl) gl.viewport(0, 0, w, h);
          renderStaticFrame();
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // 8. IntersectionObserver to pause rendering when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        state.isVisible = entry.isIntersecting;
        if (!entry.isIntersecting && state.isAnimating) {
          cancelAnimationFrame(state.rafId);
          state.isAnimating = false;
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    // 9. Context Loss & Restoration Handling
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(state.rafId);
      state.isAnimating = false;
    };

    const handleContextRestored = () => {
      img.src = imageSrc;
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 10. Cleanup on unmount
    return () => {
      cancelAnimationFrame(state.rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      if (gl) {
        if (state.texture) gl.deleteTexture(state.texture);
        if (state.positionBuffer) gl.deleteBuffer(state.positionBuffer);
        if (state.uvBuffer) gl.deleteBuffer(state.uvBuffer);
        if (state.program) {
          gl.deleteProgram(state.program);
          gl.deleteShader(vertShader);
          gl.deleteShader(fragShader);
        }
      }
    };
  }, [imageSrc, intensity, chromatic, radius]);

  // Pointer event handlers update WebGL uniforms directly without React re-renders
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!useWebGL) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const state = stateRef.current;
    state.isHovered = true;
    state.targetIntensity = 1.0;
    state.targetMouse = { x: nx, y: ny };
    state.currentMouse = { x: nx, y: ny };
    state.prevMouse = { x: nx, y: ny };

    if (!state.isAnimating) {
      state.isAnimating = true;
      const loop = (ts: number) => {
        if (!state.gl || !state.program) return;
        if (!state.startTime) state.startTime = ts;
        const elapsed = (ts - state.startTime) * 0.001;

        state.prevMouse = { ...state.currentMouse };
        state.currentMouse.x += (state.targetMouse.x - state.currentMouse.x) * 0.14;
        state.currentMouse.y += (state.targetMouse.y - state.currentMouse.y) * 0.14;

        const decay = state.isHovered ? 0.12 : 0.07;
        state.currentIntensity += (state.targetIntensity - state.currentIntensity) * decay;

        if (!state.isHovered && state.currentIntensity < 0.001) {
          state.currentIntensity = 0.0;
          if (state.gl && canvasRef.current) {
            state.gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
            state.gl.uniform1f(state.uniforms.u_intensity, 0.0);
            state.gl.drawArrays(state.gl.TRIANGLES, 0, 6);
          }
          state.isAnimating = false;
          return;
        }

        if (state.gl && canvasRef.current) {
          state.gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
          state.gl.useProgram(state.program);
          state.gl.uniform2f(state.uniforms.u_resolution, canvasRef.current.width, canvasRef.current.height);
          state.gl.uniform2f(state.uniforms.u_mouse, state.currentMouse.x, state.currentMouse.y);
          state.gl.uniform2f(state.uniforms.u_prevMouse, state.prevMouse.x, state.prevMouse.y);
          state.gl.uniform1f(state.uniforms.u_time, elapsed);
          state.gl.uniform1f(state.uniforms.u_intensity, state.currentIntensity * intensity);
          state.gl.uniform1f(state.uniforms.u_radius, radius);
          state.gl.uniform1f(state.uniforms.u_chromatic, chromatic);
          state.gl.drawArrays(state.gl.TRIANGLES, 0, 6);
        }

        state.rafId = requestAnimationFrame(loop);
      };
      state.rafId = requestAnimationFrame(loop);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!useWebGL) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const state = stateRef.current;
    state.targetMouse = { x: nx, y: ny };
  };

  const handlePointerLeave = () => {
    if (!useWebGL) return;
    const state = stateRef.current;
    state.isHovered = false;
    state.targetIntensity = 0.0;
  };

  // Keyboard accessibility
  const handleFocus = () => {
    if (!useWebGL) return;
    const state = stateRef.current;
    state.isHovered = true;
    state.targetIntensity = 0.6;
    state.targetMouse = { x: 0.5, y: 0.5 };
  };

  const handleBlur = () => {
    if (!useWebGL) return;
    const state = stateRef.current;
    state.isHovered = false;
    state.targetIntensity = 0.0;
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      tabIndex={0}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`relative w-full h-full overflow-hidden select-none outline-none ${className}`}
    >
      {/* 1. Underlying fallback artwork (always rendered immediately for zero CLS / SSR) */}
      <div
        className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${
          useWebGL ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
        }`}
      >
        {fallbackComponent || (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-contain pointer-events-none"
            loading="lazy"
          />
        )}
      </div>

      {/* 2. Real WebGL Liquid Shader Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`w-full h-full absolute inset-0 block pointer-events-none transition-opacity duration-400 ${
          useWebGL ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
