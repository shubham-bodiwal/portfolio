import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";

interface GalleryItemProps {
  isWhite: boolean;
  "data-index"?: string;
  animation?: string;
}

interface GalleryData {
  title: string;
  number: string;
  content: string;
}

export const collapseWidth = keyframes`
  0% {
    opacity: 1;
    width: 100%;
  }

  100% {
    opacity: 0;
    width: 0;
  }
`;

const boxAnimationOpposite = keyframes`
	0% {
		animation-timing-function: ease-in;
		opacity: 0;
		transform: translateX(250px);
	}

	38% {
		animation-timing-function: ease-out;
		opacity: 1;
		transform: translateX(0);
	}

	55% {
		animation-timing-function: ease-in;
		transform: translateX(68px);
	}

	72% {
		animation-timing-function: ease-out;
		transform: translateX(0);
	}

	81% {
		animation-timing-function: ease-in;
		transform: translateX(32px);
	}

	90% {
		animation-timing-function: ease-out;
		transform: translateX(0);
	}

	95% {
		animation-timing-function: ease-in;
		transform: translateX(8px);
	}

	100% {
		animation-timing-function: ease-out;
		transform: translateX(0);
	}`;

const boxAnimation = keyframes`
  0% {
    animation-timing-function: ease-in;
    opacity: 0;
    transform: translateX(-250px);
  }
  38% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateX(0);
  }
  55% {
    animation-timing-function: ease-in;
    transform: translateX(-65px);
  }
  72% {
    animation-timing-function: ease-out;
    transform: translateX(0);
  }
  81% {
    animation-timing-function: ease-in;
    transform: translateX(-28px);
  }
  90% {
    animation-timing-function: ease-out;
    transform: translateX(0);
  }
  95% {
    animation-timing-function: ease-in;
    transform: translateX(-8px);
  }
  100% {
    animation-timing-function: ease-out;
    transform: translateX(0);
  }
`;

const headerAnimation = keyframes`
  0% { letter-spacing: 12rem }
  100% { letter-spacing: 6rem }
`;

const GalleryWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
  background: linear-gradient(to bottom, #0f1827, #3a4965, #03050b);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const GallerySlider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 96rem;
  padding: 2rem;
`;

const GalleryItem = styled(motion.div)<GalleryItemProps>`
  position: relative;
  padding: 2rem;
  border-radius: 0.2rem;
  margin: 7.5rem 2.5rem;
  height: 15rem;
  width: 15rem;
  aspect-ratio: 1/1;
  flex-direction: column;
  justify-content: space-around;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  background: ${(props) => (props.isWhite ? "#ffffff" : "#000000")};
  box-shadow: 0 0 0 transparent;
  cursor: pointer;
  display: ${(props) => (props.animation === "none" ? "none" : "flex")};
  ${(props) =>
    props.animation === "right"
      ? css`
          animation: ${boxAnimationOpposite} 2s ease 0s 1 normal forwards;
        `
      : props.animation === "left"
      ? css`
          animation: ${boxAnimation} 2s ease 0s 1 normal forwards;
        `
      : "none"}

  -webkit-box-reflect: below 1rem
    linear-gradient(to top, rgba(255, 255, 255, 0.4), transparent 20%);

  &::after {
    content: "";
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width: 10%;
    height: 4px;
    background-color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
    opacity: 0.6;
    border-radius: 1px;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    height: 25rem;
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    margin-top: 0rem;
    margin-bottom: 0rem;

    &::after {
      width: 50%;
      opacity: 0.9;
    }

    &::before {
      font-size: 26rem;
    }
  }

  &::before {
    content: "${(props) => props["data-index"]}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18rem;
    font-weight: 900;
    color: ${(props) => (props.isWhite ? "#bdbdbd3b" : "#ffffff18")};
    pointer-events: none;
    z-index: 0;
    user-select: none;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const Title = styled.h3<GalleryItemProps>`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1rem;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;

  ${GalleryItem}:hover & {
    transform: translateY(-5px);
  }
`;

const Subtitle = styled.p`
  color: #ffaa33;
  margin-top: 0;
  text-transform: uppercase;
  animation: ${headerAnimation} 2s ease 0s 1 normal forwards;
  z-index: 1;
  margin-bottom: 0;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 4.5rem;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Content = styled.span<GalleryItemProps>`
  font-size: 1rem;
  letter-spacing: 0.2rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  margin-top: 0.5rem;
  display: none;

  ${GalleryItem}:hover & {
    display: block;
    transform: scale(1) translateY(-10px);
  }
`;

const Line = styled.span<{ isWhite: boolean }>`
  position: absolute;
  width: 100%;
  height: 3rem;
  background: ${(props) => (props.isWhite ? "#ffffff" : "#000000")};
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const NavButton = styled.button`
  color: #ffaa33;
  background: transparent;
  border: none;
`;

const galleries: GalleryData[] = [
  {
    title: "Resume.io",
    number: "01",
    content: "Built ATS-friendly resume templates...",
  },
  {
    title: "Gulf-HR",
    number: "02",
    content: "Developed modular HRMS features...",
  },
  {
    title: "Twilio Segment",
    number: "03",
    content: "Engineered fraud detection system...",
  },
  {
    title: "SHS Homeopathy",
    number: "04",
    content: "Built Electron app for medical records...",
  },
  {
    title: "AI Interview System",
    number: "05",
    content: "AI-powered platform with analytics...",
  },
  {
    title: "Quiz Reminder App",
    number: "06",
    content: "Quiz & notification app with personalization...",
  },
  {
    title: "Gamers Box",
    number: "07",
    content: "Real-time gaming news platform...",
  },
  {
    title: "WhatsApp Clone",
    number: "08",
    content: "Secure messaging app with E2E encryption...",
  },
  {
    title: "E-Shop UI",
    number: "09",
    content: "React UI for modern e-commerce...",
  },
  {
    title: "Crypto Tracker",
    number: "10",
    content: "Live crypto market app with charts...",
  },
  {
    title: "Portfolio V2",
    number: "11",
    content: "My upgraded personal dev portfolio...",
  },
  {
    title: "Notes App",
    number: "12",
    content: "Productive note-taking app with Markdown...",
  },
];

export default function Gallery() {
  const itemsPerPage = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = galleries.length - itemsPerPage;
  const [animation, setAnimation] = useState([
    "left",
    "left",
    "right",
    "right",
    "none",
  ]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnimation((prev) => ["left", ...prev.slice(0, 3)]);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      setAnimation((prev) => [...prev.slice(1), "right"]);
    }
  };

  const visibleItems = galleries.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <GalleryWrapper>
      <Subtitle>Projects</Subtitle>
      <GallerySlider>
        {visibleItems.map((g, i) => {
          const isWhite = (currentIndex + i) % 2 === 0;
          return (
            <GalleryItem
              key={g.number}
              animation={animation[i]}
              isWhite={isWhite}
              data-index={g.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Line isWhite={isWhite}></Line>
              <Title isWhite={isWhite}>{g.title}</Title>
              <Content isWhite={isWhite}>{g.content}</Content>
            </GalleryItem>
          );
        })}
      </GallerySlider>
      <div>
        <NavButton onClick={handlePrev} disabled={currentIndex === 0}>
          ◀
        </NavButton>
        <NavButton onClick={handleNext} disabled={currentIndex >= maxIndex}>
          ▶
        </NavButton>
      </div>
    </GalleryWrapper>
  );
}
