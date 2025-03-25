import styled from "styled-components";
import heroBackground from "../assets/hero-bg.jpg";

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  position: relative;
  color: white;
  text-align: center;
  overflow: hidden;
`;

export const HeroImage = styled.div`
  background: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, #060f16 100%),
    url(${heroBackground}) no-repeat center center/cover;

  width: 100vw;
  height: 100vh;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25); /* Adjust the transparency level */
    z-index: 1;
  }
`;



export const HeroContent = styled.div`
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const HeroDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.5;
`;

export const ReserveButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background: white;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 100px;

  
`;

export const HeroPartition = styled.div`
display: flex;
flex:1;
flex-direction: column;
align-items: center;
justify-content: end;
padding-bottom: 30px;`