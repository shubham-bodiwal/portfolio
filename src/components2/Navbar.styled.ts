import styled from "styled-components";

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 100px;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  z-index: 10;
  background: transparent;
`;

export const Brand = styled.div`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;
