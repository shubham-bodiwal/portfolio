import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  ReserveButton,
  HeroImage,
  HeroPartition,
} from "./Hero.styled";
import { Parallax } from "react-scroll-parallax";

const Hero = () => {



  return (
    <HeroContainer>
      <Parallax
        scale={[1, 1.5]}
        easing="easeInQuad"
        style={{ zIndex: -1, position: "absolute", top: 0, bottom: 0, left: 0, right: 0, transformOrigin: "bottom center" }}
      >
        <HeroImage />
      </Parallax>

      <HeroContent>
        <HeroPartition>
          <HeroTitle>Your Adventure Begins Here!</HeroTitle>
          <HeroSubtitle>Embark on a journey where AI transforms education and daily living.</HeroSubtitle>
        </HeroPartition>
        <HeroPartition>
          <HeroDescription>
            Welcome here, where we harness the power of Artificial Intelligence to revolutionize learning and simplify everyday tasks. From personalized educational tools to innovative lifestyle assistants, we offer solutions designed to enhance your productivity and enrich your life.
          </HeroDescription>
          <ReserveButton>Sign up</ReserveButton>
          <p>Already have an account? Log in</p>
        </HeroPartition>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
