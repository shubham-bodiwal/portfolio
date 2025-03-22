import styled from "styled-components";
import portfolioImg from "../assets/react.svg"; // replace with actual image

const PortfolioSection = styled.section`
  padding: 4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const FlexWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #ccc;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #00f5d4;
    color: #000;
  }
`;

export default function Portfolio() {
  return (
    <PortfolioSection>
      <Title>Portfolio</Title>
      <FlexWrap>
        <Image src={portfolioImg} alt="Stage" />
        <Content>
          <Subtitle>Boundless Art: 3D Discovery</Subtitle>
          <Description>
            Explore endless creative expressions in 3D environments. The future of art lies beyond dimensions.
          </Description>
          <Button>Read More</Button>
        </Content>
      </FlexWrap>
    </PortfolioSection>
  );
}
