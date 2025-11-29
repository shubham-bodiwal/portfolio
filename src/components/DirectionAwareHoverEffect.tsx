import { useRef, useState, useEffect, FC, MouseEvent } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

// --- Variables & Color Constants ---
const duration = "300ms";
const timingFn = "ease";
// const wetAsphalt = "#34495E";
// const clouds = "#5d5d5d00";

// --- Color palettes for random backgrounds ---
const colorPalettes = [
  // Each palette contains [background, text] colors
  ["#6C63FF", "#fff"], // Purple
  ["#FF6B6B", "#fff"], // Red
  ["#4ECDC4", "#fff"], // Teal
  ["#FF9F43", "#fff"], // Orange
  ["#45AAF2", "#fff"], // Blue
  ["#2ED573", "#fff"], // Green
  ["#F368E0", "#fff"], // Pink
  ["#222f3e", "#fff"], // Dark Blue
  ["#5f27cd", "#fff"], // Indigo
  ["#ee5253", "#fff"], // Red
  ["#0abde3", "#fff"], // Blue
  ["#10ac84", "#fff"], // Green
];

// --- Keyframes Animations ---
const inTop = keyframes`
  from { transform: rotate3d(-1, 0, 0, 90deg); }
  to   { transform: rotate3d(0, 0, 0, 0deg); }
`;
const inRight = keyframes`
  from { transform: rotate3d(0, -1, 0, 90deg); }
  to   { transform: rotate3d(0, 0, 0, 0deg); }
`;
const inBottom = keyframes`
  from { transform: rotate3d(1, 0, 0, 90deg); }
  to   { transform: rotate3d(0, 0, 0, 0deg); }
`;
const inLeft = keyframes`
  from { transform: rotate3d(0, 1, 0, 90deg); }
  to   { transform: rotate3d(0, 0, 0, 0deg); }
`;

const outTop = keyframes`
  from { transform: rotate3d(0, 0, 0, 0deg); }
  to   { transform: rotate3d(-1, 0, 0, 104deg); }
`;
const outRight = keyframes`
  from { transform: rotate3d(0, 0, 0, 0deg); }
  to   { transform: rotate3d(0, -1, 0, 104deg); }
`;
const outBottom = keyframes`
  from { transform: rotate3d(0, 0, 0, 0deg); }
  to   { transform: rotate3d(1, 0, 0, 104deg); }
`;
const outLeft = keyframes`
  from { transform: rotate3d(0, 0, 0, 0deg); }
  to   { transform: rotate3d(0, 1, 0, 104deg); }
`;

// Initial load animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(1.25rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const staggeredFadeIn = keyframes`
  from { opacity: 0; transform: translateY(1.875rem); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Helpers for Animation Mapping ---
const getAnimation = (type: string) => {
  switch (type) {
    case "in-top":
      return inTop;
    case "in-right":
      return inRight;
    case "in-bottom":
      return inBottom;
    case "in-left":
      return inLeft;
    case "out-top":
      return outTop;
    case "out-right":
      return outRight;
    case "out-bottom":
      return outBottom;
    case "out-left":
      return outLeft;
    default:
      return null;
  }
};

const getTransformOrigin = (type: string) => {
  switch (type) {
    case "in-top":
    case "out-top":
      return "50% 0%";
    case "in-right":
      return "100% 0%";
    case "out-right":
      return "100% 50%";
    case "in-bottom":
    case "out-bottom":
      return "50% 100%";
    case "in-left":
    case "out-left":
      return "0% 0%";
    default:
      return "50% 50%";
  }
};

// Get random color palette
const getRandomColorPalette = (index: number) => {
  // Use index to ensure consistent colors for each item
  return colorPalettes[index % colorPalettes.length];
};

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: min(calc(100vw / 65), calc(100vh / 65)) !important;
  }
  body {
    background-color: #fff;
    margin: 0;
  }
`;

// --- Styled Components ---
const Container = styled.div`
  width: 52.5rem;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const Title = styled.h1`
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

const List = styled.ul`
  padding: 0;
  margin: 0 0 3.125rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

interface ListItemProps {
  delay: number;
}

const ListItem = styled.li<ListItemProps>`
  perspective: 25rem;
  position: relative;
  float: left;
  width: 12.5rem;
  height: 12.5rem;
  margin: 0.3125rem;
  padding: 0;
  list-style: none;
  opacity: 0;
  animation: ${staggeredFadeIn} 0.5s ease-out forwards;
  animation-delay: ${(props) => `${props.delay * 0.1}s`};
`;

const ItemLink = styled.a`
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
  border-radius: 0.25rem;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.1875rem);
  color: rgba(52, 73, 94, 0.6);
  text-align: center;
  font-size: 3.125rem;
  line-height: 12.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.15);
  }

  svg {
    pointer-events: none;
    width: 3.125rem;

    path {
      fill: rgba(255, 255, 255, 0.4);
      transition: fill 0.3s ease;
    }
  }
`;

interface InfoProps {
  animationType?: string;
  bgColor: string;
  textColor: string;
}

