import styled, { keyframes } from 'styled-components';
import AppleLogoBG from '../assets/apple-logo 1 (1).png'
import overlayImage from '../assets/apple-logo 1.png';

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
  animation: ${hideOverlay} ${({ animationDuration }) => animationDuration} forwards;
`;

const ImageReveal = () => {
  return (
    <Container>
      <BackgroundImage src={AppleLogoBG} alt="Background" />
      <OverlayImage
        src={overlayImage}
        alt="Overlay"
        animationDuration='3s'
      />
    </Container>
  );
};

export default ImageReveal;
