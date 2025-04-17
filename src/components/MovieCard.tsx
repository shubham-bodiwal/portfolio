import { useEffect, useRef, useState, FC, KeyboardEvent } from "react";
import styled, { createGlobalStyle } from "styled-components";

// Global styles (including font import)
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');

  html, body {
    height: 100%;
    font-size: min(calc(100vw / 65), calc(100vh / 65)) !important;
  }
  
  body {
    align-items: center;
    background: #642B73;
    background: linear-gradient(to bottom, #C6426E, #642B73);
    display: flex;
    font-family: 'Open Sans', sans-serif;
    justify-content: center;
    overflow: hidden;
    perspective: 112.5rem;
    text-align: center;
    margin: 0 1.25rem;
  }
`;

// Styled components for headers
const Subtitle = styled.h3`
  color: #eb285d;
  font-size: 1rem;
  margin-bottom: 0.375rem;
  transform: translateZ(1.5625rem);
`;

const Title = styled.h1`
  color: #3e3e42;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.0625rem;
  margin-bottom: 1.875rem;
  transform: translateZ(2.1875rem);
`;

// Container for the cards
const Cards = styled.div`
  background: #fff;
  border-radius: 0.9375rem;
  box-shadow: 0rem 0.625rem 1.25rem 1.25rem rgba(0, 0, 0, 0.17);
  display: inline-block;
  padding: 1.875rem 2.1875rem;
  perspective: 112.5rem;
  text-align: left;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  transform: rotateX(11deg) rotateY(16.5deg);
  min-width: 37.1875rem;
  position: relative;
`;

// Base card component
const Card = styled.div`
  border-radius: 0.9375rem;
  box-shadow: 0.3125rem 0.3125rem 1.25rem -0.3125rem rgba(0, 0, 0, 0.6);
  display: inline-block;
  height: 15.625rem;
  overflow: hidden;
  perspective: 75rem;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(2.1875rem);
  transition: transform 200ms ease-out;
  width: 10.9375rem;
  text-align: center;

  &:not(:last-child) {
    margin-right: 1.875rem;
  }
`;

// Styled components for card elements
const CardImg = styled.img`
  position: relative;
  height: 100%;
`;

const CardBg = styled.div`
  position: absolute;
  top: -3.125rem;
  left: -3.125rem;
  right: -3.125rem;
  bottom: -3.125rem;
  transform-origin: 50% 50%;
  transform: translateZ(-3.125rem);
  z-index: 0;
`;

const CardText = styled.div`
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.55) 100%
  );
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 4.375rem;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 2;
`;

const CardTitle = styled.p`
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0 0.625rem;
  margin-bottom: 0.1875rem;
`;

// Specific card variants with additional styling
const CardOne = styled(Card)`
  ${CardImg} {
    top: 0.875rem;
    right: -0.625rem;
    height: 110%;
    position: absolute;
  }
  ${CardBg} {
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_monobg.jpg")
      center/cover no-repeat;
  }
`;

const CardTwo = styled(Card)`
  ${CardImg} {
    top: 1.5625rem;
    position: absolute;
  }
  ${CardBg} {
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_spirited.jpg")
      center/cover no-repeat;
  }
`;

const CardThree = styled(Card)`
  ${CardImg} {
    top: 0.3125rem;
    left: -0.25rem;
    height: 110%;
    position: absolute;
  }
  ${CardBg} {
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlbg.jpg")
      center/cover no-repeat;
  }
`;

// Additional styled components for the notice and twitter link
const Notice = styled.span`
  background: gold;
  border-top-left-radius: 0.375rem;
  bottom: 0;
  font-family: monospace;
  font-size: 0.875rem;
  padding: 0.5rem 0.625rem;
  position: absolute;
  right: -1.25rem;
`;

const TwitterLink = styled.a`
  cursor: pointer;
  position: absolute;
  right: -0.625rem;
  top: 0.75rem;
  z-index: -1;
  background: #00aced;
  border-radius: 1.25rem;
  height: 1.875rem;
  text-decoration: none;
  padding-right: 0.625rem;
  justify-content: space-between;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 0.875rem;
  width: 4.625rem;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;

const TwitterIcon = styled.img`
  height: 1.875rem;
`;

const AccessibilityControls = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
`;

const ToggleButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: 1px solid white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:focus {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }
`;

const range = 40;

const calcValue = (a: number, b: number) =>
  ((a / b) * range - range / 2).toFixed(1);

