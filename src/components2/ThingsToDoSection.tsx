import { useState } from "react";
import {
  SectionContainer,
  TitleContainer,
  TitleIcon,
  SectionTitle,
  ActivityContainer,
  Activity,
  ActivityImage,
  ActivityContent,
  ActivityTitle,
  ActivityDescription,
  ActivityMeta,
  MetaItem,
  ActionButton,
  PriceTag,
  ParallaxWrapper,
} from "./ThingsToDoSection.styled";

import vanTour from "../assets/temp1.jpeg";
import groupHiking from "../assets/temp2.jpeg";

const ThingsToDoSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({
      x: clientX - window.innerWidth / 2,
      y: clientY - window.innerHeight / 2,
    });
  };

  const calculateParallax = (offset: number, axis: "x" | "y"): string => {
    return `${(mousePosition[axis] / 50) * offset}px`;
  };

  return (
    <SectionContainer onMouseMove={handleMouseMove}>
      <ParallaxWrapper
        style={{
          transform: `translate(${calculateParallax(5, "x")}, ${calculateParallax(
            5,
            "y"
          )})`,
        }}
      />
      {/* Section Title */}
      <TitleContainer>
        <TitleIcon>🚀</TitleIcon>
        <SectionTitle>Top Things to Do in the Park</SectionTitle>
      </TitleContainer>

      {/* Activities */}
      <ActivityContainer>

        <Activity>
          <ActivityImage src={vanTour} alt="Special Private Tour" />
          <ActivityContent>
            <ActivityTitle>Special Private Tour</ActivityTitle>
            <ActivityDescription>
              Whether you're seeking a romantic getaway, a family adventure,
              or a solo expedition, our private tours ensure that your
              journey through our park becomes an unforgettable and truly
              exceptional escape. Discover the park's secrets at your own pace
              and immerse yourself in its beauty with the ultimate blend of
              comfort and exploration.
            </ActivityDescription>
            <ActivityMeta>
              <MetaItem>1.8k views</MetaItem>
              <MetaItem>592 likes</MetaItem>
            </ActivityMeta>
            <div>
              <ActionButton>See Details</ActionButton>
              <PriceTag>Starts at $599 / day</PriceTag>
            </div>
          </ActivityContent>
        </Activity>

        <Activity>
          <ActivityImage src={groupHiking} alt="Customized Group Hiking" />
          <ActivityContent>
            <ActivityTitle>Customized Group Hiking</ActivityTitle>
            <ActivityDescription>
              Our expert guides ensure safety and share their local knowledge,
              enhancing your understanding of the park's ecology and history.
              Unite with nature, bond with your group, and forge unforgettable
              memories on a trail designed exclusively for you.
            </ActivityDescription>
            <ActivityMeta>
              <MetaItem>1.7k views</MetaItem>
              <MetaItem>478 likes</MetaItem>
            </ActivityMeta>
            <div>
              <ActionButton>See Details</ActionButton>
              <PriceTag>Starts at $399 / group</PriceTag>
            </div>
          </ActivityContent>
        </Activity>
      </ActivityContainer>
    </SectionContainer>
  );
};

export default ThingsToDoSection;