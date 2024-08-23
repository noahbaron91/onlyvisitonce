import { useEffect, useRef } from 'react';

export const TALKING_SPEED = 50;
export const TALKING_DELAY = 250;

export const useDelayedText = (
  message: string,
  id: string,
  initialDelay: number
) => {
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
