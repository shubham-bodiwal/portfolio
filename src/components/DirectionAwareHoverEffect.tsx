import React, { useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// --- Variables & Color Constants ---
const duration = '300ms';
const timingFn = 'ease';
const turquoise = '#1ABC9C';`q`
const wetAsphalt = '#34495E';
const clouds = '#ECF0F1';
// An approximate darkened version of clouds for the box-shadow:
const cloudsDark = '#d0d3d7';

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

// --- Helpers for Animation Mapping ---
const getAnimation = (type: string) => {
  switch (type) {
    case 'in-top': return inTop;
    case 'in-right': return inRight;
    case 'in-bottom': return inBottom;
    case 'in-left': return inLeft;
    case 'out-top': return outTop;
    case 'out-right': return outRight;
    case 'out-bottom': return outBottom;
    case 'out-left': return outLeft;
    default: return null;
  }
};

const getTransformOrigin = (type: string) => {
  switch (type) {
    case 'in-top':
    case 'out-top': return '50% 0%';
    case 'in-right': return '100% 0%';
    case 'out-right': return '100% 50%';
    case 'in-bottom':
    case 'out-bottom': return '50% 100%';
    case 'in-left':
    case 'out-left': return '0% 0%';
    default: return '50% 50%';
  }
};

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #fff;
    margin: 0;
    font-family: sans-serif;
  }
`;

// --- Styled Components ---
const Container = styled.div`
  width: 840px;
  margin: 0 auto;
`;

const Header = styled.header`
  font-family: 'Bree Serif', serif;
  text-align: center;
  margin: 50px 0 25px;
  color: ${wetAsphalt};

  p {
    margin: 0;
    color: rgba(52,73,94,0.4);
  }
`;

const Title = styled.h1`
  margin: 0 auto 5px;
  text-align: center;
`;

const List = styled.ul`
  padding: 0;
  margin: 0 0 50px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const ListItem = styled.li`
  perspective: 400px;
  position: relative;
  float: left;
  width: 200px;
  height: 200px;
  margin: 5px;
  padding: 0;
  list-style: none;
`;

const ItemLink = styled.a`
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-color: ${clouds};
  color: rgba(52,73,94,0.6);
  box-shadow: inset 0 2px 20px ${cloudsDark};
  text-align: center;
  font-size: 50px;
  line-height: 200px;

  svg {
    pointer-events: none;
    width: 50px;
    
    path {
      fill: rgba(52,73,94,0.2);
    }
  }
`;

interface InfoProps {
  animationType?: string;
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
  background-color: rgba(26,188,156,0.9);

  ${props =>
    props.animationType &&
    css`
      animation: ${getAnimation(props.animationType)} ${duration} ${timingFn} 0ms forwards;
      transform-origin: ${getTransformOrigin(props.animationType)};
    `}

  h3 {
    margin: 0;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    font-family: 'Bree Serif', serif;
  }

  p {
    font-size: 12px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
  }
`;

// --- React Component for a Single Hover Item ---
const HoverItem: React.FC = () => {
  const itemRef = useRef<HTMLLIElement>(null);
  const [animation, setAnimation] = useState<string | undefined>(undefined);

  const handleMouse = (e: React.MouseEvent, prefix: 'in' | 'out') => {
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
      const directions = ['top', 'right', 'bottom', 'left'];
      const direction = directions[directionIndex];
      setAnimation(`${prefix}-${direction}`);
    }
  };

  return (
    <ListItem
      ref={itemRef}
      onMouseEnter={(e) => handleMouse(e, 'in')}
      onMouseLeave={(e) => handleMouse(e, 'out')}
    >
      <ItemLink href="#">
        <svg viewBox="0 0 80 76" x="0px" y="0px">
          <g>
            <path d="M 68.9708 24.8623 L 60.4554 2.3018 C 59.9641 0.7017 58.1628 -0.2583 56.5252 0.3817 L 1.9822 20.2222 C 0.3822 20.7022 -0.4179 22.6222 0.2222 24.2223 L 8.8624 47.7797 L 8.8624 35.1484 C 8.8624 29.5024 13.3425 24.8623 18.8857 24.8623 L 32.9442 24.8623 L 50.63 12.862 L 60.7829 24.8623 L 68.9708 24.8623 ZM 77.098 32.0625 L 18.8857 32.0625 C 17.2512 32.0625 16.0625 33.4511 16.0625 35.1484 L 16.0625 72.8491 C 16.0625 74.5477 17.2512 75.9375 18.8857 75.9375 L 77.098 75.9375 C 78.742 75.9375 79.9376 74.5477 79.9376 72.8491 L 79.9376 35.1484 C 79.9376 33.4511 78.742 32.0625 77.098 32.0625 ZM 73.0626 68.0625 L 23.9375 68.0625 L 23.9375 61.0852 L 31.4704 43.7232 L 42.7696 57.6777 L 53.4138 46.8062 L 67.1695 41.9375 L 73.0626 55.0815 L 73.0626 68.0625 Z" />
          </g>
        </svg>
      </ItemLink>
      <Info animationType={animation}>
        <h3>Single-origin coffee whatever</h3>
        <p>
          Williamsburg tofu polaroid, 90's Bushwick irony locavore ethnic meh messenger bag
          Truffaut jean shorts.
        </p>
      </Info>
    </ListItem>
  );
};

// --- Main Component ---
export const DirectionAwareHoverEffect: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Header>
        <Container>
          <Title>Direction-aware hover effect</Title>
          <p>CSS &amp; bits of JS</p>
        </Container>
      </Header>
      <Container>
        <List>
          {Array.from({ length: 12 }).map((_, i) => (
            <HoverItem key={i} />
          ))}
        </List>
      </Container>
    </>
  );
};
