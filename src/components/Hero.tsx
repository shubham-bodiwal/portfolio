import styled from "styled-components";
import heroVideo from "../assets/hero-video.mp4";

const HeroSection = styled.section`
  position: relative;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.25rem;
  color: #00f5d4;
`;

export default function Hero() {
  return (
    <HeroSection>
      <BackgroundVideo autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <Title>Simon Sparks</Title>
      <Subtitle>Generative Design</Subtitle>
    </HeroSection>
  );
}
