import React, { useEffect, useRef, useState } from "react";
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
  const notificationRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  // Focus the notification when it appears
  useEffect(() => {
    if (isVisible && notificationRef.current) {
      notificationRef.current.focus();
    }
  }, [isVisible]);

  // Handle auto-close timer
  useEffect(() => {
    if (isVisible && autoClose) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = window.setTimeout(() => {
        handleClose();
      }, autoCloseTime);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isVisible, autoClose, autoCloseTime]);

  // Reset when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    
    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 400); // Same as animation duration
  };

  // Pause auto-close on hover or focus
  const handleMouseEnter = () => {
    if (autoClose && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Resume auto-close on mouse leave or blur
  const handleMouseLeave = () => {
    if (isVisible && autoClose) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        handleClose();
      }, autoCloseTime);
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <NotificationContainer 
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      isExiting={isExiting}
      ref={notificationRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <NotificationHeader>
        <AppIcon 
          loading="lazy" 
          src={appIcon} 
          alt="" 
          aria-hidden="true" 
        />
        <AppName id={`notification-app-${appName.replace(/\s+/g, '-').toLowerCase()}`}>
          {appName}
        </AppName>
        <CloseButton 
          onClick={handleClose}
          aria-label="Close notification"
          title="Close notification"
        >
          ×
        </CloseButton>
      </NotificationHeader>
      <NotificationBody 
        aria-labelledby={`notification-app-${appName.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {message}
      </NotificationBody>
      
      {/* Visually hidden timer information for screen readers */}
      {autoClose && (
        <span className="sr-only">
          This notification will automatically close in {Math.round(autoCloseTime / 1000)} seconds. 
          Press Escape to close now.
        </span>
      )}
    </NotificationContainer>
  );
};

export default MacNotification;
