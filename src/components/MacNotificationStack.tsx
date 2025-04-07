import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import ReactDOM from "react-dom";

// Define types for our notifications
export interface NotificationItem {
  id: string;
  appName: string;
  appIcon: string;
  message: string;
  timestamp: number;
}

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

const expandToList = keyframes`
  from {
    transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
  }
  to {
    transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
  }
`;

const NotificationStack = styled.div<{ isListView: boolean }>`
  position: fixed;
  top: 3.125rem;
  right: 1.25rem;
  width: 18.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10001;
  perspective: 62.5rem; /* Add perspective for 3D effect */
  transition: all 0.3s ease;
`;

const NotificationContainer = styled.div<{ 
  isExiting: boolean; 
  index: number;
  isListView: boolean;
  isActive: boolean;
}>`
  position: relative;
  width: 18.75rem;
  background: rgba(28, 28, 30, 0.3);
  backdrop-filter: blur(0.375rem);
  border-radius: 0.625rem;
  overflow: hidden;
  box-shadow: 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: calc(0.4rem * ${props=> props.index});
  
  ${props => props.isExiting && css`
    animation: ${slideOut} 0.4s ease-in-out forwards;
  `}
  
  ${props => !props.isExiting && !props.isListView && css`
    animation: ${slideIn} 0.4s ease-in-out forwards;
    position: absolute;
    top: 0;
    right: 0;
    transform: ${`translateX(${(props.index * 8)/16}rem) translateY(${(props.index * 8)/16}rem) translateZ(${(-props.index * 20)/16}rem) rotateX(${props.index * 2}deg)`};
    opacity: ${Math.max(1 - props.index * 0.15, 0.65)};
    z-index: ${10001 - props.index};
    transform-origin: top right;
    
    &:hover {
      transform: ${`translateX(${(props.index * 8)/16}rem) translateY(${(props.index * 8)/16}rem) translateZ(${(-props.index * 20 + 10)/16}rem) rotateX(${props.index * 2}deg)`};
    }
  `}
  
  ${props => !props.isExiting && props.isListView && css`
    position: relative;
    margin-bottom: 0.625rem;
    transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
    opacity: 1;
    animation: ${expandToList} 0.3s ease-out forwards;
    
    /* Add a subtle highlight for the currently active notification in list view */
    ${props.isActive && css`
      box-shadow: 0 0 0 0.125rem rgba(0, 245, 212, 0.5), 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.4);
    `}
  `}
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
  z-index: 10; /* Ensure click works */

  &:hover {
    color: white;
  }
`;

const NotificationBody = styled.div`
  padding: 0.9375rem;
  color: #eee;
  font-size: 0.8125rem;
  line-height: 1.4;
  height: 1.4rem;
  white-space: nowrap;         /* Prevents text from wrapping to next line */
  overflow: hidden;            /* Hides any content that overflows the element */
  text-overflow: ellipsis;
`;

const Timestamp = styled.div`
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 0.9375rem 0.625rem;
  text-align: right;
`;

const ViewToggle = styled.button<{ isListView: boolean }>`
  position: absolute;
  top: -1.875rem;
  right: 0;
  background: rgba(28, 28, 30, 0.5);
  color: #eee;
  border: none;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  backdrop-filter: blur(0.25rem);
  display: ${props => props.isListView || props.children === '▲ Collapse' ? 'block' : 'none'};
  
  &:hover {
    background: rgba(40, 40, 40, 0.7);
  }
`;

const Counter = styled.div`
  position: absolute;
  top: 0rem;
  right: 0.625rem;
  background: rgba(0, 245, 212, 0.7);
  color: #000;
  font-size: 0.6875rem;
  font-weight: bold;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10002;
`;

