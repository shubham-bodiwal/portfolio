import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import StartImageAnimation from "./StartImageAnimation";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  max-width: 320px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: #444;
  color: white;
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease;

  &:hover {
    background: #555;
  }
`;

const PoweredOffMessage = styled.p`
  font-size: 20px;
  margin: 20px 0;
  opacity: 0.8;
`;

const PortfolioTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #00f5d4;
`;

type Props = {
  onClick: () => void;
  shutdownMode?: boolean;
};

const PermissionScreen: React.FC<Props> = ({
  onClick,
  shutdownMode = false,
}) => {
  useEffect(() => {
    // If this screen appears after a shutdown, we can add any cleanup or state reset here
    if (shutdownMode) {
      // You could reload the page after a delay to refresh everything
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [shutdownMode]);

  return (
    <Screen>
      <StartImageAnimation/>
      <PortfolioTitle>Shubham Bhodiwal's Portfolio</PortfolioTitle>

      {shutdownMode ? (
        <>
          <PoweredOffMessage>System has been shut down</PoweredOffMessage>
          <Message>Click below to restart the portfolio experience</Message>
          <Button onClick={onClick}>Power On</Button>
        </>
      ) : (
        <>
          <Message>
            This portfolio requires <strong>Fullscreen Desktop</strong> access to launch
            the immersive experience.
          </Message>
          <Button onClick={onClick}>Enter Fullscreen</Button>
        </>
      )}
    </Screen>
  );
};

export default PermissionScreen;
