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
  primary: "#4d9fff", // Bright Blue
  secondary: "#ffaa33", // Gold/Orange
  tertiary: "#4ECDC4", // Mint
  background: "#050b14", // Very dark, almost black-blue
  surface: "rgba(255, 255, 255, 0.03)", // Glass effect
  surfaceHighlight: "rgba(255, 255, 255, 0.06)", // Hover state
  border: "rgba(255, 255, 255, 0.08)",
  text: "#ffffff",
  textMuted: "#94a3b8", // Slate gray
  accent: "#FF5E7D", // Pink
  success: "#6EE7B7", // Green
  gradient: "linear-gradient(135deg, #4d9fff 0%, #3a7bd5 100%)",
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
  background: linear-gradient(135deg, ${theme.background} 0%, #02040a 100%);
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  padding: 0 2rem 6rem 2rem;
  font-family: "Inter", sans-serif;
`;

const Header = styled.header`
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(5, 11, 20, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 0;
  border-bottom: 1px solid ${theme.border};
  margin: 0 -2rem 2rem -2rem;
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
    color: ${theme.secondary};
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
  color: ${theme.text};

  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3rem;
    height: 0.1875rem;
    background: ${theme.secondary};
    border-radius: 0.1875rem;
  }
`;

const IconWrapper = styled.span`
  color: ${theme.secondary};
`;

const AboutText = styled.p`
  line-height: 1.7;
  margin-bottom: 2rem;
  color: ${theme.textMuted};
  font-size: 1.05rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: ${theme.surface};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  border: 1px solid ${theme.border};

  &:hover {
    transform: translateY(-0.3125rem);
    box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.15);
    background: ${theme.surfaceHighlight};
  }
`;

const HighlightCard = styled(Card)`
  border-left: 0.25rem solid ${theme.secondary};
`;

const CardTitle = styled.h4`
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
  color: ${theme.primary};
  font-weight: 600;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: ${theme.textMuted};
  line-height: 1.5;
`;

const SkillCard = styled(Card)`
  background: ${theme.surface};
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
  font-weight: 500;
`;

// const SkillValue = styled.span`
//   color: ${theme.primary};
//   font-weight: 500;
// `;

const SkillBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
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
  background: rgba(77, 159, 255, 0.1);
  color: ${theme.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  border: 1px solid rgba(77, 159, 255, 0.2);
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
    background: ${theme.border};
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
    background: ${theme.background};
    border: 0.1875rem solid ${theme.secondary};
    box-shadow: 0 0 0 4px ${theme.background};
    z-index: 2;
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
  background: rgba(255, 255, 255, 0.05);
  color: ${theme.textMuted};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  border: 1px solid ${theme.border};
`;

const TimelineCompany = styled.span`
  color: ${theme.secondary};
  font-weight: 500;
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
    color: ${theme.secondary};
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
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: "";
    flex-grow: 1;
    height: 0.0625rem;
    background: ${theme.border};
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
    background: ${theme.secondary};
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
  background: rgba(255, 170, 51, 0.1);
  color: ${theme.secondary};
`;

const ProjectTitle = styled.h5`
  font-size: 1.1rem;
  color: ${theme.primary};
  font-weight: 600;
`;

const ProjectTags = styled(TagsContainer)`
  margin-top: 0.75rem;
`;

const ProjectTag = styled(Tag)`
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.05);
  color: ${theme.textMuted};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  border: 1px solid ${theme.border};
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 0.0625rem solid ${theme.border};
  color: ${theme.textMuted};
  font-size: 0.85rem;
