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
    transform: translateY(1.25rem);
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
//   0% { transform: translateY(0rem); }
//   50% { transform: translateY(-0.3125rem); }
//   100% { transform: translateY(0rem); }
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
  max-width: 75rem;
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
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
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
    bottom: -0.625rem;
    left: 0;
    width: 3.125rem;
    height: 0.1875rem;
    background: #ffaa33;
    border-radius: 0.125rem;
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
  width: 2.5rem;
  height: 2.5rem;
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
    transform: translateY(-0.3125rem);
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
//     transform: translateX(0.3125rem);

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
  border: 0.0625rem solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1rem;
  border-radius: 0.25rem;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #ffaa33;
  }
`;

const NewsletterButton = styled.button`
  position: absolute;
  right: 0.3125rem;
  top: 0.3125rem;
  padding: 0.5rem 1rem;
  background: #ffaa33;
  border: none;
  border-radius: 0.125rem;
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
  height: 0.0625rem;
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
    bottom: -0.9375rem;
    left: 50%;
    transform: translateX(-50%);
    width: 6.25rem;
    height: 0.25rem;
    background: #ffaa33;
    border-radius: 0.25rem;
  }
`;

const QuoteCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  max-width: 50rem;
  margin: 0 auto 3rem;
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
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
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  margin-top: 1rem;
  box-shadow: 0 0.25rem 0.9375rem rgba(255, 170, 51, 0.3);

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    transform: translateY(-0.1875rem);
    box-shadow: 0 0.5rem 1.25rem rgba(255, 170, 51, 0.4);
  }
`;

// const BackToTop = styled.button`
//   position: absolute;
//   bottom: 1.875rem;
//   right: 1.875rem;
//   width: 3.125rem;
//   height: 3.125rem;
//   background: #ffaa33;
//   border: none;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.3);
//   animation: ${float} 2s infinite ease-in-out;
//   z-index: 10;
//   transition: all 0.3s;

//   &:hover {
//     background: #ff9922;
//     transform: translateY(-0.5rem);
//   }
// `;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 18.75rem;
  height: 18.75rem;
  border-radius: 50%;
  background: rgba(255, 170, 51, 0.05);
  filter: blur(6.25rem);
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
  letter-spacing: 0.0625rem;
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
      const statusElement = document.getElementById('subscription-status');
      if (statusElement) {
        statusElement.textContent = "Thanks for subscribing!";
      }
      setTimeout(() => {
        setSubscribed(false);
        if (statusElement) {
          statusElement.textContent = "";
        }
      }, 3000);
    }
  };

  return (
    <FooterWrapper role="contentinfo" aria-label="Contact information and subscription">
      <BackgroundGlow aria-hidden="true" />
      <BackgroundGlow aria-hidden="true" />

      <ContentContainer>
        <SectionTitle id="connect-heading">Let's Connect</SectionTitle>

        <QuoteCard>
          <Quote>
            "I partner with product, design, and engineering to build
            enterprise-grade React and Next.js experiences that stay fast,
            accessible, and reliable long after launch."
          </Quote>
          <QuoteAuthor>— Shubham Bhodiwal</QuoteAuthor>
        </QuoteCard>

        <ProjectsStatsSection aria-labelledby="stats-heading">
          <StatItem index={0}>
            <StatNumber>15+</StatNumber>
            <StatLabel>Products Delivered</StatLabel>
          </StatItem>
          <StatItem index={1}>
            <StatNumber>5K+</StatNumber>
            <StatLabel>Enterprise Users Served</StatLabel>
          </StatItem>
          <StatItem index={2}>
            <StatNumber>60%</StatNumber>
            <StatLabel>Faster Load Times Shipped</StatLabel>
          </StatItem>
          <StatItem index={3}>
            <StatNumber>95%</StatNumber>
            <StatLabel>Test Coverage on Critical Flows</StatLabel>
          </StatItem>
        </ProjectsStatsSection>

        <GridContainer>
          <FooterColumn index={0} aria-labelledby="contact-heading">
            <ColumnTitle id="contact-heading">Contact Me</ColumnTitle>
            <ContactItem>
              <Mail size={18} aria-hidden="true" />
              <ContactLink 
                href="mailto:bhodiwalshubham03@gmail.com"
                aria-label="Send email to bhodiwalshubham03@gmail.com"
              >
                bhodiwalshubham03@gmail.com
              </ContactLink>
            </ContactItem>

            <SocialLinks aria-label="Social media links">
              <SocialLink
                href="https://www.linkedin.com/in/shubham-bhodiwal-543a6b171/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={20} aria-hidden="true" />
              </SocialLink>
              <SocialLink 
                href="mailto:bhodiwalshubham03@gmail.com"
                aria-label="Email me"
              >
                <Mail size={20} aria-hidden="true" />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn index={1} aria-labelledby="update-heading">
            <ColumnTitle id="update-heading">Stay Updated</ColumnTitle>
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
              {subscribed ? "Thanks for subscribing!" : ""}
            
            {subscribed ? (
              <p 
                style={{ color: "#ffaa33" }}
                aria-hidden="true" // Screen readers will use the live region instead
              >
                Thanks for subscribing!
              </p>
            ) : (
              <NewsletterForm 
                onSubmit={handleSubmit}
                aria-labelledby="update-heading"
              >
                <NewsletterInput
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Your email address"
                  aria-required="true"
                />
                <NewsletterButton type="submit">Subscribe</NewsletterButton>
              </NewsletterForm>
            )}

            <CTAButton 
              href="mailto:bhodiwalshubham03@gmail.com"
              aria-label="Get in touch via email"
            >
              Get In Touch{" "}
              <ArrowUp size={16} style={{ transform: "rotate(45deg)" }} aria-hidden="true" />
            </CTAButton>
          </FooterColumn>
        </GridContainer>

        <Divider role="separator" />

        <Copyright>
          <div>&copy; {currentYear} Shubham Bhodiwal. All rights reserved.</div>
          <div>
            Made with{" "}
            <HeartIcon aria-hidden="true">
              <Heart size={16} />
            </HeartIcon>{" "}
            using React & TypeScript
          </div>
        </Copyright>
      </ContentContainer>
    </FooterWrapper>
  );
}