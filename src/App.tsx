import React, { useState } from 'react';
import MacOSPortfolioUI from './components/MacOsDesktop';
import PermissionScreen from './components/PermissionsScreen';

const App: React.FC = () => {
  const [isFullscreenGranted, setIsFullscreenGranted] = useState(false);

  const requestFullscreen = async () => {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      try {
        await element.requestFullscreen();
        setIsFullscreenGranted(true);
      } catch (err) {
        console.warn('Fullscreen request failed:', err);
      }
    } else {
      // Already in fullscreen
      setIsFullscreenGranted(true);
    }
  };

  return isFullscreenGranted ? (
    <MacOSPortfolioUI />
  ) : (
    <PermissionScreen onClick={requestFullscreen} />
  );
};

export default App;
