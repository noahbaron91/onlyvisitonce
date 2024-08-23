import {
  useDelayedText,
  TALKING_SPEED,
  TALKING_DELAY,
} from '../../hooks/useDelayedText';
import { PageState } from '../Panel';

const MESSAGE_1 =
  'I WILL COUNT DOWN FROM 3. IF YOU ARE STILL HERE, I WILL DESTROY YOU.';
const MESSAGE_2 = '1.';
const MESSAGE_3 = '2.';
const MESSAGE_4 = '3.';
const MESSAGE_5 = '...';

export const EightPiecesOfAdviceLeft = ({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) => {
  useDelayedText(MESSAGE_1, 'text-1', 0);

  useDelayedText(
    MESSAGE_2,
    'text-2',
    MESSAGE_1.length * TALKING_SPEED + TALKING_DELAY
  );

  useDelayedText(
    MESSAGE_3,
    'text-3',
    MESSAGE_1.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_2.length * TALKING_SPEED +
      TALKING_DELAY
  );

  useDelayedText(
    MESSAGE_4,
    'text-4',
    MESSAGE_1.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_2.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_3.length * TALKING_SPEED +
      TALKING_DELAY
  );

  useDelayedText(
    MESSAGE_5,
    'text-5',
    MESSAGE_1.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_2.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_3.length * TALKING_SPEED +
      TALKING_DELAY +
      MESSAGE_4.length * TALKING_SPEED +
      TALKING_DELAY
  );

  return (
    <>
      <p className='text-white text-xl font-thin' id='text-1'>
        I WILL COUNT DOWN FROM 3. IF YOU ARE STILL HERE, I WILL DESTROY YOU.
      </p>
      <p className='text-white text-xl font-thin' id='text-2'>
        1.
      </p>
      <p className='text-white text-xl font-thin' id='text-3'>
        2.
      </p>
      <p className='text-white text-xl font-thin' id='text-4'>
        3.
      </p>
      <p className='text-white text-xl font-thin' id='text-5'>
        ...
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
};
