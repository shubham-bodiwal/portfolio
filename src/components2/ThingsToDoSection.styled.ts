import styled from "styled-components";

import nebulaBackground from "../assets/nebula2.jpg";



export const ParallaxWrapper = styled.div`
  transition: transform 0.2s ease-out;
  will-change: transform;
   position: absolute;
      inset: -100px;
    width: calc(100% + 200px);
    height: calc(100% + 200px);
  background-size: cover;
  background-position: center;
    z-index: -1;
    background-image: url(${nebulaBackground});
    background-repeat: no-repeat;
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  color: #ffffff;
  position: relative;
  background: linear-gradient(
  to top,
  rgba(0, 0, 0, 1) 5%,
  rgba(0, 0, 0, 0.2) 30%,
  rgba(0, 0, 0, 0.2) 70%,
  rgba(0, 0, 0, 1) 100%
);

  background-size: cover;
  height: auto;
  overflow: hidden; /* Prevent scrollbars during parallax */
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const TitleIcon = styled.div`
  font-size: 2rem;
  margin-right: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

export const Activity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 30px;
`;

export const ActivityImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  max-width: 700px;
`;

export const ActivityTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ActivityDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const ActivityMeta = styled.div`
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #888;
`;

export const MetaItem = styled.span``;

export const ActionButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const PriceTag = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-left: 20px;
`;
