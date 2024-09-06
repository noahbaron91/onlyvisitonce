import { useEffect, useRef, useState } from 'react';
import '@fontsource-variable/pixelify-sans';
import { Panel } from './components/Panel';
import { HasLoadedProvider } from './context/HasLoaded';
import { AmountOfAdviceLeftProvider } from './context/AmountOfAdviceLeft';
// import { useFingerprintBlocking } from './hooks/useFingerprintBlocking';
import * as i from './Icons';
import { useLocalStorageBlocking } from './hooks/useLocalStorageBlocking';

function App() {
  // useFingerprintBlocking();
  useLocalStorageBlocking();

  const [isPanelVisibile, setIsPanelVisible] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
      return;
    }

    audioRef.current.play();
    setIsMusicPlaying(true);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.3;
  }, []);

  return (
    <AmountOfAdviceLeftProvider>
      <HasLoadedProvider>
        <div>
          <video
            autoPlay
            loop
            playsInline
            className='fade-in pointer-events-none -z-10 object-cover object-[-550px_0px] sm:object-[-400px_0px] md:object-[-100px_0px] lg:object-[0px] fixed top-0 left-0 w-screen h-screen'
            src='https://static.onlyvisitonce.com/knight-with-rain.mp4'
            muted
          />
          {isPanelVisibile ? <Panel /> : null}
          <div className='position fixed bottom-4 right-4 flex gap-3 items-center'>
            <button
              type='button'
              onClick={() => setIsPanelVisible(!isPanelVisibile)}
            >
              {isPanelVisibile ? <i.EyeIcon /> : <i.CloseEyeIcon />}
            </button>
            <button type='button' onClick={handleToggleMusic}>
              {isMusicPlaying ? <i.MusicIcon /> : <i.CloseMusicIcon />}
              <audio
                src='https://static.onlyvisitonce.com/rain-sounds-shorter.mp3'
                autoPlay
                loop
                ref={audioRef}
              ></audio>
            </button>
          </div>
        </div>
      </HasLoadedProvider>
    </AmountOfAdviceLeftProvider>
  );
}

export default App;
