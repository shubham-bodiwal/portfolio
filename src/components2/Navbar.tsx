import { StyledNavbar, NavLinks, NavLink, Brand } from "./Navbar.styled";

const Navbar = () => {
  return (
    <StyledNavbar>
      <Brand>ParkScape Adventures</Brand>
      <NavLinks>
        <NavLink href="#about">About Camp</NavLink>
        <NavLink href="#events">Events</NavLink>
        <NavLink href="#signin">Sign In</NavLink>
      </NavLinks>
    </StyledNavbar>
  );
};

export default Navbar;
