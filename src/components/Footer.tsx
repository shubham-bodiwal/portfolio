import { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Linkedin,
  Mail,
  ArrowUp,
  Heart,
} from "lucide-react";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-5px); }
//   100% { transform: translateY(0px); }
// `;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const FooterWrapper = styled.footer`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f1827 0%, #1a1a2e 50%, #03050b 100%);
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 90%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const FooterColumn = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${(props) => props.index * 0.2}s;
  opacity: 0;
`;

const ColumnTitle = styled.h3`
  font-size: 1.2rem;
  color: #ffaa33;
  margin-bottom: 1.5rem;
  position: relative;
  font-weight: 600;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #ffaa33;
    border-radius: 2px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #ffffff;

  svg {
    margin-right: 0.8rem;
    color: #ffaa33;
  }
`;

const ContactLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #ffaa33;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #ffaa33;
    transform: translateY(-5px);
    color: #03050b;
  }
`;

// const FooterNav = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;

// const FooterNavItem = styled.li`
//   margin-bottom: 0.8rem;
// `;

// const FooterNavLink = styled.a`
//   color: #ffffff;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   transition: all 0.3s;

//   svg {
//     margin-right: 0.5rem;
//     opacity: 0.7;
//     transition: opacity 0.3s;
//   }

//   &:hover {
//     color: #ffaa33;
//     transform: translateX(5px);

//     svg {
//       opacity: 1;
//     }
//   }
// `;

const NewsletterForm = styled.form`
  width: 100%;
  position: relative;
  margin-top: 1rem;
`;

const NewsletterInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1rem;
  border-radius: 4px;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #ffaa33;
  }
`;

const NewsletterButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 0.5rem 1rem;
  background: #ffaa33;
  border: none;
  border-radius: 2px;
  color: #03050b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ff9922;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  margin: 2rem 0;
`;

const Copyright = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeartIcon = styled.span`
  color: #ff5e7d;
  display: inline-block;
  animation: ${pulse} 1.5s infinite;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #ffaa33;
  margin-bottom: 2rem;
  position: relative;
  font-weight: 700;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: #ffaa33;
    border-radius: 4px;
  }
`;

const QuoteCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Quote = styled.blockquote`
  font-size: 1rem;
  line-height: 1.6;
  color: #ffffff;
  font-style: italic;
  margin: 0 0 1rem;
`;

const QuoteAuthor = styled.p`
  color: #ffaa33;
  font-weight: 500;
`;

const CTAButton = styled.a`
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #ffaa33, #ff5e7d, #ffaa33);
  background-size: 200% 200%;
  animation: ${gradientMove} 5s ease infinite;
  color: #03050b;
  text-decoration: none;
  font-weight: 700;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(255, 170, 51, 0.3);

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 170, 51, 0.4);
  }
`;

// const BackToTop = styled.button`
//   position: absolute;
//   bottom: 30px;
//   right: 30px;
//   width: 50px;
//   height: 50px;
//   background: #ffaa33;
//   border: none;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
//   animation: ${float} 2s infinite ease-in-out;
//   z-index: 10;
//   transition: all 0.3s;

//   &:hover {
//     background: #ff9922;
//     transform: translateY(-8px);
//   }
// `;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 170, 51, 0.05);
  filter: blur(100px);
  pointer-events: none;

  &:first-of-type {
    top: 10%;
    left: 10%;
  }

  &:last-of-type {
    bottom: 10%;
    right: 10%;
    background: rgba(255, 94, 125, 0.05);
  }
`;

const ProjectsStatsSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
`;

