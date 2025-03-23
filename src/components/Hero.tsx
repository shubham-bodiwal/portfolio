import styled, { keyframes } from "styled-components";
import heroVideo from "../assets/hero-video.mp4";
import Header from "./Header";

// === Animations ===
const fadeInHero = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

const BlurInVideo = keyframes`
  0% {
    filter: blur(4px);
  }
  100% {
    filter: blur(0);
  }
`;

const overlayFade = keyframes`
  0% {
    background: rgba(0, 0, 0, 0.7);
  }
  100% {
    background: rgba(0, 0, 0, 0.3);
  }
`;

// === Styled Components ===
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
  color: #ffffff;
  z-index: 0;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  animation: ${BlurInVideo} 2s ease-out forwards;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 80%,
    rgb(10 12 27) 100%
  ) !important;
  animation: ${overlayFade} 2s ease-out forwards;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  backdrop-filter: blur(10px);
  animation: ${fadeInHero} 2s ease-out both;
`;

const Content = styled.div`
  z-index: 2;
  max-width: 90%;
  animation: ${fadeInHero} 2s ease-out both;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  margin-top: 1.25rem;
  font-size: 1.5rem;
  color: #00f5d4;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

// === Component ===
export default function Hero() {
  return (
    <HeroSection>
      <BackgroundVideo autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <Overlay />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Content>
        <Title>Shubham Bhodiwal</Title>
        <Subtitle>Frontend Developer</Subtitle>
      </Content>
    </HeroSection>
  );
}
