import styled, { keyframes } from "styled-components";
import AppleLogoBG from "../assets/apple-logo 1 (1).avif";
import overlayImage from "../assets/apple-logo 1.avif";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  margin-bottom: 2rem;
`;

const BackgroundImage = styled.img`
  display: block;
  width: 10rem;
  height: 10rem;
`;

const hideOverlay = keyframes`
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 100% 0);
  }
`;

const OverlayImage = styled.img<{ animationDuration: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 10rem;
  height: 10rem;
  clip-path: inset(0 0 0 0);
  animation: ${hideOverlay} ${({ animationDuration }) => animationDuration}
    forwards;
`;

const ImageReveal = () => {
  return (
    <Container aria-hidden="true">
      <BackgroundImage src={AppleLogoBG} alt="" loading="lazy" />
      <OverlayImage
        src={overlayImage}
        alt=""
        animationDuration="3s"
        loading="lazy"
      />
    </Container>
  );
};

export default ImageReveal;
