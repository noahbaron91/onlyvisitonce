import { useEffect, useRef, useState } from 'react';
import * as i from './Icons';
import '@fontsource-variable/pixelify-sans';

export const TALKING_SPEED = 50;
export const TALKING_DELAY = 250;

const MESSAGE_1 = "You've already passed this way before";
const MESSAGE_2 = "Your journey lies ahead—don't look back";

const useDelayedText = (message: string, id: string, initialDelay: number) => {
  const timeoutRefs = useRef<number[]>([]);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;
    element.style.display = 'none';

    setTimeout(() => {
      element.style.display = 'block';
      const textArr = message.split('');

      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      element.textContent = ''; // Clear the content before starting the animation

      textArr.forEach((letter, i) => {
        const timeout = setTimeout(() => {
          element.textContent += letter;
        }, TALKING_SPEED * i);

        timeoutRefs.current.push(timeout);
      });
    }, initialDelay);

    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [id, initialDelay, message]);
};

function Panel() {
  useDelayedText(MESSAGE_1, 'text-1', 0);
  useDelayedText(
    MESSAGE_2,
    'text-2',
    MESSAGE_1.length * TALKING_SPEED + TALKING_DELAY
  );

  return (
    <div className='fixed top-1/4 px-6 flex flex-col gap-6 sm:gap-8 lg:top-1/3 lg:pt-4 sm:px-12 md:px-16'>
      <p className='text-white text-3xl font-thin sm:text-4xl' id='text-1'>
        {MESSAGE_1}
      </p>
      <p className='text-white text-3xl font-thin sm:text-4xl' id='text-2'>
        {MESSAGE_2}
      </p>
    </div>
  );
}

function App() {
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
    <div>
      <video
        autoPlay
        loop
        className='fade-in -z-10 object-cover object-[-650px_0px] sm:object-[-400px_0px] md:object-[-100px_0px] lg:object-[0px] fixed top-0 left-0 w-screen h-screen'
        src='https://static.onlyvisitonce.com/knight-gone.mp4'
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
  );
}

export default App;
