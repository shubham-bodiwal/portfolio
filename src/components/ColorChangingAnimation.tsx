import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';


const MainContainer = styled.div`
  height: 100%;
  width: 100%;`


const ColorChangingAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cW = window.innerWidth;
    let cH = window.innerHeight;
    let bgColor = "#FF6138";
    let animationFrameId: number;
    let inactiveTimeout: number | null = null;

    // ----- Helper Types and Classes -----
    interface CircleOptions {
      x: number;
      y: number;
      r: number;
      fill?: string;
      stroke?: { width: number; color: string };
      opacity?: number;
    }

    class Circle {
      x: number;
      y: number;
      r: number;
      fill?: string;
      stroke?: { width: number; color: string };
      opacity: number;

      constructor(opts: CircleOptions) {
        this.x = opts.x;
        this.y = opts.y;
        this.r = opts.r;
        this.fill = opts.fill;
        this.stroke = opts.stroke;
        this.opacity = opts.opacity !== undefined ? opts.opacity : 1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        if (this.stroke) {
          ctx.strokeStyle = this.stroke.color;
          ctx.lineWidth = this.stroke.width;
          ctx.stroke();
        }
        if (this.fill) {
          ctx.fillStyle = this.fill;
          ctx.fill();
        }
        ctx.closePath();
        ctx.globalAlpha = 1;
      }
    }

    interface Animation {
      startTime: number;
      duration: number;
      update: (progress: number) => void;
      complete: () => void;
      circles: Circle[];
      calledComplete?: boolean;
    }

    let animations: Animation[] = [];

    // ----- Easing Functions & Random Helper -----
    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
    const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const random = (min: number, max: number): number => Math.random() * (max - min) + min;

    // ----- Utility Functions -----
    const calcPageFillRadius = (x: number, y: number): number => {
      const l = Math.max(x, cW - x);
      const h = Math.max(y, cH - y);
      return Math.sqrt(l * l + h * h);
    };

    // ----- Color Picker -----
    const colorPicker = (() => {
      const colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
      let index = 0;
      return {
        next: () => {
          index = (index + 1) % colors.length;
          return colors[index];
        },
        current: () => colors[index]
      };
    })();

    // ----- Event Handler (Mouse/Touch) -----
    const handleEvent = (e: MouseEvent | TouchEvent) => {
      let event: MouseEvent | Touch;
      if ("touches" in e) {
        e.preventDefault();
        event = e.touches[0];
      } else {
        event = e;
      }
      const pageX = event.pageX;
      const pageY = event.pageY;
      const currentColor = colorPicker.current();
      const nextColor = colorPicker.next();
      const targetR = calcPageFillRadius(pageX, pageY);
      const rippleSize = Math.min(200, cW * 0.4);
      const minCoverDuration = 750;
      const now = performance.now();

      // --- Page Fill Animation ---
      const pageFill = new Circle({
        x: pageX,
        y: pageY,
        r: 0,
        fill: nextColor
      });
      const fillAnimation: Animation = {
        startTime: now,
        duration: Math.max(targetR / 2, minCoverDuration),
        circles: [pageFill],
        update: (progress: number) => {
          const eased = easeOutQuart(progress);
          pageFill.r = eased * targetR;
        },
        complete: () => {
          // Set the background color to the new color when complete.
          bgColor = pageFill.fill || bgColor;
        }
      };

      // --- Ripple Animation ---
      const ripple = new Circle({
        x: pageX,
        y: pageY,
        r: 0,
        fill: currentColor,
        stroke: { width: 3, color: currentColor },
        opacity: 1
      });
      const rippleAnimation: Animation = {
        startTime: now,
        duration: 900,
        circles: [ripple],
        update: (progress: number) => {
          const eased = easeOutExpo(progress);
          ripple.r = eased * rippleSize;
          ripple.opacity = 1 - eased;
        },
        complete: () => { }
      };

      // --- Particles Animation ---
      const particles: Circle[] = [];
      const numParticles = 32;
      for (let i = 0; i < numParticles; i++) {
        const particle = new Circle({
          x: pageX,
          y: pageY,
          r: random(24, 48),
          fill: currentColor
        });
        (particle as any).initialX = pageX;
        (particle as any).initialY = pageY;
        (particle as any).targetX = pageX + random(-rippleSize, rippleSize);
        (particle as any).targetY = pageY + random(-rippleSize * 1.15, rippleSize * 1.15);
        (particle as any).initialR = particle.r;
        particles.push(particle);
      }
      const particlesDuration = random(1000, 1300);
      const particlesAnimation: Animation = {
        startTime: now,
        duration: particlesDuration,
        circles: particles,
        update: (progress: number) => {
          const eased = easeOutExpo(progress);
          particles.forEach(particle => {
            const initX = (particle as any).initialX;
            const initY = (particle as any).initialY;
            const targetX = (particle as any).targetX;
            const targetY = (particle as any).targetY;
            const initR = (particle as any).initialR;
            particle.x = initX + (targetX - initX) * eased;
            particle.y = initY + (targetY - initY) * eased;
            particle.r = initR * (1 - eased);
          });
        },
        complete: () => { }
      };

      animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    };

    // ----- Canvas Resizing -----
    const resizeCanvas = () => {
      cW = window.innerWidth;
      cH = window.innerHeight;
      canvas.width = cW * devicePixelRatio;
      canvas.height = cH * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ----- Register Event Listeners -----
    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("touchstart", handleEvent);

    // ----- Inactive User Handling -----
    const fauxClick = (x: number, y: number) => {
      const evt = new MouseEvent("mousedown", {
        clientX: x,
        clientY: y
      });
      document.dispatchEvent(evt);
    };

    const clearInactiveTimeout = () => {
      if (inactiveTimeout) {
        clearTimeout(inactiveTimeout);
        inactiveTimeout = null;
        document.removeEventListener("mousedown", clearInactiveTimeout);
        document.removeEventListener("touchstart", clearInactiveTimeout);
      }
    };

    const handleInactiveUser = () => {
      inactiveTimeout = window.setTimeout(() => {
        fauxClick(cW / 2, cH / 2);
      }, 2000);
      document.addEventListener("mousedown", clearInactiveTimeout);
      document.addEventListener("touchstart", clearInactiveTimeout);
    };
    handleInactiveUser();

    if (/fullcpgrid/.test(window.location.pathname)) {
      const startFauxClicking = () => {
        setTimeout(() => {
          fauxClick(random(cW * 0.2, cW * 0.8), random(cH * 0.2, cH * 0.8));
          startFauxClicking();
        }, random(200, 900));
      };
      startFauxClicking();
    }

    // ----- Main Animation Loop -----
    const update = () => {
      const now = performance.now();
      // Clear the canvas with the current background color.
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cW, cH);

      animations.forEach(anim => {
        const progress = Math.min((now - anim.startTime) / anim.duration, 1);
        anim.update(progress);
        anim.circles.forEach(circle => circle.draw(ctx));
        if (progress === 1 && !anim.calledComplete) {
          anim.complete();
          anim.calledComplete = true;
        }
      });
      animations = animations.filter(anim => !anim.calledComplete);
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    // ----- Cleanup -----
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("touchstart", handleEvent);
      document.removeEventListener("mousedown", clearInactiveTimeout);
      document.removeEventListener("touchstart", clearInactiveTimeout);
      if (inactiveTimeout) clearTimeout(inactiveTimeout);
    };
  }, []);

  return <MainContainer> <canvas ref={canvasRef} style={{ display: "block", width: "100vw", height: "100vh" }} /></MainContainer>;
};

export default ColorChangingAnimation;
