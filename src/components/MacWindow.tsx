import { useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { Rnd } from "react-rnd";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

// Window styling
const WindowWrapper = styled.div<{ isFullscreen: boolean }>`
  animation: ${fadeIn} 0.3s ease-in-out;
  background: rgb(56, 56, 56);
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
  background: #232323;
`;

const Title = styled.div`
  flex: 1;
  font-size: smaller;
  color: #ffffff;
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

type MacWindowProps = {
  id: string;
  appName: string;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFullscreenChange: (id: string, isFullscreen: boolean) => void;
};

export default function MacWindow({
  id,
  appName,
  onClose,
  onMinimize,
  onFullscreenChange,
}: MacWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Decide where the portal should attach
  const portalTarget = document.getElementById("windows-area");

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
