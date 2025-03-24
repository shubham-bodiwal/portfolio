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
  position: relative;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.05em;
  font-weight: 700;
  font-size: 1.125rem;
  transition: transform 0.3s ease, color 0.3s ease;
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
    color: red;
  }
  &.active::before,
  &.active::after,
  &.active span::after {
    content: '';
    position: absolute;
    height: 1px;
    background: red;
  }

  &.active::before {
    width: 50px;
    bottom: -15px;
    left: -49px;
    transform: rotate(60deg);
    transform-origin: right top;
  }

  &.active::after {
    width: 50px;
    bottom: -15px;
    right: -49px;
    transform: rotate(-60deg);
    transform-origin: left top;
  }

  &.active span::after {
    width: 100%;
    left: 0;
    top: calc(100% + 14px);
  }
`;




export default function Header() {
  return (
    <HeaderWrapper>
      <NavLink className="active" href="#about">
        <span>Specifications</span>
      </NavLink>
      <NavLink href="#work">Loadouts</NavLink>
      <Logo src={logoImage} alt="Logo" />
      <NavLink href="#shop">Exposures</NavLink>
      <NavLink href="#contacts">Playground</NavLink>
    </HeaderWrapper>
  );
}