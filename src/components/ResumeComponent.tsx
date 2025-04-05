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
  Database,
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
    // Initial animations
    setIsVisible({ about: true });

    // Animate skills progress after a delay
    const timer = setTimeout(() => {
      setSkillsProgress({
        react: 90,
        typescript: 85,
        javascript: 88,
        redux: 80,
        html: 92,
        css: 88,
        antd: 85,
        rest: 78,
        graphql: 70,
        accessibility: 75,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsVisible((prev) => ({ ...prev, [section]: true }));
  };

  // Resume data
  const skills: Skill[] = [
    {
      name: "React",
      icon: <Code size={18} />,
      value: skillsProgress.react || 0,
    },
    {
      name: "TypeScript",
      icon: <Terminal size={18} />,
      value: skillsProgress.typescript || 0,
    },
    {
      name: "JavaScript",
      icon: <Terminal size={18} />,
      value: skillsProgress.javascript || 0,
    },
    {
      name: "HTML/CSS",
      icon: <Monitor size={18} />,
      value: skillsProgress.html || 0,
    },
    {
      name: "Redux",
      icon: <Database size={18} />,
      value: skillsProgress.redux || 0,
    },
    {
      name: "REST/GraphQL",
      icon: <Server size={18} />,
      value: skillsProgress.rest || 0,
    },
  ];

  const experience: ExperienceItem[] = [
    {
      title: "Associate Software Developer",
      company: "Daffodil Software",
      period: "Nov 2021 - Present",
      description: [
        "Developed scalable frontend modules with React, TypeScript, and Redux, reliably serving over 5,000 concurrent users",
        "Created reusable dynamic form and table components, substantially reducing development time",
        "Led frontend performance optimizations, achieving a 30% reduction in app load times",
        "Mentored junior developers, significantly improving code quality",
        "Optimized frontend-heavy data management with IndexedDB",
        "Improved SQL-based scripting performance, reducing execution time from over 2 hours to under 5 minutes",
      ],
    },
  ];

  const mainProjects: ProjectItem[] = [
    {
      title: "SHS Homeopathy",
      icon: <Monitor size={18} />,
      description:
        "Led frontend efforts for an Electron-based and web-based homeopathy application managing complex medical data. Enhanced patient management, global search across 10L+ records, and remedy suggestions using data-driven clipboard features.",
      tags: ["React", "Electron", "AI Chatbot", "Multi-Window"],
    },
    {
      title: "Resume.io",
      icon: <Layout size={18} />,
      description:
        "Engineered an ATS-friendly resume builder with React PDF, web workers, and Vercel Lambdas. Enabled real-time previews and high-performance PDF downloads. Developed an editable DOCX-based resume builder using docs.js.",
      tags: ["React", "PDF Generation", "DOCX Editing", "Serverless"],
    },
    {
      title: "Gulf-HR",
      icon: <Briefcase size={18} />,
      description:
        "Contributed to a modular, customizable HR management platform supporting payroll, leave, attendance, onboarding, and task management. Enabled users to generate personalized HR portals with dynamic forms.",
      tags: ["React", "TypeScript", "Ant Design", "Role-based Permissions"],
    },
    {
      title: "Twilio Segment",
      icon: <Shield size={18} />,
      description:
        "Engineered a robust fraud detection and validation system, significantly reducing manual interventions by 40%. Streamlined complex security compliance processes, boosting operational efficiency and user trust.",
      tags: ["Fraud Detection", "Performance", "Security", "Dashboard"],
    },
  ];

  const selfInitiatedProjects: ProjectItem[] = [
    {
      title: "Personalized Quiz & Practice Reminder App",
      description:
        "Designed a mobile app that encourages daily learning during idle time via smart notifications and quick MCQ practice directly from the notification tray. Integrated adaptive scheduling based on user behavior.",
      tags: ["Mobile", "Adaptive Learning", "Notifications", "Gamification"],
      icon: <Layout size={18} />,
    },
    {
      title: "AI-Powered Interview System",
      description:
        "Created a platform using AI to assess candidates via audio/video recordings, eye contact, body posture, and voice analysis. Integrated real-time alerts for cheating detection and performance analytics.",
      tags: ["AI", "Video Analysis", "Real-time", "Analytics"],
      icon: <Cpu size={18} />,
    },
    {
      title: "AI-Based Quality Assurance",
      description:
        "Built a smart crawler for inspecting codebases and user interfaces, detecting potential issues based on predefined user stories and expected interactions. Implemented UI navigation automation and code analysis.",
      tags: ["AI", "QA", "Automation", "Testing"],
      icon: <Flame size={18} />,
    },
    {
      title: "AI Code Refactor Extension",
      description:
        "Developed an AI assistant for VS Code that analyzes, optimizes, and refactors code to improve readability, maintainability, and performance. Added features for renaming variables and simplifying logic.",
      tags: ["VS Code", "Extension", "AI", "Refactoring"],
      icon: <Zap size={18} />,
    },
    {
      title: "Gamers Box",
      description:
        "Created a dynamic platform for live game streams, news, and tournament updates. Integrated public APIs to fetch trending streams, newsfeeds, gear updates, and esports content with admin dashboard.",
      tags: ["React", "Live Streams", "Admin Dashboard", "Content"],
      icon: <Activity size={18} />,
    },
    {
      title: "WhatsApp Clone",
      description:
        "Built a real-time chat application using socket.io, featuring group chats, media sharing, and secure messaging. Served as a foundational learning project for WebSocket communication and event handling.",
      tags: ["WebSockets", "Real-time", "Chat", "Media Sharing"],
      icon: <Terminal size={18} />,
    },
    {
      title: "Smart Home Automation",
      description:
        "Engineered a comprehensive smart home ecosystem using Arduino, including lighting, climate, gas, and voltage monitoring automation. Supported security sensors, curtain automation, and energy efficiency features.",
      tags: ["Arduino", "IoT", "Automation", "Hardware"],
      icon: <Cpu size={18} />,
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Name>Shubham Bhodiwal</Name>
          <Title>Frontend Developer (3.5 Years of Experience)</Title>

          <ContactInfo>
            <ContactLink href="mailto:bhodiwalshubham03@gmail.com">
              <Mail size={16} /> bhodiwalshubham03@gmail.com
            </ContactLink>
            <ContactLink href="tel:+918058597167">+91 8058597167</ContactLink>
            <ContactLink href="https://www.linkedin.com/in/shubham-bhodiwal-543a6b171/">
              <Linkedin size={16} /> LinkedIn
            </ContactLink>
          </ContactInfo>
        </Header>

        <Nav>
          <NavList>
            {["about", "skills", "experience", "projects", "education"].map(
              (section) => (
                <li key={section}>
                  <NavButton
                    active={activeSection === section}
                    onClick={() => handleSectionChange(section)}
                  >
                    {section}
                  </NavButton>
                </li>
              )
            )}
          </NavList>
        </Nav>

        <Main>
          {/* About Section */}
          {activeSection === "about" && isVisible.about && (
            <Section>
              <SectionTitle>
                <IconWrapper>
                  <Terminal size={22} />
                </IconWrapper>{" "}
                About Me
              </SectionTitle>

              <AboutText>
                Innovative Frontend Developer skilled in React, TypeScript, and
                modern web technologies. Proven experience in optimizing
                frontend solutions for performance, scalability, and
                accessibility across complex applications including HR
                management systems and automation solutions. Passionate learner
                dedicated to enhancing user experiences and streamlining
                development processes.
              </AboutText>

              <CardGrid>
                <Card>
                  <CardTitle>Frontend Focus</CardTitle>
                  <CardText>
                    Specialized in building responsive, performant React
                    applications with clean, maintainable code.
                  </CardText>
                </Card>

                <Card>
                  <CardTitle>Problem Solver</CardTitle>
                  <CardText>
                    Reduced application load times by 30% through strategic
                    optimization and performance tuning.
                  </CardText>
                </Card>

                <Card>
                  <CardTitle>Continuous Learner</CardTitle>
                  <CardText>
                    Always exploring new technologies and methodologies to
                    enhance development workflows.
                  </CardText>
                </Card>
              </CardGrid>
            </Section>
          )}

          {/* Skills Section */}
          {activeSection === "skills" && isVisible.skills && (
            <Section>
              <SectionTitle>
                <IconWrapper>
                  <Code size={22} />
                </IconWrapper>{" "}
                Technical Skills
              </SectionTitle>

              <CardGrid>
                {skills.map((skill) => (
                  <SkillCard key={skill.name}>
                    <SkillHeader>
                      <SkillName>
                        <IconWrapper>{skill.icon}</IconWrapper>
                        {skill.name}
                      </SkillName>
                      <SkillValue>{skill.value}%</SkillValue>
                    </SkillHeader>
                    <SkillBar>
                      <SkillFill value={skill.value} />
                    </SkillBar>
                  </SkillCard>
                ))}
              </CardGrid>

              <SectionTitle style={{ fontSize: "1.25rem", marginTop: "2rem" }}>
                <IconWrapper>
                  <Server size={18} />
                </IconWrapper>{" "}
                Additional Expertise
              </SectionTitle>

              <TagsContainer>
                {[
                  "Redux Toolkit",
                  "Styled Components",
                  "Ant Design",
                  "Material UI",
                  "Web Vitals",
                  "Accessibility",
                  "PWA",
                  "Service Workers",
                  "GraphQL",
                  "React Query",
                  "Git",
                  "Docker",
                  "Vercel",
                  "AWS basics",
                ].map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
            </Section>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && isVisible.experience && (
            <Section>
              <SectionTitle>
                <IconWrapper>
                  <Briefcase size={22} />
                </IconWrapper>{" "}
                Work Experience
              </SectionTitle>

              <Timeline>
                {experience.map((job, index) => (
                  <TimelineItem key={index}>
                    <TimelineCard>
                      <CardTitle>{job.title}</CardTitle>
                      <TimelineHeader>
                        <TimelineCompany>{job.company}</TimelineCompany>
                        <TimelineDate>{job.period}</TimelineDate>
                      </TimelineHeader>
                      <BulletList>
                        {job.description.map((item, i) => (
                          <BulletItem key={i}>{item}</BulletItem>
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
                <IconWrapper>
                  <Activity size={22} />
                </IconWrapper>{" "}
                Projects
              </SectionTitle>

              <ProjectsContainer>
                <ProjectCategoryTitle>
                  <IconWrapper style={{ color: theme.primary }}>
                    <Briefcase size={18} />
                  </IconWrapper>
                  Professional Projects
                </ProjectCategoryTitle>

                <CardGrid>
                  {mainProjects.map((project, index) => (
                    <ProjectCard key={index}>
                      <ProjectHeader>
                        <ProjectIcon>{project.icon}</ProjectIcon>
                        <ProjectTitle>{project.title}</ProjectTitle>
                      </ProjectHeader>
                      <CardText>{project.description}</CardText>
                      <ProjectTags>
                        {project.tags.map((tag, i) => (
                          <ProjectTag key={i}>{tag}</ProjectTag>
                        ))}
                      </ProjectTags>
                    </ProjectCard>
                  ))}
                </CardGrid>

                <ProjectCategoryTitle style={{ marginTop: "3rem" }}>
                  <IconWrapper style={{ color: theme.secondary }}>
                    <Flame size={18} />
                  </IconWrapper>
                  Self-Initiated Projects
                </ProjectCategoryTitle>

                <CardGrid>
                  {selfInitiatedProjects.map((project, index) => (
                    <ProjectCard key={index}>
                      <ProjectHeader>
                        <ProjectIcon>{project.icon}</ProjectIcon>
                        <ProjectTitle>{project.title}</ProjectTitle>
                      </ProjectHeader>
                      <CardText>{project.description}</CardText>
                      <ProjectTags>
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

          {/* Education Section */}
          {activeSection === "education" && isVisible.education && (
            <Section>
              <SectionTitle>
                <IconWrapper>
                  <BookOpen size={22} />
                </IconWrapper>{" "}
                Education & Awards
              </SectionTitle>

              <Card style={{ marginBottom: "2rem" }}>
                <CardTitle>
                  Bachelor of Technology (B.Tech) in Computer Science
                </CardTitle>
                <TimelineHeader>
                  <TimelineCompany>
                    BK Birla Institute of Engineering and Technology, Pilani
                  </TimelineCompany>
                  <TimelineDate>2018 - 2022</TimelineDate>
                </TimelineHeader>
              </Card>

              <SectionTitle style={{ fontSize: "1.25rem" }}>
                <IconWrapper>
                  <Award size={18} />
                </IconWrapper>{" "}
                Awards & Recognition
              </SectionTitle>

              <CardGrid>
                <HighlightCard>
                  <CardTitle>New Star on The Block</CardTitle>
                  <CardText>
                    Awarded for impactful contributions to mission-critical
                    projects at Daffodil Software.
                  </CardText>
                </HighlightCard>

                <HighlightCard>
                  <CardTitle>Technical Excellence Award</CardTitle>
                  <CardText>
                    Recognized by Resume.io for technical interventions that
                    accelerated project improvements.
                  </CardText>
                </HighlightCard>
              </CardGrid>
            </Section>
          )}
        </Main>

        <Footer>
          © {new Date().getFullYear()} Shubham Bhodiwal • Frontend Developer
        </Footer>
      </Container>
    </>
  );
};

export default InteractiveResume;
