import styled from "styled-components";
import vectorBg from "../assets/Vector.svg";
import { motion } from "framer-motion";

interface GalleryItemProps {
  isWhite: boolean;
}

interface GalleryData {
  title: string;
  number: string;
  content: string;
}

const GalleryWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
  background: linear-gradient(to bottom, rgb(13 22 58), rgb(0, 0, 0));
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

const GalleryContainer = styled.div`
  padding: 2rem;
  border: 1px solid #e0e0e0;
  backdrop-filter: blur(4px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  height: 30rem;
  align-items: center;
`;

const GalleryItem = styled(motion.div)<GalleryItemProps>`
  position: relative;
  padding: 2rem;
  border-radius: 0.2rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  background: ${(props) => (props.isWhite ? "#ffffff" : "#000000")};
  box-shadow: 0 0 0 transparent;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width: 10%;
    height: 3px;
    background-color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
    opacity: 0.6;
    border-radius: 1px;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    height: 25rem;
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    &::after {
      width: 50%;
      opacity: 0.9;
    }
  }
`;

const Title = styled.h3<GalleryItemProps>`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 1rem;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  font-weight: 600;

  ${GalleryItem}:hover & {
    transform: translateY(-5px);
  }
`;

const Number = styled.span<GalleryItemProps>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  display: block;
  margin-top: 0.5rem;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  ${GalleryItem}:hover & {
    transform: translateY(-5px);
    letter-spacing: 0.2rem;
  }
`;

const Content = styled.span<GalleryItemProps>`
  font-size: 1rem;
  letter-spacing: 0.2rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  display: block;
  margin-top: 0.5rem;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  display: none;

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: scale(1) translateY(-10px);
    display: block;
  }
`;

const galleries: GalleryData[] = [
  {
    title: "Frontend Stack",
    number: "01",
    content:
      "HTML5, CSS3, JavaScript (ES6+), TypeScript, ReactJS, NextJS, Redux Toolkit, Responsive Design, SPA, SSR",
  },
  {
    title: "Design Systems",
    number: "02",
    content:
      "Styled Components, Material UI, Ant Design, WCAG, Lighthouse, Web Vitals, Dark mode, Theming, Design Tokens",
  },
  {
    title: "API & Logic",
    number: "03",
    content:
      "REST, GraphQL, Axios, React Query, IndexedDB, Web Workers, SWR, Modular Code, Reusable Components",
  },
  {
    title: "Tooling & Ops",
    number: "04",
    content:
      "Git, Docker, Vercel, AWS (basics), Jira, Agile Workflow, VS Code Extensions, PWA, Offline-First, Caching Strategies",
  },
];

export default function Gallery() {
  return (
    <GalleryWrapper>
      <GalleryContainer>
        {galleries.map((g, i) => (
          <GalleryItem
            key={i}
            isWhite={i % 2 === 0}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <Title isWhite={i % 2 === 0}>{g.title}</Title>
            <Number isWhite={i % 2 === 0}>{g.number}</Number>
            <Content isWhite={i % 2 === 0}>{g.content}</Content>
          </GalleryItem>
        ))}
      </GalleryContainer>
    </GalleryWrapper>
  );
}
