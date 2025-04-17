import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes, css } from "styled-components";
import { Rnd } from "react-rnd";
import FullscreenPrompt from "./FullScreenPrompt";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

// Window styling
const WindowWrapper = styled.div<{
  isFullscreen: boolean;
  isActive: boolean;
  isClosing: boolean;
}>`
  ${(props) =>
    props.isClosing
      ? css`
          animation: ${fadeOut} 0.2s ease-in-out forwards;
        `
      : css`
          animation: ${fadeIn} 0.3s ease-in-out;
        `}
  background: rgba(32, 33, 37, 0.9);
  backdrop-filter: blur(1.25rem);
  border-radius: ${(props) => (props.isFullscreen ? "0" : "0.8rem")};
  box-shadow: ${(props) =>
    props.isActive
      ? "0 0.625rem 1.875rem rgba(0, 0, 0, 0.5)"
      : "0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.3)"};
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: ${(props) =>
    props.isActive
      ? "0.0625rem solid rgba(255, 255, 255, 0.1)"
      : "0.0625rem solid rgba(255, 255, 255, 0.05)"};
`;

const WindowHeader = styled.div<{ isActive: boolean; isFullscreen: boolean }>`
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  background: ${(props) =>
    props.isActive ? "rgba(59, 59, 59, 0.9)" : "rgba(49, 49, 49, 0.8)"};
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.2);
  border-top-left-radius: ${(props) => (props.isFullscreen ? "0" : "0.8rem")};
  border-top-right-radius: ${(props) => (props.isFullscreen ? "0" : "0.8rem")};
  user-select: none;
`;

const Title = styled.div<{ isActive: boolean }>`
  flex: 1;
  font-size: 0.8rem;
  text-align: center;
  font-weight: ${(props) => (props.isActive ? "500" : "400")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#aaaaaa")};
  letter-spacing: 0.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  left: 0.75rem;
`;

const CircleButton = styled.div<{
  color: string;
  icon?: string;
  isActive: boolean;
}>`
  background-color: ${(props) => (props.isActive ? props.color : "#8e8e8e")};
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.1s ease;
`;

const WindowContent = styled.div`
  padding: 1rem;
  flex: 1;
  color: #fff;
  background: rgba(40, 40, 44, 0.5);
  overflow: auto;
`;

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type MacWindowProps = {
  id: string;
  appName: string;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFullscreenChange: (id: string, isFullscreen: boolean) => void;
  onActivate?: (id: string) => void;
  zIndex?: number;
  children: ReactNode;
};

