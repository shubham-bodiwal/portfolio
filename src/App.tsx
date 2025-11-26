import { FC } from "react";
import styled from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import PortfolioPage from "./pages/PortfolioPage";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const App: FC = () => {
  return (
    <>
      <AppContainer>
        <PortfolioPage />
      </AppContainer>
      <Analytics />
    </>
  );
};

export default App;
