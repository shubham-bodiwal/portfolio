import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AppleLogoBG from "../assets/apple-logo 1 (1).avif";
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
  padding: 0 0.625rem;
  box-shadow: 0rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
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
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;

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
  margin-right: 0.625rem;
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
  onShutdown?: () => void;
}

const MacHeader: React.FC<MacHeaderProps> = ({ activeAppName, onShutdown }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  // useRef to store and clear timeouts
  const timeoutRef = useRef<any | null>(null);

  // Accurate time update function with sync to seconds
  useEffect(() => {
    const updateTimeWithPrecision = () => {
      const now = new Date();

      // Update the display time
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      // Calculate delay until next second
      const millisToNextSecond = 1000 - now.getMilliseconds();

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Schedule next update precisely at the next second
      timeoutRef.current = setTimeout(
        () => {
          updateTimeWithPrecision();
        },
        Math.max(millisToNextSecond, 0)
      );
    };

    // Start the precision updates
    updateTimeWithPrecision();

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAppleLogoClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: rect.left,
      y: rect.bottom + 5, // Add a small offset
    });
    setMenuVisible(!menuVisible);
  };

  const handleShutDown = () => {
    // Close the menu first
    setMenuVisible(false);

    // Call the parent's shutdown handler if provided
    if (onShutdown) {
      onShutdown();
    }
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
          <IconImg   src={SpotlightSvg} alt="Spotlight" />
          <IconImg   src={ControlCenterSvg} alt="Control Center" />
          <IconImg   src={WifiSvg} alt="Wi-Fi" />
          <IconImg   src={BatterySvg} alt="Battery" />
          <TimeDisplay>{currentTime}</TimeDisplay>
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