export default function MacWindow({
  id,
  appName,
  onClose,
  onMinimize,
  onFullscreenChange,
  onActivate,
  zIndex = 10,
  children,
}: MacWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [savedPosition, setSavedPosition] = useState<Position | null>(null);
  const [userMovedAfterRestore, setUserMovedAfterRestore] = useState(false);
  const rndRef = useRef<Rnd>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Decide where the portal should attach
  const portalTarget = document.getElementById("windows-area");

  // Handle click on window to bring it to the front
  const handleActivate = () => {
    if (!isActive) {
      setIsActive(true);
      if (onActivate) {
        onActivate(id);
      }
    }
  };

  // Store position before minimizing or fullscreen
  const saveCurrentPosition = () => {
    if (rndRef.current && windowRef.current) {
      const currentPosition = rndRef.current.getDraggablePosition();
      // Get size directly from DOM element instead of using getSize()
      const { width, height } = windowRef.current.getBoundingClientRect();

      setSavedPosition({
        x: currentPosition.x,
        y: currentPosition.y,
        width,
        height,
      });
    }
  };

  // Handle minimizing
  const handleMinimize = useCallback(() => {
    saveCurrentPosition();
    onMinimize(id);
  }, [id, onMinimize]);

  // Handle fullscreen toggle
  const handleFullscreenToggle = useCallback(() => {
    if (!isFullscreen) {
      saveCurrentPosition();
    } else {
      setUserMovedAfterRestore(false);
    }
    const newState = !isFullscreen;
    setIsFullscreen(newState);
    onFullscreenChange(id, newState);
  }, [id, isFullscreen, onFullscreenChange]);

  // Handle close with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 200); // Match animation duration
  }, [id, onClose]);

  // Track when user starts dragging
  const handleDragStart = () => {
    setUserMovedAfterRestore(true);
  };

  // Handle resize
  const handleResizeStart = () => {};

  // Handle blur when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

      // ESC key for closing or exiting fullscreen
      if (e.key === "Escape") {
        if (isFullscreen) {
          handleFullscreenToggle();
        } else {
          handleClose();
        }
        e.preventDefault();
      }

      // Alt+Enter for fullscreen toggle (common keyboard shortcut)
      if (e.key === "Enter" && e.altKey) {
        handleFullscreenToggle();
        e.preventDefault();
      }

      // Alt+M for minimize
      if (e.key === "m" && e.altKey) {
        handleMinimize();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleClose,
    handleFullscreenToggle,
    handleMinimize,
    isActive,
    isFullscreen,
  ]);

  // Get position based on window state
  const getPosition = () => {
    if (isFullscreen) {
      return { x: 0, y: 0 };
    }

    if (savedPosition && !userMovedAfterRestore) {
      return { x: savedPosition.x, y: savedPosition.y };
    }

    return undefined;
  };

  // Get size based on window state
  const getSize = () => {
    if (isFullscreen) {
      return { width: "100%", height: "100%" };
    }

    if (savedPosition && !userMovedAfterRestore) {
      return { width: savedPosition.width, height: savedPosition.height };
    }

    return undefined;
  };

  // Default window position
  const defaultPosition = {
    x: 100 + Math.random() * 100,
    y: 100 + Math.random() * 100,
    width: "700px",
    height: "500px",
  };

  return ReactDOM.createPortal(
    <Rnd
      ref={rndRef}
      default={defaultPosition}
      minWidth={"350px"}
      minHeight={"250px"}
      bounds="parent"
      enableResizing={!isFullscreen}
      disableDragging={isFullscreen}
      size={getSize()}
      position={getPosition()}
      style={{ zIndex: isActive ? (zIndex || 10) + 1 : zIndex }}
      dragHandleClassName="window-drag-handle"
      onMouseDown={handleActivate}
      onDragStart={handleDragStart}
      onResizeStart={handleResizeStart}
    >
      <WindowWrapper
        ref={windowRef}
        isFullscreen={isFullscreen}
        isActive={isActive}
        isClosing={isClosing}
        role="dialog"
        aria-labelledby={`window-title-${id}`}
        aria-modal="true"
      >
        <WindowHeader
          className="window-drag-handle"
          isActive={isActive}
          isFullscreen={isFullscreen}
        >
          <ButtonGroup>
            <CircleButton
              color="#ff5f57"
              icon="×"
              isActive={isActive}
              onClick={handleClose}
              aria-label="Close window"
              title="Close"
            ></CircleButton>
            <CircleButton
              color="#ffbd2e"
              icon="−"
              isActive={isActive}
              onClick={handleMinimize}
              aria-label="Minimize window"
              title="Minimize"
            ></CircleButton>
            <CircleButton
              color="#28c840"
              icon="+"
              isActive={isActive}
              onClick={handleFullscreenToggle}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            ></CircleButton>
          </ButtonGroup>
          <Title isActive={isActive} id={`window-title-${id}`}>
            {appName}
          </Title>
        </WindowHeader>
        <div
          role="region"
          aria-label={`${appName} content`}
          style={{ flex: 1, overflow: "auto" }}
        >
          {children ? (
            appName === "Portfolio" || appName === "UI Work Sample" ? (
              <FullscreenPrompt
                isFullscreen={isFullscreen}
                requestFullscreen={handleFullscreenToggle}
              >
                {children}
              </FullscreenPrompt>
            ) : (
              children
            )
          ) : (
            <WindowContent>This is the {appName} content.</WindowContent>
          )}
        </div>
      </WindowWrapper>
    </Rnd>,
    portalTarget as HTMLElement
  );
}