`;


const InteractiveResume = () => {
  const [skillsProgress, setSkillsProgress] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
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
      title: "Software Development Engineer II",
      company: "WRMSKONNECT TECHNOLOGIES (Swivl.tech)",
      period: "Jun 2025 - Present",
      description: [
        "Architected AI-powered work order platform (Next.js/React/TypeScript) serving 10,000+ users with 99.9% uptime, leading 6-engineer team.",
        "Reduced dashboard load times by 40% (3.2s to 1.9s FCP) and 35% (4.1s to 2.7s LCP) through SSR optimization and design system implementation.",
        "Built smart chatbot routing processing 500+ daily tickets, cutting resolution time 50% (8hrs to 4hrs) and boosting customer satisfaction 25%.",
        "Established testing framework achieving 95% coverage across 150+ components, reducing production incidents 60% (30 to 12 monthly).",
        "Created reusable component library with 80+ components accelerating feature delivery 35% (2 weeks to 1 week average).",
        "Leveraged AI-assisted development tools (Copilot, Claude) to accelerate prototyping and code generation, improving individual productivity 30%.",
      ],
    },
    {
      title: "Associate Software Developer",
      company: "Daffodil Software",
      period: "Apr 2024 - Jun 2025",
      description: [
        "Led frontend development of HR/Finance platform serving 5,000+ users across 50+ organizations with 200K+ line React/TypeScript codebase.",
        "Optimized performance with Web Workers and Service Workers reducing load time 60% (5s to 2s), bundle size 45% (2.1MB to 1.15MB), and bounce rate 15%.",
        "Deployed caching strategy cutting API calls 70%, saving $12K annually while improving perceived performance 50%.",
        "Built testing infrastructure achieving 100% coverage on critical paths, reducing production bugs 45%.",
        "Established code review process increasing deployment frequency 5x (2x to 10x monthly) and cutting rollback rate from 12% to 3%.",
        "Mentored 3 engineers and conducted 15+ technical interviews, reducing ramp-up time from 8 to 4 weeks.",
      ],
    },
    {
      title: "Junior - Associate Software Developer",
      company: "Daffodil Software",
      period: "May 2022 - Mar 2024",
      description: [
        "Shipped React features for Resume.io SaaS platform serving 50,000+ users, improving rendering speed 25% via React.memo and code-splitting.",
        "Built component library with 60+ reusable components reducing code duplication 50% and accelerating delivery 40% (3 weeks to 1.8 weeks).",
        "Translated 100+ Figma designs to production with 98% pixel-perfect accuracy across Chrome, Firefox, Safari, Edge.",
        "Optimized rendering paths reducing Time to Interactive 30% (4.5s to 3.1s) and improving Lighthouse score from 72 to 91.",
        "Modernized 15K+ lines of legacy jQuery to React, reducing technical debt 60% and improving maintainability from 45 to 82.",
      ],
    },
    {
      title: "Software Development Intern",
      company: "Daffodil Software",
      period: "Nov 2021 - Apr 2022",
      description: [
        "Developed frontend features for enterprise web projects, implementing UI components with 100% unit test coverage following standard methodologies.",
        "Automated test coverage for core UI modules using Jest and React Testing Library, improving code reliability and CI/CD deployment confidence.",
        "Demonstrated rapid technical proficiency in React, TypeScript, and modern frontend tooling, leading to full-time conversion within 6 months.",
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
      title: "Gulf-HR Platform",
      icon: <Monitor size={18} />,
      description:
        "Modular HRMS with form builders, role-based access, and analytics that saved HR teams 15+ hours per week.",
      tags: ["React", "Ant Design", "Component Library", "Analytics"],
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
          <Title>Software Development Engineer II - Frontend</Title>

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

        <Main>
          {/* About Section */}
          <Section id="about" style={{ marginBottom: "4rem" }}>
            <SectionTitle>
              <IconWrapper aria-hidden="true">
                <Terminal size={22} />
              </IconWrapper>{" "}
              About Me
            </SectionTitle>

            <AboutText>
              Frontend Engineer with 4+ years building scalable web applications serving 5,000+ enterprise users.
              Expertise in React, Next.js, and TypeScript with proven 40-60% performance improvements. Led teams of
              6 engineers delivering AI-powered platforms and SaaS products with 95%+ test coverage.
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

          {/* Skills Section */}
          <Section id="skills" style={{ marginBottom: "4rem" }}>
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
                "Node.js",
                "GraphQL",
                "Docker",
                "Shadcn UI",
                "Tailwind CSS",
                "Core Web Vitals",
                "PWA",
                "CI/CD",
                "AI-Assisted Development",
              ].map((tag) => (
                <Tag key={tag} role="listitem">
                  {tag}
                </Tag>
              ))}
            </TagsContainer>
          </Section>

          {/* Experience Section */}
          <Section id="experience" style={{ marginBottom: "4rem" }}>
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

          {/* Projects Section */}
          <Section id="projects" style={{ marginBottom: "4rem" }}>
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

          {/* Education Section */}
          <Section id="education" style={{ marginBottom: "4rem" }}>
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
              <CardText>CGPA: 8.7</CardText>
            </Card>

            <Card style={{ marginBottom: "2rem" }}>
              <CardTitle as="h3">Senior Secondary (12th Grade)</CardTitle>
              <TimelineHeader>
                <TimelineCompany>Birla School Pilani</TimelineCompany>
                <TimelineDate>Completed</TimelineDate>
              </TimelineHeader>
              <CardText>CGPA: 8.7</CardText>
            </Card>

            <Card style={{ marginBottom: "2rem" }}>
              <CardTitle as="h3">Secondary (10th Grade)</CardTitle>
              <TimelineHeader>
                <TimelineCompany>Birla School Pilani</TimelineCompany>
                <TimelineDate>Completed</TimelineDate>
              </TimelineHeader>
              <CardText>CGPA: 8.4</CardText>
            </Card>
          </Section>

          {/* Awards Section */}
          <Section id="awards" style={{ marginBottom: "4rem" }}>
            <SectionTitle>
              <IconWrapper aria-hidden="true">
                <Award size={22} />
              </IconWrapper>{" "}
              Awards & Recognition
            </SectionTitle>

            <CardGrid role="list" aria-label="Awards and recognition">
              <HighlightCard role="listitem">
                <CardTitle as="h3">
                  'Overachiever' Recognition - Swivl.tech
                </CardTitle>
                {/* <CardText>
                  Recognized for exceptional technical delivery and consistently
                  exceeding sprint commitments.
                </CardText> */}
              </HighlightCard>

              <HighlightCard role="listitem">
                <CardTitle as="h3">
                  'New Star on the Block' - Daffodil Software
                </CardTitle>
                {/* <CardText>
                  Delivered mission-critical modules 30% ahead of schedule with
                  zero production incidents.
                </CardText> */}
              </HighlightCard>

              <HighlightCard role="listitem">
                <CardTitle as="h3">Resume.io Technical Excellence</CardTitle>
                {/* <CardText>
                  Acknowledged as top technical contributor; 25% rendering
                  optimization impacting 50,000+ users.
                </CardText> */}
              </HighlightCard>
            </CardGrid>
          </Section>
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
