import { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Define gallery data interface
interface GalleryData {
  title: string;
  content: string;
}

// Transition time variable for consistency
const transitionTime = "0.4s";

// Styled components
const GlobalCoverflowStyle = createGlobalStyle`
  :root {
    --transition-time: ${transitionTime};
  }
    html {
    font-size: min(calc(100vw / 65), calc(100vh / 65)) !important;
  }
`;

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 18.75rem;
  height: 18.75rem;
  border-radius: 50%;
  background: rgba(255, 170, 51, 0.05);
  filter: blur(6.25rem);
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
  background: 
  radial-gradient(ellipse at top, #09416c, transparent),
  radial-gradient(ellipse at bottom, #001238);
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
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.1);
  padding-left: 4.5rem;
  line-height: 1.5;

  @media (max-width: 48rem) {
    font-size: 3rem;
  }
`;

const CoverflowContainer = styled.div`
  margin: 0 auto;
  width: 95%;
  max-width: 75rem;
`;

const CoverflowList = styled.ol`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: perspective(56.25rem);
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
  border: 0.0625rem solid ${(props) => (props.isWhite ? "#0f79cc" : "#0f79cc")};
  background: ${(props) => (props.isWhite ? "#ffffff" : "#000000")};
  cursor: pointer;
  ${(props) => (props.isActive ? "height: 20rem;" : "")}

  // Coverflow specific styles
  margin: ${(props) => (props.isActive ? "0 0" : "0 -7.5rem")};
  box-shadow: 0 0.0625rem 0.5rem rgba(0, 0, 0, 0.9);
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
    width: ${(props) => (props.isActive ? "70%" : "10%")};
    height: 0.25rem;
    background-color: ${(props) => (props.isWhite ? "#256af1" : "#ffffff")};
    opacity: ${(props) => (props.isActive ? 0.9 : 0.6)};
    border-radius: 0.0625rem;
    transition: all 2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    transform: ${(props) =>
      props.isActive
        ? "rotateY(0deg)"
        : props.isAfterActive
        ? "rotateY(-42deg) translateY(-0.3125rem)"
        : "rotateY(42deg) translateY(-0.3125rem)"};
    box-shadow: 0 1.25rem 2.5rem rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "${(props) => props.dataIndex}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${(props) => (props.isActive ? "26rem" : "18rem")};
    font-weight: 900;
    color: ${(props) => (props.isWhite ? "#256af13b" : "#00a7ff47")};
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
    transform: translateY(-0.3125rem);
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

const ControlButton = styled.button<{ isActive: boolean }>`
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: ${(props) => (props.isActive ? "700" : "500")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(135deg, #3276db 0%, #1e0e6c 100%)"
      : "rgba(255, 255, 255, 0.08)"};
  border: none;
  position: relative;
  overflow: hidden;
box-shadow: 0 0.25rem 0.9375rem rgb(0 0 0 / 40%);
  transform: scale(${(props) => (props.isActive ? "1.1" : "1")});
    color: #ffffff;
    box-shadow: 0 0.25rem 0.9375rem rgb(0 0 0 / 40%);

  &:hover {
 
    background: linear-gradient(135deg, #3276db 0%, #1e0e6c 100%);
    color: #ffffff;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0.25rem 0.9375rem rgb(0 0 0 / 40%);
    transform: scale(1.1);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 50%
    );
    opacity: ${(props) => (props.isActive ? "1" : "0")};
    transition: opacity 0.3s ease;
  }

  
`;

// Main component
export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(5);

  // Gallery data
  const galleries: GalleryData[] = [
    {
      title: "Swivl Work Order",
      content:
        "Next.js + React platform orchestrating AI-assisted work orders for field teams. Led SSR architecture and design system rollout that boosted dashboard loads by 40%.",
    },
    {
      title: "Smart Ticket Router",
      content:
        "Conversational routing experience that pairs chatbots with human agents. Reduced ticket resolution time by 50% with context-aware escalation rules.",
    },
    {
      title: "Resume.io Editor",
      content:
        "Modernized the Resume.io builder with React PDF and docs.js. Delivered instant previews, ATS-friendly exports, and 25% faster render performance.",
    },
    {
      title: "Twilio Segment Fraud Guard",
      content:
        "Fraud detection workflows embedded in Segment’s monorepo. Automated validation to cut manual reviews by 40% while strengthening compliance.",
    },
    {
      title: "Gulf-HR Platform",
      content:
        "Enterprise HR suite with dynamic form builders, role-driven access, and on-demand analytics. Powered by Ant Design and modular component libraries.",
    },
    {
      title: "SHS Homeopathy",
      content:
        "Electron and web apps with AI-assisted search, multi-window navigation, and clinical insights dashboards for practitioners worldwide.",
    },
    {
      title: "AI QA Crawler",
      content:
        "Autonomous QA agent that scans codebases and UIs, maps scenarios to user stories, and highlights regression risks before release.",
    },
    {
      title: "AI Interview Intelligence",
      content:
        "Vision and voice analytics for interview panels. Tracks focus, vocal cues, posture, and surfaces candidate summaries with risk indicators.",
    },
    {
      title: "Quiz Reminder App",
      content:
        "Mobile companion that schedules bite-sized MCQs in the notification tray. Adaptive cadence keeps daily practice effortless and engaging.",
    },
    {
      title: "Gamers Box",
      content:
        "Gaming and esports hub with live streams, editorial workflows, and an admin console for tournament operations and sponsorship tracking.",
    },
    {
      title: "Smart Home Automation",
      content:
        "Arduino-based home automation stack for lighting, climate, and safety systems with energy intelligence dashboards.",
    },
  ];

  return (
    <GalleryWrapper aria-label="Projects gallery">
      <BackgroundGlow aria-hidden="true" />
      <BackgroundGlow aria-hidden="true" />
      <GlobalCoverflowStyle />
      <Subtitle id="gallery-title">Projects</Subtitle>

      <CoverflowContainer aria-labelledby="gallery-title">
        <CoverflowList role="tablist" aria-orientation="horizontal">
          {galleries.map((gallery, index) => {
            const isWhite = index % 2 !== 0;
            const isActive = index === activeIndex;
            const itemId = `gallery-item-${index+1}`;
            const contentId = `gallery-content-${index+1}`;

            return (
              <CoverflowItem
                key={index+1}
                isActive={isActive}
                isAfterActive={index > activeIndex}
                onClick={() => setActiveIndex(index)}
                dataIndex={(index+1).toString()}
                isWhite={isWhite}
                role="tab"
                id={itemId}
                aria-selected={isActive}
                aria-controls={contentId}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveIndex(index);
                  }
                }}
              >
                <Title isWhite={isWhite} isActive={isActive}>
                  {gallery.title}
                </Title>
                <Content 
                  isWhite={isWhite} 
                  isActive={isActive}
                  id={contentId}
                  role="tabpanel"
                  aria-labelledby={itemId}
                  tabIndex={0}
                >
                  {gallery.content}
                </Content>
              </CoverflowItem>
            );
          })}
        </CoverflowList>
      </CoverflowContainer>

      <Controls aria-label="Gallery navigation">
        {galleries.map((gallery, index) => {
          const isActive = index === activeIndex;
          return (
            <ControlButton
              key={index+1}
              isActive={isActive}
              onClick={() => setActiveIndex(index)}
              aria-label={`View project ${index+1}: ${gallery.title}`}
              aria-current={isActive ? "true" : "false"}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveIndex(index);
                }
              }}
            >
              {index+1}
            </ControlButton>
          );
        })}
      </Controls>
    </GalleryWrapper>
  );
}
