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
  const firstItemRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<number>(-1);

  // Handle visibility state
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // Focus management - focus the menu when it opens
  useEffect(() => {
    if (isVisible && menuRef.current) {
      menuRef.current.focus();
      // Reset active item index
      activeItemRef.current = -1;
    }
  }, [isVisible]);

  // Handle clicking outside to close the menu
  useEffect(() => {
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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Get all menu items (excluding separators)
    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
    
    if (!menuItems || menuItems.length === 0) return;
    
    const itemCount = menuItems.length;
    let newIndex = activeItemRef.current;
    
    switch (e.key) {
      case 'ArrowDown':
        // Move to next item, loop around if at end
        newIndex = (activeItemRef.current + 1) % itemCount;
        e.preventDefault();
        break;
      case 'ArrowUp':
        // Move to previous item, loop around if at beginning
        newIndex = (activeItemRef.current - 1 + itemCount) % itemCount;
        e.preventDefault();
        break;
      case 'Home':
        // Move to first item
        newIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        // Move to last item
        newIndex = itemCount - 1;
        e.preventDefault();
        break;
      case 'Enter':
      case ' ':
        // Activate current item
        if (activeItemRef.current >= 0 && activeItemRef.current < itemCount) {
          (menuItems[activeItemRef.current] as HTMLElement).click();
        }
        e.preventDefault();
        break;
      case 'Escape':
        // Close menu
        setIsVisible(false);
        if (onClose) onClose();
        e.preventDefault();
        break;
      default:
        // Optional: First-letter navigation
        { const key = e.key.toLowerCase();
        if (key.length === 1 && key >= 'a' && key <= 'z') {
          // Find first item that starts with this letter
          const itemIndex = Array.from(menuItems).findIndex(
            item => (item.textContent || '').toLowerCase().startsWith(key)
          );
          if (itemIndex >= 0) {
            newIndex = itemIndex;
            e.preventDefault();
          }
        }
         }
    }
    
    // Update active item and focus it
    if (newIndex !== activeItemRef.current && newIndex >= 0 && newIndex < itemCount) {
      activeItemRef.current = newIndex;
      (menuItems[newIndex] as HTMLElement).focus();
    }
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
      role="menu"
      aria-label="Apple menu"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <MenuTitle role="presentation">About This Mac</MenuTitle>
      <Separator role="separator" />
      <MenuItem disabled role="menuitem" aria-disabled="true" tabIndex={-1}>
        System Settings...
      </MenuItem>
      <MenuItem disabled role="menuitem" aria-disabled="true" tabIndex={-1}>
        App Store...
      </MenuItem>
      <Separator role="separator" />
      <MenuItem disabled hasSubmenu role="menuitem" aria-disabled="true" aria-haspopup="true" tabIndex={-1}>
        Recent Items
      </MenuItem>
      <Separator role="separator" />
      <MenuItem disabled role="menuitem" aria-disabled="true" tabIndex={-1}>
        Force Quit...
        <ShortcutText aria-hidden="true">⌥⌘⎋</ShortcutText>
      </MenuItem>
      <Separator role="separator" />
      <MenuItem disabled role="menuitem" aria-disabled="true" tabIndex={-1}>
        Sleep
      </MenuItem>
      <MenuItem disabled role="menuitem" aria-disabled="true" tabIndex={-1}>
        Restart...
      </MenuItem>
      <MenuItem 
        onClick={handleShutDown} 
        role="menuitem" 
        tabIndex={0} 
        ref={firstItemRef}
      >
        Shut Down...
      </MenuItem>
      <Separator role="separator" />
      <MenuItem disabled role="menuitem" aria-disabled="true" tabIndex={-1}>
        Lock Screen
        <ShortcutText aria-hidden="true">⌃⌘Q</ShortcutText>
      </MenuItem>
      <MenuItem disabled role="menuitem" aria-disabled="true" tabIndex={-1}>
        Log Out Shubham...
        <ShortcutText aria-hidden="true">⇧⌘Q</ShortcutText>
      </MenuItem>
    </MenuWrapper>
  );

  // Create a portal that renders the menu directly into the document body
  // This ensures it's outside of any stacking context issues
  return ReactDOM.createPortal(menuElement, document.body);
};

export default MacOSMenu;
