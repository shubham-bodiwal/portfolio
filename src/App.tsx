import { useState, useEffect, FC } from "react";
import MacOSPortfolioUI from "./components/MacOsDesktop";
import PermissionScreen from "./components/PermissionsScreen";
import styled from "styled-components";
import { Analytics } from "@vercel/analytics/react";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const App: FC = () => {
  const [isFullscreenGranted, setIsFullscreenGranted] = useState(false);

  // Hook to handle the fullscreen change events from the browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenGranted(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const requestFullscreen = async () => {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      try {
        await element.requestFullscreen();
        setIsFullscreenGranted(true);
      } catch (err) {
        console.warn("Fullscreen request failed:", err);
      }
    } else {
      // Already in fullscreen
      setIsFullscreenGranted(true);
    }
  };

  // When system is powered off, reset state to show permission screen again

  return (
    <>
      <AppContainer>
        {isFullscreenGranted ? (
          <MacOSPortfolioUI />
        ) : (
          <PermissionScreen onClick={requestFullscreen} />
        )}
      </AppContainer>
      <Analytics />
    </>
  );
};

export default App;
