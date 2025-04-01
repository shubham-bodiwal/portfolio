import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";

// Import your wallpaper & sounds
import OsWallpaper from "../assets/os-wallpaper2.jpg";
import bootSound from "../assets/start-sound.wav";

// Import your Dock icons
import resumeIcon from "../assets/Launchpad.svg";
import skillsIcon from "../assets/Folder.svg";
import projectsIcon from "../assets/Mail.svg";
import settingsIcon from "../assets/Settings.svg";
import trashIcon from "../assets/Trash Full.svg";

import ImageReveal from "./ImageReveal";
import MacHeader from "./MacHeader";
import MacWindow from "./MacWindow";

const fillBar = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100dvh;
  background: url(${OsWallpaper}) center/cover no-repeat;
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
`;

const HeaderWrapper = styled.div<{ isVisible: boolean; isFullscreen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  transform: ${({ isVisible, isFullscreen }) =>
    isFullscreen && !isVisible ? "translateY(-100%)" : "translateY(0)"};
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
`;

const HeaderBackground = styled.div<{ isFullscreen: boolean }>`
  background-color: ${(props) =>
    props.isFullscreen ? "#00000066" : "#00000022"};
  height: 1.6rem;
  width: 100%;
  backdrop-filter: ${(props) =>
    props.isFullscreen ? "blur(10px)" : "blur(2px)"};
`;

const WindowsArea = styled.div`
  position: absolute;
  top: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const BootScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const ProgressBarWrapper = styled.div`
  width: 200px;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: #555;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 0.25rem;
  animation: ${fillBar} 2.5s ease-in-out forwards;
`;

const Dock = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: ${({ visible }) => (visible ? "0.5rem" : "-100px")};
  left: 50%;
  transform: translateX(-50%);
  z-index: 9998;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.8rem;
  border-radius: 1rem;
  display: flex;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: bottom 0.3s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DockItem = styled.div`
  position: relative;
  margin: 0 0.4rem;
`;

// background-color: rgba(255, 255, 255, 0.6);
const AppIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// Status dot
const StatusDot = styled.div<{ status: "open" | "minimized" }>`
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "open" ? "green" : "yellow"};
`;

type AppWindow = {
  id: string;
  appName: string;
  minimized: boolean;
};

export default function MacOSPortfolioUI() {
  const [booted, setBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [dockVisible, setDockVisible] = useState(false);
  const inactivityTimer = useRef<any | null>(null);
  const [fullscreenWindows, setFullscreenWindows] = useState<Set<string>>(
    new Set()
  );
  const [headerVisible, setHeaderVisible] = useState(true);

  // Array of dock items (name + icon). If you have more icons, add them here:
  const dockItems = [
    { name: "Resume", icon: resumeIcon },
    { name: "Skills", icon: skillsIcon },
    { name: "Projects", icon: projectsIcon },
    { name: "Settings", icon: settingsIcon },
    // Mark Trash separately if you don't want it to open a window:
    { name: "Trash", icon: trashIcon, isTrash: true },
  ];

  // Request browser fullscreen on mount
  useEffect(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }, []);

  // Boot sequence with sound
  useEffect(() => {
    const audio = new Audio(bootSound);
    audio.play();
    setTimeout(() => {
      setBooted(true);
      setDockVisible(true);
    }, 2500);
    setTimeout(() => {
      setDockVisible(false);
    }, 3000);
  }, []);

  // Show/hide Dock based on mouse near bottom
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 100) {
        setDockVisible(true);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      } else {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => setDockVisible(false), 500);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Show/hide header if in fullscreen mode
  useEffect(() => {
    const handleMouseMoveForHeader = (e: MouseEvent) => {
      if (fullscreenWindows.size > 0) {
        if (e.clientY < 30) {
          setHeaderVisible(true);
        } else {
          setHeaderVisible(false);
        }
      } else {
        setHeaderVisible(true);
      }
    };
    window.addEventListener("mousemove", handleMouseMoveForHeader);
    return () =>
      window.removeEventListener("mousemove", handleMouseMoveForHeader);
  }, [fullscreenWindows]);

  // Handle changes to fullscreen windows
  const handleFullscreenChange = (id: string, isFullscreen: boolean) => {
    setFullscreenWindows((prev) => {
      const newSet = new Set(prev);
      if (isFullscreen) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  // Launch or restore an app window
  const launchApp = (appName: string) => {
    setOpenWindows((prev) => {
      const existing = prev.find((win) => win.appName === appName);
      if (existing) {
        // If minimized, restore it
        if (existing.minimized) {
          return prev.map((win) =>
            win.appName === appName ? { ...win, minimized: false } : win
          );
        }
        // Otherwise do nothing if already open
        return prev;
      }
      // Create a new window
      return [...prev, { id: uuidv4(), appName, minimized: false }];
    });
  };

  // Close a window
  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setFullscreenWindows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // Minimize a window
  const minimizeWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  // Get status for dot
  const getAppStatus = (appName: string) => {
    const win = openWindows.find((w) => w.appName === appName);
    if (!win) return null;
    return win.minimized ? "minimized" : "open";
  };

  // Which app is active?
  const activeApp = openWindows.find((w) => !w.minimized);
  const activeAppName = activeApp ? activeApp.appName : "";

  // Handle click for dock item
  const handleDockItemClick = (item: { name: string; isTrash?: boolean }) => {
    if (item.isTrash) {
      console.log("Trash clicked!");
    } else {
      launchApp(item.name);
    }
  };

  if (!booted) {
    return (
      <BootScreen>
        <ImageReveal />
        <ProgressBarWrapper>
          <ProgressBarFill />
        </ProgressBarWrapper>
      </BootScreen>
    );
  }

  return (
    <DesktopContainer id="desktop-container">
      {/* Header */}
      <HeaderBackground isFullscreen={fullscreenWindows.size > 0}>
        <HeaderWrapper
          isVisible={headerVisible}
          isFullscreen={fullscreenWindows.size > 0}
        >
          <MacHeader activeAppName={activeAppName} />
        </HeaderWrapper>
      </HeaderBackground>

      {/* Windows area */}
      <WindowsArea id="windows-area">
        {openWindows.map(
          (win) =>
            !win.minimized && (
              <MacWindow
                key={win.id}
                id={win.id}
                appName={win.appName}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onFullscreenChange={handleFullscreenChange}
              />
            )
        )}
      </WindowsArea>

      {/* Dock */}
      <Dock visible={dockVisible}>
        {dockItems.map((item) => (
          <DockItem key={item.name}>
            <AppIcon onClick={() => handleDockItemClick(item)}>
              <img src={item.icon} alt={item.name} />
            </AppIcon>
            {getAppStatus(item.name) && (
              <StatusDot
                status={getAppStatus(item.name) as "open" | "minimized"}
              />
            )}
          </DockItem>
        ))}
      </Dock>
    </DesktopContainer>
  );
}
