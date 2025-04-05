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
  top: 3.125rem;
  right: 1.25rem;
  width: 18.75rem;
  background: rgba(28, 28, 30, 0.3);
  backdrop-filter: blur(0.375rem);
  border-radius: 0.625rem;
  overflow: hidden;
  box-shadow: 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.4);
  z-index: 10001;
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
  animation: ${(props) => (props.isExiting ? slideOut : slideIn)} 0.4s
    ease-in-out forwards;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.625rem 0.9375rem;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.05);
`;

const AppIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.625rem;
`;

const AppName = styled.div`
  font-size: 0.8125rem;
  font-weight: 500;
  color: white;
`;

const CloseButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;

  &:hover {
    color: white;
  }
`;

const NotificationBody = styled.div`
  padding: 0.9375rem;
  color: #eee;
  font-size: 0.8125rem;
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
