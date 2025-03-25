import styled from "styled-components";
import mountainImage from "../assets/mountain-footer.jpeg";


export const SectionContainer = styled.section`
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

export const BackgroundImage = styled.div`
 background: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, #060f16 100%),
    url(${mountainImage}) no-repeat center center/cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transform-origin: bottom center; /* Anchor scaling effect to the bottom */
  transition: transform 0s ease-out; /* Smooth transition for scaling effect */

`;

export const Content = styled.div`
  text-align: center;
  margin-top: -150px;
  background: rgba(0, 0, 0, 0.5);
  padding: 30px 20px;
  width: 80%;
  border-radius: 10px;
  z-index: 1;
  position: relative;
  color: #ffffff;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 20px;
  line-height: 1.5;
`;

export const ContactInfo = styled.div`
  font-size: 1rem;
  color: #ccc;

  p {
    margin: 5px 0;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  background: #000000;
  color: #ffffff;
  position: absolute;
    bottom: 0;
`;

export const FooterBranding = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;

  a {
    font-size: 0.9rem;
    color: #555;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
`;

export const Icon = styled.div`
  font-size: 1.2rem;
  color: #555;
`;
