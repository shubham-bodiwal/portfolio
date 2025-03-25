import FooterSection from "../components2/FooterSection";
import Hero from "../components2/Hero";
import LookoutSection from "../components2/LookoutSection";
import Navbar from "../components2/Navbar";
import QuizLearningSection from "../components2/QuizLearningSection";
import QuizSection from "../components2/QuizSection";
import ThingsToDoSection from "../components2/ThingsToDoSection";
import { ParallaxProvider } from 'react-scroll-parallax';



function App() {
  return (
    <ParallaxProvider>
      <Navbar />
      <Hero />
      <QuizLearningSection />
      <QuizSection />
      <LookoutSection />
      <ThingsToDoSection />
      <FooterSection />
    </ParallaxProvider>
  );
}

export default App;