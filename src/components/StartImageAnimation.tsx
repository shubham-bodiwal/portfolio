import React from "react";
import styled, { css, keyframes } from "styled-components";
import Image1 from "../assets/start1.svg";
import Image2 from "../assets/start2.svg";
import Image3 from "../assets/start3.svg";

const ImagesWrapper = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const slideLeftFade = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-200px) scale(0.5); opacity: 0; }
`;

const slideRightFade = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(200px) scale(0.5); opacity: 0; }
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

const StyledImage = styled.img`
  object-fit: cover;
`;

const StartImageAnimation: React.FC = () => {


  return (
      <ImagesWrapper>
        <AnimatedImage direction="left">
          <StyledImage src={Image1} alt="Left part" />
        </AnimatedImage>

        <AnimatedImage direction="center">
          <StyledImage src={Image2} alt="Center part" />
        </AnimatedImage>

        <AnimatedImage direction="right">
          <StyledImage src={Image3} alt="Right part" />
        </AnimatedImage>
      </ImagesWrapper>

  );
};

export default StartImageAnimation;
