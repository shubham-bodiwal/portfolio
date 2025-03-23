import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Portfolio from "./components/Portfolio";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import HoverInspectorWrapper from "./HOC/HoverInspectorWrapper ";

const AppWrapper = styled.div`
  background-color: #0a0c1b;
  color: #fff;
  font-family: "Inter", sans-serif;
  overflow: hidden;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
`;

const Section = styled.section<{ $active?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease, opacity 1s ease;
  opacity: 0;
  transform: translateY(-100%) scale(0.9);
  background-color: #0a0c1b;
  ${(p) =>
    p.$active &&
    css`
      opacity: 1;
      transform: translateY(0) scale(1);
      z-index: 2;
    `}
`;

const IndicatorWrapper = styled.div`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(p) => (p.active ? "#ffaa33" : "#ffffff88")};
  transition: background-color 0.3s;
`;

const VerticalLabel = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 0.9rem;
  color: #ffffff66;
  margin-top: 1rem;
  letter-spacing: 0.7em;
`;


function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const isScrolling = useRef(false);
  const [active, setActive] = useState(0);
  const totalSections = 5;

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const animateTo = (index: number) => {
      isScrolling.current = true;
      setActive(index);
      setTimeout(() => {
        isScrolling.current = false;
      }, 1200);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      if (e.deltaY > 0 && currentIndex.current < sections.length - 1) {
        currentIndex.current++;
        animateTo(currentIndex.current);
      } else if (e.deltaY < 0 && currentIndex.current > 0) {
        currentIndex.current--;
        animateTo(currentIndex.current);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (isScrolling.current) return;

      if (
        touchStartY - touchEndY > 50 &&
        currentIndex.current < sections.length - 1
      ) {
        currentIndex.current++;
        animateTo(currentIndex.current);
      } else if (touchEndY - touchStartY > 50 && currentIndex.current > 0) {
        currentIndex.current--;
        animateTo(currentIndex.current);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    // <HoverInspectorWrapper>
    <AppWrapper ref={containerRef}>
      <Section $active={active === 0}>
        <Hero />
      </Section>
      <Section $active={active === 1}>
        <Gallery />
      </Section>
      <Section $active={active === 2}>
        <Portfolio />
      </Section>
      <Section $active={active === 3}>
        <Projects />
      </Section>
      <Section $active={active === 4}>
        <Footer />
      </Section>

      <IndicatorWrapper>
        {[...Array(totalSections)].map((_, i) => (
          <Dot key={i} active={active === i} />
        ))}
        <VerticalLabel>YOU'RE HERE</VerticalLabel>
      </IndicatorWrapper>

    </AppWrapper>
    // </HoverInspectorWrapper>
  );
}

export default App;
