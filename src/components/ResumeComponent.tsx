import { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Terminal,
  Linkedin,
  Mail,
  Code,
  Award,
  Briefcase,
  BookOpen,
  Server,
  Activity,
  Monitor,
  Cpu,
  Flame,
  Zap,
  Layout,
} from "lucide-react";

interface Skill {
  name: string;
  icon: any;
  value: number;
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  icon: any;
}
// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(1.25rem); }
  to { opacity: 1; transform: translateY(0); }
`;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// Theme colors
const theme = {
  primary: "#6C63FF", // Purple
  secondary: "#FFA454", // Orange
  tertiary: "#4ECDC4", // Mint
  background: "#1E1C31", // Dark purple-blue
  backgroundLight: "#2A2844",
  backgroundLighter: "#343256",
  text: "#F9F9F9",
  textMuted: "#B3B1CD",
  accent: "#FF5E7D", // Pink
  success: "#6EE7B7", // Green
  gradient: "linear-gradient(45deg, #6C63FF, #FF5E7D)",
};

// Global Styles
const GlobalStyle = createGlobalStyle`
  html {
    font-size: min(calc(100vw / 65), calc(100vh / 65)) !important;
  }
`;

// Styled Components
const Container = styled.div`
  height: 100%;
  overflow: auto;
  background: linear-gradient(135deg, ${theme.background} 0%, #16141f 100%);
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-family: "Inter", sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: ${theme.gradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;

  @media (max-width: 40rem) {
    font-size: 2.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: ${theme.textMuted};
  font-weight: 500;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${theme.textMuted};
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.9rem;

  &:hover {
    color: ${theme.primary};
  }
`;

const Nav = styled.nav`
  margin-bottom: 2rem;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  list-style: none;
`;

const NavButton = styled.button<{ active: boolean }>`
  padding: 0.6rem 1.25rem;
  background: ${(props) =>
    props.active ? theme.gradient : theme.backgroundLight};
  color: ${(props) => (props.active ? theme.text : theme.textMuted)};
  border-radius: 2rem;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: capitalize;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  box-shadow: ${(props) =>
    props.active ? "0 0.25rem 0.9375rem rgba(108, 99, 255, 0.2)" : "none"};

  &:hover {
    background: ${(props) =>
      props.active ? theme.gradient : theme.backgroundLighter};
    transform: translateY(-0.125rem);
  }
`;

const Main = styled.main`
  flex-grow: 1;
  max-width: 62.5rem;
  margin: 0 auto;
  width: 100%;
`;

const Section = styled.div`
  animation: ${slideUp} 0.5s ease-out;
  max-width: 56.25rem;
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3rem;
    height: 0.1875rem;
    background: ${theme.gradient};
    border-radius: 0.1875rem;
  }
`;

const IconWrapper = styled.span`
  color: ${theme.primary};
`;

const AboutText = styled.p`
  line-height: 1.7;
  margin-bottom: 2rem;
  color: ${theme.textMuted};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: ${theme.backgroundLight};
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 0.0625rem solid rgba(255, 255, 255, 0.05);

  &:hover {
    transform: translateY(-0.3125rem);
    box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.1);
  }
`;

const HighlightCard = styled(Card)`
  border-left: 0.25rem solid ${theme.primary};
`;

const CardTitle = styled.h4`
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
  color: ${theme.primary};
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: ${theme.textMuted};
`;

const SkillCard = styled(Card)`
  background: ${theme.backgroundLight};
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const SkillName = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillValue = styled.span`
  color: ${theme.primary};
  font-weight: 500;
`;

const SkillBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: ${theme.backgroundLighter};
  border-radius: 1rem;
  overflow: hidden;
`;

const SkillFill = styled.div<{ value: string | number }>`
  height: 100%;
  border-radius: 1rem;
  background: ${theme.gradient};
  transition: width 1s ease-out;
  width: ${(props) => props.value}%;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  font-size: 0.85rem;
  background: ${theme.backgroundLighter};
  color: ${theme.textMuted};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.125rem;
    background: ${theme.backgroundLighter};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2.5rem;

  &::before {
    content: "";
    position: absolute;
    left: -2.5rem;
    top: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${theme.primary};
    border: 0.1875rem solid ${theme.backgroundLight};
  }
`;

const TimelineCard = styled(Card)`
  margin-left: 0.5rem;
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TimelineDate = styled.span`
  font-size: 0.85rem;
  background: ${theme.backgroundLighter};
  color: ${theme.textMuted};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
`;

const TimelineCompany = styled.span`
  color: ${theme.textMuted};
`;

const BulletList = styled.ul`
  list-style: none;
  margin-top: 1rem;
`;

const BulletItem = styled.li`
  display: flex;
  margin-bottom: 0.5rem;
  color: ${theme.textMuted};
  line-height: 1.5;
  font-size: 0.95rem;

  &::before {
    content: "•";
    color: ${theme.primary};
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const ProjectsContainer = styled.div`
  margin-top: 2rem;
`;

const ProjectCategoryTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: ${theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: "";
    flex-grow: 1;
    height: 0.0625rem;
    background: ${theme.backgroundLighter};
    margin-left: 1rem;
  }
`;

const ProjectCard = styled(Card)`
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0.25rem;
    height: 2.5rem;
    border-radius: 0 0.75rem 0 0.75rem;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ProjectIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: rgba(108, 99, 255, 0.1);
  color: ${theme.primary};
`;

const ProjectTitle = styled.h5`
  font-size: 1.1rem;
  color: ${theme.primary};
`;

const ProjectTags = styled(TagsContainer)`
  margin-top: 0.75rem;
`;

const ProjectTag = styled(Tag)`
  font-size: 0.85rem;
  background: ${theme.backgroundLighter};
  color: ${theme.textMuted};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 0.0625rem solid ${theme.backgroundLighter};
  color: ${theme.textMuted};
  font-size: 0.85rem;
`;

const Shield = ({ size }: { size?: string | number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const InteractiveResume = () => {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [skillsProgress, setSkillsProgress] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    setIsVisible({ about: true });
    const timer = setTimeout(() => {
      setSkillsProgress({
        react: 95,
        next: 92,
        typescript: 92,
        javascript: 90,
        architecture: 88,
        testing: 90,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsVisible((prev) => ({ ...prev, [section]: true }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, section: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSectionChange(section);
    }
  };

  const skills: Skill[] = [
    {
      name: "React",
      icon: <Code size={18} />,
      value: skillsProgress.react || 0,
    },
    {
      name: "Next.js",
      icon: <Monitor size={18} />,
      value: skillsProgress.next || 0,
    },
    {
      name: "TypeScript",
      icon: <Terminal size={18} />,
      value: skillsProgress.typescript || 0,
    },
    {
      name: "JavaScript (ES6+)",
      icon: <Terminal size={18} />,
      value: skillsProgress.javascript || 0,
    },
    {
      name: "Frontend Architecture",
      icon: <Layout size={18} />,
      value: skillsProgress.architecture || 0,
    },
    {
      name: "Testing Automation",
      icon: <Activity size={18} />,
      value: skillsProgress.testing || 0,
    },
  ];

  const experience: ExperienceItem[] = [
    {
      title: "Software Development Engineer II (Frontend)",
      company: "Swivl.tech",
      period: "Jun 2025 - Present",
      description: [
        "Led the architecture and launch of an AI-powered work order management platform (Next.js, React, TypeScript) while mentoring a 6-member squad including 2 junior developers.",
        "Introduced SSR-driven modules and a unified design system that improved dashboard load times by 40% and lifted delivery velocity by 35%.",
        "Partnered with product and design to build smart chatbot routing that cut ticket resolution time in half and elevated customer satisfaction.",
        "Set engineering quality bars via code reviews, documentation, and automated testing practices that sustained 95% unit test coverage across critical flows.",
      ],
    },
    {
      title: "Associate Software Developer",
      company: "Daffodil Software",
      period: "Apr 2024 - Jun 2025",
      description: [
        "Directed a 6-person frontend team delivering a React + TypeScript HR/Finance platform for 5,000+ enterprise users.",
        "Engineered high-throughput client code with Web Workers and Service Workers, trimming page loads by 60% and decreasing bounce rates by 15%.",
        "Rolled out a Jest + RTL testing framework with 100% coverage standards, reducing production bugs by 45% and boosting release confidence.",
        "Mentored three junior engineers, ran technical interviews, and formalized code review rituals that accelerated team velocity by 30%.",
      ],
    },
    {
      title: "Junior Associate Software Developer",
      company: "Daffodil Software",
      period: "May 2022 - Mar 2024",
      description: [
        "Delivered scalable React UI features backed by GraphQL/REST services, modernizing legacy modules and improving rendering speed by 25%.",
        "Designed a reusable component library and modular architecture that increased feature throughput by 40% across squads.",
        "Converted Figma design systems into production-ready experiences with pixel-perfect fidelity and cross-browser reliability.",
        "Resolved high-priority defects and performance bottlenecks under tight timelines while coordinating with stakeholders in multiple geographies.",
      ],
    },
    {
      title: "Software Development Intern",
      company: "Daffodil Software",
      period: "Nov 2021 - Apr 2022",
      description: [
        "Implemented enterprise UI components with modern React/TypeScript patterns and upheld 100% unit test coverage targets.",
        "Automated regression coverage using Jest and React Testing Library to harden CI/CD pipelines and improve deployment reliability.",
        "Ramp up on modern frontend tooling and practices that fast-tracked conversion to a full-time engineering role.",
      ],
    },
  ];

  const mainProjects: ProjectItem[] = [
    {
      title: "Swivl Work Order",
      icon: <Briefcase size={18} />,
      description:
        "AI-assisted work order orchestration for field teams built with Next.js and React. Delivered SSR modules and reusable patterns that unlocked 40% faster dashboards.",
      tags: ["Next.js", "React", "Design System", "AI"],
    },
    {
      title: "Resume.io Editor Platform",
      icon: <Layout size={18} />,
      description:
        "Re-architected the resume builder with React PDF and docs.js to produce ATS-friendly exports and 25% quicker live previews.",
      tags: ["React", "docs.js", "Serverless", "Performance"],
    },
    {
      title: "Twilio Segment Fraud Guard",
      icon: <Shield size={18} />,
      description:
        "Built automated fraud detection workflows in a shared monorepo, reducing manual case reviews by 40% while tightening compliance controls.",
      tags: ["Monorepo", "Automation", "Security", "APIs"],
    },
    {
      title: "Gulf-HR Platform",
      icon: <Monitor size={18} />,
      description:
        "Modular HRMS with form builders, role-based access, and analytics that saved HR teams 15+ hours per week.",
      tags: ["React", "Ant Design", "Component Library", "Analytics"],
    },
    {
      title: "SHS Homeopathy",
      icon: <Monitor size={18} />,
      description:
        "Electron + web apps with AI search, offline-first storage, and practitioner dashboards serving clinics globally.",
      tags: ["Electron", "React", "AI", "Offline"],
    },
  ];

  const selfInitiatedProjects: ProjectItem[] = [
    {
      title: "Quiz Reminder App",
      description:
        "Adaptive study coach that delivers gamified MCQs directly in the notification tray for effortless daily practice.",
      tags: ["Gamification", "Notifications"],
      icon: <Layout size={18} />,
    },
    {
      title: "AI Interview Intelligence",
      description:
        "Vision and voice analytics for interview panels that surface posture, tone, and focus metrics alongside cheat detection.",
      tags: ["AI", "Analytics", "Video"],
      icon: <Cpu size={18} />,
    },
    {
      title: "AI QA Tool",
      description:
        "Autonomous QA assistant that maps user stories to UI flows, flags regressions, and generates prioritized bug reports.",
      tags: ["Automation", "Testing", "AI"],
      icon: <Flame size={18} />,
    },
    {
      title: "Code Refactor Extension",
      description:
        "VS Code extension that applies AI-guided refactors to improve readability, naming, and algorithmic efficiency in real time.",
      tags: ["VS Code", "AI", "Refactor"],
      icon: <Zap size={18} />,
    },
    {
      title: "Gaming News Platform",
      description:
        "Esports companion with live streams, editorial workflows, and an admin console for sponsorship and tournament management.",
      tags: ["Content", "Streams", "Dashboard"],
      icon: <Activity size={18} />,
    },
    {
      title: "WhatsApp Clone",
      description: "Real-time messaging platform with group collaboration, media sharing, and socket.io-backed delivery guarantees.",
      tags: ["WebSocket", "Chat"],
      icon: <Terminal size={18} />,
    },
    {
      title: "Smart Home IoT",
      description:
        "Arduino-based home automation stack for lighting, safety, and climate with energy usage intelligence.",
      tags: ["IoT", "Arduino", "Automation"],
      icon: <Cpu size={18} />,
    },
  ];

  return (
    <>
      <GlobalStyle />

      <Container role="main">
        <Header>
          <Name>Shubham Bhodiwal</Name>
          <Title>SDE-II • Frontend Engineering (4+ Years)</Title>

          <ContactInfo>
            <ContactLink
              href="mailto:bhodiwalshubham03@gmail.com"
              aria-label="Email: bhodiwalshubham03@gmail.com"
            >
              <Mail size={16} aria-hidden="true" /> bhodiwalshubham03@gmail.com
            </ContactLink>
            <ContactLink
              href="tel:+918058597167"
              aria-label="Phone: +91 8058597167"
            >
              +91 8058597167
            </ContactLink>
            <ContactLink
              href="https://www.linkedin.com/in/shubham-bhodiwal-543a6b171/"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} aria-hidden="true" /> LinkedIn
            </ContactLink>
          </ContactInfo>
        </Header>

        <Nav role="navigation" aria-label="Resume sections">
          <NavList>
            {[
              "about",
              "skills",
              "experience",
              "projects",
              "awards",
              "education",
            ].map((section) => (
              <li key={section}>
                <NavButton
                  active={activeSection === section}
                  onClick={() => handleSectionChange(section)}
                  onKeyDown={(e) => handleKeyDown(e, section)}
                  tabIndex={0}
                  role="tab"
                  id={`tab-${section}`}
                  aria-selected={activeSection === section}
                  aria-controls={`panel-${section}`}
                >
                  {section}
                </NavButton>
              </li>
            ))}
          </NavList>
        </Nav>

        <Main
          role="tabpanel"
          id={`panel-${activeSection}`}
          aria-labelledby={`tab-${activeSection}`}
        >
          {/* About Section */}
          {activeSection === "about" && isVisible.about && (
            <Section>
              <SectionTitle>
                <IconWrapper aria-hidden="true">
                  <Terminal size={22} />
                </IconWrapper>{" "}
                About Me
              </SectionTitle>

              <AboutText>
                Results-driven frontend engineer focused on React and Next.js
                ecosystems. I build and scale enterprise platforms that serve
                5K+ users, blending AI-assisted experiences with robust
                engineering guardrails. My sweet spot is marrying system design,
                performance tuning, and team mentorship to ship products that
                stay fast, accessible, and maintainable.
              </AboutText>

              <CardGrid>
                <Card>
                  <CardTitle>Enterprise Scale Craft</CardTitle>
                  <CardText>
                    Architect scalable React & Next.js systems with reusable
                    design tokens, component libraries, and SSR pipelines.
                  </CardText>
                </Card>

                <Card>
                  <CardTitle>Performance Champion</CardTitle>
                  <CardText>
                    Delivered 40-60% faster experiences using caching layers,
                    workers, and Core Web Vitals guided optimizations.
                  </CardText>
                </Card>

                <Card>
                  <CardTitle>Team Catalyst</CardTitle>
                  <CardText>
                    Mentor engineers, lead code reviews, and uphold 95%+ test
                    coverage to keep releases calm and predictable.
                  </CardText>
                </Card>
              </CardGrid>
            </Section>
          )}

          {/* Skills Section */}
          {activeSection === "skills" && isVisible.skills && (
            <Section>
              <SectionTitle>
                <IconWrapper aria-hidden="true">
                  <Code size={22} />
                </IconWrapper>{" "}
                Technical Skills
              </SectionTitle>

              <CardGrid>
                {skills.map((skill) => (
                  <SkillCard key={skill.name}>
                    <SkillHeader>
                      <SkillName>
                        <IconWrapper aria-hidden="true">
                          {skill.icon}
                        </IconWrapper>
                        {skill.name}
                      </SkillName>
                      {/* <SkillValue>{skill.value}%</SkillValue> */}
                    </SkillHeader>
                    <SkillBar
                      role="progressbar"
                      aria-valuenow={skill.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} skill level: ${skill.value}%`}
                    >
                      <SkillFill value={skill.value} />
                    </SkillBar>
                  </SkillCard>
                ))}
              </CardGrid>

              <SectionTitle style={{ fontSize: "1.25rem", marginTop: "2rem" }}>
                <IconWrapper aria-hidden="true">
                  <Server size={18} />
                </IconWrapper>{" "}
                Additional Expertise
              </SectionTitle>

              <TagsContainer role="list" aria-label="Additional skills">
                {[
                  "Next.js",
                  "Redux Toolkit",
                  "Shadcn UI",
                  "Styled Components",
                  "Ant Design",
                  "Material UI",
                  "Core Web Vitals",
                  "Accessibility",
                  "PWA",
                  "Service Workers",
                  "GraphQL",
                  "React Query",
                  "Cypress",
                  "Git",
                  "Vercel",
                  "AWS (Essentials)",
                ].map((tag) => (
                  <Tag key={tag} role="listitem">
                    {tag}
                  </Tag>
                ))}
              </TagsContainer>
            </Section>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && isVisible.experience && (
            <Section>
              <SectionTitle>
                <IconWrapper aria-hidden="true">
                  <Briefcase size={22} />
                </IconWrapper>{" "}
                Work Experience
              </SectionTitle>

              <Timeline>
                {experience.map((job, index) => (
                  <TimelineItem key={index}>
                    <TimelineCard>
                      <CardTitle as="h3">{job.title}</CardTitle>
                      <TimelineHeader>
                        <TimelineCompany>{job.company}</TimelineCompany>
                        <TimelineDate>{job.period}</TimelineDate>
                      </TimelineHeader>
                      <BulletList role="list">
                        {job.description.map((item, i) => (
                          <BulletItem key={i} role="listitem">
                            {item}
                          </BulletItem>
                        ))}
                      </BulletList>
                    </TimelineCard>
                  </TimelineItem>
                ))}
              </Timeline>
            </Section>
          )}

          {/* Projects Section */}
          {activeSection === "projects" && isVisible.projects && (
            <Section>
              <SectionTitle>
                <IconWrapper aria-hidden="true">
                  <Activity size={22} />
                </IconWrapper>{" "}
                Projects
              </SectionTitle>

              <ProjectsContainer>
                <ProjectCategoryTitle>
                  <IconWrapper
                    style={{ color: theme.primary }}
                    aria-hidden="true"
                  >
                    <Briefcase size={18} />
                  </IconWrapper>
                  Professional Projects
                </ProjectCategoryTitle>

                <CardGrid role="list" aria-label="Professional projects">
                  {mainProjects.map((project, index) => (
                    <ProjectCard key={index} role="listitem">
                      <ProjectHeader>
                        <ProjectIcon aria-hidden="true">
                          {project.icon}
                        </ProjectIcon>
                        <ProjectTitle>{project.title}</ProjectTitle>
                      </ProjectHeader>
                      <CardText>{project.description}</CardText>
                      <ProjectTags
                        aria-label={`Technologies used in ${project.title}`}
                      >
                        {project.tags.map((tag, i) => (
                          <ProjectTag key={i}>{tag}</ProjectTag>
                        ))}
                      </ProjectTags>
                    </ProjectCard>
                  ))}
                </CardGrid>

                <ProjectCategoryTitle style={{ marginTop: "3rem" }}>
                  <IconWrapper
                    style={{ color: theme.secondary }}
                    aria-hidden="true"
                  >
                    <Flame size={18} />
                  </IconWrapper>
                  Self-Initiated Projects
                </ProjectCategoryTitle>

                <CardGrid role="list" aria-label="Self-initiated projects">
                  {selfInitiatedProjects.map((project, index) => (
                    <ProjectCard key={index} role="listitem">
                      <ProjectHeader>
                        <ProjectIcon aria-hidden="true">
                          {project.icon}
                        </ProjectIcon>
                        <ProjectTitle>{project.title}</ProjectTitle>
                      </ProjectHeader>
                      <CardText>{project.description}</CardText>
                      <ProjectTags
                        aria-label={`Technologies used in ${project.title}`}
                      >
                        {project.tags.map((tag, i) => (
                          <ProjectTag key={i}>{tag}</ProjectTag>
                        ))}
                      </ProjectTags>
                    </ProjectCard>
                  ))}
                </CardGrid>
              </ProjectsContainer>
            </Section>
          )}

          {/* Awards Section */}
          {activeSection === "awards" && isVisible.awards && (
            <Section>
              <SectionTitle>
                <IconWrapper aria-hidden="true">
                  <Award size={22} />
                </IconWrapper>{" "}
                Awards & Recognition
              </SectionTitle>

              <CardGrid role="list" aria-label="Awards and recognition">
                <HighlightCard role="listitem">
                  <CardTitle as="h3">
                    "New Star on the Block" - Daffodil Software
                  </CardTitle>
                  <CardText>
                    Honored for rapidly delivering mission-critical frontend
                    modules with exceptional quality and impact.
                  </CardText>
                </HighlightCard>

                <HighlightCard role="listitem">
                  <CardTitle as="h3">
                    Resume.io Product Transformation Recognition
                  </CardTitle>
                  <CardText>
                    Celebrated for modernizing the resume builder architecture,
                    improving render speed by 25% and elevating UX.
                  </CardText>
                </HighlightCard>
              </CardGrid>
            </Section>
          )}

          {/* Education Section */}
          {activeSection === "education" && isVisible.education && (
            <Section>
              <SectionTitle>
                <IconWrapper aria-hidden="true">
                  <BookOpen size={22} />
                </IconWrapper>{" "}
                Education
              </SectionTitle>

              <Card style={{ marginBottom: "2rem" }}>
                <CardTitle as="h3">
                  Bachelor of Technology (B.Tech) in Computer Science
                </CardTitle>
                <TimelineHeader>
                  <TimelineCompany>
                    BK Birla Institute of Engineering and Technology, Pilani
                  </TimelineCompany>
                  <TimelineDate>2018 - 2022</TimelineDate>
                </TimelineHeader>
              </Card>
            </Section>
          )}
        </Main>

        <Footer role="contentinfo">
          © {new Date().getFullYear()} Shubham Bhodiwal • SDE-II, Frontend
          Engineering
        </Footer>
      </Container>
    </>
  );
};

export default InteractiveResume;
