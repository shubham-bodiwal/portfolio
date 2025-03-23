import styled from "styled-components";

const Wrapper = styled.div`
  padding: 4rem 2rem;
  background: #0e101c;
  color: #fff;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #00f5d4;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #ccc;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const ResizableContainer = styled.div`
  resize: horizontal;
  overflow: auto;
  padding: 1rem;
  border: 2px dashed #333;
  border-radius: 10px;
  min-width: 280px;
  max-width: 100%;
  margin: 0 auto 2rem;
  background: #131622;
  width: 80%;
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

export default function GridLayout() {
  return (
    <Wrapper>
      <Title>📐 CSS Masonry Layout (No Library)</Title>
      <Description>
        This layout mimics a Pinterest-style masonry using <code>column-width</code> so it adapts to
        the <strong>resizable parent container</strong> instead of the full viewport.
      </Description>
      <ResizableContainer>
        <MasonryContainer>
          <Card>
            <h3>Simple Text Card</h3>
            <p>This is a basic card layout for quick information display.</p>
          </Card>

          <Card>
            <h3>Double Content</h3>
            <p>This card simulates more vertical height and fills the column accordingly with more text content to demonstrate height differences.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
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
              "Design is not just what it looks like. Design is how it works." – Steve Jobs
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
              This block is intentionally taller to simulate varying content. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Donec vehicula.
            </p>
          </Card>
        </MasonryContainer>
      </ResizableContainer>
    </Wrapper>
  );
}
