import styled from "styled-components";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Portfolio from "./components/Portfolio";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import HoverInspectorWrapper from "./HOC/HoverInspectorWrapper ";

const AppWrapper = styled.div`
  background-color: #0a0c1b;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

function App() {
  return (
    <HoverInspectorWrapper>
    <AppWrapper>
      <Header />
      <Hero />
      <Gallery />
      <Portfolio />
      <Projects />
      <Footer />
    </AppWrapper>
    </HoverInspectorWrapper>
  );
}

export default App;
