import styled, { keyframes } from "styled-components";
import heroVideo from "../assets/hero-video.mp4";
import Header from "./Header";
import { motion } from "framer-motion";
import { springUpFade } from "../animations/motionConfig";

const gradientFlow = keyframes`
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 300% center;
  }
`;
// === Animations ===
const fadeInHero = keyframes`
  0% {

    transform: translateY(5rem) scale(0.98);
  }
  100% {
    transform: translateY(0) scale(1);
  }
`;

const fadeInHeader = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-5rem) scale(0.98);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

// const fadeInCornerTag = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateX(10rem) skewX(-20deg); scale(0.98);
//     filter: blur(4px);

//   }
//   100% {
//     opacity: 1;
//     transform: translateX(0) skewX(-20deg); scale(1);
//     filter: blur(0);

//   }
// `;

const overlayFade = keyframes`
  0% {
    background: rgba(0, 0, 0, 0.3);
  }
  100% {
    background: rgba(0, 0, 0, 0.3);
  }
`;

// === Styled Components ===
const HeroSection = styled(motion.div)`
  position: relative;
  height: 100vh;
  width: 100%;
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
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3) !important;
  animation: ${overlayFade} 1.5s ease-out forwards;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  animation: ${fadeInHeader} 1.5s ease-out both;
`;

const Content = styled.div`
  z-index: 2;
  max-width: 85%;
  padding: 1rem 5rem;
  animation: ${fadeInHero} 1.5s ease-out both;
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  letter-spacing: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;
// font-family: "Zen Dots", sans-serif;

const Subtitle = styled.p`
  color: #ffaa33;
  text-decoration: none;
  letter-spacing: 4rem;
  padding-left: 4rem;
  line-height: 2rem;
  font-weight: 900;
  font-size: 2rem;
`;

const CornerTag = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 0rem;
  background: #ffaa33;
  color: black;
  font-weight: 700;
  padding: 0.5rem 4rem;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  letter-spacing: 0.7em;
  transform: skewX(-20deg);
  text-transform: uppercase;
  white-space: pre;
  z-index: 3;
  overflow: hidden;
  isolation: isolate;

  background: linear-gradient(
    to left,
    #ffaa33,
    #aaff33,
    #33ffee,
    #cc33ff,
    #ffaa33
  );
  background-size: 300% auto;
  animation: ${gradientFlow} 5s linear infinite;
`;

const Description = styled.div`
  font-size: 1rem;
  color: #ffffff8f;
  margin-top: 1rem;
  letter-spacing: 7rem;
  text-transform: uppercase;
  text-align: center;
  padding-left: 7rem;
  position: absolute;
  top: 0.1rem;
  z-index: 10;
  backdrop-filter: blur(4px);
  background: linear-gradient(
    to left,
    #ffaa33,
    #aaff33,
    #33ffee,
    #cc33ff,
    #ffaa33
  );
  background-size: 300% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;

  animation: ${gradientFlow} 5s linear infinite,
    ${fadeInHeader} 1.5s ease-out both;
`;

// === Component ===
export default function Hero() {
  return (
    <HeroSection {...springUpFade}>
      <Description>Portfolio</Description>
      <BackgroundVideo autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <Overlay />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Content>
        <Title>SHUBHAM BHODIWAL</Title>
        <Subtitle>
          FRONTEND
          <br /> <span style={{ color: "white" }}>DEVELOPER</span>
        </Subtitle>
      </Content>
      <CornerTag>Released in november 2021 </CornerTag>
    </HeroSection>
  );
}
