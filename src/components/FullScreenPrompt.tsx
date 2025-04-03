import { useEffect, ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { Maximize2, ArrowUpCircle } from "lucide-react";

// // Animation keyframes
// const pulse = keyframes`
//   0% { transform: scale(1); opacity: 0.9; }
//   50% { transform: scale(1.05); opacity: 1; }
//   100% { transform: scale(1); opacity: 0.9; }
// `;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components
const FullscreenContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 9999;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1a1a1a 0%, #000000 70%);
  opacity: 0.7;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #ffffff, #a0a0a0, #ffffff);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${shimmer} 4s linear infinite;
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 2.5rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const IconContainer = styled.div`
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const FullscreenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

// const ChevronAnimation = styled.div`
//   position: absolute;
//   bottom: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   opacity: 0.7;
//   animation: ${pulse} 2s ease-in-out infinite;
// `;

// Interface for component props
interface FullscreenPromptProps {
  isFullscreen: boolean;
  requestFullscreen: () => void;
  children: ReactNode;
}

// Enhanced FullscreenPrompt component
const FullscreenPrompt: React.FC<FullscreenPromptProps> = ({ 
  isFullscreen, 
  requestFullscreen, 
  children 
}) => {
  // Handle escape key press to show the warning if user exits fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        // Optional: Show a warning or message when user presses Escape
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);
  
  if (isFullscreen) {
    return <>{children}</>;
  }
  
  return (
    <FullscreenContainer>
      <BackgroundGradient />
      <ContentContainer>
        <IconContainer>
          <Maximize2 size={80} color="white" strokeWidth={1.5} />
        </IconContainer>
        <Title>Fullscreen Experience Required</Title>
        <Message>
          This interactive experience is designed to be viewed in fullscreen mode.
          Please click the button below to enter fullscreen and unlock the full immersive experience.
        </Message>
        <FullscreenButton onClick={requestFullscreen}>
          <ArrowUpCircle size={20} />
          Enter Fullscreen
        </FullscreenButton>
      </ContentContainer>
{/*       
      <ChevronAnimation>
        <ChevronUp size={20} strokeWidth={1.5} />
        <ChevronDown size={20} strokeWidth={1.5} />
      </ChevronAnimation> */}
    </FullscreenContainer>
  );
};

export default FullscreenPrompt;