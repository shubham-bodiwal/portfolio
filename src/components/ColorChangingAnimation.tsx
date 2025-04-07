import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Animation for content fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-1.25rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 80%;
  height: 85%;
  padding: 2rem;
  background: rgba(10, 10, 14, 0.4);
  border-radius: 0.75rem;
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
  color: white;
  box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.8s ease-out;
  user-select: none;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #ffaa33;
  letter-spacing: 0.1em;
  font-weight: 700;
  margin-top: 0rem;
`;

const ContentWrapper = styled.div`
  margin-top: 1.5rem;
`;

const SkillCategory = styled.div<{ index: number }>`
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;
  animation-delay: ${(props) => props.index * 0.15}s;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  color: white;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  margin-top: 0rem;

  &::before {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    display: inline-block;
    background-color: #ffaa33;
    margin-right: 0.625rem;
    border-radius: 50%;
  }
`;

const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li<{ index: number }>`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 1.25rem;
  font-size: 0.9rem;
  animation: ${slideIn} 0.5s ease-out;
  animation-fill-mode: both;
  animation-delay: ${(props) => 0.3 + props.index * 0.05}s;
  cursor: default;

  &:hover {
    background: rgba(255, 170, 51, 0.6);
    transform: translateY(-0.125rem);
    transition: all 0.2s ease;
  }
`;

const EducationSection = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 0.0625rem solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

const EducationItem = styled.div`
  margin-bottom: 1rem;
`;

const Degree = styled.h4`
  font-size: 1.1rem;
  margin: 0 0 0.3rem 0;
  color: white;
  font-weight: 600;
`;

const School = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const GradYear = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const PhilosophySection = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 0.0625rem solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.8s;
  animation-fill-mode: both;
`;

// const Quote = styled.blockquote`
//   font-style: italic;
//   color: rgba(255, 255, 255, 0.8);
//   position: relative;
//   padding-left: 1rem;

//   &::before {
//     content: "";
//     position: absolute;
//     left: 0;
//     top: 0;
//     bottom: 0;
//     width: 0.1875rem;
//     background: #ffaa33;
//     border-radius: 0.1875rem;
//   }
// `;

const gelatineKeyframes = keyframes`
  from, to { transform: scale(1, 1); }
  25% { transform: scale(1, 1.4); }
  50% { transform: scale(1.4, 1); }
  75% { transform: scale(0.95, 1.05); }
`;

const ClickHere = styled.div`
  animation: ${gelatineKeyframes} 0.5s infinite;
  position: absolute;
  bottom: 8%;
  right: 11%;
  z-index: 20;
  user-select: none;
`;
const skillCategories = [
  {
    name: "Languages & Frameworks",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "ReactJS",
      "Redux Toolkit",
    ],
  },
  {
    name: "Styling & UI",
    skills: [
      "Ant Design",
      "Styled Components",
      "Material UI",
      "Web Vitals",
      "Lighthouse",
      "WCAG guidelines",
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      "RESTful APIs",
      "GraphQL",
      "React Query",
      "Axios",
      "SWR",
      "PWA",
      "GitHub",
      "Docker",
      "Vercel",
      "Jira",
      "AWS basics",
    ],
  },
  {
    name: "Emerging Interests",
    skills: [
      "AI integrations",
      "IoT",
      "Arduino-based automation",
      "Web Workers",
      "Service Workers",
    ],
  },
]

const ColorChangingAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cW = window.innerWidth;
    let cH = window.innerHeight;
    let bgColor = "#2980B9";
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
    const easeOutExpo = (t: number): number =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const random = (min: number, max: number): number =>
      Math.random() * (max - min) + min;

    // ----- Utility Functions -----
    const calcPageFillRadius = (x: number, y: number): number => {
      const l = Math.max(x, cW - x);
      const h = Math.max(y, cH - y);
      return Math.sqrt(l * l + h * h);
    };

    // ----- Color Picker -----
    const colorPicker = (() => {
      const colors = ["#2980B9", "#282741", "#FFBE53", "#FF6138"];
      let index = 0;
      return {
        next: () => {
          index = (index + 1) % colors.length;
          return colors[index];
        },
        current: () => colors[index],
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
        fill: nextColor,
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
        },
      };

      // --- Ripple Animation ---
      const ripple = new Circle({
        x: pageX,
        y: pageY,
        r: 0,
        fill: currentColor,
        stroke: { width: 3, color: currentColor },
        opacity: 1,
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
        complete: () => {},
      };

      // --- Particles Animation ---
      const particles: Circle[] = [];
      const numParticles = 32;
      for (let i = 0; i < numParticles; i++) {
        const particle = new Circle({
          x: pageX,
          y: pageY,
          r: random(24, 48),
          fill: currentColor,
        });
        (particle as any).initialX = pageX;
        (particle as any).initialY = pageY;
        (particle as any).targetX = pageX + random(-rippleSize, rippleSize);
        (particle as any).targetY =
          pageY + random(-rippleSize * 1.15, rippleSize * 1.15);
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
          particles.forEach((particle) => {
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
        complete: () => {},
      };

      animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    };

    // ----- Keyboard Navigation Handler -----
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      // Space or Enter key to trigger animation at center of canvas
      if (key === ' ' || key === 'Enter') {
        e.preventDefault();
        fauxClick(cW / 2, cH / 2);
      }
      // Arrow keys to trigger animation in those directions
      else if (key === 'ArrowUp') {
        e.preventDefault();
        fauxClick(cW / 2, cH / 4);
      }
      else if (key === 'ArrowDown') {
        e.preventDefault();
        fauxClick(cW / 2, cH * 3 / 4);
      }
      else if (key === 'ArrowLeft') {
        e.preventDefault();
        fauxClick(cW / 4, cH / 2);
      }
      else if (key === 'ArrowRight') {
        e.preventDefault();
        fauxClick(cW * 3 / 4, cH / 2);
      }
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
    canvas.addEventListener("keydown", handleKeyDown);

    // ----- Inactive User Handling -----
    const fauxClick = (x: number, y: number) => {
      const evt = new MouseEvent("mousedown", {
        clientX: x,
        clientY: y,
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
        setTimeout(
          () => {
            fauxClick(random(cW * 0.2, cW * 0.8), random(cH * 0.2, cH * 0.8));
            startFauxClicking();
          },
          random(200, 900)
        );
      };
      startFauxClicking();
    }

    // ----- Main Animation Loop -----
    const update = () => {
      const now = performance.now();
      // Clear the canvas with the current background color.
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cW, cH);

      animations.forEach((anim) => {
        const progress = Math.min((now - anim.startTime) / anim.duration, 1);
        anim.update(progress);
        anim.circles.forEach((circle) => circle.draw(ctx));
        if (progress === 1 && !anim.calledComplete) {
          anim.complete();
          anim.calledComplete = true;
        }
      });
      animations = animations.filter((anim) => !anim.calledComplete);
      animationFrameId = requestAnimationFrame(update);
    };
    update();
    
    // Enhanced accessibility attributes
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Interactive color-changing background animation. Click or use arrow keys to create ripple effects.");
    canvas.setAttribute("aria-live", "polite");
    canvas.setAttribute("aria-atomic", "true");

    // ----- Cleanup -----
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("touchstart", handleEvent);
      document.removeEventListener("mousedown", clearInactiveTimeout);
      document.removeEventListener("touchstart", clearInactiveTimeout);
      canvas.removeEventListener("keydown", handleKeyDown);
      if (inactiveTimeout) clearTimeout(inactiveTimeout);
    };
  }, []);

  return (
    <MainContainer>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        tabIndex={0}
      />
      <ClickHere>Click Anywhere</ClickHere>

      <ContentContainer id="content">
        <SectionTitle>Skills & Achievements</SectionTitle>

        <ContentWrapper>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory key={category.name} index={categoryIndex}>
              <CategoryTitle>{category.name}</CategoryTitle>
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skill} index={skillIndex}>
                    {skill}
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}

          <EducationSection>
            <CategoryTitle>Education</CategoryTitle>
            <EducationItem>
              <Degree>
                Bachelor of Technology (B.Tech) in Computer Science
              </Degree>
              <School>
                BK Birla Institute of Engineering and Technology, Pilani
              </School>
              <GradYear>2018 - 2022</GradYear>
            </EducationItem>
          </EducationSection>

          <PhilosophySection>
            <CategoryTitle>Awards & Recognition</CategoryTitle>
            <SkillsList style={{ marginBottom: "1rem" }}>
              <SkillItem
                index={0}
                style={{ background: "rgba(255, 170, 51, 0.2)" }}
              >
                "New Star on The Block" Award at Daffodil Software
              </SkillItem>
              <SkillItem
                index={1}
                style={{ background: "rgba(255, 170, 51, 0.2)" }}
              >
                Technical Recognition at Resume.io
              </SkillItem>
            </SkillsList>
          </PhilosophySection>
        </ContentWrapper>
      </ContentContainer>
    </MainContainer>
  );
};

export default ColorChangingAnimation;
