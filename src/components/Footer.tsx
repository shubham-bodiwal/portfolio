import styled from "styled-components";

const FooterWrapper = styled.footer`
  padding: 4rem;
  text-align: center;
  border-top: 1px solid #2e2e2e;
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const Link = styled.a`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    color: #00f5d4;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: #999;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Socials>
        <Link href="https://linkedin.com" target="_blank">LinkedIn</Link>
        <Link href="mailto:bhodiwalshubham03@gmail.com">Email</Link>
      </Socials>
      <Copyright>
        &copy; {new Date().getFullYear()} Shubham Bhodiwal
      </Copyright>
    </FooterWrapper>
  );
}
