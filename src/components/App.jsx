import { useEffect, useState } from 'react';
import Ball from './Ball/Ball';

const App = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    const blockSelection = (event) => event.preventDefault();

    document.addEventListener('fullscreenchange', syncFullscreen);
    document.addEventListener('selectstart', blockSelection);
    document.addEventListener('contextmenu', blockSelection);
    document.addEventListener('dragstart', blockSelection);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen);
      document.removeEventListener('selectstart', blockSelection);
      document.removeEventListener('contextmenu', blockSelection);
      document.removeEventListener('dragstart', blockSelection);
    };
  }, []);

  const toggleFullscreen = () => {
    const action = document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();

    action.catch(() => {});
  };

  const label = isFullscreen ? 'Exit full screen' : 'Enter full screen';

  return (
    <>
      <button
        type="button"
        className="fullscreen-toggle"
        onClick={toggleFullscreen}
        aria-pressed={isFullscreen}
        aria-label={label}
        title={label}
      >
        {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
      </button>
      <Ball />
    </>
  );
};

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

const CollapseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
  </svg>
);

export default App;
