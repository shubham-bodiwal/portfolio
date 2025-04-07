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
    font-size: min(calc(100vw / 65), calc(100vh / 65)) !important;
  }
    
`;

// Refined animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const subtleFloat = keyframes`
  0% {
    transform: translateY(0rem);
  }
  50% {
    transform: translateY(-1rem);
  }
  100% {
    transform: translateY(0rem);
  }
`;

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 2.5rem 3rem;
  border-radius: 0.75rem;
  background: #14141422;
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.625rem);
  max-width: 40rem;
  animation: ${subtleFloat} 6s ease-in-out infinite;

  @media (max-width: 48rem) {
    padding: 2rem;
    max-width: 90%;
  }
`;

const PortfolioTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.0313rem;

  span {
    color: #4d9fff;
  }

  @media (max-width: 48rem) {
    font-size: 1.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1.75rem;
  text-align: center;
  max-width: 40rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
`;

const PoweredOffMessage = styled.p`
  font-size: 1.5rem;
  margin: 1.25rem 0;
  color: #e67e22;
  font-weight: 500;
  letter-spacing: 0.0313rem;
`;

const DeviceWarning = styled.div`
  background-color: rgba(220, 53, 69, 0.2);
  border: 0.0625rem solid rgba(220, 53, 69, 0.6);
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  max-width: 100%;
  text-align: center;

  h3 {
    margin-top: 0;
    font-size: 1.4rem;
  }

  p {
    margin-bottom: 0;
    font-size: 1.1rem;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(61, 139, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 0.625rem rgba(61, 139, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(61, 139, 255, 0);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  background: rgba(30, 50, 100, 0.2);
  color: #4d9fff;
  border: 0.125rem solid #4d9fff;
  border-radius: 0.375rem;
  box-shadow: 0 0 0.625rem rgba(61, 139, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-weight: 500;
  letter-spacing: 0.0313rem;
  animation: ${pulse} 2s infinite;
  cursor: none;

  &:hover {
    background: rgba(61, 139, 255, 0.2);
    transform: translateY(-0.125rem);
    color: white;
  }

  &:active {
    transform: translateY(0.0625rem);
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

  &:focus {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }
  
  /* Make disabled state more obvious */
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  /* Add transition for smoother state changes */
  transition: background-color 0.2s, transform 0.1s, opacity 0.2s;
`;

// Progress component with professional style
const ProgressBar = styled.div`
  width: 100%;
  height: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 1.25rem;
  margin-bottom: 0.625rem;
  position: relative;
  border-radius: 0.125rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: linear-gradient(90deg, #3a7bd5, #4d9fff);
  transition: width 0.5s ease;
`;

const StatusText = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.5rem;
  text-align: center;
  letter-spacing: 0.0187rem;
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
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobileCheck =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(mobileCheck);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Shutdown sequence
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

  // Handle keyboard events for the button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <>
      <GlobalStyle />
      <CursorAnimation aria-hidden="true" />
      <Screen role="dialog" aria-labelledby="screen-title" aria-describedby="screen-message">
        <StartImageAnimation aria-hidden="true" />
        <ContentContainer>
          <PortfolioTitle id="screen-title">
            <span>Shubham Bhodiwal</span>'s Portfolio
          </PortfolioTitle>

          {isMobile ? (
            <DeviceWarning>
              <h3 id="device-warning-title">Desktop Required</h3>
              <p id="screen-message">
                This interactive portfolio experience is optimized for desktop
                devices. Please open it on a computer for the full experience.
              </p>
            </DeviceWarning>
          ) : shutdownMode ? (
            <>
              <PoweredOffMessage id="shutdown-message">Session ended</PoweredOffMessage>
              <Message id="screen-message">Restarting portfolio experience. Please wait...</Message>
              <ProgressBar 
                role="progressbar" 
                aria-valuenow={progress} 
                aria-valuemin={0} 
                aria-valuemax={100}
                aria-label="Restart progress"
              >
                <ProgressFill progress={progress} />
              </ProgressBar>
              <StatusText aria-live="polite">{statusText}</StatusText>
              <Button 
                onClick={onClick} 
                onKeyDown={handleKeyDown}
                tabIndex={0}
                aria-label="Resume portfolio session"
              >
                Resume
              </Button>
            </>
          ) : (
            <>
              <Message id="screen-message">
                This portfolio experience requires <strong>Fullscreen</strong>{" "}
                access to properly showcase the projects and work in an optimal
                presentation.{" "}
                {!isMobile && "It is only available on desktop devices."}
              </Message>
              <Button 
                onClick={onClick} 
                disabled={isMobile}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                aria-disabled={isMobile}
                aria-label={isMobile ? "Desktop required for this portfolio" : "Enter fullscreen mode"}
              >
                {isMobile ? "Desktop Required" : "Enter Fullscreen"}
              </Button>
              <StatusText>Portfolio • Version 2.0</StatusText>
              <Message>
                {!isMobile && "Do not forget to "}
                <strong>{!isMobile && "Shut it Down "}</strong>
                {!isMobile
                  ? "once you are done."
                  : "Please visit on a desktop device."}
              </Message>
            </>
          )}
        </ContentContainer>
      </Screen>
    </>
  );
};

export default PermissionScreen;
