import React from "react";
import styled, { keyframes } from "styled-components";

const loop = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const AppWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background: #3a4965;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  text-align: center;

  h1 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  p {
    color: #94a3b8;
    margin-bottom: 0.5rem;
  }

  a {
    color: #7393c1;
  }
`;

const TagList = styled.div`
  width: 30rem;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  position: relative;
  padding: 1.5rem 0;
  overflow: hidden;
`;

const LoopSlider = styled.div<{ duration: string; direction: string }>`
  .inner {
    display: flex;
    width: fit-content;
    animation: ${loop} linear infinite;
    animation-duration: ${({ duration }) => duration};
    animation-direction: ${({ direction }) => direction};
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.2rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  background-color: #334155;
  border-radius: 0.4rem;
  padding: 0.7rem 1rem;
  margin-right: 1rem;
  box-shadow: 0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%),
    0 0.2rem 1.5rem rgb(0 0 0 / 40%);

  span {
    font-size: 1.2rem;
    color: #64748b;
  }
`;

const Fade = styled.div`
  pointer-events: none;
  background: linear-gradient(
    90deg,
    #3a4965,
    transparent 30%,
    transparent 70%,
    #3a4965
  );
  position: absolute;
  inset: 0;
`;

const InfiniteScroll = () => {
  const rows = [
    ["JavaScript", "webdev", "Typescript", "Next.js", "UI/UX"],
    ["webdev", "Gatsby", "JavaScript", "Tailwind", "Typescript"],
    ["animation", "Tailwind", "React", "SVG", "HTML"],
    ["Gatsby", "HTML", "CSS", "React", "Next.js"],
    ["Next.js", "React", "webdev", "Typescript", "Gatsby"],
  ];

  const durations = ["15951ms", "19260ms", "10449ms", "16638ms", "15936ms"];
  const directions = ["normal", "reverse", "normal", "reverse", "normal"];

  return (
    <AppWrapper>
      <Header>
        <h1>Infinite Scroll Animation</h1>
        <p>CSS only, content independent, bi-directional, customizable</p>
        <p>
          This is the React-less version of{" "}
          <a
            href="https://codepen.io/ykadosh/pen/KKezJzz"
            target="_blank"
            rel="noopener noreferrer"
          >
            this pen
          </a>
        </p>
      </Header>

      <TagList>
        {rows.map((tags, idx) => (
          <LoopSlider
            key={idx}
            duration={durations[idx]}
            direction={directions[idx]}
          >
            <div className="inner">
              {[...tags, ...tags].map((tag, i) => (
                <Tag key={i}>
                  <span>#</span> {tag}
                </Tag>
              ))}
            </div>
          </LoopSlider>
        ))}
        <Fade />
      </TagList>
    </AppWrapper>
  );
};

export default InfiniteScroll;
