import { useEffect, useRef } from 'react';
import type { PageState } from '../Panel';
import { useHasLoaded } from '../../context/HasLoaded';
import { TALKING_DELAY, TALKING_SPEED } from '../../hooks/useDelayedText';

const INITIAL_DELAY = 100;

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

export function NoPiecesOfAdviceLeft({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  const { setHasLoaded } = useHasLoaded();

  useDelayedText(MESSAGE_1, 'greeting-text-1', INITIAL_DELAY);
  useDelayedText(
    MESSAGE_2,
    'greeting-text-2',
    INITIAL_DELAY + TALKING_DELAY + MESSAGE_1.length * TALKING_SPEED
  );
  useDelayedText(
    MESSAGE_3,
    'greeting-text-3',
    INITIAL_DELAY +
      TALKING_DELAY +
      MESSAGE_1.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_2.length * TALKING_SPEED
  );

  useDelayedText(
    MESSAGE_4,
    'greeting-text-4',
    INITIAL_DELAY +
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

    const adviceButtons = document.getElementById('advice-buttons');

    if (!adviceButtons) return;

    adviceButtons.style.display = 'none';

    const timeout = setTimeout(() => {
      adviceButtons.style.display = 'flex';
      adviceButtons.classList.add('fade-in');
    }, INITIAL_DELAY + TALKING_DELAY + MESSAGE_1.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_2.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_3.length * TALKING_SPEED + MESSAGE_4.length * TALKING_SPEED);

    return () => {
      clearTimeout(timeout);
    };
  }, [hasLoaded]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasLoaded(true);
    }, INITIAL_DELAY + TALKING_DELAY + MESSAGE_1.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_2.length * TALKING_SPEED + TALKING_DELAY + MESSAGE_3.length * TALKING_SPEED + MESSAGE_4.length * TALKING_SPEED);

    return () => {
      clearTimeout(timeout);
    };
  }, [setHasLoaded]);

  return (
    <>
      <p
        className='text-white text-xl font-thin md:text-2xl'
        id='greeting-text-1'
      >
        Greetings traveler
      </p>
      <p className='text-white text-xl md:text-2xl' id='greeting-text-2'>
        Come rest with me for a bit
      </p>
      <p className='text-white text-xl md:text-2xl' id='greeting-text-3'>
        I will be leaving soon, so you'll only see me once
      </p>
      <p className='text-white text-xl md:text-2xl' id='greeting-text-4'>
        What is one piece of advice you would give to your past self?
      </p>
      <div
        className='flex gap-2 flex-col md:text-2xl sm:flex-row sm:gap-3'
        id='advice-buttons'
      >
        <button
          onClick={() => onChangeState('write')}
          className='bg-white rounded-lg text-black py-2 text-center text-lg sm:w-52'
        >
          Write advice
        </button>
        <button
          onClick={() => onChangeState('read')}
          className='bg-white rounded-lg text-black py-2 text-center text-lg sm:w-52'
        >
          Read advice
        </button>
      </div>
    </>
  );
}
