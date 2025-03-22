import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
  background: #0e101c;
  color: #fff;
  animation: ${fadeInUp} 0.8s ease-in-out;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease-in-out both;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00f5d4;
  margin-bottom: 2rem;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out both;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: #00d8ff;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.8s ease-in-out both;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #1a1d29;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 245, 212, 0.08);
  border: 1px solid #2d2f3a;
  transition: all 0.4s ease;
  animation: ${fadeIn} 0.7s ease-in-out both;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    background: #222533;
    border-color: #00f5d4;
    box-shadow: 0 0 12px rgba(0, 245, 212, 0.1);
  }

  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    color: #00f5d4;
  }

  p, li {
    color: #ccc;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export default function InteractiveResume() {
  return (
    <Wrapper>
      <Title>👨‍💻 Shubham Bhodiwal – Frontend Developer</Title>

 <Section style={{ animationDelay: '0.2s' }}>
        <SubTitle>📍 Summary</SubTitle>
        <Card>
          <p>
            Creative and detail-oriented frontend developer with over 2.5 years of experience
            building production-grade applications using React, TypeScript, and modern UI frameworks.
            Strong foundation in reusable component architecture, performance optimization, and UI/UX.
          </p>
        </Card>
      </Section>

      <Section style={{ animationDelay: '0.4s' }}>
        <SubTitle>🧰 Skills & Tools</SubTitle>
        <CardGrid>
          <Card><h3>Languages & Frameworks</h3><p>React.js, Redux Toolkit, TypeScript, JavaScript (ES6+)</p></Card>
          <Card><h3>Styling</h3><p>Styled Components, Ant Design, Tailwind (basic), HTML5, CSS3</p></Card>
          <Card><h3>Tooling</h3><p>Vite, Webpack, ESLint, Prettier, Git, GitHub, Docker (basic)</p></Card>
          <Card><h3>Other</h3><p>Responsive Design, Accessibility, Web Vitals, REST APIs</p></Card>
        </CardGrid>
      </Section>

      <Section style={{ animationDelay: '0.6s' }}>
        <SubTitle>💼 Work Experience</SubTitle>
        <CardGrid>
          <Card>
            <h3>Daffodil Software – Software Engineer (React)</h3>
            <p>Aug 2022 – Present</p>
            <ul>
              <li>Built scalable UI for HRMS software (Gulf HR) using React + Redux + AntD</li>
              <li>Created Resume.io clone with dynamic form generation and export to PDF</li>
              <li>Developed SHS Homeopathy platform with AI API integration and multi-step onboarding</li>
              <li>Worked on Twilio’s fraud detection dashboard using component-driven dev</li>
            </ul>
          </Card>
        </CardGrid>
      </Section>

      <Section style={{ animationDelay: '0.8s' }}>
        <SubTitle>💡 Projects</SubTitle>
        <CardGrid>
          <Card><h3>Gulf HR</h3><p>Enterprise HRMS with dynamic role-based modules, responsive UI, and integrated user management.</p></Card>
          <Card><h3>Resume.io Clone</h3><p>Feature-rich CV builder with styled PDF export, live preview, and custom layout editor.</p></Card>
          <Card><h3>SHS Homeopathy</h3><p>End-to-end app with multi-step onboarding, AI diagnosis integration, and appointment booking.</p></Card>
          <Card><h3>Twilio FraudGuard</h3><p>Secure fraud detection dashboard with real-time charts and decision filters.</p></Card>
        </CardGrid>
      </Section>

      <Section style={{ animationDelay: '1.0s' }}>
        <SubTitle>🔧 Self-Initiated Projects</SubTitle>
        <CardGrid>
          <Card><h3>Custom UI Framework</h3><p>Design system with reusable components including buttons, inputs, tooltips, and modals.</p></Card>
          <Card><h3>Performance Dashboard</h3><p>Interactive panel showing FPS, hydration time, lazy loads and optimization summaries.</p></Card>
          <Card><h3>Interactive Resume Graph</h3><p>Visual skill graph mapping real projects with tech stack using React Flow.</p></Card>
          <Card><h3>Dev Challenges Library</h3><p>Responsive Grid, Form Generator, Drag & Drop Kanban board, and more.</p></Card>
        </CardGrid>
      </Section>

      <Section style={{ animationDelay: '1.2s' }}>
        <SubTitle>🎓 Education</SubTitle>
        <Card>
          <p>B.Tech in Computer Science – Government Engineering College Ajmer (RTU) – 2022</p>
        </Card>
      </Section>

      <Section style={{ animationDelay: '1.4s' }}>
        <SubTitle>🌐 Other Highlights</SubTitle>
        <Card>
          <ul>
            <li>Portfolio site built using React + Vite with performance and theme engine</li>
            <li>Passionate about AI, animations, and dev automation tools</li>
          </ul>
        </Card>
      </Section>
    </Wrapper>
  );
}
