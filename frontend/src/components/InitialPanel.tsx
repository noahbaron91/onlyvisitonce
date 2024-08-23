import { useEffect, useRef } from 'react';
import type { PageState } from './Panel';
import { useHasLoaded } from '../context/HasLoaded';

export const TALKING_SPEED = 50;
export const TALKING_DELAY = 250;

const useDelayedText = (message: string, id: string, initialDelay: number) => {
  const timeoutRefs = useRef<number[]>([]);
  const { hasLoaded } = useHasLoaded();

  useEffect(() => {
    if (hasLoaded) return;

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
  }, [hasLoaded, id, initialDelay, message]);
};

const MESSAGE_1 = 'Greetings traveler';
const MESSAGE_2 = 'Come rest with me for a bit';
const MESSAGE_3 = "I will be leaving soon, so you'll only see me once";
const MESSAGE_4 =
  'What is one piece of advice you would give to your past self?';

export function InitialPanel({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  const { setHasLoaded } = useHasLoaded();

  useDelayedText(MESSAGE_1, 'greeting-text-1', 0);
  useDelayedText(
    MESSAGE_2,
    'greeting-text-2',
    TALKING_DELAY + MESSAGE_1.length * TALKING_SPEED
  );
  useDelayedText(
    MESSAGE_3,
    'greeting-text-3',
    TALKING_DELAY +
      MESSAGE_1.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_2.length * TALKING_SPEED
  );

  useDelayedText(
    MESSAGE_4,
    'greeting-text-4',
    TALKING_DELAY +
      MESSAGE_1.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_2.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_3.length * TALKING_SPEED
  );

  const { hasLoaded } = useHasLoaded();

  useEffect(() => {
    if (hasLoaded) return;

    const readButton = document.getElementById('read-advice');
    const writeButton = document.getElementById('write-advice');
    const musicButton = document.getElementById('music-button');
    const visibleButton = document.getElementById('visible-button');

    if (!readButton || !writeButton || !musicButton || !visibleButton) return;

    readButton.style.display = 'none';
    writeButton.style.display = 'none';
    musicButton.style.display = 'none';
    visibleButton.style.display = 'none';

    const timeout = setTimeout(() => {
      readButton.style.display = 'block';
      writeButton.style.display = 'block';
      musicButton.style.display = 'block';
      visibleButton.style.display = 'block';

      readButton.classList.add('fade-in');
      writeButton.classList.add('fade-in');
      visibleButton.classList.add('fade-in');
      musicButton.classList.add('fade-in');
    }, TALKING_DELAY + MESSAGE_1.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_2.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_3.length * TALKING_SPEED + MESSAGE_4.length * TALKING_SPEED);

    return () => {
      clearTimeout(timeout);
    };
  }, [hasLoaded]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasLoaded(true);
    }, TALKING_DELAY + MESSAGE_1.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_2.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_3.length * TALKING_SPEED + MESSAGE_4.length * TALKING_SPEED);

    return () => {
      clearTimeout(timeout);
    };
  }, [setHasLoaded]);

  return (
    <>
      <p className='text-white text-xl font-thin' id='greeting-text-1'>
        Greetings traveler
      </p>
      <p className='text-white text-xl' id='greeting-text-2'>
        Come rest with me for a bit
      </p>
      <p className='text-white text-xl' id='greeting-text-3'>
        I will be leaving soon, so you'll only see me once
      </p>
      <p className='text-white text-xl' id='greeting-text-4'>
        What is one piece of advice you would give to your past self?
      </p>
      <div className='flex gap-3'>
        <button
          onClick={() => onChangeState('write')}
          id='write-advice'
          className='text-left text-white underline text-xl'
        >
          Write advice
        </button>
        <button
          className='text-left text-white underline text-xl'
          id='read-advice'
          onClick={() => onChangeState('read')}
        >
          Read advice
        </button>
      </div>
    </>
  );
}
