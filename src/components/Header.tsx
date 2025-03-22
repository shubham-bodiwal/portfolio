import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  text-transform: uppercase;
  font-size: 0.875rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    color: #00f5d4;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>SB</Logo>
      <Nav>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#work">Work</NavLink>
        <NavLink href="#shop">Shop</NavLink>
        <NavLink href="#contacts">Contacts</NavLink>
      </Nav>
    </HeaderWrapper>
  );
}
