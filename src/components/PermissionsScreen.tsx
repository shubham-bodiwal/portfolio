import React from 'react';
import styled from 'styled-components';

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  max-width: 320px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

type Props = {
  onClick: () => void;
};

const PermissionScreen: React.FC<Props> = ({ onClick }) => {
  return (
    <Screen>
      <Message>
        This portfolio requires <strong>Fullscreen</strong> access to launch.
      </Message>
      <Button onClick={onClick}>Enter Fullscreen</Button>
    </Screen>
  );
};

export default PermissionScreen;
