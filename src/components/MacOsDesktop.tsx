import { useEffect, useState, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";

// Import wallpaper & sounds
import OsWallpaper from "../assets/os-wallpaper2.jpg";
import bootSound from "../assets/start-sound.wav";

// Import MacHeader and MacWindow components
import MacHeader from "./MacHeader";
import MacWindow from "./MacWindow";
import ImageReveal from "./ImageReveal";

// Import dock icons
import finderIcon from "../assets/Finder.svg";
import launchpadIcon from "../assets/Launchpad.svg";
import safariIcon from "../assets/Safari.svg";
import mailIcon from "../assets/Mail.svg";
import photosIcon from "../assets/Photos.svg";
import messagesIcon from "../assets/Messages.svg";
import musicIcon from "../assets/Music.svg";
import appStoreIcon from "../assets/App Store.svg";
import settingsIcon from "../assets/Settings.svg";
import dictionaryIcon from "../assets/Dictionary.svg";
import trashIcon from "../assets/Trash Full.svg";
import ShutdownScreen from "./ShutDownScreen";
import portfolioIcon from "../assets/Logo.svg";
import XcodeIcon from "../assets/Xcode.svg";
import SampleIcon from "../assets/Logo3.svg";
import ResumeIcon from "../assets/LogoR.svg";
import PortfolioPage from "../pages/PortfolioPage";
import InteractiveResume from "./ResumeComponent";
import MacNotificationStack, { NotificationItem } from "./MacNotificationStack";

// Animation keyframes
const fillBar = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const gelatineKeyframes = keyframes`
  from, to { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.1); }
  50% { transform: scale(1.1, 0.9); }
  75% { transform: scale(0.95, 1.05); }
`;

// Styled components
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
    props.isFullscreen ? "blur(0.625rem)" : "blur(0.125rem)"};
`;

const WindowsArea = styled.div`
  position: absolute;
  top: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const BootScreen = styled.div<{ isShuttingDown?: boolean }>`
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
  animation: ${(props) => (props.isShuttingDown ? fadeOut : "none")} 2s
    ease-in-out forwards;
  animation-delay: ${(props) => (props.isShuttingDown ? "3s" : "0s")};
`;

const ProgressBarWrapper = styled.div`
  width: 12.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: #555;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ isShuttingDown?: boolean }>`
  height: 100%;
  background-color: white;
  border-radius: 0.25rem;
  animation: ${fillBar} ${(props) => (props.isShuttingDown ? "3s" : "2.5s")}
    ease-in-out forwards;
`;

const Dock = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: ${({ visible }) => (visible ? "0.5rem" : "-6.25rem")};
  left: 50%;
  transform: translateX(-50%);
  z-index: 9998;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(0.625rem);
  padding: 0.5rem 0.8rem;
  border-radius: 1rem;
  display: flex;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.3);
  transition: bottom 0.3s ease-in-out;
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
`;

const DockItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DockSeparator = styled.div`
  width: 0.0625rem;
  height: 2.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 0.4rem;
`;

const DockItem = styled.div<{ isAnimating?: boolean }>`
  position: relative;
  margin: 0 0.4rem;
  animation: ${gelatineKeyframes} 0.5s infinite;
  animation-play-state: ${(props) =>
    props.isAnimating ? "running" : "paused"};

  animation-fill-mode: forwards;
`;

const AppIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.2);
    filter: brightness(1.1);
    margin-bottom: 0.5rem;
    margin-top: -0.5rem;
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
  bottom: -0.1875rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background-color: ${(props) => (props.status === "open" ? "white" : "#aaa")};
`;

// Desktop fade out animation for shutdown
const DesktopFadeOut = styled.div<{ isShuttingDown: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: ${(props) => (props.isShuttingDown ? 9999 : -1)};
  opacity: ${(props) => (props.isShuttingDown ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  pointer-events: ${(props) => (props.isShuttingDown ? "all" : "none")};
`;

// Define app window type
type AppWindow = {
  id: string;
  appName: string;
  minimized: boolean;
  zIndex: number;
  active: boolean;
  children?: React.ReactNode;
};

// Store macOS state in localStorage
const saveState = (state: any) => {
  localStorage.setItem("macOsState", JSON.stringify(state));
};

const loadState = () => {
  const savedState = localStorage.getItem("macOsState");
  return savedState ? JSON.parse(savedState) : null;
};

