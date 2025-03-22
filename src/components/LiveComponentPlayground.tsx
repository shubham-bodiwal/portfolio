import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaRocket, FaHeart } from "react-icons/fa";

const Section = styled.section`
  padding: 4rem;
  background-color: #111320;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Playground = styled.div`
  display: flex;
  gap: 2rem;
`;

const VariantList = styled.div`
  flex: 1;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DisplayArea = styled.div`
  flex: 2;
  background-color: #1e1e2f;
  padding: 2rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 250px;
  justify-content: center;
  align-items: center;
`;

const VariantItem = styled.div`
  position: relative;
  cursor: pointer;
  overflow: visible;
  z-index: 2;
`;

const VariantName = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background-color: #1e1e2f;
  border: 1px solid #444;
  color: #fff;
  font-size: 0.85rem;
  text-align: center;
  transition: background 0.3s ease;

  &:hover {
    background-color: #00f5d4;
    color: #000;
  }
`;

const Description = styled.div`
  background-color: #181b2f;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  line-height: 1.6;
  text-align: left;
  max-width: 90%;
  box-shadow: 0 0 0 1px #222;
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const SampleTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  background-color: #333;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  ${ButtonWrapper}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ButtonBase = styled.button<{ variant: string }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return css`
          background-color: #00f5d4;
          color: #000;
        `;
      case "danger":
        return css`
          background-color: #ff4d4f;
          color: #fff;
        `;
      case "outline":
        return css`
          background-color: transparent;
          color: #00f5d4;
          border: 2px solid #00f5d4;
        `;
      case "animated":
        return css`
          background-color: #00f5d4;
          color: #000;
          animation: ${pulse} 2s infinite;
        `;
      case "icon":
        return css`
          background-color: transparent;
          color: #00f5d4;
          font-size: 1.25rem;
        `;
      case "textWithIcon":
        return css`
          background-color: #00f5d4;
          color: #000;
        `;
      case "disabled":
        return css`
          background-color: #444;
          color: #999;
          cursor: not-allowed;
        `;
      default:
        return css``;
    }
  }}
`;

const variants = [
  {
    key: "primary",
    label: "Primary",
    tooltip: "A bold move to trigger action!",
    description:
      "Use for key actions like submitting forms or starting important flows. This button stands out and encourages user interaction. Ideal for call-to-action sections or key workflows.",
  },
  {
    key: "danger",
    label: "Danger",
    tooltip: "Warning: Serious stuff ahead!",
    description:
      "Ideal for destructive actions such as delete, remove, or irreversible changes. Red conveys urgency and caution.",
  },
  {
    key: "outline",
    label: "Outline",
    tooltip: "Minimal, elegant, to the point.",
    description:
      "Great for subtle actions in clean interfaces. Works well in card footers, modals, or minimal UIs.",
  },
  {
    key: "animated",
    label: "Animated",
    tooltip: "This one lives and breathes UI.",
    description:
      "Highlights the most important button on a page. Use to emphasize one clear path forward. Best used once per view.",
  },
  {
    key: "icon",
    label: "Icon Only",
    tooltip: "Simple icon-driven action.",
    description:
      "Compact and ideal for toolbars, quick actions, or navigation bars where space is limited.",
  },
  {
    key: "textWithIcon",
    label: "Text & Icon",
    tooltip: "Personality meets functionality.",
    description:
      "Improves readability and recognition. Combine both to boost accessibility and user comfort.",
  },
  {
    key: "disabled",
    label: "Disabled",
    tooltip: "Paused but present.",
    description:
      "Shows intent without offering action. Use to signal future availability or unmet conditions.",
  },
];

export default function LiveComponentPlayground() {
  const [variant, setVariant] = useState("primary");
  const current = variants.find((v) => v.key === variant);

  const renderButton = () => {
    switch (variant) {
      case "icon":
        return (
          <ButtonBase variant="icon">
            <FaRocket />
          </ButtonBase>
        );
      case "textWithIcon":
        return (
          <ButtonBase variant="textWithIcon">
            <FaHeart /> Love
          </ButtonBase>
        );
      case "disabled":
        return (
          <ButtonBase variant="disabled" disabled>
            Disabled
          </ButtonBase>
        );
      default:
        return <ButtonBase variant={variant}>Click Me</ButtonBase>;
    }
  };

  return (
    <Section>
      <Title>🧪 Live Component Playground</Title>
      <Playground>
        <VariantList>
          {variants.map((v) => (
            <VariantItem key={v.key} onClick={() => setVariant(v.key)}>
              <VariantName>{v.label}</VariantName>
            </VariantItem>
          ))}
        </VariantList>
        <DisplayArea>
          <ButtonWrapper>
            <SampleTooltip>{current?.tooltip}</SampleTooltip>
            {renderButton()}
          </ButtonWrapper>
          <Description>{current?.description}</Description>
        </DisplayArea>
      </Playground>
    </Section>
  );
}