const StatItem = styled.div<{ index: number }>`
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${(props) => props.index * 0.1 + 0.5}s;
  opacity: 0;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffaa33;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <FooterWrapper>
      <BackgroundGlow />
      <BackgroundGlow />

      <ContentContainer>
        <SectionTitle>Let's Connect</SectionTitle>

        <QuoteCard>
          <Quote>
            "I'm dedicated to enhancing user experiences and streamlining
            development processes. My approach combines technical expertise with
            a passion for creating scalable, accessible, and high-performance
            applications that make a real difference for users."
          </Quote>
          <QuoteAuthor>— Shubham Bhodiwal</QuoteAuthor>
        </QuoteCard>

        <ProjectsStatsSection>
          <StatItem index={0}>
            <StatNumber>10+</StatNumber>
            <StatLabel>Projects</StatLabel>
          </StatItem>
          <StatItem index={1}>
            <StatNumber>5K+</StatNumber>
            <StatLabel>Concurrent Users</StatLabel>
          </StatItem>
          <StatItem index={2}>
            <StatNumber>30%</StatNumber>
            <StatLabel>App Load Time Reduction</StatLabel>
          </StatItem>
          <StatItem index={3}>
            <StatNumber>40%</StatNumber>
            <StatLabel>Manual Intervention Reduction</StatLabel>
          </StatItem>
        </ProjectsStatsSection>

        <GridContainer>
          <FooterColumn index={0}>
            <ColumnTitle>Contact Me</ColumnTitle>
            <ContactItem>
              <Mail size={18} />
              <ContactLink href="mailto:bhodiwalshubham03@gmail.com">
                bhodiwalshubham03@gmail.com
              </ContactLink>
            </ContactItem>
            {/* <ContactItem>
              <Globe size={18} />
              <ContactLink href="https://shubhambhodiwal.com" target="_blank">
                shubhambhodiwal.com
              </ContactLink>
            </ContactItem> */}

            <SocialLinks>
              {/* <SocialLink href="https://github.com/shubham" target="_blank">
                <Github size={20} />
              </SocialLink> */}
              <SocialLink
                href="https://www.linkedin.com/in/shubham-bhodiwal-543a6b171/"
                target="_blank"
              >
                <Linkedin size={20} />
              </SocialLink>
              {/* <SocialLink href="https://twitter.com/shubham" target="_blank">
                <Twitter size={20} />
              </SocialLink> */}
              <SocialLink href="mailto:bhodiwalshubham03@gmail.com">
                <Mail size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn index={1}>
            {/* <ColumnTitle>Key Projects</ColumnTitle>
            <FooterNav>
              <FooterNavItem>
                <FooterNavLink href="#">
                  <Code size={16} /> SHS Homeopathy
                </FooterNavLink>
              </FooterNavItem>
              <FooterNavItem>
                <FooterNavLink href="#">
                  <Bookmark size={16} /> Resume.io
                </FooterNavLink>
              </FooterNavItem>
              <FooterNavItem>
                <FooterNavLink href="#">
                  <Coffee size={16} /> Gulf-HR
                </FooterNavLink>
              </FooterNavItem>
              <FooterNavItem>
                <FooterNavLink href="#">
                  <Bookmark size={16} /> Twilio Segment
                </FooterNavLink>
              </FooterNavItem>
              <FooterNavItem>
                <FooterNavLink href="#">
                  <Coffee size={16} /> AI Interview System
                </FooterNavLink>
              </FooterNavItem>
            </FooterNav> */}
             <ColumnTitle>Stay Updated</ColumnTitle>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "1rem",
              }}
            >
              Subscribe to receive updates on my latest projects and tech
              insights.
            </p>
          </FooterColumn>

          <FooterColumn index={2}>
           

            {subscribed ? (
              <p style={{ color: "#ffaa33" }}>Thanks for subscribing!</p>
            ) : (
              <NewsletterForm onSubmit={handleSubmit}>
                <NewsletterInput
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <NewsletterButton type="submit">Subscribe</NewsletterButton>
              </NewsletterForm>
            )}

            <CTAButton href="mailto:bhodiwalshubham03@gmail.com">
              Get In Touch{" "}
              <ArrowUp size={16} style={{ transform: "rotate(45deg)" }} />
            </CTAButton>
          </FooterColumn>
        </GridContainer>

        <Divider />

        <Copyright>
          <div>&copy; {currentYear} Shubham Bhodiwal. All rights reserved.</div>
          <div>
            Made with{" "}
            <HeartIcon>
              <Heart size={16} />
            </HeartIcon>{" "}
            using React & TypeScript
          </div>
        </Copyright>
      </ContentContainer>

      {/* <BackToTop onClick={scrollToTop}>
        <ArrowUp size={24} />
      </BackToTop> */}
    </FooterWrapper>
  );
}
