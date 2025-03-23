import styled from "styled-components";
import logoImage from "../assets/Logo.svg";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 4rem;
  text-transform: uppercase;
  font-size: 0.875rem;
  position: relative;
  gap: 4rem;
`;

const Logo = styled.img`
  height: 6rem;
  width: auto;
  opacity: 0.8;
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.05em;
  font-weight: 700;
  font-size: 1.125rem;

  &:hover {
    color: #00f5d4;
  }

  &.active {
    color: #ffaa33; /* Gold-ish active color like in your screenshot */
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <NavLink className="active" href="#about">
        About
      </NavLink>
      <NavLink href="#work">Work</NavLink>
      <Logo src={logoImage} alt="Logo" />
      <NavLink href="#shop">Shop</NavLink>
      <NavLink href="#contacts">Contacts</NavLink>
    </HeaderWrapper>
  );
}
