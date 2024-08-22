import { useEffect } from 'react';
import './App.css';
import '@fontsource-variable/pixelify-sans';
import { Panel } from './components/Panel';

function App() {
  useEffect(() => {
    const textElement = document.getElementById('text');
    if (!textElement) return;
    textElement.textContent = '';

    // Store all timeouts to clear them if necessary
  }, []);

  return (
    <div>
      <video
        autoPlay
        loop
        className='-z-10 object-cover fixed top-0 left-0 w-screen h-screen'
        src='/bonfire.mp4'
        muted
      />
      <Panel />
    </div>
  );
}

export default App;
