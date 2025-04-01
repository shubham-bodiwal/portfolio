import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  height: 30px;
  background: linear-gradient(to bottom, #f2f2f2 0%, #e2e2e2 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const AppleIcon = styled.div`
  font-size: 16px;
  margin-right: 15px;
  cursor: pointer;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-right: 15px;
  font-size: 14px;
  color: #333;
  cursor: default;
  user-select: none;
  padding: 2px 4px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
`;

const TimeDisplay = styled.div`
  font-size: 14px;
  user-select: none;
`;

const MacHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <AppleIcon></AppleIcon>
        <MenuList>
          <MenuItem>Finder</MenuItem>
          <MenuItem>File</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem>View</MenuItem>
          <MenuItem>Go</MenuItem>
          <MenuItem>Window</MenuItem>
          <MenuItem>Help</MenuItem>
        </MenuList>
      </LeftSection>
      <RightSection>
        <Icon role="img" aria-label="Spotlight">🔍</Icon>
        <Icon role="img" aria-label="Siri">🗣</Icon>
        <Icon role="img" aria-label="Wi-Fi">📶</Icon>
        <Icon role="img" aria-label="Battery">🔋</Icon>
        <TimeDisplay>3:58 PM</TimeDisplay>
      </RightSection>
    </HeaderContainer>
  );
};

export default MacHeader;
