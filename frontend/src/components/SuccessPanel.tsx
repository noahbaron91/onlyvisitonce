import { useEffect, useRef } from 'react';
import type { PageState } from './Panel';

const MESSAGE_1 =
  'Thanks for the great advice—I’ll be sure to pass it along to future travellers';

const MESSAGE_2 =
  'Feel free to stay for as long as you’d like and read other people’s advice';

export const TALKING_SPEED = 50;
export const TALKING_DELAY = 250;

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

export function SuccessPanel({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  useDelayedText(MESSAGE_1, 'success-1', 0);

  useDelayedText(
    MESSAGE_2,
    'success-2',
    MESSAGE_1.length * TALKING_SPEED + TALKING_DELAY
  );

  return (
    <>
      <p className='text-white text-xl font-thin' id='success-1'>
        Thanks for the great advice—I’ll be sure to pass it along to future
        travellers
      </p>
      <p id='success-2' className='text-white text-xl'>
        Feel free to stay for as long as you’d like and
      </p>
      <div className='flex gap-3'>
        <button
          onClick={() => onChangeState('write')}
          className='text-left text-white underline text-xl'
          id='success-3'
        >
          Write advice
        </button>
        <button
          className='text-left text-white underline text-xl'
          onClick={() => onChangeState('read')}
          id='success-4'
        >
          Read advice
        </button>
      </div>
    </>
  );
}
