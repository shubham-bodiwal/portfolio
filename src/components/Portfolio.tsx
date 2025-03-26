import styled, { keyframes } from "styled-components";

const PortfolioSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
  background: linear-gradient(to bottom, #0f1827, #3a4965, #03050b);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const MasonryContainer = styled.div`
  column-width: 250px;
  column-gap: 1.5rem;
`;

const Card = styled.div`
  background: #1b1e2b;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #222;
  box-shadow: 0 0 6px rgba(0, 245, 212, 0.1);
  margin-bottom: 1.5rem;
  break-inside: avoid;
`;

const ImageCard = styled(Card)`
  background: url("https://source.unsplash.com/random/400x200") center/cover;
  color: #fff;
  display: flex;
  align-items: flex-end;
  font-weight: bold;
  font-size: 1.1rem;
  min-height: 200px;
`;

const StatCard = styled(Card)`
  text-align: center;
  background: #12131c;
`;

const CTAButton = styled.button`
  background: #00f5d4;
  color: #000;
  border: none;
  padding: 0.75rem 1.25rem;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0ff;
  }
`;

const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ResizableContainer = styled.div`
  position: relative;
  resize: horizontal;
  overflow: auto;
  padding: 1rem;
  border: 2px dashed transparent;
  border-radius: 10px;
  min-width: 280px;
  max-width: 100%;
  margin: 0 auto 2rem;
  width: 80%;
  z-index: 0;

  background: linear-gradient(to bottom, #0f1827, #3a4965, #03050b) padding-box,
    /* transparent bg */
      linear-gradient(45deg, #ffaa33, #aaff33, #33ffee, #cc33ff, #ffaa33)
      border-box;

  background-size: 300% 300%;
  background-repeat: no-repeat;
  animation: ${gradientFlow} 5s linear infinite;
`;

const headerAnimation = keyframes`
  0% { letter-spacing: 12rem }
  100% { letter-spacing: 6rem }
`;

const Subtitle = styled.p`
  color: #ffaa33;
  margin-top: 0;
  text-transform: uppercase;
  animation: ${headerAnimation} 2s ease 0s 1 normal forwards;
  z-index: 1;
  margin-bottom: 0;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 4.5rem;
  line-height: 1.5;
  margin-bottom: 5rem;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

export default function Portfolio() {
  return (
    <PortfolioSection>
      <Subtitle>Projects</Subtitle>

      <ResizableContainer>
        <MasonryContainer>
          <Card>
            <h3>Simple Text Card</h3>
            <p>This is a basic card layout for quick information display.</p>
          </Card>

          <Card>
            <h3>Double Content</h3>
            <p>
              This card simulates more vertical height and fills the column
              accordingly with more text content to demonstrate height
              differences.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio.
            </p>
          </Card>

          <ImageCard>
            <span>🖼️ Background Image Card</span>
          </ImageCard>

          <StatCard>
            <h2>1.2K+</h2>
            <p>Visitors this month</p>
          </StatCard>

          <Card>
            <h3>Quote Block</h3>
            <blockquote>
              "Design is not just what it looks like. Design is how it works." –
              Steve Jobs
            </blockquote>
          </Card>

          <Card>
            <h3>Call to Action</h3>
            <p>Want to learn more about building UI like this?</p>
            <CTAButton>Explore Docs</CTAButton>
          </Card>

          <Card>
            <h3>Another Tall Card</h3>
            <p>
              This block is intentionally taller to simulate varying content.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vehicula.
            </p>
          </Card>
        </MasonryContainer>
      </ResizableContainer>
    </PortfolioSection>
  );
}
