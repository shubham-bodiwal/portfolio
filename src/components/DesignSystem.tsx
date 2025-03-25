// File: src/pages/DesignSystemDocs.tsx
import React from "react";
import styled from "styled-components";

// ================= Button =================
const StyledButton = styled.button<{
  variant?: "outline" | "ghost";
  disabled?: boolean;
}>`
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: ${({ theme, variant }) =>
    variant === "outline" ? `2px solid ${theme.accent}` : "none"};
  background: ${({ theme, variant }) => {
    if (variant === "ghost") return "transparent";
    if (variant === "outline") return "transparent";
    return theme.accent;
  }};
  color: ${({ theme, variant }) => {
    if (variant === "ghost") return theme.accent;
    if (variant === "outline") return theme.accent;
    return theme.background;
  }};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  box-shadow: ${({ variant }) => (variant === "ghost" ? "none" : "0 2px 6px rgba(0,0,0,0.2)")};
  transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === "ghost"
        ? theme.accent + "22"
        : variant === "outline"
        ? theme.accent + "11"
        : theme.accent};
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "ghost";
}

const Button = ({ children, variant, ...props }: ButtonProps) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

// ================= Card =================
const StyledCard = styled.div`
  background: #1b1e2b;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #333;
  color: #fff;
  width: 280px;
`;

const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.9rem;
  color: #ccc;
`;

const Card = ({ title, description }: { title: string; description: string }) => (
  <StyledCard>
    <CardTitle>{title}</CardTitle>
    <CardText>{description}</CardText>
  </StyledCard>
);

// ================= Input =================
const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1b1e2b;
  color: #fff;
  min-width: 250px;
`;

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />;
};

// ================= Badge =================
const StyledBadge = styled.span<{ color?: string }>`
  background-color: ${({ theme, color }) =>
    color === "success"
      ? "#00c896"
      : color === "warning"
      ? "#ffc107"
      : theme.accent};
  color: #000;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const Badge = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <StyledBadge color={color}>{children}</StyledBadge>
);

// ================= Page Layout =================
const Wrapper = styled.div`
  padding: 4rem 2rem;
  background: #0f111a;
  color: #fff;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #00f5d4;
`;

const Subtitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #00f5d4;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export default function DesignSystemDocs() {
  return (
    <Wrapper>
      <Title>🎨 Custom UI Framework</Title>

      <Section>
        <Subtitle>Buttons</Subtitle>
        <Row>
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </Row>
      </Section>

      <Section>
        <Subtitle>Cards</Subtitle>
        <Row>
          <Card title="Simple Card" description="Reusable card with props." />
        </Row>
      </Section>

      <Section>
        <Subtitle>Inputs</Subtitle>
        <Row>
          <Input placeholder="Type here..." />
        </Row>
      </Section>

      <Section>
        <Subtitle>Badges</Subtitle>
        <Row>
          <Badge color="accent">Accent</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
        </Row>
      </Section>
    </Wrapper>
  );
}
