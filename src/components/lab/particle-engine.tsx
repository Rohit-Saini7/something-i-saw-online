'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import {
  MousePointer2Icon,
  MagnetIcon,
  ZapIcon,
  SlidersHorizontalIcon,
  XIcon,
} from 'lucide-react';

const mouse = { x: -1000, y: -1000 };

type ParticlesConfig = {
  count: number; //? Number of dots
  connectionDist: number; //? Max distance to draw lines
  mouseRepelDist: number; //? Radius of mouse influence
  speed: number; //? Velocity multiplier
  color: string; //? Base color (cyan)
  friction: number;
  mode: 'repel' | 'attract';
  showTrails: boolean;
};

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  configRef: RefObject<ParticlesConfig>;
  ctx: CanvasRenderingContext2D;

  constructor(
    w: number,
    h: number,
    ctx: CanvasRenderingContext2D,
    configRef: RefObject<ParticlesConfig>
  ) {
    this.ctx = ctx;
    this.configRef = configRef;

    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * this.configRef.current.speed;
    this.vy = (Math.random() - 0.5) * this.configRef.current.speed;
    this.size = Math.random() * 2 + 1;
  }

  update(w: number, h: number) {
    const cfg = this.configRef.current;

    this.x += this.vx * cfg.speed;
    this.y += this.vy * cfg.speed;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < cfg.mouseRepelDist) {
      const force = (cfg.mouseRepelDist - distance) / cfg.mouseRepelDist;
      const direction = cfg.mode === 'attract' ? -1 : 1;

      const fx = (dx / distance) * force * cfg.speed * 2 * direction;
      const fy = (dy / distance) * force * cfg.speed * 2 * direction;

      this.vx -= fx;
      this.vy -= fy;
    }

    const frictionFactor = 1 - cfg.friction;

    this.vx *= frictionFactor;
    this.vy *= frictionFactor;

    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.configRef.current.color;
    ctx.fill();
  }

  explode(originX: number, originY: number) {
    const dx = this.x - originX;
    const dy = this.y - originY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const blastRadius = 500;

    if (dist < blastRadius) {
      const force = (blastRadius - dist) / blastRadius;
      this.vx += (dx / dist) * force * 50;
      this.vy += (dy / dist) * force * 50;
    }
  }
}

