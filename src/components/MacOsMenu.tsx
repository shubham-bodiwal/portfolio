import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

// Menu Wrapper with Apple-style gradient
const MenuWrapper = styled.div`
  position: absolute;
  min-width: 13.75rem;
  border-radius: 0.375rem;
  background: rgba(32, 33, 37, 0.9);
  box-shadow: 0rem 0.3125rem 1.25rem rgba(0, 0, 0, 0.3);
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 0.875rem;
  padding: 0.375rem 0;
  backdrop-filter: blur(0.625rem);
  opacity: 0;
  transform: scale(0.95);
  transform-origin: top left;
  transition: opacity 0.1s ease, transform 0.1s ease;
  z-index: 10000; /* Increased z-index to appear above all other elements */

  &.visible {
    opacity: 1;
    transform: scale(1);
  }
`;

// Menu Title item (e.g. "About This Mac")
const MenuTitle = styled.div`
  padding: 0.25rem 0.625rem;
  font-weight: bold;
  margin-bottom: 0.125rem;
  margin-left: 0.625rem;
  color: #fff;
  opacity: 0.5; // Disabled
  cursor: default;
`;

// Menu Item with arrow indicator for submenus
interface MenuItemProps {
  disabled?: boolean;
  hasSubmenu?: boolean;
  isActive?: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  padding: 0.25rem 1.25rem;
  position: relative;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: ${(props) => (props.disabled ? "rgba(255, 255, 255, 0.5)" : "#fff")};
  background-color: ${(props) => (props.isActive ? "#00f5d4" : "transparent")};
  color: ${(props) =>
    props.isActive
      ? "#000"
      : props.disabled
      ? "rgba(255, 255, 255, 0.5)"
      : "#fff"};

  &:hover {
    background-color: ${(props) => !props.disabled && "#ffffff11"};
  }

  ${(props) =>
    props.hasSubmenu &&
    `
    &:after {
      content: '›';
      position: absolute;
      right: 0.625rem;
      opacity: 0.5;
    }
  `}
`;

// Shortcut text (e.g. ⌘Q)
const ShortcutText = styled.span`
  position: absolute;
  right: 1.25rem;
  opacity: 0.6;
  font-size: 0.75rem;
`;

// Separator line
const Separator = styled.div`
  height: 0.0625rem;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0.3125rem 0;
`;

interface MacOSMenuProps {
  position?: { x: number; y: number };
  onShutDown?: () => void;
  onClose?: () => void;
  visible?: boolean;
}

const MacOSMenu: React.FC<MacOSMenuProps> = ({
  position = { x: 0, y: 0 },
  onShutDown,
  onClose,
  visible = false,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the menu
  useEffect(() => {
    setIsVisible(visible);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        if (onClose) onClose();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);

  const handleShutDown = (e: React.MouseEvent) => {
    // Stop propagation to prevent parent handlers from catching this event
    e.stopPropagation();

    // Close the menu
    setIsVisible(false);
    if (onClose) onClose();

    // Execute shutdown handler with a small delay to ensure menu closes first
    setTimeout(() => {
      if (onShutDown) onShutDown();
    }, 100);
  };

  // Create a menu that renders directly into the body using a portal
  // This ensures it's always on top of everything
  const menuElement = (
    <MenuWrapper
      ref={menuRef}
      className={isVisible ? "visible" : ""}
      style={{
        left: position.x,
        top: position.y,
        display: isVisible ? "block" : "none",
      }}
    >
      <MenuTitle>About This Mac</MenuTitle>
      <Separator />
      <MenuItem disabled>System Settings...</MenuItem>
      <MenuItem disabled>App Store...</MenuItem>
      <Separator />
      <MenuItem disabled hasSubmenu>
        Recent Items
      </MenuItem>
      <Separator />
      <MenuItem disabled>
        Force Quit...
        <ShortcutText>⌥⌘⎋</ShortcutText>
      </MenuItem>
      <Separator />
      <MenuItem disabled>Sleep</MenuItem>
      <MenuItem disabled>Restart...</MenuItem>
      <MenuItem onClick={handleShutDown}>Shut Down...</MenuItem>
      <Separator />
      <MenuItem disabled>
        Lock Screen
        <ShortcutText>⌃⌘Q</ShortcutText>
      </MenuItem>
      <MenuItem disabled>
        Log Out Shubham...
        <ShortcutText>⇧⌘Q</ShortcutText>
      </MenuItem>
    </MenuWrapper>
  );

  // Create a portal that renders the menu directly into the document body
  // This ensures it's outside of any stacking context issues
  return ReactDOM.createPortal(menuElement, document.body);
};

export default MacOSMenu;
