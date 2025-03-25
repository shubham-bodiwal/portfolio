import { useEffect, useRef } from "react";
import {
  SectionContainer,
  BackgroundImage,
  Content,
  Title,
  Description,
  ContactInfo,
  Footer,
  FooterLinks,
  FooterBranding,
  FooterIcons,
  Icon,
} from "./FooterSection.styled";

const FooterSection: React.FC = () => {
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Get the total scrollable height
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Calculate how far the user has scrolled from the bottom
      const scrollFromBottom = scrollableHeight - window.scrollY;

      if (heroImageRef.current) {
        // Adjust translateY based on scroll from bottom
        const translateValue = Math.min(100, scrollFromBottom / 10); // Adjust divisor for speed
        heroImageRef.current.style.transform = `translateY(${translateValue * 4}px)`; // Positive value for bottom-to-top movement
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SectionContainer>
      {/* Background Image */}
      <BackgroundImage ref={heroImageRef} />

      {/* Content Section */}
      <Content>
        <Title>Join Us in Shaping the Future</Title>
        <Description>
          Sign up today to unlock the full potential of AI and take the first step toward smarter learning and living.
        </Description>
        <ContactInfo>
          <p>+1 (514) - 1234567</p>
          <p>info@parkscape-adventures.com</p>
        </ContactInfo>
      </Content>

      {/* Footer */}
      <Footer>
        <FooterBranding>ParkScape Adventures</FooterBranding>
        <FooterLinks>
          <a href="#">About Camp</a>
          <a href="#">Events</a>
          <a href="#">Animals</a>
          <a href="#">FAQs</a>
          <a href="#">The Team</a>
        </FooterLinks>
        <FooterIcons>
          <Icon>🌐</Icon>
          <Icon>📸</Icon>
          <Icon>🎥</Icon>
          <Icon>✈️</Icon>
          <Icon>📍</Icon>
        </FooterIcons>
        <p>DESIGNED BY YI LI</p>
      </Footer>
    </SectionContainer>
  );
};

export default FooterSection;