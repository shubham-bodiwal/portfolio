import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles (including font import)
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');

  html, body {
    height: 100%;
  }
  
  body {
    align-items: center;
    background: #642B73;
    background: linear-gradient(to bottom, #C6426E, #642B73);
    display: flex;
    font-family: 'Open Sans', sans-serif;
    justify-content: center;
    overflow: hidden;
    perspective: 1800px;
    text-align: center;
    margin: 0 20px;
  }
`;

// Styled components for headers
const Subtitle = styled.h3`
  color: #eb285d;
  font-size: 16px;
  margin-bottom: 6px;
  transform: translateZ(25px);
`;

const Title = styled.h1`
  color: #3e3e42;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 30px;
  transform: translateZ(35px);
`;

// Container for the cards
const Cards = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 10px 20px 20px rgba(0,0,0,0.17);
  display: inline-block;
  padding: 30px 35px;
  perspective: 1800px;
  text-align: left;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  transform: rotateX(11deg) rotateY(16.5deg);
  min-width: 595px;
  position: relative;
`;

// Base card component
const Card = styled.div`
  border-radius: 15px;
  box-shadow: 5px 5px 20px -5px rgba(0,0,0,0.6);
  display: inline-block;
  height: 250px;
  overflow: hidden;
  perspective: 1200px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(35px);
  transition: transform 200ms ease-out;
  width: 175px;
  text-align: center;

  &:not(:last-child) {
    margin-right: 30px;
  }
`;

// Styled components for card elements
const CardImg = styled.img`
  position: relative;
  height: 100%;
`;

const CardBg = styled.div`
  position: absolute;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  transform-origin: 50% 50%;
  transform: translateZ(-50px);
  z-index: 0;
`;

const CardText = styled.div`
  align-items: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
  bottom: 0;
  display: flex;
  flex-direction: column; 
  height: 70px;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 2;
`;

const CardTitle = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 0 10px;
  margin-bottom: 3px;
`;

// Specific card variants with additional styling
const CardOne = styled(Card)`
  ${CardImg} {
    top: 14px;
    right: -10px;
    height: 110%;
    position: absolute;
  }
  ${CardBg} {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_monobg.jpg') center/cover no-repeat;
  }
`;

const CardTwo = styled(Card)`
  ${CardImg} {
    top: 25px;
    position: absolute;
  }
  ${CardBg} {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_spirited.jpg') center/cover no-repeat;
  }
`;

const CardThree = styled(Card)`
  ${CardImg} {
    top: 5px;
    left: -4px;
    height: 110%;
    position: absolute;
  }
  ${CardBg} {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlbg.jpg') center/cover no-repeat;
  }
`;

// Additional styled components for the notice and twitter link
const Notice = styled.span`
  background: gold;
  border-top-left-radius: 6px;
  bottom: 0;
  font-family: monospace;
  font-size: 14px;
  padding: 8px 10px;
  position: absolute;
  right: -20px;
`;

const TwitterLink = styled.a`
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: 12px;
  z-index: -1;
  background: #00aced;
  border-radius: 20px;
  height: 30px;
  text-decoration: none;
  padding-right: 10px;
  justify-content: space-between;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  width: 74px;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;

const TwitterIcon = styled.img`
  height: 30px;
`;

const range = 40;

const calcValue = (a: number, b: number) =>
  ((a / b) * range - range / 2).toFixed(1);

const MovieCards: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (timeout !== null) {
        cancelAnimationFrame(timeout);
      }
      timeout = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        const xValue = calcValue(x, window.innerWidth);
        const yValue = calcValue(y, window.innerHeight);

        if (cardsRef.current) {
          cardsRef.current.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
          const images = cardsRef.current.querySelectorAll<HTMLImageElement>('.card__img');
          const backgrounds = cardsRef.current.querySelectorAll<HTMLDivElement>('.card__bg');

          images.forEach(image => {
            image.style.transform = `translateX(${-Number(xValue)}px) translateY(${yValue}px)`;
          });
          backgrounds.forEach(bg => {
            bg.style.backgroundPosition = `${Number(xValue) * 0.45}px ${-Number(yValue) * 0.45}px`;
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeout !== null) {
        cancelAnimationFrame(timeout);
      }
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Cards ref={cardsRef}>
        <Subtitle>Movies</Subtitle>
        <Title>Popular</Title>
        <CardOne>
          <CardBg className="card__bg" />
          <CardImg
            className="card__img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_mono.png"
            alt="Princess Mononoke"
          />
          <CardText className="card__text">
            <CardTitle className="card__title">Princess Mononoke</CardTitle>
          </CardText>
        </CardOne>
        <CardTwo>
          <CardBg className="card__bg" />
          <CardImg
            className="card__img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_chihiro.png"
            alt="Spirited Away"
          />
          <CardText className="card__text">
            <CardTitle className="card__title">Spirited Away</CardTitle>
          </CardText>
        </CardTwo>
        <CardThree>
          <CardBg className="card__bg" />
          <CardImg
            className="card__img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlcastle.png"
            alt="Howl's Moving Castle"
          />
          <CardText className="card__text">
            <CardTitle className="card__title">Howl's Moving Castle</CardTitle>
          </CardText>
        </CardThree>
      </Cards>
      <Notice className="notice">view on desktop for mousemove</Notice>
      <TwitterLink
        className="twitter__link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%203D%20CSS%20depth%20effect%20from%20@dazulu&via=CodePen%20&hashtags=codepen%2cfrontend&url=https://codepen.io/dazulu/details/VVZrQv/"
      >
        <TwitterIcon
          className="twitter__icon"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/twitter.svg"
          alt="Twitter Icon"
        />
        Share
      </TwitterLink>
    </>
  );
};

export default MovieCards;
