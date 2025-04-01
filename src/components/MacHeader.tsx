import React, { useState } from "react";
import styled from "styled-components";
import AppleLogoBG from "../assets/apple-logo 1 (1).png";
import BatterySvg from "../assets/Battery.svg";
import ControlCenterSvg from "../assets/Control Center.svg";
import SpotlightSvg from "../assets/Search.svg";
import WifiSvg from "../assets/WiFi.svg";
import MacOSMenu from "./MacOsMenu";

const HeaderContainer = styled.div`
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-right: 1rem;
  font-size: 0.9rem;
  color: #ffffff;
  cursor: default;
  user-select: none;
  padding: 2px 4px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 10px;
  cursor: pointer;
`;

const TimeDisplay = styled.div`
  font-size: 0.8rem;
  user-select: none;
  color: #ffffff;
`;

const BackgroundImage = styled.img`
  display: block;
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;

interface MacHeaderProps {
  activeAppName?: string;
}

const MacHeader: React.FC<MacHeaderProps> = ({ activeAppName }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleAppleLogoClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: rect.left,
      y: rect.bottom + 5, // Add a small offset
    });
    setMenuVisible(!menuVisible);
  };

  const handleShutDown = () => {
    // Handle shutdown logic
    // This could exit fullscreen, redirect, or trigger application close
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }

    // You could also redirect to another page or close the app
    // window.location.href = "/exit";
  };

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <BackgroundImage
            src={AppleLogoBG}
            alt="Apple Logo"
            onClick={handleAppleLogoClick}
          />
          <MenuList>
            <MenuItem>{activeAppName || "Finder"}</MenuItem>
            <MenuItem>File</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>View</MenuItem>
            <MenuItem>Go</MenuItem>
            <MenuItem>Window</MenuItem>
            <MenuItem>Help</MenuItem>
          </MenuList>
        </LeftSection>
        <RightSection>
          <IconImg src={SpotlightSvg} alt="Spotlight" />
          <IconImg src={ControlCenterSvg} alt="Control Center" />
          <IconImg src={WifiSvg} alt="Wi-Fi" />
          <IconImg src={BatterySvg} alt="Battery" />
          <TimeDisplay>3:58 PM</TimeDisplay>
        </RightSection>
      </HeaderContainer>

      <MacOSMenu
        position={menuPosition}
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onShutDown={handleShutDown}
      />
    </>
  );
};

export default MacHeader;
