import { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 4rem;
  background-color: #0f111f;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const StepList = styled.div`
  border-left: 2px solid #00f5d4;
  padding-left: 1rem;
`;

const Step = styled.div`
  margin-bottom: 2rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #ccc;
  font-size: 0.95rem;
`;

const ToggleCode = styled.button`
  background: transparent;
  border: 1px solid #00f5d4;
  color: #00f5d4;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const CodeBlock = styled.pre`
  background-color: #1c1f2e;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  overflow-x: auto;
`;

const steps = [
  {
    title: "1. Component Structure",
    desc: "Broke down UI into atomic components – Header, Hero, Gallery, etc. Each component is in its own file with proper prop types.",
    code: `<Hero title="Simon Sparks" subtitle="Generative Design" />`
  },
  {
    title: "2. Styling Decisions",
    desc: "Used styled-components for scoped, maintainable styles. Enabled theme customizations.",
    code: `const Title = styled.h1
  font-size: 4rem;
  color: #fff;`
  },
  {
    title: "3. State Management",
    desc: "Used React hooks and local state for interactivity like toggles, themes, and hover inspector.",
    code: `const [enabled, setEnabled] = useState(false);`
  },
  {
    title: "4. Reusability",
    desc: "Built flexible cards & button components reused across Gallery, Portfolio, and Projects.",
    code: `<Card title="Cube 2.0" image={cubeImg} />`
  },
];

export default function BuildWithMeWalkthrough() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <Section>
      <Title>🔧 Build With Me: Project Walkthrough</Title>
      <StepList>
        {steps.map((step, idx) => (
          <Step key={idx}>
            <StepTitle>{step.title}</StepTitle>
            <Description>{step.desc}</Description>
            <ToggleCode onClick={() => setOpenStep(openStep === idx ? null : idx)}>
              {openStep === idx ? "Hide Code" : "Show Code"}
            </ToggleCode>
            {openStep === idx && <CodeBlock>{step.code}</CodeBlock>}
          </Step>
        ))}
      </StepList>
    </Section>
  );
}
