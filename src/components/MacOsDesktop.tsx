import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import OsWallpaper from "../assets/os-wallpaper2.jpg";
import bootSound from "../assets/start-sound.wav"; // Add a boot sound file
import ImageReveal from "./ImageReveal";

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

const Desktop = styled.div`
  width: 100vw;
  height: 100dvh;
  background: url(${OsWallpaper}) center/cover no-repeat;
  position: relative;
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
  z-index: 1000;
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
  position: fixed;
  bottom: ${({ visible }) => (visible ? "10px" : "-100px")};
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1);
  padding: 10px 15px;
  border-radius: 20px;
  display: flex;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: bottom 0.3s ease-in-out;
`;

const AppIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 8px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
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

const WindowWrapper = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
  background: #2c2c2e;
  backdrop-filter: blur(20px);
  border-radius: 12px;
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
};

function MacWindow({ id, appName, onClose, onMinimize }: MacWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      <WindowWrapper>
        <WindowHeader>
          <ButtonGroup>
            <CircleButton color="#ff5f57" onClick={() => onClose(id)} />
            <CircleButton color="#ffbd2e" onClick={() => onMinimize(id)} />
            <CircleButton
              color="#28c840"
              onClick={() => setIsFullscreen(!isFullscreen)}
            />
          </ButtonGroup>
          <Title>{appName}</Title>
        </WindowHeader>
        <div style={{ padding: "1rem", flex: 1, color: "#fff" }}>
          This is the {appName} content.
        </div>
      </WindowWrapper>
    </Rnd>,
    document.body
  );
}

export default function MacOSPortfolioUI() {
  const [booted, setBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [dockVisible, setDockVisible] = useState(false);
  const inactivityTimer = useRef<any | null>(null);

  useEffect(() => {
    const audio = new Audio(bootSound);
    audio.play(); 
    setTimeout(() => {setBooted(true);
      setDockVisible(true);
    }, 2500);
    setTimeout(() => {
      setDockVisible(false)
    },3000)
  }, []);

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

  const launchApp = (appName: string) => {
    const newWindow: AppWindow = {
      id: uuidv4(),
      appName,
      minimized: false,
    };
    setOpenWindows((prev) => [...prev, newWindow]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
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
    <Desktop>
      {openWindows.map(
        (win) =>
          !win.minimized && (
            <MacWindow
              key={win.id}
              id={win.id}
              appName={win.appName}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
            />
          )
      )}

      <Dock visible={dockVisible}>
        <AppIcon onClick={() => launchApp("Resume")}>📄</AppIcon>
        <AppIcon onClick={() => launchApp("Skills")}>🛠️</AppIcon>
        <AppIcon onClick={() => launchApp("Projects")}>💼</AppIcon>
      </Dock>
    </Desktop>
  );
}
