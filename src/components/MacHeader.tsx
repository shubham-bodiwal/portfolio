import { useState, useEffect, useRef, FC } from "react";
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

const MacHeader: FC<MacHeaderProps> = ({ activeAppName, onShutdown }) => {
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

  const handleAppleLogoClick = (event: any) => {
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
      <HeaderContainer aria-label="System menu bar">
        <LeftSection>
          <BackgroundImage
            src={AppleLogoBG}
            alt="Apple Logo"
            onClick={handleAppleLogoClick}
            tabIndex={0}
            aria-label="Apple menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleAppleLogoClick(e);
              }
            }}
          />
          <MenuList>
            <MenuItem
              aria-label={`${activeAppName || "Finder"} menu`}
              tabIndex={0}
            >
              {activeAppName || "Finder"}
            </MenuItem>
            <MenuItem aria-label="File menu" tabIndex={0}>
              File
            </MenuItem>
            <MenuItem aria-label="Edit menu" tabIndex={0}>
              Edit
            </MenuItem>
            <MenuItem aria-label="View menu" tabIndex={0}>
              View
            </MenuItem>
            <MenuItem aria-label="Go menu" tabIndex={0}>
              Go
            </MenuItem>
            <MenuItem aria-label="Window menu" tabIndex={0}>
              Window
            </MenuItem>
            <MenuItem aria-label="Help menu" tabIndex={0}>
              Help
            </MenuItem>
          </MenuList>
        </LeftSection>
        <RightSection>
          <IconImg
            src={SpotlightSvg}
            alt="Spotlight"
            tabIndex={0}
            aria-label="Open Spotlight search"
          />
          <IconImg
            src={ControlCenterSvg}
            alt="Control Center"
            tabIndex={0}
            aria-label="Open Control Center"
          />
          <IconImg
            src={WifiSvg}
            alt="Wi-Fi"
            tabIndex={0}
            aria-label="Wi-Fi settings"
          />
          <IconImg
            src={BatterySvg}
            alt="Battery"
            tabIndex={0}
            aria-label="Battery status"
          />
          <TimeDisplay aria-label={`Current time: ${currentTime}`}>
            {currentTime}
          </TimeDisplay>
        </RightSection>
      </HeaderContainer>

      <MacOSMenu
        position={menuPosition}
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onShutDown={handleShutDown}
        aria-hidden={!menuVisible}
        aria-label="Apple menu options"
      />
    </>
  );
};

export default MacHeader;