// Main component
export default function EnhancedMacOSDesktop() {
  // System state
  const [systemState, setSystemState] = useState<
    "booting" | "running" | "shuttingDown" | "off"
  >("booting");
  const [booted, setBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [dockVisible, setDockVisible] = useState(false);
  const inactivityTimer = useRef<any | null>(null);
  const [fullscreenWindows, setFullscreenWindows] = useState<Set<string>>(
    new Set()
  );
  const [headerVisible, setHeaderVisible] = useState(true);
  const [showShutdownScreen, setShowShutdownScreen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const showPermissionDeniedNotification = (
    appName: string,
    appIcon: string
  ) => {
    const newNotification: NotificationItem = {
      id: uuidv4(), // You already have the uuid import
      appName,
      appIcon,
      message: `You do not have permission to use ${appName}.`,
      timestamp: Date.now(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // 4. Update the closeNotification function
  const closeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // // 5. You can also create a function to add custom notifications
  // const showCustomNotification = (
  //   appName: string,
  //   appIcon: string,
  //   message: string
  // ) => {
  //   const newNotification: NotificationItem = {
  //     id: uuidv4(),
  //     appName,
  //     appIcon,
  //     message,
  //     timestamp: Date.now(),
  //   };

  //   setNotifications((prev) => [newNotification, ...prev]);
  // };

  // Define dock items with proper macOS app order, imported icons, and permissions
  const dockItems: {
    name: string;
    icon: string;
    permission: string;
    children?: React.ReactNode;
    section: string;
    isTrash?: boolean;
  }[] = [
    // Favorite apps section (left side) - Only Finder is authorized by default
    {
      name: "Finder",
      icon: finderIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "Launchpad",
      icon: launchpadIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "Safari",
      icon: safariIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "Mail",
      icon: mailIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "Photos",
      icon: photosIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "Messages",
      icon: messagesIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "Music",
      icon: musicIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "App Store",
      icon: appStoreIcon,
      section: "normal",
      permission: "unauthorized",
    },
    {
      name: "System Settings",
      icon: settingsIcon,
      section: "normal",
      permission: "unauthorized",
    },

    {
      name: "Portfolio",
      icon: portfolioIcon,
      section: "favorites",
      permission: "authorized",
      children: <PortfolioPage />,
    },
    {
      name: "Resume",
      icon: ResumeIcon,
      section: "favorites",
      permission: "authorized",
      children: <InteractiveResume />,
    },
    {
      name: "UI Work Sample",
      icon: SampleIcon,
      section: "favorites",
      permission: "authorized",
      children: (
        <iframe
          src="https://quiz-web-liard.vercel.app/"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      ),
    },
    {
      name: "Xcode",
      icon: XcodeIcon,
      section: "favourites",
      permission: "unauthorized",
    },
    // Folders and Trash section (right side)
    {
      name: "Dictionary",
      icon: dictionaryIcon,
      section: "folders",
      permission: "unauthorized",
    },
    {
      name: "Trash",
      icon: trashIcon,
      section: "folders",
      isTrash: true,
      permission: "unauthorized",
    },
  ];

  // Request browser fullscreen on mount
  useEffect(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .catch((e) => console.error("Fullscreen request failed:", e));
    }
  }, []);

  // Load saved state on initial mount
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      // We could restore window state here if needed
      console.log("Loaded saved state:", savedState);
    }
  }, []);

  // Boot sequence with sound
  useEffect(() => {
    if (systemState === "booting") {
      const audio = new Audio(bootSound);
      audio.play().catch((e) => console.error("Audio playback failed:", e));

      setTimeout(() => {
        setBooted(true);
        setDockVisible(true);
        setSystemState("running");
      }, 2500);

      setTimeout(() => {
        setDockVisible(false);
      }, 4000);
    }
  }, [systemState]);

  // Shutdown sequence
  useEffect(() => {
    if (systemState === "shuttingDown") {
      // Save current state before shutdown
      saveState({
        windows: openWindows,
        lastSessionDate: new Date().toISOString(),
      });

      // Start visual shutdown sequence
      setDockVisible(false);

      // Show shutdown screen with progress bar
      setShowShutdownScreen(true);

      // After shutdown animation, exit fullscreen and update state
      setTimeout(() => {
        setSystemState("off");

        // Exit fullscreen
        if (document.exitFullscreen) {
          document
            .exitFullscreen()
            .catch((err) => console.error("Error exiting fullscreen:", err));
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }, 5000); // Allow time for shutdown animation
    }
  }, [systemState, openWindows]);

  // Show/hide Dock based on mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (systemState !== "running") return;

      if (e.clientY > window.innerHeight - 50) {
        setDockVisible(true);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      } else {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => setDockVisible(false), 400);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [systemState]);

  // Show/hide header based on mouse position when in fullscreen
  useEffect(() => {
    const handleMouseMoveForHeader = (e: MouseEvent) => {
      if (systemState !== "running") return;

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
  }, [fullscreenWindows, systemState]);

  const handleShutdown = () => {
    setOpenWindows([]);
    if (systemState === "running") {
      setSystemState("shuttingDown");
    }
  };

  // Handle window fullscreen state changes
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

  // Launch or restore an app window based on permissions
  const launchApp = useCallback((appName: string, children?: React.ReactNode) => {
    // Find the app in dock items
    const app = dockItems.find((item) => item.name === appName);

    // Check permission
    if (app && app.permission === "unauthorized") {
      // Show notification for unauthorized app
      showPermissionDeniedNotification(appName, app.icon);
      return;
    }

    setOpenWindows((prev) => {
      // Find highest zIndex
      const highestZ = Math.max(...prev.map((w) => w.zIndex || 10), 10);
      const newZIndex = highestZ + 1;

      // Check if window already exists
      const existing = prev.find((win) => win.appName === appName);
      if (existing) {
        // If minimized, restore it and make it active
        if (existing.minimized) {
          return prev.map((win) =>
            win.appName === appName
              ? { ...win, minimized: false, active: true, zIndex: newZIndex }
              : { ...win, active: false }
          );
        }
        // Otherwise just make it active
        return prev.map((win) =>
          win.appName === appName
            ? { ...win, active: true, zIndex: newZIndex }
            : { ...win, active: false }
        );
      }

      // Create a new window
      return [
        ...prev.map((win) => ({ ...win, active: false })),
        {
          id: uuidv4(),
          appName,
          minimized: false,
          zIndex: newZIndex,
          active: true,
          children,
        },
      ];
    });
  },[dockItems]);

  useEffect(() => {
    if (systemState === "running" && booted) {
      launchApp(
        "UI Work Sample",
        <iframe
          src="https://quiz-web-liard.vercel.app/"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      );
      launchApp("Resume", <InteractiveResume />);
      launchApp("Portfolio", <PortfolioPage />);
    }
  }, [systemState, booted, launchApp]);

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

  // Handle window activation
  const activateWindow = (id: string) => {
    setOpenWindows((prev) => {
      const highestZ = Math.max(...prev.map((w) => w.zIndex || 10), 10);
      const newZIndex = highestZ + 1;

      return prev.map((win) =>
        win.id === id
          ? { ...win, active: true, zIndex: newZIndex }
          : { ...win, active: false }
      );
    });
  };

  // Get status for dock indicator dot
  const getAppStatus = (appName: string) => {
    const win = openWindows.find((w) => w.appName === appName);
    if (!win) return null;
    return win.minimized ? "minimized" : "open";
  };

  // Get active app name
  const activeApp = openWindows.find((w) => !w.minimized && w.active);
  const activeAppName = activeApp ? activeApp.appName : "";

  // Handle dock item click
  const handleDockItemClick = (item: {
    name: string;
    icon: string;
    permission: string;
    children?: React.ReactNode;
    section: string;
    isTrash?: boolean;
  }) => {
    if (item.permission === "unauthorized") {
      showPermissionDeniedNotification(item.name, item.icon);
      return;
    }

    if (item.isTrash) {
      // Special handling for Trash
      launchApp("Trash");
    } else {
      launchApp(item.name, item.children);
    }
  };

  // Render boot screen while booting or shutdown screen while shutting down
  if (!booted || showShutdownScreen) {
    return (
      <BootScreen isShuttingDown={showShutdownScreen}>
        {showShutdownScreen ? (
          <ShutdownScreen />
        ) : (
          <>
            <ImageReveal />
            <ProgressBarWrapper>
              <ProgressBarFill isShuttingDown={showShutdownScreen} />
            </ProgressBarWrapper>
          </>
        )}
      </BootScreen>
    );
  }

  // Group dock items by section
  const normalApps = dockItems.filter((item) => item.section === "normal");
  const favoriteApps = dockItems.filter((item) => item.section === "favorites");
  const folderApps = dockItems.filter((item) => item.section === "folders");

  return (
    <DesktopContainer id="desktop-container">
      {/* Header Bar */}
      <HeaderBackground isFullscreen={fullscreenWindows.size > 0}>
        <HeaderWrapper
          isVisible={headerVisible || true}
          isFullscreen={fullscreenWindows.size > 0}
        >
          <MacHeader
            activeAppName={activeAppName}
            onShutdown={handleShutdown}
          />
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
                onActivate={activateWindow}
                zIndex={win.zIndex}
              >
                {win?.children}
              </MacWindow>
            )
        )}
      </WindowsArea>

      {/* Dock */}
      <Dock visible={dockVisible}>
        <DockItemContainer>
          {normalApps.map((item) => (
            <DockItem
              key={item.name}
              isAnimating={item.section === "favorites"}
            >
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

          {!!favoriteApps?.length && <DockSeparator />}

          {/* Favorite Apps */}
          {favoriteApps.map((item) => (
            <DockItem
              key={item.name}
              isAnimating={item.section === "favorites"}
            >
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

          {/* Separator */}
          {!!folderApps?.length && <DockSeparator />}

          {/* Folders and Trash */}
          {folderApps.map((item) => (
            <DockItem
              key={item.name}
              isAnimating={item.section === "favorites"}
            >
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
        </DockItemContainer>
      </Dock>

      <MacNotificationStack
        notifications={notifications}
        onClose={closeNotification}
        autoClose={true}
        autoCloseTime={5000}
      />

      {/* Shutdown overlay */}
      <DesktopFadeOut isShuttingDown={systemState === "shuttingDown"} />
    </DesktopContainer>
  );
}
