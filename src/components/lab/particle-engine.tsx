'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  MousePointer2Icon,
  MagnetIcon,
  ZapIcon,
  SlidersHorizontalIcon,
  XIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@ui-components/badge';
import { Slider } from '@ui-components/slider';
import { Button } from '@ui-components/button';
import { ButtonGroup } from '@ui-components/button-group';
import { Switch } from '@ui-components/switch';
import { Label } from '@ui-components/label';

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
  const { resolvedTheme } = useTheme();
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const getBackgroundColor = () => {
      const styles = getComputedStyle(container);
      return styles.getPropertyValue('--background');
    };

    const animate = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const cfg = configRef.current;

      if (particles.length !== cfg.count) initParticles();

      const bg = getBackgroundColor();

      const isDark = resolvedTheme === 'dark';
      if (cfg.showTrails) {
        ctx.fillStyle = isDark
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(255, 255, 255, 0.5)';
      } else {
        ctx.fillStyle = bg;
      }

      ctx.fillRect(0, 0, w, h);

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
            ctx.strokeStyle = cfg.color;
            ctx.globalAlpha = 1 - dist / cfg.connectionDist;
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
      particlesRef.current.forEach((p) => p.explode(clickX, clickY));
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
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className='relative h-screen w-screen overflow-hidden bg-background'
    >
      <canvas
        ref={canvasRef}
        className='block h-full w-full cursor-crosshair'
      />

      <Button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className='fixed top-6 right-6 z-40 rounded-full'
        variant='outline'
        size='icon-lg'
      >
        {isControlsOpen ? (
          <XIcon className='h-5 w-5' />
        ) : (
          <SlidersHorizontalIcon className='h-5 w-5' />
        )}
      </Button>

      <div
        className={cn(
          'fixed right-6 top-20 z-40 w-full max-w-xs transition',
          isControlsOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-[120%] opacity-0 pointer-events-none'
        )}
      >
        <div className='rounded-xl border border-border bg-card p-5 shadow-xl backdrop-blur-md'>
          <div className='mb-5 flex items-center justify-between'>
            <h3 className='text-muted-foreground text-xs font-bold uppercase tracking-wide'>
              Exp Controls
            </h3>
            <Badge variant='outline'>
              <ZapIcon className='h-3 w-3' /> CLICK TO SHOCK
            </Badge>
          </div>

          <ButtonGroup className='mb-6 grid w-full grid-cols-2 rounded-lg'>
            {(['repel', 'attract'] as const).map((mode) => {
              const isActive = config.mode === mode;
              return (
                <Button
                  key={mode}
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => setConfig((p) => ({ ...p, mode }))}
                >
                  {mode === 'repel' ? (
                    <MousePointer2Icon className='h-3 w-3 text-inherit' />
                  ) : (
                    <MagnetIcon className='h-3 w-3 text-inherit' />
                  )}
                  {mode}
                </Button>
              );
            })}
          </ButtonGroup>

          <div className='flex items-center space-x-2 mb-6 justify-between px-1'>
            <Label htmlFor='airplane-mode' className='text-muted-foreground'>
              Motion Trails
            </Label>
            <Switch
              checked={config.showTrails}
              onCheckedChange={() =>
                setConfig((prev) => ({
                  ...prev,
                  showTrails: !prev.showTrails,
                }))
              }
              id='airplane-mode'
            />
          </div>

          <div className='space-y-5'>
            {[
              {
                label: 'Density',
                value: config.count,
                min: 20,
                max: 300,
                onChange: (v: number) => setConfig((c) => ({ ...c, count: v })),
              },
              {
                label: 'Link Range',
                value: config.connectionDist,
                min: 50,
                max: 250,
                onChange: (v: number) =>
                  setConfig((c) => ({ ...c, connectionDist: v })),
              },
              {
                label: 'Volatility',
                value: config.speed,
                min: 0.1,
                max: 4,
                onChange: (v: number) => setConfig((c) => ({ ...c, speed: v })),
                step: 0.1,
              },
              {
                label: 'Friction',
                value: config.friction,
                min: 0.01,
                max: 0.3,
                onChange: (v: number) =>
                  setConfig((c) => ({ ...c, friction: v })),
                step: 0.01,
              },
            ].map(({ label, value, min, max, onChange, step = 1 }, i) => (
              <div key={i} className='space-y-2'>
                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>{label}</span>
                  <span className='font-mono text-foreground'>{value}</span>
                </div>

                <Slider
                  min={min as number}
                  max={max as number}
                  step={step as number}
                  value={[value as number]}
                  onValueChange={([v]) => onChange(v)}
                />
              </div>
            ))}
            <div className='mt-6'>
              <div className='mb-2 text-xs text-muted-foreground'>Theme</div>
              <div className='flex gap-3'>
                {['#64ffda', '#f43f5e', '#3b82f6', '#0f172a'].map((c) => (
                  <Button
                    key={c}
                    onClick={() => setConfig((prev) => ({ ...prev, color: c }))}
                    className={cn(
                      'h-6 w-6 rounded-full transition-transform hover:scale-110',
                      config.color === c &&
                        'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    )}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
