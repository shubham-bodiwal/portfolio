import React, { useEffect, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import StartImageAnimation from "./StartImageAnimation";
import CursorAnimation from "./CursorAnimation";

// Global style for clean presentation
const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    cursor: none !important;
    overflow: hidden;
    font-family: 'Inter', 'Helvetica Neue', sans-serif;
  }
`;

// Refined animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const subtleFloat = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-1rem);
  }
  100% {
    transform: translateY(0px);
  }
`;

// const gradientShift = keyframes`
//   0% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
//   100% {
//     background-position: 0% 50%;
//   }
// `;

// Styled components with professional aesthetic
const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #000000 0%, #141414 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-in-out;
  overflow: hidden;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
// `;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  background: #14141422;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  max-width: 500px;
  animation: ${
    subtleFloat} 6s ease-in-out infinite;
`;

const PortfolioTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 24px;
  color: white;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.5px;

  span {
    color: #4d9fff;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 28px;
  text-align: center;
  max-width: 40rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
`;

const PoweredOffMessage = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  color: #e67e22;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(61, 139, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(61, 139, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(61, 139, 255, 0);
  }
`;

const Button = styled.button`
  padding: 12px 28px;
  font-size: 1rem;
  cursor: pointer;
  background: rgba(30, 50, 100, 0.2);
  color: #4d9fff;
  border: 2px solid #4d9fff;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(61, 139, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-weight: 500;
  letter-spacing: 0.5px;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: rgba(61, 139, 255, 0.2);
    transform: translateY(-2px);
    color: white;
  }

  &:active {
    transform: translateY(1px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(61, 139, 255, 0.4),
      transparent
    );
    transition: all 0.6s;
  }

  &:hover::before {
    left: 100%;
  }
`;

// Progress component with professional style
const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: linear-gradient(90deg, #3a7bd5, #4d9fff);
  transition: width 0.5s ease;
`;

const StatusText = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
  text-align: center;
  letter-spacing: 0.3px;
`;

type Props = {
  onClick: () => void;
  shutdownMode?: boolean;
};

const PermissionScreen: React.FC<Props> = ({
  onClick,
  shutdownMode = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing...");

  useEffect(() => {
    if (shutdownMode) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        if (currentProgress > 100) {
          clearInterval(interval);
          return;
        }
        setProgress(currentProgress);

        // Update status text based on progress
        if (currentProgress < 25) {
          setStatusText("Initializing...");
        } else if (currentProgress < 50) {
          setStatusText("Loading resources...");
        } else if (currentProgress < 75) {
          setStatusText("Preparing interface...");
        } else {
          setStatusText("Ready");
        }
      }, 250);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [shutdownMode]);

  return (
    <>
      <GlobalStyle />
      <CursorAnimation />
      <Screen>
        <StartImageAnimation />
        <ContentContainer>
          <PortfolioTitle>
            <span>Shubham Bhodiwal</span>'s Portfolio
          </PortfolioTitle>

          {shutdownMode ? (
            <>
              <PoweredOffMessage>Session ended</PoweredOffMessage>
              <Message>Restarting portfolio experience. Please wait...</Message>
              <ProgressBar>
                <ProgressFill progress={progress} />
              </ProgressBar>
              <StatusText>{statusText}</StatusText>
              <Button onClick={onClick}>Resume</Button>
            </>
          ) : (
            <>
              <Message>
                This portfolio experience requires <strong>Fullscreen</strong>{" "}
                access to properly showcase the projects and work in an optimal
                presentation.
              </Message>
              <Button onClick={onClick}>Enter Fullscreen</Button>
              <StatusText>Portfolio • Version 2.0</StatusText>
              <Message>
                Do not forget to <strong>Shut it Down </strong>
                 once you are done. 
              </Message>
            </>
          )}
        </ContentContainer>
      </Screen>
    </>
  );
};

export default PermissionScreen;