interface NotificationStackProps {
  notifications: NotificationItem[];
  onClose: (id: string) => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const MacNotificationStack: React.FC<NotificationStackProps> = ({
  notifications,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}) => {
  const [exitingNotifications, setExitingNotifications] = useState<Record<string, boolean>>({});
  const [isListView, setIsListView] = useState(false);
  const [activeNotificationId, setActiveNotificationId] = useState<string | null>(null);

  // Set the first notification as active when notifications change
  useEffect(() => {
    if (notifications.length > 0 && !activeNotificationId) {
      setActiveNotificationId(notifications[0].id);
    } else if (notifications.length === 0) {
      setActiveNotificationId(null);
    }
  }, [notifications, activeNotificationId]);

  useEffect(() => {
    if (autoClose) {
      // Set up auto-close timers for each notification
      const timers: Record<string, any> = {};
      
      notifications.forEach(notification => {
        if (!exitingNotifications[notification.id]) {
          timers[notification.id] = setTimeout(() => {
            handleClose(notification.id);
          }, autoCloseTime);
        }
      });
      
      return () => {
        // Clean up all timers on unmount
        Object.values(timers).forEach(timer => clearTimeout(timer));
      };
    }
  }, [notifications, autoClose, autoCloseTime, exitingNotifications]);

  const handleClose = (id: string) => {
    // Stop propagation if clicked directly
    setExitingNotifications(prev => ({ ...prev, [id]: true }));
    
    setTimeout(() => {
      onClose(id);
      setExitingNotifications(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      
      // If the active notification is closed, select the next one
      if (activeNotificationId === id && notifications.length > 1) {
        const index = notifications.findIndex(n => n.id === id);
        const nextIndex = index === 0 ? 1 : index - 1;
        if (notifications[nextIndex]) {
          setActiveNotificationId(notifications[nextIndex].id);
        }
      }
    }, 400); // Same as animation duration
  };

  const handleNotificationClick = (id: string) => {
    // Toggle to list view when any notification is clicked
    if (!isListView) {
      setIsListView(true);
    }
    
    // Set the clicked notification as active
    setActiveNotificationId(id);
  };

  const handleCloseClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    handleClose(id);
  };

  const toggleView = () => {
    setIsListView(!isListView);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleNotificationClick(id);
    } else if (e.key === 'Escape') {
      handleClose(id);
    }
  };

  // Sort notifications by timestamp (newest first) and show at most 5
  const visibleNotifications = [...notifications]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  // Don't show anything if there are no notifications
  if (visibleNotifications.length === 0) {
    return null;
  }

  // Create a portal to render notifications directly into the body
  return ReactDOM.createPortal(
    <NotificationStack 
      isListView={isListView}
      aria-live="polite"
      aria-label="System notifications"
      aria-atomic="false"
      aria-relevant="additions text"
    >
      {!isListView && visibleNotifications.length > 1 && (
        <Counter aria-label={`${visibleNotifications.length} notifications`}>
          {visibleNotifications.length}
        </Counter>
      )}
      
      <ViewToggle 
        isListView={isListView} 
        onClick={toggleView}
        role="button"
        aria-pressed={isListView}
        aria-label={isListView ? 'Collapse notifications' : 'Expand notifications'}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleView();
          }
        }}
      >
        {isListView ? '▲ Collapse' : '▼ Expand'}
      </ViewToggle>
      
      {visibleNotifications.map((notification, index) => (
        <NotificationContainer 
          key={notification.id} 
          isExiting={exitingNotifications[notification.id] || false}
          index={index}
          isListView={isListView}
          isActive={notification.id === activeNotificationId}
          onClick={() => handleNotificationClick(notification.id)}
          role="article"
          aria-label={`${notification.appName} notification`}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, notification.id)}
        >
          <NotificationHeader>
            <AppIcon 
              src={notification.appIcon} 
              alt="" 
              loading="lazy" 
              aria-hidden="true"
            />
            <AppName id={`notification-app-${notification.id}`}>
              {notification.appName}
            </AppName>
            <CloseButton 
              onClick={(e) => handleCloseClick(e, notification.id)}
              aria-label={`Close ${notification.appName} notification`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCloseClick(e as unknown as React.MouseEvent, notification.id);
                }
              }}
            >
              ×
            </CloseButton>
          </NotificationHeader>
          <NotificationBody aria-labelledby={`notification-app-${notification.id}`}>
            {notification.message}
          </NotificationBody>
          <Timestamp aria-label={`Notification time: ${new Date(notification.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}`}>
            {new Date(notification.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Timestamp>
        </NotificationContainer>
      ))}
    </NotificationStack>,
    document.body
  );
};

export default MacNotificationStack;