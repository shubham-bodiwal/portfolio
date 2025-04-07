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
  const [progressPercentage, setProgressPercentage] = useState(0);

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
      setCountdown((prev) => {
        const newValue = Math.max(prev - 100, 0);
        // Calculate progress percentage for aria-valuenow
        setProgressPercentage(100 - Math.floor((newValue / duration) * 100));
        return newValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [countdown, duration]);

  return (
    <>
      
      <div 
        role="progressbar" 
        aria-valuenow={progressPercentage} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label="Shutting down"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}
      />

      <Message aria-hidden="true">
        Shutting down
        <Dot delay="0s">.</Dot>
        <Dot delay="0.5s">.</Dot>
        <Dot delay="1s">.</Dot>
      </Message>
    </>
  );
};

export default ShutdownScreen;