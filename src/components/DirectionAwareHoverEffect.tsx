import React, { useRef, useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

// --- Variables & Color Constants ---
const duration = "300ms";
const timingFn = "ease";
// const wetAsphalt = "#34495E";
const clouds = "#5d5d5d";

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
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const staggeredFadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
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
  body {
    background-color: #fff;
    margin: 0;
  }
`;

// --- Styled Components ---
const Container = styled.div`
  width: 1260px;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 4.5rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;


const List = styled.ul`
  padding: 0;
  margin: 0 0 50px;
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
  perspective: 400px;
  position: relative;
  float: left;
  width: 200px;
  height: 200px;
  margin: 5px;
  padding: 0;
  list-style: none;
  opacity: 0;
  animation: ${staggeredFadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => `${props.delay * 0.1}s`};
`;

const ItemLink = styled.a`
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-color: ${clouds};
  color: rgba(52, 73, 94, 0.6);
  text-align: center;
  font-size: 50px;
  line-height: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  svg {
    pointer-events: none;
    width: 50px;

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
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  pointer-events: none;
  background-color: ${props => props.bgColor || "rgba(26, 188, 156, 0.9)"};
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);

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
    color: ${props => props.textColor || "rgba(255, 255, 255, 0.9)"};
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    color: ${props => props.textColor || "rgba(255, 255, 255, 0.8)"};
    margin-top: 10px;
  }
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, #03050b 0%, #1a1e2e 100%);
  padding: 2rem 1rem;
`;

// --- Creative texts for Hover Items ---
interface HoverText {
  title: string;
  description: string;
}

const hoverTexts: HoverText[] = [
  {
    title: "Craftsman Mindset",
    description: "I don't just write code—I sculpt it, pixel by pixel, with precision and pride.",
  },
  {
    title: "Perpetual Learner",
    description: "My curiosity ships features. I chase problems like puzzles, not chores.",
  },
  {
    title: "Engineering with Empathy",
    description: "Code is for humans first, machines second. Accessibility isn't optional.",
  },
  {
    title: "Tech Explorer",
    description: "From React to Arduino, I explore, build, break, and rebuild. Curiosity > Comfort.",
  },
  {
    title: "Pixel-Perfect & Purpose-Driven",
    description: "Design with intention. Animate with logic. Deliver with delight.",
  },
  {
    title: "Web Performance Geek",
    description: "Fast feels good. I tune every byte until it sings.",
  },
  {
    title: "Creative Problem Solver",
    description: "Give me a bottleneck—I'll give you a blueprint and a breakthrough.",
  },
  {
    title: "Detail-Oriented",
    description: "I debug with surgical precision and review PRs like poetry.",
  },
  {
    title: "System Thinker",
    description: "I see patterns. I build systems. I make chaos modular.",
  },
  {
    title: "Style Meets Substance",
    description: "Styled-components addict. UI should look good and feel right.",
  },
  {
    title: "Collaborative Energy",
    description: "I bring code, calm, and candor to every stand-up and sprint.",
  },
  {
    title: "Growth Mindset",
    description: "Version 1 is never the end. I iterate, elevate, and never settle.",
  },
];

// --- React Component for a Single Hover Item ---
interface HoverItemProps {
  index: number;
  delay: number;
}

const HoverItem: React.FC<HoverItemProps> = ({ index, delay }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const [animation, setAnimation] = useState<string | undefined>(undefined);
  const [colorPalette] = useState(getRandomColorPalette(index));
  const [bgColor, textColor] = colorPalette;

  const handleMouse = (e: React.MouseEvent, prefix: "in" | "out") => {
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

  const { title, description } = hoverTexts[index % hoverTexts.length];

  return (
    <ListItem
      ref={itemRef}
      onMouseEnter={(e) => handleMouse(e, "in")}
      onMouseLeave={(e) => handleMouse(e, "out")}
      delay={delay}
    >
      <ItemLink href="#">
      </ItemLink>
      <Info
        animationType={animation}
        bgColor={bgColor}
        textColor={textColor}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </Info>
    </ListItem>
  );
};

// --- Main Component ---
export const DirectionAwareHoverEffect: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <MainContainer>
      <GlobalStyle />
          <Title>Principles</Title>
      <Container>
        <List>
          {loaded && Array.from({ length: 12 }).map((_, i) => (
            <HoverItem key={i} index={i} delay={i} />
          ))}
        </List>
      </Container>
    </MainContainer>
  );
};

export default DirectionAwareHoverEffect;