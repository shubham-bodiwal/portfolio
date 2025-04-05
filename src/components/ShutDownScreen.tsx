import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const ellipsisDot = keyframes`
  0%, 20% { opacity: 0; }
  40%, 100% { opacity: 1; }
`;

const Message = styled.div`
  font-size: 1.125rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  z-index: 10001;
`;

const Dot = styled.span<{ delay: string }>`
  display: inline-block;
  opacity: 0;
  animation: ${ellipsisDot} 1.5s infinite;
  animation-delay: ${(props) => props.delay};
`;

type Props = {
  onAnimationComplete?: () => void;
  duration?: number;
};

const ShutdownScreen: React.FC<Props> = ({
  onAnimationComplete,
  duration = 5000,
}) => {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onAnimationComplete]);

  // Optional: animate a countdown for debugging
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 100, 0));
    }, 100);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <Message>
      Shutting down
      <Dot delay="0s">.</Dot>
      <Dot delay="0.5s">.</Dot>
      <Dot delay="1s">.</Dot>
    </Message>
  );
};

export default ShutdownScreen;
