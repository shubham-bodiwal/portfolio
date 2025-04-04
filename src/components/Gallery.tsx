import { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Define gallery data interface
interface GalleryData {
  title: string;
  number: string;
  content: string;
}

// Transition time variable for consistency
const transitionTime = "0.4s";

// Styled components
const GlobalCoverflowStyle = createGlobalStyle`
  :root {
    --transition-time: ${transitionTime};
  }
`;

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 170, 51, 0.05);
  filter: blur(100px);
  pointer-events: none;

  &:first-of-type {
    top: 10%;
    left: 10%;
  }

  &:last-of-type {
    bottom: 10%;
    right: 10%;
    background: rgba(255, 94, 125, 0.05);
  }
`;

const GalleryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 4rem;
  text-align: center;
  background: linear-gradient(135deg, #0f1827 0%, #1a1a2e 50%, #03050b 100%);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
    animation: ${fadeIn} 0.8s ease-out;

`;

const Subtitle = styled.p`
  color: #ffaa33;
  margin-top: 0;
  text-transform: uppercase;
  z-index: 1;
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 4.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 4.5rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const CoverflowContainer = styled.div`
  margin: 0 auto;
  width: 95%;
  max-width: 1200px;
`;

const CoverflowList = styled.ol`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: perspective(900px);
  transform-style: preserve-3d;
  perspective-origin: 50% 30%;
  list-style: none;
  margin: 0;
  position: relative;
