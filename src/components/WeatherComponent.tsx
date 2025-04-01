import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Declare globals for libraries assumed to be loaded externally.
declare const TweenMax: any;
declare const Power2: any;
declare const Elastic: any;
declare const Snap: any;
declare const $: any;

// =====================
// Styled Components
// =====================

const Background = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Lato", sans-serif;
  background: #eee;
  background: linear-gradient(120deg, rgba(50, 150, 100, 0.2), rgba(0, 0, 100, 0));
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
  background: #eee;
  background: linear-gradient(240deg, rgba(150, 50, 50, 0.3), rgba(0, 0, 200, 0));
`;

const Nav = styled.nav`
  ul {
    margin: 20px 20px 0 20px;
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row;
  }
  li a {
    display: block;
    width: 50px;
    text-align: center;
    color: #aaa;
    cursor: pointer;
    &:hover {
      color: #444;
    }
    &.active {
      color: #4444ff;
    }
  }
`;

const Card = styled.div`
  box-shadow: 9px 7px 40px -6px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  width: 300px;
  padding: 0;
  height: 400px;
  min-height: 300px;
  margin: 20px;
  border-radius: 5px;
  position: relative;
  background-color: #dae3fd;
  transition: background-color 2s ease;

  .details {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 16px 20px;
    color: #888;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: color 2s ease;

    .temp {
      font-size: 60px;
      line-height: 60px;
      span {
        font-size: 18px;
        line-height: 30px;
        vertical-align: top;
        margin-left: 5px;
      }
    }

    .right {
      text-align: right;
      #date {
        margin: 4px 0;
      }
      #summary {
        font-weight: 600;
        font-size: 22px;
      }
    }
  }
`;

const StyledSvg = styled.svg`
  &.fixed {
    position: fixed;
    pointer-events: none;
  }