const Info = styled.div<InfoProps>`
  transform: rotate3d(1, 0, 0, 90deg);
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.25rem;
  pointer-events: none;
  background-color: ${(props) => props.bgColor || "rgba(26, 188, 156, 0.9)"};
  box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.animationType &&
    css`
      animation: ${getAnimation(props.animationType)} ${duration} ${timingFn}
        0ms forwards;
      transform-origin: ${getTransformOrigin(props.animationType)};
    `}

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: ${(props) => props.textColor || "rgba(255, 255, 255, 0.9)"};
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    color: ${(props) => props.textColor || "rgba(255, 255, 255, 0.8)"};
    margin-top: 0.625rem;
  }
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: radial-gradient(ellipse at top, #09416c, transparent),
  radial-gradient(ellipse at bottom, #001238);
  padding: 2rem 1rem;
`;

// --- Creative texts for Hover Items ---
interface HoverText {
  title: string;
  description: string;
}

const hoverTexts: HoverText[] = [
  {
    title: "Architect First",
    description:
      "I shape frontend systems that scale gracefully across squads, products, and release cycles.",
  },
  {
    title: "Performance Obsessed",
    description:
      "Core Web Vitals, caching layers, and SSR pipelines are my playground for faster ships.",
  },
  {
    title: "AI-Augmented Delivery",
    description:
      "From smart ticket routing to QA agents, I blend AI with UX to unlock measurable gains.",
  },
  {
    title: "Accessibility Advocate",
    description:
      "Every interaction should be inclusive. WCAG compliance is a feature, not a task.",
  },
  {
    title: "Mentor Mode",
    description:
      "I coach teams through architecture reviews, pairing sessions, and healthy feedback loops.",
  },
  {
    title: "Story-Driven UI",
    description:
      "I translate user pain points into journey maps, then code experiences that feel effortless.",
  },
  {
    title: "Data-Informed Decisions",
    description:
      "Instrumentation and analytics inform my roadmap, validating each iteration before scaling.",
  },
  {
    title: "Quality Gatekeeper",
    description:
      "95% automated coverage, bulletproof pipelines, and calm releases are non-negotiable.",
  },
  {
    title: "Systems Thinker",
    description:
      "Reusable component libraries and guardrails keep teams fast without sacrificing craft.",
  },
  {
    title: "Design System Builder",
    description:
      "I partner with design to codify tokens, patterns, and accessibility baked into the stack.",
  },
  {
    title: "Cross-Functional Partner",
    description:
      "Product, design, GTM, and support teams get a frontend ally who speaks their language.",
  },
  {
    title: "Continuous Improver",
    description:
      "Retros, metrics, and curiosity fuel a culture where ‘done’ means better than yesterday.",
  },
];

// --- React Component for a Single Hover Item ---
interface HoverItemProps {
  index: number;
  delay: number;
}

const HoverItem: FC<HoverItemProps> = ({ index, delay }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const [animation, setAnimation] = useState<string | undefined>(undefined);
  const [colorPalette] = useState(getRandomColorPalette(index));
  const [bgColor, textColor] = colorPalette;

  const handleMouse = (e: MouseEvent, prefix: "in" | "out") => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const l = e.pageX - (rect.left + window.pageXOffset);
      const t = e.pageY - (rect.top + window.pageYOffset);
      const { width, height } = rect;
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      const angle = Math.atan2(y, x);
      // Divide the circle into 4 quadrants:
      const directionIndex = Math.round(angle / (Math.PI / 2) + 5) % 4;
      const directions = ["top", "right", "bottom", "left"];
      const direction = directions[directionIndex];
      setAnimation(`${prefix}-${direction}`);
    }
  };

  // Handle keyboard focus/blur events
  const handleFocus = () => {
    setAnimation("in-top"); // Default animation direction for keyboard users
  };

  const handleBlur = () => {
    setAnimation("out-top"); // Default animation direction for keyboard users
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  const { title, description } = hoverTexts[index % hoverTexts.length];

  // Generate a unique ID for ARIA labeling
  const itemId = `hover-item-${index}`;
  const titleId = `title-${index}`;
  const descId = `desc-${index}`;

  return (
    <ListItem
      ref={itemRef}
      onMouseEnter={(e) => handleMouse(e, "in")}
      onMouseLeave={(e) => handleMouse(e, "out")}
      delay={delay}
      aria-labelledby={titleId}
      aria-describedby={descId}
      id={itemId}
    >
      <ItemLink
        href="#"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={0}
        role="button"
      ></ItemLink>
      <Info animationType={animation} bgColor={bgColor} textColor={textColor}>
        <h3 id={titleId}>{title}</h3>
        <p id={descId}>{description}</p>
      </Info>
    </ListItem>
  );
};

// --- Main Component ---
export const DirectionAwareHoverEffect: FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <MainContainer>
      <GlobalStyle />
      <Title>Principles</Title>
      <Container>
        <List role="list" aria-label="Design principles">
          {loaded &&
            Array.from({ length: 12 }).map((_, i) => (
              <HoverItem key={i} index={i} delay={i} />
            ))}
        </List>
      </Container>
    </MainContainer>
  );
};

export default DirectionAwareHoverEffect;