`;

// Styling from your original GalleryItem component
const CoverflowItem = styled.li<{
  isActive: boolean;
  isAfterActive: boolean;
  dataIndex: string;
  isWhite: boolean;
}>`
  position: relative;
  padding: 1rem 2rem 2rem;
  border-radius: 0.2rem;
  height: 15rem;
  min-width: 15rem;
  max-width: 15rem;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  background: ${(props) => (props.isWhite ? "#ffffff" : "#000000")};
  cursor: pointer;
  ${(props) => (props.isActive ? "height: 20rem;" : "")}

  // Coverflow specific styles
  margin: ${(props) => (props.isActive ? "0 0" : "0 -120px")};
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.9);
  transform: ${(props) =>
    props.isActive
      ? "rotateY(0deg)"
      : props.isAfterActive
      ? "rotateY(-45deg)"
      : "rotateY(45deg)"};
  transition: all var(--transition-time) ease;
  z-index: ${(props) => (props.isActive ? 100 : 1)};
  overflow: hidden;
  -webkit-box-reflect: below 1rem
    linear-gradient(to top, rgba(255, 255, 255, 0.4), transparent 20%);

  &::after {
    content: "";
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.isActive ? "50%" : "10%")};
    height: 4px;
    background-color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
    opacity: ${(props) => (props.isActive ? 0.9 : 0.6)};
    border-radius: 1px;
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    transform: ${(props) =>
      props.isActive
        ? "rotateY(0deg)"
        : props.isAfterActive
        ? "rotateY(-42deg) translateY(-5px)"
        : "rotateY(42deg) translateY(-5px)"};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "${(props) => props.dataIndex}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${(props) => (props.isActive ? "26rem" : "18rem")};
    font-weight: 900;
    color: ${(props) => (props.isWhite ? "#bdbdbd3b" : "#ffffff18")};
    pointer-events: none;
    z-index: 0;
    user-select: none;
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const Title = styled.h3<{ isWhite: boolean; isActive: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  letter-spacing: 0.5rem;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  opacity: ${(props) => (props.isActive ? 1 : 0.7)};

  ${CoverflowItem}:hover & {
    transform: translateY(-5px);
  }
`;

const Content = styled.span<{ isWhite: boolean; isActive: boolean }>`
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  margin-top: 0.5rem;
  display: ${(props) => (props.isActive ? "block" : "none")};
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity var(--transition-time) ease;
  z-index: 1;

  ${CoverflowItem}:hover & {
    display: block;
  }
`;

const Controls = styled.div`
  margin: 2rem auto;
  padding: 1rem 0;
  text-align: center;
`;

const ControlButton = styled.button<{ isActive: boolean }>`
  color: #ffaa33;
  background: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border: ${(props) => (props.isActive ? "1px solid #ffaa33" : "none")};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  cursor: pointer;
  transition: all var(--transition-time) ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

// Main component
export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(5);

  // Gallery data
  const galleries: GalleryData[] = [
    {
      title: "Resume.io",
      number: "1",
      content:
        "ATS-friendly resume builder with React PDF, live previews, and DOCX editing using docs.js on a serverless backend. Optimized for performance and scalability.",
    },
    {
      title: "Gulf-HR",
      number: "2",
      content:
        "Modular HR management system with dynamic forms, role-based permissions, and backend-configurable fields. Built using Ant Design and reusable components.",
    },
    {
      title: "Twilio Segment",
      number: "3",
      content:
        "Built a fraud detection and validation system that cut manual review by 40%. Enhanced security compliance and automated verification processes.",
    },
    {
      title: "SHS Homeopathy",
      number: "4",
      content:
        "Electron and web-based app managing medical data with global search, AI chatbot, graphical insights, and multi-window OS-style UI.",
    },
    {
      title: "AI Interview System",
      number: "5",
      content:
        "AI platform for interview assessment via video, analyzing eye contact, posture, and voice. Real-time cheat alerts and performance analytics.",
    },
    {
      title: "Quiz Reminder App",
      number: "6",
      content:
        "Mobile app delivering personalized quiz reminders with gamified MCQs directly in the notification tray. Adaptive scheduling based on user habits.",
    },
    {
      title: "AI QA Crawler",
      number: "7",
      content:
        "Smart crawler that inspects codebases and UIs to detect bugs and usability issues. Automates QA by mimicking expected interactions.",
    },
    {
      title: "AI Code Refactor Extension",
      number: "8",
      content:
        "VS Code extension that uses AI to refactor code for readability and maintainability. Features include variable renaming, logic simplification, and structure enhancement.",
    },
    {
      title: "Gamers Box",
      number: "9",
      content:
        "Gaming platform with live streams, esports news, and gear updates. Includes an admin dashboard for tournament management and content moderation.",
    },
    {
      title: "WhatsApp Clone",
      number: "10",
      content:
        "Real-time messaging app with group chat, media sharing, and secure socket.io communication. Built to explore WebSocket architecture.",
    },
    {
      title: "Smart Home Automation",
      number: "11",
      content:
        "End-to-end IoT smart home ecosystem using Arduino. Includes automation for lighting, gas, climate, and curtains with energy efficiency insights.",
    },
  ];

  return (
    <GalleryWrapper>
      <BackgroundGlow />
      <BackgroundGlow />
      <GlobalCoverflowStyle />
      <Subtitle>Projects</Subtitle>

      <CoverflowContainer>
        <CoverflowList>
          {galleries.map((gallery, index) => {
            const isWhite = index % 2 !== 0;

            return (
              <CoverflowItem
                key={gallery.number}
                isActive={index === activeIndex}
                isAfterActive={index > activeIndex}
                onClick={() => setActiveIndex(index)}
                dataIndex={gallery.number}
                isWhite={isWhite}
              >
                <Title isWhite={isWhite} isActive={index === activeIndex}>
                  {gallery.title}
                </Title>
                <Content isWhite={isWhite} isActive={index === activeIndex}>
                  {gallery.content}
                </Content>
              </CoverflowItem>
            );
          })}
        </CoverflowList>
      </CoverflowContainer>

      <Controls>
        {galleries.map((gallery, index) => (
          <ControlButton
            key={gallery.number}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {gallery.number}
          </ControlButton>
        ))}
      </Controls>
    </GalleryWrapper>
  );
}
