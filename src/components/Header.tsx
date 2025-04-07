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
  opacity: 1;
  transition: height 0.3s ease, margin-bottom 0.3s ease;
  display: inline-block;

  &:hover {
    height: 7rem;
    margin-bottom: -1rem;
  }
`;

const NavLink = styled.a`
  position: relative;
  color: #566278;
  text-decoration: none;
  letter-spacing: 0.05em;
  font-weight: 700;
  font-size: 1.125rem;
  transition: transform 0.3s ease, color 0.3s ease;
  letter-spacing: 0.3rem;
  display: inline-block; /* ensures scale animation doesn't affect layout */

  span {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ffaa33;
    transform: scale(1.1);
  }

  &.active {
    color: white;
  }
  &.active::before,
  &.active::after,
  `;
// &.active span::after {
//   content: "";
//   position: absolute;
//   height: 0.0625rem;
//   background: #ffaa33;
// }

// &.active::before {
//   width: 3.125rem;
//   bottom: -0.9375rem;
//   left: -3.0625rem;
//   transform: rotate(60deg);
//   transform-origin: right top;
// }

// &.active::after {
//   width: 3.125rem;
//   bottom: -0.9375rem;
//   right: -3.0625rem;
//   transform: rotate(-60deg);
//   transform-origin: left top;
// }

// &.active span::after {
//   width: 100%;
//   left: 0;
//   top: calc(100% + 0.875rem);
// }

export default function Header() {
  return (
    <HeaderWrapper>
      <NavLink href="#about">Frontend Strategist</NavLink>
      <NavLink href="#work">Technology Pioneer</NavLink>
      <Logo src={logoImage} alt="Logo" loading="lazy" />
      <NavLink href="#shop">Component Engineer</NavLink>
      <NavLink href="#contacts">Innovation Catalyst</NavLink>
    </HeaderWrapper>
  );
}
