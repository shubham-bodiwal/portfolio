import {
  SectionContainer,
  BackgroundImage,
  LocationDetails,
  LocationTitle,
  LocationSubtitle,
  StatsContainer,
  Stat,
  Paragraph,
} from "./LookoutSection.styled";
import lookoutImage from "../assets/lookout-bg.jpeg"; // Replace with your image path
import { Parallax } from "react-scroll-parallax";

const LookoutSection = () => {



  return (
    <SectionContainer>
      {/* Background Image */}
      <Parallax
        scale={[0.5, 1]}
        rotate={[-120, 0]}
        style={{
          zIndex: -1, width: "100%",
          height: "100%", position: 'absolute'
        }}
      >
        <BackgroundImage style={{ backgroundImage: `url(${lookoutImage})` }} />
      </Parallax>

      {/* Location Details */}
      <LocationDetails>
        <LocationTitle>Sunset Ridge Lookout</LocationTitle>
        <LocationSubtitle>859m Altitude</LocationSubtitle>
      </LocationDetails>

      {/* Centered Paragraph */}
      <Paragraph>
        With each visit, you contribute to the ongoing story of conservation,
        ensuring that the magic of our national parks endures for generations
        to come.
      </Paragraph>

      {/* Stats Section */}
      <StatsContainer>
        <Stat>
          <h2>836</h2>
          <p>DAILY GUIDED VISITS</p>
        </Stat>
        <Stat>
          <h2>98%</h2>
          <p>VISITOR SATISFACTION</p>
        </Stat>
        <Stat>
          <h2>70+</h2>
          <p>BIODIVERSITY SPECIES</p>
        </Stat>
        <Stat>
          <h2>158K</h2>
          <p>COMMUNITY FOLLOWERS</p>
        </Stat>
      </StatsContainer>
    </SectionContainer>
  );
};

export default LookoutSection;