const MovieCards: FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(true);

  // Check for user's motion preference
  useEffect(() => {
    if (window.matchMedia) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        setMotionEnabled(false);
      }
    }
  }, []);

  // Handle mouse movement for 3D effect
  useEffect(() => {
    // Skip effect if motion is disabled
    if (!motionEnabled) return;

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
          const images =
            cardsRef.current.querySelectorAll<HTMLImageElement>(".card__img");
          const backgrounds =
            cardsRef.current.querySelectorAll<HTMLDivElement>(".card__bg");

          images.forEach((image) => {
            image.style.transform = `translateX(${
              -Number(xValue) / 16
            }rem) translateY(${Number(yValue) / 16}rem)`;
          });
          backgrounds.forEach((bg) => {
            bg.style.backgroundPosition = `${(Number(xValue) * 0.45) / 16}rem ${
              (-Number(yValue) * 0.45) / 16
            }rem`;
          });
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (timeout !== null) {
        cancelAnimationFrame(timeout);
      }
    };
  }, [motionEnabled]);

  // Keyboard navigation handlers
  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (!motionEnabled) return;

    // Only apply effect when using arrow keys
    let xValue = 0;
    let yValue = 0;

    switch (e.key) {
      case "ArrowUp":
        yValue = -3;
        break;
      case "ArrowDown":
        yValue = 3;
        break;
      case "ArrowLeft":
        xValue = -3;
        break;
      case "ArrowRight":
        xValue = 3;
        break;
      default:
        return; // Exit if not using arrow keys
    }

    if (cardsRef.current) {
      cardsRef.current.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
      const images =
        cardsRef.current.querySelectorAll<HTMLImageElement>(".card__img");
      const backgrounds =
        cardsRef.current.querySelectorAll<HTMLDivElement>(".card__bg");

      images.forEach((image) => {
        image.style.transform = `translateX(${-xValue / 16}rem) translateY(${
          yValue / 16
        }rem)`;
      });
      backgrounds.forEach((bg) => {
        bg.style.backgroundPosition = `${(xValue * 0.45) / 16}rem ${
          (-yValue * 0.45) / 16
        }rem`;
      });
    }
  };

  const toggleMotion = () => {
    setMotionEnabled((prev) => !prev);
    // Reset transform when disabling motion
    if (motionEnabled && cardsRef.current) {
      cardsRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
      const images =
        cardsRef.current.querySelectorAll<HTMLImageElement>(".card__img");
      const backgrounds =
        cardsRef.current.querySelectorAll<HTMLDivElement>(".card__bg");

      images.forEach((image) => {
        image.style.transform = "translateX(0) translateY(0)";
      });
      backgrounds.forEach((bg) => {
        bg.style.backgroundPosition = "0 0";
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <AccessibilityControls>
        <ToggleButton
          onClick={toggleMotion}
          aria-pressed={motionEnabled}
          aria-label={
            motionEnabled
              ? "Disable 3D motion effect"
              : "Enable 3D motion effect"
          }
        >
          {motionEnabled ? "Disable Motion" : "Enable Motion"}
        </ToggleButton>
      </AccessibilityControls>

      <Cards
        ref={cardsRef}
        tabIndex={0}
        role="region"
        aria-label="Movie collection with 3D effect"
        onKeyDown={handleKeyNavigation}
        style={!motionEnabled ? { transform: "none", transition: "none" } : {}}
      >
        <Subtitle>Movies</Subtitle>
        <Title>Popular</Title>
        <CardOne>
          <CardBg className="card__bg" aria-hidden="true" />
          <CardImg
            loading="lazy"
            className="card__img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_mono.png"
            alt="Princess Mononoke movie poster"
          />
          <CardText className="card__text">
            <CardTitle className="card__title">Princess Mononoke</CardTitle>
          </CardText>
        </CardOne>
        <CardTwo>
          <CardBg className="card__bg" aria-hidden="true" />
          <CardImg
            loading="lazy"
            className="card__img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_chihiro.png"
            alt="Spirited Away movie poster"
          />
          <CardText className="card__text">
            <CardTitle className="card__title">Spirited Away</CardTitle>
          </CardText>
        </CardTwo>
        <CardThree>
          <CardBg className="card__bg" aria-hidden="true" />
          <CardImg
            loading="lazy"
            className="card__img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlcastle.png"
            alt="Howl's Moving Castle movie poster"
          />
          <CardText className="card__text">
            <CardTitle className="card__title">Howl's Moving Castle</CardTitle>
          </CardText>
        </CardThree>
      </Cards>

      <Notice className="notice" aria-live="polite">
        {motionEnabled
          ? "View on desktop for mousemove or use arrow keys for 3D effect"
          : "3D motion effect is disabled"}
      </Notice>

      <TwitterLink
        className="twitter__link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%203D%20CSS%20depth%20effect%20from%20@dazulu&via=CodePen%20&hashtags=codepen%2cfrontend&url=https://codepen.io/dazulu/details/VVZrQv/"
        aria-label="Share on Twitter"
      >
        <TwitterIcon
          className="twitter__icon"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/twitter.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        Share
      </TwitterLink>
    </>
  );
};

export default MovieCards;
