import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(110%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(110%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div<{ isExiting: boolean }>`
  position: fixed;
  top: 50px;
  right: 20px;
  width: 300px;
  background: rgba(28, 28, 30, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  z-index: 10001;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${(props) => (props.isExiting ? slideOut : slideIn)} 0.4s
    ease-in-out forwards;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const AppIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const AppName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: white;
`;

const CloseButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  padding: 0;

  &:hover {
    color: white;
  }
`;

const NotificationBody = styled.div`
  padding: 15px;
  color: #eee;
  font-size: 13px;
  line-height: 1.4;
`;

interface NotificationProps {
  isVisible: boolean;
  appName: string;
  appIcon: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const MacNotification: React.FC<NotificationProps> = ({
  isVisible,
  appName,
  appIcon,
  message,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, autoCloseTime]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 400); // Same as animation duration
  };

  if (!isVisible) return null;

  return (
    <NotificationContainer isExiting={isExiting}>
      <NotificationHeader>
        <AppIcon src={appIcon} alt={appName} />
        <AppName>{appName}</AppName>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </NotificationHeader>
      <NotificationBody>{message}</NotificationBody>
    </NotificationContainer>
  );
};

export default MacNotification;
