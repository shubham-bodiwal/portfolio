import styled, { keyframes } from "styled-components";
import heroVideo from "../assets/hero-video.mp4";
import Header from "./Header";

// === Animations ===
const fadeInHero = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5rem) scale(0.98);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;


const fadeInHeader= keyframes`
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

const fadeInCornerTag= keyframes`
  0% {
    opacity: 0;
    transform: translateX(10rem) scale(0.98);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
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
  animation: ${BlurInVideo} 1.5s ease-out forwards;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
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
  backdrop-filter: blur(5px);

  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  letter-spacing: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  margin-left: 2rem;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  color: #ffaa33;
  text-decoration: none;
  letter-spacing: 4rem;
  margin-left: 4rem;
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
  font-size: 0.75rem;
  transform: ;
  transform-origin: bottom left;
  z-index: 3;

  font-size: 0.9rem;
  margin-top: 1.5rem;
  letter-spacing: 0.7em;
  transform: skewX(-20deg);
  text-transform: uppercase;
  white-space: pre;
    animation: ${fadeInCornerTag} 1.5s ease-out both;

`;

const Description = styled.div`
  font-size: 1rem;
  color: #ffffff66;
  margin-top: 1rem;
  letter-spacing: 7rem;
  text-transform: uppercase;
  text-align: center;
  margin-left: 7rem;
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
        <Description>Portfolio</Description>
        <Title>SHUBHAM BHODIWAL</Title>
        <Subtitle>
          FRONTEND
          <br /> <span style={{ color: "black" }}>DEVELOPER</span>
        </Subtitle>
      </Content>
      <CornerTag>Released 3.5 years ago... </CornerTag>
    </HeroSection>
  );
}
