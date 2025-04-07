import React from "react";
import styled, { css, keyframes } from "styled-components";
import Image1 from "../assets/start1.svg";
import Image2 from "../assets/start2.svg";
import Image3 from "../assets/start3.svg";

const rotate360 = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const ImagesWrapper = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate360} 0.8s linear 1;
  animation-delay: 0.8s;
  margin-bottom: 6rem;
`;

const slideLeftFade = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-25rem) scale(0.5); opacity: 0; }
`;

const slideRightFade = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(25rem) scale(0.5); opacity: 0; }
`;

const scaleFade = keyframes`
  0% {  opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
`;

const AnimatedImage = styled.div<{
  direction: "left" | "center" | "right";
}>`
  ${({ direction }) => css`
    animation: ${direction === "left"
        ? slideLeftFade
        : direction === "right"
        ? slideRightFade
        : scaleFade}
      0.8s ease-out reverse;
    margin-top: ${direction === "left"
      ? "0.9rem"
      : direction === "right"
      ? "2.1rem"
      : "0rem"};
    margin-bottom: ${direction === "left"
      ? "2.1rem"
      : direction === "right"
      ? "0.9rem"
      : "0rem"};
    margin-left: ${direction === "right" ? "-2.2rem" : "0rem"};
    margin-right: ${direction === "left" ? "-2.2rem" : "0rem"};
    height: ${direction === "center" ? "13rem" : "8rem"};
  `}
  z-index: ${({ direction }) => (direction === "center" ? 20 : 1)};
`;

const StyledImage = styled.img<{ direction: string }>`
  object-fit: cover;
  height: ${({ direction }) => (direction === "center" ? "13rem" : "8rem")};
`;

const StartImageAnimation: React.FC = () => {
  return (
    <ImagesWrapper>
      <AnimatedImage direction="left">
        <StyledImage loading="lazy" src={Image1} direction="left" alt="Left part" />
      </AnimatedImage>

      <AnimatedImage direction="center">
        <StyledImage loading="lazy" src={Image2} direction="center" alt="Center part" />
      </AnimatedImage>

      <AnimatedImage direction="right">
        <StyledImage loading="lazy" src={Image3} direction="right" alt="Right part" />
      </AnimatedImage>
    </ImagesWrapper>
  );
};

export default StartImageAnimation;
