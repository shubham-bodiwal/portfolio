import { FC } from "react";
import styled from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { Routes, Route, Navigate } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import PermissionScreen from "./components/PermissionsScreen";
import EnhancedMacOSDesktop from "./components/MacOsDesktop";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const App: FC = () => {
  return (
    <>
      <AppContainer>
        <Routes>
          <Route path="/" element={<PermissionScreen onClick={() => {}} />} />
          <Route path="/os" element={<EnhancedMacOSDesktop />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
      <Analytics />
    </>
  );
};

export default App;
