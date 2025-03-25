import styled from "styled-components";

export const SectionContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 80%, rgb(41 37 40) 100%);
`;

export const BackgroundImage = styled.div`
  width: 110%;
    background-repeat: no-repeat;
    height: 110%;
    aspect-ratio: 1;
    background-size: contain;
    background-position: center;
    transform-origin: center center;
    transition: transform 0s ease;
`;

export const LocationDetails = styled.div`
  position: absolute;
  right: 10%;
  top: 30%;
  text-align: right;
  color: white;
`;

export const LocationTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const LocationSubtitle = styled.p`
  font-size: 1rem;
  color: #cfcfcf;
`;

export const Paragraph = styled.p`
  position: relative;
  max-width: 600px;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  line-height: 1.5;
  margin: 0 auto;
  padding: 0 20px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-bottom: 50px;
`;

export const Stat = styled.div`
  text-align: center;
  color: white;

  h2 {
    font-size: 2rem;
    margin: 0;
  }

  p {
    font-size: 0.9rem;
    color: #cfcfcf;
    margin: 5px 0 0;
  }
`;
