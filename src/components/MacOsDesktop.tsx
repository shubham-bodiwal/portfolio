import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import OsWallpaper from "../assets/os-wallpaper2.jpg";
import bootSound from "../assets/start-sound.wav";
import ImageReveal from "./ImageReveal";
import MacHeader from "./MacHeader";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const fillBar = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

// Outer container for the entire desktop
const DesktopContainer = styled.div`
  width: 100vw;
  height: 100dvh;
  background: url(${OsWallpaper}) center/cover no-repeat;
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
`;

// Header wrapper with dynamic styling.
// When any window is fullscreen, the header's background is black and it slides up (hidden) unless the mouse hovers near the top.
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

const HeaderBackground = styled.div<{isFullscreen: boolean}>`
background-color: ${props => props.isFullscreen ? "#00000066" : "#00000022"};
  height: 1.6rem;
width: 100%;
backdrop-filter: ${props => props.isFullscreen ? "blur(10px)" : "blur(2px)"};
`;  

// Area below header where non-fullscreen windows appear
const WindowsArea = styled.div`
  position: absolute;
  top: 1.6rem; /* Adjust based on your MacHeader height */
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

// Boot screen during boot sequence
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

// Dock component at the bottom
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

// Each item in the Dock
const DockItem = styled.div`
  position: relative;
  margin: 0 0.7rem;
`;

// Style for each app icon
const AppIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

// Status dot below each Dock item
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

// Window styling with dynamic border radius when fullscreen.
// When fullscreen, the top-left and top-right border radius become 0.
const WindowWrapper = styled.div<{ isFullscreen: boolean }>`
  animation: ${fadeIn} 0.3s ease-in-out;
  background: #2c2c2e;
  backdrop-filter: blur(20px);
  border-radius: ${(props) =>
    props.isFullscreen ? "0 0 0.5rem 0.5rem" : "0.5rem"};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const WindowHeader = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #48484a;
  background: #3a3a3c;
`;

const Title = styled.div`
  flex: 1;
  font-weight: 500;
  color: #ebebf5;
  margin-left: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const CircleButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
`;

type AppWindow = {
  id: string;
  appName: string;
  minimized: boolean;
};

type MacWindowProps = {
  id: string;
  appName: string;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFullscreenChange: (id: string, isFullscreen: boolean) => void;
};

function MacWindow({
  id,
  appName,
  onClose,
  onMinimize,
  onFullscreenChange,
}: MacWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const portalTarget = 
  // isFullscreen
  //   ? document.getElementById("desktop-container")
  //   :
     document.getElementById("windows-area");

  return ReactDOM.createPortal(
    <Rnd
      default={{
        x: 100 + Math.random() * 100,
        y: 100 + Math.random() * 100,
        width: 600,
        height: 400,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      enableResizing={!isFullscreen}
      disableDragging={isFullscreen}
      size={isFullscreen ? { width: "100%", height: "100%" } : undefined}
      position={isFullscreen ? { x: 0, y: 0 } : undefined}
      style={{ zIndex: 10 }}
    >
      <WindowWrapper isFullscreen={isFullscreen}>
        <WindowHeader>
          <ButtonGroup>
            <CircleButton color="#ff5f57" onClick={() => onClose(id)} />
            <CircleButton color="#ffbd2e" onClick={() => onMinimize(id)} />
            <CircleButton
              color="#28c840"
              onClick={() => {
                const newState = !isFullscreen;
                setIsFullscreen(newState);
                onFullscreenChange(id, newState);
              }}
            />
          </ButtonGroup>
          <Title>{appName}</Title>
        </WindowHeader>
        <div style={{ padding: "1rem", flex: 1, color: "#fff" }}>
          This is the {appName} content.
        </div>
      </WindowWrapper>
    </Rnd>,
    portalTarget as HTMLElement
  );
}

export default function MacOSPortfolioUI() {
  const [booted, setBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [dockVisible, setDockVisible] = useState(false);
  const inactivityTimer = useRef<any | null>(null);
  const [fullscreenWindows, setFullscreenWindows] = useState<Set<string>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(true);

  // Request fullscreen on mount (for the browser's fullscreen mode)
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

  // Boot sequence with sound and progress bar
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

  // Show/hide Dock based on mouse position
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

  // When any window is fullscreen, hide header by default.
  // Show the header if mouse is near the top (within 30px).
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
    return () => window.removeEventListener("mousemove", handleMouseMoveForHeader);
  }, [fullscreenWindows]);

  // Update fullscreen window tracking from each MacWindow
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
        if (existing.minimized) {
          return prev.map((win) =>
            win.appName === appName ? { ...win, minimized: false } : win
          );
        }
        return prev;
      }
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

  // Get status for status dot (open or minimized)
  const getAppStatus = (appName: string) => {
    const win = openWindows.find((w) => w.appName === appName);
    if (!win) return null;
    return win.minimized ? "minimized" : "open";
  };

  // Determine active app (the one currently open) to display in header.
  const activeApp = openWindows.find((w) => !w.minimized);
  const activeAppName = activeApp ? activeApp.appName : "";

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
      {/* Header always on top; when a fullscreen window exists the header is black and hidden unless hovered */}
      
      <HeaderBackground isFullscreen={fullscreenWindows.size > 0}>
        <HeaderWrapper isVisible={headerVisible} isFullscreen={fullscreenWindows.size > 0}>
        <MacHeader activeAppName={activeAppName} />
      </HeaderWrapper>
        </HeaderBackground>

      {/* Windows render area for non-fullscreen windows */}
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

      {/* Dock with Resume, Skills, Projects, Settings, and Trash */}
      <Dock visible={dockVisible}>
        <DockItem>
          <AppIcon onClick={() => launchApp("Resume")}>📄</AppIcon>
          {getAppStatus("Resume") && (
            <StatusDot status={getAppStatus("Resume") as "open" | "minimized"} />
          )}
        </DockItem>
        <DockItem>
          <AppIcon onClick={() => launchApp("Skills")}>🛠️</AppIcon>
          {getAppStatus("Skills") && (
            <StatusDot status={getAppStatus("Skills") as "open" | "minimized"} />
          )}
        </DockItem>
        <DockItem>
          <AppIcon onClick={() => launchApp("Projects")}>💼</AppIcon>
          {getAppStatus("Projects") && (
            <StatusDot status={getAppStatus("Projects") as "open" | "minimized"} />
          )}
        </DockItem>
        <DockItem>
          <AppIcon onClick={() => launchApp("Settings")}>⚙️</AppIcon>
          {getAppStatus("Settings") && (
            <StatusDot status={getAppStatus("Settings") as "open" | "minimized"} />
          )}
        </DockItem>
        <DockItem>
          <AppIcon onClick={() => console.log("Trash clicked!")}>🗑️</AppIcon>
        </DockItem>
      </Dock>
    </DesktopContainer>
  );
}
