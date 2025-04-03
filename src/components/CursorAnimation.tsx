import React, { useEffect, useRef } from "react";
import { TweenMax } from "gsap";
import styled from "styled-components";

const MainContainer = styled.div`
  height: 100%;
  cursor: none !important;
  width: 100%;
  background: linear-gradient(135deg, #000000 0%, #141414 100%);
`;
const CursorAnimation: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dotsRef = useRef<Dot[]>([]);
  const idleTimeoutRef = useRef<number | null>(null);
  const idleRef = useRef<boolean>(false);
  const lastFrameRef = useRef<number>(0);

  const amount = 20; // total dots in the trail
  const sineDots = Math.floor(amount * 0.3);
  const dotWidth = 30; // width/height of each dot in px
  const idleTimeout = 150; // ms before "idle" behavior kicks in
  const followFactor = 0.3; // larger factor makes dots follow more tightly

  // Dot class – each dot follows the mouse and then locks into a subtle oscillation when idle.
  class Dot {
    index: number;
    anglespeed: number;
    x: number;
    y: number;
    scale: number;
    range: number;
    limit: number;
    element: HTMLElement;
    lockX: number;
    lockY: number;
    angleX: number;
    angleY: number;

    constructor(index: number, element: HTMLElement) {
      this.index = index;
      this.anglespeed = 0.05;
      this.x = 0;
      this.y = 0;
      // A gentler scale reduction (from 1 to about 0.43) to promote more overlap
      this.scale = 1 - 0.03 * index;
      this.range = dotWidth / 2 - (dotWidth / 2) * this.scale + 2;
      this.limit = dotWidth * 0.75 * this.scale;
      this.element = element;
      TweenMax.set(this.element, { scale: this.scale });
      this.lockX = 0;
      this.lockY = 0;
      this.angleX = 0;
      this.angleY = 0;
    }

    lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
    }

    draw() {
      if (!idleRef.current || this.index <= sineDots) {
        TweenMax.set(this.element, { x: this.x, y: this.y });
      } else {
        this.angleX += this.anglespeed;
        this.angleY += this.anglespeed;
        this.y = this.lockY + Math.sin(this.angleY) * this.range;
        this.x = this.lockX + Math.sin(this.angleX) * this.range;
        TweenMax.set(this.element, { x: this.x, y: this.y });
      }
    }
  }

  useEffect(() => {
    if (!cursorRef.current) return;
    const cursorEl = cursorRef.current;
    const dotElements = cursorEl.querySelectorAll("span");
    dotsRef.current = Array.from(dotElements).map(
      (el, i) => new Dot(i, el as HTMLElement)
    );

    const onMouseMove = (e: MouseEvent) => {
      // Updated position calculation - no offset adjustment needed since we handle it in the span styling
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
      resetIdleTimer();
    };

    const onTouchMove = (e: TouchEvent) => {
      // Updated position calculation for touch events too
      mousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      resetIdleTimer();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    const goInactive = () => {
      idleRef.current = true;
      dotsRef.current.forEach((dot) => dot.lock());
    };

    const startIdleTimer = () => {
      idleTimeoutRef.current = window.setTimeout(goInactive, idleTimeout);
      idleRef.current = false;
    };

    const resetIdleTimer = () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      startIdleTimer();
    };

    startIdleTimer();

    const positionCursor = () => {
      let x = mousePosition.current.x;
      let y = mousePosition.current.y;
      dotsRef.current.forEach((dot, index, dots) => {
        const nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        if (!idleRef.current || index <= sineDots) {
          const dx = (nextDot.x - dot.x) * followFactor;
          const dy = (nextDot.y - dot.y) * followFactor;
          x += dx;
          y += dy;
        }
      });
    };

    const render = (timestamp: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp;
      positionCursor();
      lastFrameRef.current = timestamp;
      requestAnimationFrame(render);
    };

    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <MainContainer>
      {/* Inline SVG with goo filter definition */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      {/* The cursor container applies the goo filter so that the dots merge smoothly */}
      <div
        ref={cursorRef}
        style={{
          filter: "url(#goo)",
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        {Array.from({ length: amount }).map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              display: "block",
              width: `${dotWidth}px`,
              height: `${dotWidth}px`,
              // Using clip-path to create a more droplet‐like shape instead of a perfect circle
              clipPath: "ellipse(50% 70% at 50% 50%)",
              background: "white",
              // The key fix: use translate(-50%, -50%) to center each dot on the cursor
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </MainContainer>
  );
};

export default CursorAnimation;