`;

// =====================
// React Component
// =====================

const WeatherComponent: React.FC = () => {
  // Create refs for the main container and SVG elements.
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerSvgRef = useRef<SVGSVGElement>(null);
  const outerSvgRef = useRef<SVGSVGElement>(null);
  const backSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Ensure all refs are available.
    if (
      !containerRef.current ||
      !cardRef.current ||
      !innerSvgRef.current ||
      !outerSvgRef.current ||
      !backSvgRef.current
    ) {
      return;
    }

    // Get jQuery-wrapped elements from refs.
    const $container = $(containerRef.current);
    const $card = $(cardRef.current);

    // Initialize Snap SVG elements.
    const innerSVG = Snap(innerSvgRef.current);
    const outerSVG = Snap(outerSvgRef.current);
    const backSVG = Snap(backSvgRef.current);

    // Define a sizes object to track dimensions.
    let sizes = {
      container: { width: 0, height: 0 },
      card: { width: 0, height: 0, offset: { top: 0, left: 0 } },
    };

    // -------------------------------
    // Initialization & Animation Code
    // -------------------------------

    const init = () => {
      onResize();

      // Bind weather menu buttons.
      const weatherTypes = ["snow", "wind", "rain", "thunder", "sun"];
      weatherTypes.forEach((type) => {
        $(`#button-${type}`).on("click", () => changeWeather(type));
      });

      // Set initial weather.
      TweenMax.set(backSVG.select("#sunburst").node, { opacity: 0 });
      changeWeather("snow");

      // Start the animation tick.
      requestAnimationFrame(tick);
    };

    const onResize = () => {
      sizes.container.width = $container.width();
      sizes.container.height = $container.height();
      sizes.card.width = $card.width();
      sizes.card.height = $card.height();
      sizes.card.offset = $card.offset();

      // Update SVG sizes.
      innerSVG.attr({
        width: sizes.card.width,
        height: sizes.card.height,
      });
      outerSVG.attr({
        width: sizes.container.width,
        height: sizes.container.height,
      });
      backSVG.attr({
        width: sizes.container.width,
        height: sizes.container.height,
      });

      // Set transform origin and animate the sunburst.
      TweenMax.set(backSVG.select("#sunburst").node, {
        transformOrigin: "50% 50%",
        x: sizes.container.width / 2,
        y: sizes.card.height / 2 + sizes.card.offset.top,
      });
      TweenMax.fromTo(
        backSVG.select("#sunburst").node,
        20,
        { rotation: 0 },
        { rotation: 360, repeat: -1, ease: Power2.easeInOut }
      );
    };

    const tick = () => {
      // Insert per-frame animation logic here.
      requestAnimationFrame(tick);
    };

    const changeWeather = (type: string) => {
      // Remove any existing weather classes.
      $container.removeClass("snow wind rain thunder sun");
      // Add the new weather class.
      $container.addClass(type);

      // (Here you would adjust settings and animations according to the selected weather.)
      console.log(`Weather changed to ${type}`);
    };

    // Bind the window resize event.
    $(window).on("resize", onResize);

    // Initialize the component.
    init();

    // Cleanup on unmount.
    return () => {
      $(window).off("resize", onResize);
    };
  }, []);

  return (
    <Background>
      <Container ref={containerRef} className="container">
        {/* Back SVG with sunburst */}
        <StyledSvg ref={backSvgRef} id="back">
          <radialGradient
            id="SVGID_1_"
            cx="0"
            cy="0"
            r="320.8304"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" style={{ stopColor: "#FFDE17", stopOpacity: 0.7 }} />
            <stop offset="1" style={{ stopColor: "#FFF200", stopOpacity: 0 }} />
          </radialGradient>
          <path
            id="sunburst"
            style={{ fill: "url(#SVGID_1_)" }}
            d="M0,319.7c-18.6,0-37.3-1.6-55.5-4.8L-7.8,41.4c5.1,0.9,10.6,0.9,15.7,0L56,314.8C37.6,318,18.8,319.7,0,319.7z
               M-160.8,276.6c-32.5-18.8-61.3-42.9-85.5-71.6L-34,26.2c3.4,4.1,7.4,7.4,12,10.1L-160.8,276.6z M161.3,276.4L22.1,36.2
               c4.5-2.6,8.6-6,12-10.1l212.6,178.5C222.5,233.4,193.8,257.6,161.3,276.4z M-302.5,108.3C-315.4,73-321.9,36-322-1.8l277.6-0.5
               c0,5.3,0.9,10.4,2.7,15.2L-302.5,108.3z M302.6,107.8L41.8,12.8c1.7-4.7,2.6-9.7,2.6-14.9c0-0.3,0-0.6,0-1H322l0-1.3l0,1.9
               C322,35.4,315.5,72.5,302.6,107.8z M-41.8-17.5l-261-94.5c12.8-35.4,31.6-68,55.8-96.9L-34.1-30.8C-37.5-26.8-40.1-22.3-41.8-17.5z
               M41.7-17.7c-1.8-4.8-4.4-9.3-7.8-13.3l212-179.2c24.3,28.8,43.3,61.3,56.3,96.6L41.7-17.7z M-22.2-40.8l-139.6-240
               c32.7-19,68.1-32,105.2-38.6L-8-46.1C-13-45.2-17.8-43.4-22.2-40.8z M22-40.9c-4.4-2.6-9.2-4.3-14.2-5.1l47.1-273.6
               c37.2,6.4,72.7,19.2,105.4,38L22-40.9z"
          />
        </StyledSvg>

        {/* Navigation */}
        <Nav>
          <ul>
            <li>
              <a id="button-snow" className="active">
                <i className="wi wi-snow"></i>
              </a>
            </li>
            <li>
              <a id="button-wind">
                <i className="wi wi-strong-wind"></i>
              </a>
            </li>
            <li>
              <a id="button-rain">
                <i className="wi wi-rain"></i>
              </a>
            </li>
            <li>
              <a id="button-thunder">
                <i className="wi wi-lightning"></i>
              </a>
            </li>
            <li>
              <a id="button-sun">
                <i className="wi wi-day-sunny"></i>
              </a>
            </li>
          </ul>
        </Nav>

        {/* Weather Card */}
        <Card id="card" className="weather" ref={cardRef}>
          <StyledSvg ref={innerSvgRef} id="inner">
            <defs>
              <path
                id="leaf"
                d="M41.9,56.3l0.1-2.5c0,0,4.6-1.2,5.6-2.2c1-1,3.6-13,12-15.6c9.7-3.1,19.9-2,26.1-2.1c2.7,0-10,23.9-20.5,25 c-7.5,0.8-17.2-5.1-17.2-5.1L41.9,56.3z"
              />
            </defs>
            <circle id="sun" cx="0" cy="0" r="50" style={{ fill: "#F7ED47" }} />
            <g id="layer3"></g>
            <g id="cloud3" className="cloud"></g>
            <g id="layer2"></g>
            <g id="cloud2" className="cloud"></g>
            <g id="layer1"></g>
            <g id="cloud1" className="cloud"></g>
          </StyledSvg>
          <div className="details">
            <div className="temp">
              20<span>c</span>
            </div>
            <div className="right">
              <div id="date">Monday 22 August</div>
              <div id="summary"></div>
            </div>
          </div>
        </Card>

        {/* Outer SVG for splashes, etc. */}
        <StyledSvg ref={outerSvgRef} id="outer" className="fixed" />
      </Container>
    </Background>
  );
};

export default WeatherComponent;