export default function ParticleLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isControlsOpen, setIsControlsOpen] = useState(true);

  const [config, setConfig] = useState<ParticlesConfig>({
    count: 120,
    connectionDist: 100,
    mouseRepelDist: 150,
    speed: 1,
    friction: 0.05,
    color: '#64ffda',
    mode: 'repel',
    showTrails: false,
  });

  const configRef = useRef(config);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const w = container.clientWidth;
      const h = container.clientHeight;
      const count = configRef.current.count;

      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h, ctx, configRef));
      }
      particlesRef.current = particles;
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const animate = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const cfg = configRef.current;

      if (particles.length !== cfg.count) initParticles();

      if (cfg.showTrails) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      particles.forEach((p, i) => {
        p.update(w, h);
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < cfg.connectionDist) {
            ctx.beginPath();
            const strokeColor = cfg.color;
            if (strokeColor.startsWith('#')) {
              ctx.strokeStyle = strokeColor;
              ctx.globalAlpha = 1 - dist / cfg.connectionDist;
            } else {
              ctx.strokeStyle = strokeColor;
            }
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particlesRef.current.forEach((p: Particle) => {
        p.explode(clickX, clickY);
      });
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousedown', handleClick);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='bg-background relative h-screen w-screen overflow-hidden'
    >
      <canvas
        ref={canvasRef}
        className='block h-full w-full cursor-crosshair'
      />

      <button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className={`fixed top-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 backdrop-blur-md transition-all duration-300 hover:bg-slate-800 ${
          isControlsOpen
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
            : 'bg-slate-900/50 text-slate-400'
        }`}
      >
        {isControlsOpen ? (
          <XIcon className='h-5 w-5' />
        ) : (
          <SlidersHorizontalIcon className='h-5 w-5' />
        )}
      </button>

      <div
        className={`fixed right-6 top-20 z-40 w-full max-w-xs transition-all duration-500 ease-out ${
          isControlsOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-[120%] opacity-0 pointer-events-none'
        }`}
      >
        <div className='bg-slate-900/90 border-slate-800 w-full rounded-xl border p-5 shadow-2xl backdrop-blur-md'>
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-slate-500 text-xs font-bold uppercase tracking-wide'>
              Exp Controls
            </h3>
            <span className='flex items-center gap-1 text-2xs text-emerald-400 font-mono bg-emerald-400/10 px-2 py-1 rounded-full'>
              <ZapIcon className='w-3 h-3' /> CLICK TO SHOCK
            </span>
          </div>

          <div className='mb-6 grid grid-cols-2 gap-2 bg-background p-1 rounded-lg border border-slate-800'>
            <button
              onClick={() => setConfig((prev) => ({ ...prev, mode: 'repel' }))}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${
                config.mode === 'repel'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <MousePointer2Icon className='w-3 h-3' /> Repel
            </button>
            <button
              onClick={() =>
                setConfig((prev) => ({ ...prev, mode: 'attract' }))
              }
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${
                config.mode === 'attract'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <MagnetIcon className='w-3 h-3' /> Attract
            </button>
          </div>

          <div className='flex items-center justify-between mb-6 px-1'>
            <span className='text-slate-300 text-xs'>Motion Trails</span>
            <button
              onClick={() =>
                setConfig((prev) => ({ ...prev, showTrails: !prev.showTrails }))
              }
              className={`w-10 h-5 rounded-full transition-colors relative ${
                config.showTrails ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${
                  config.showTrails ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className='h-px bg-slate-800 w-full mb-5' />

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 flex justify-between text-xs'>
              <span>Density</span>
              <span className='text-emerald-400 font-mono'>{config.count}</span>
            </div>
            <input
              type='range'
              min='20'
              max='300'
              value={config.count}
              onChange={(e) =>
                setConfig({ ...config, count: Number(e.target.value) })
              }
              className='accent-emerald-500 bg-slate-700 h-1 w-full cursor-pointer appearance-none rounded-lg'
            />
          </div>

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 flex justify-between text-xs'>
              <span>Link Range</span>
              <span className='text-emerald-400 font-mono'>
                {config.connectionDist}px
              </span>
            </div>
            <input
              type='range'
              min='50'
              max='250'
              value={config.connectionDist}
              onChange={(e) =>
                setConfig({
                  ...config,
                  connectionDist: Number(e.target.value),
                })
              }
              className='accent-emerald-500 bg-slate-700 h-1 w-full cursor-pointer appearance-none rounded-lg'
            />
          </div>

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 flex justify-between text-xs'>
              <span>Volatility</span>
              <span className='text-emerald-400 font-mono'>
                {config.speed.toFixed(1)}x
              </span>
            </div>
            <input
              type='range'
              min='0.1'
              max='4'
              step='0.1'
              value={config.speed}
              onChange={(e) =>
                setConfig({ ...config, speed: Number(e.target.value) })
              }
              className='accent-emerald-500 bg-slate-700 h-1 w-full cursor-pointer appearance-none rounded-lg'
            />
          </div>

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 flex justify-between text-xs'>
              <span>Friction</span>
              <span className='text-emerald-400 font-mono'>
                {config.friction.toFixed(2)}
              </span>
            </div>
            <input
              type='range'
              min='0.01'
              max='0.30'
              step='0.01'
              value={config.friction}
              onChange={(e) =>
                setConfig({ ...config, friction: Number(e.target.value) })
              }
              className='accent-emerald-500 bg-slate-700 h-1 w-full cursor-pointer appearance-none rounded-lg'
            />
          </div>

          <div>
            <div className='text-slate-400 mb-2 text-xs'>Theme</div>
            <div className='flex gap-3'>
              {['#64ffda', '#f43f5e', '#3b82f6', '#a855f7'].map((c) => (
                <button
                  key={c}
                  onClick={() => setConfig({ ...config, color: c })}
                  className={`h-6 w-6 rounded-full border border-slate-600 transition-transform hover:scale-110 ${
                    config.color === c
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900'
                      : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
