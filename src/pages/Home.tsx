import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Portfolio from "../components/Portfolio";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

const fadeInText = keyframes`
  0% {
    opacity: 0;
    transform: translateX(3rem) translateY(-50%) scale(0.98);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(-50%) scale(1);
    filter: blur(0);
  }
`;

const fadeInIndicator = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-3rem) translateY(-50%) scale(0.98);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(-50%) scale(1);
    filter: blur(0);
  }
`;

const AppWrapper = styled.div`
  background-color: #030307;
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
  background-color: #030307;
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
  left: 0rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 10;
  animation: ${fadeInIndicator} 1.5s ease-out both;
  backdrop-filter: blur(4px);
  height: 100%;
  padding: 0.5rem;
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
  text-transform: uppercase;
`;

const TeaserTextWrapper = styled.div`
  position: fixed;
  right: 0rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  z-index: 10;
  animation: ${fadeInText} 1.5s ease-out both;
  font-size: 0.85rem;
  color: #ffffff66;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  padding: 0.5rem;
  pointer-events: none;
  height: 100%;
  text-align: center;
  writing-mode: vertical-rl;
  font-size: 0.9rem;
  color: #ffffff66;
  margin-top: 1rem;
  letter-spacing: 0.7em;
  text-transform: uppercase;
`;

function Home() {
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
    const animateTo = (index: number) => {
      isScrolling.current = true;
      setActive(index);
      setTimeout(() => {
        isScrolling.current = false;
      }, 1200);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      if (e.deltaY > 0 && currentIndex.current < totalSections - 1) {
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
        currentIndex.current < totalSections - 1
      ) {
        currentIndex.current++;
        animateTo(currentIndex.current);
      } else if (touchEndY - touchStartY > 50 && currentIndex.current > 0) {
        currentIndex.current--;
        animateTo(currentIndex.current);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("wheel", handleWheel, { passive: true });
    container?.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container?.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      container?.removeEventListener("wheel", handleWheel);
      container?.removeEventListener("touchstart", handleTouchStart);
      container?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <AppWrapper ref={containerRef}>
      <Section $active={active === 0}>{active === 0 && <Hero />}</Section>
      <Section $active={active === 1}>{active === 1 && <Gallery />}</Section>
      <Section $active={active === 2}>{active === 2 && <Portfolio />}</Section>
      <Section $active={active === 3}>{active === 3 && <Projects />}</Section>
      <Section $active={active === 4}>{active === 4 && <Footer />}</Section>

      <IndicatorWrapper>
        <VerticalLabel>are you Lost?</VerticalLabel>
        {[...Array(totalSections)].map((_, i) => (
          <Dot key={i} active={active === i} />
        ))}
        <VerticalLabel>YOU'RE HERE</VerticalLabel>
      </IndicatorWrapper>

      <TeaserTextWrapper>want to check out more?</TeaserTextWrapper>
    </AppWrapper>
  );
}

export default Home;
