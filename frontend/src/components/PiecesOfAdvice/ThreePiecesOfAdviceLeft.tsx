import {
  TALKING_SPEED,
  useDelayedText,
  TALKING_DELAY,
} from '../../hooks/useDelayedText';
import { PageState } from '../Panel';

const MESSAGE_1 =
  'And a third piece of advice! You are an oozing fountain of knowledge!';
const MESSAGE_2 =
  ' Feel free to stay for as long as you’d like and read other people’s advice';

export const ThreePiecesOfAdviceLeft = ({
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

  return (
    <>
      <p className='text-white text-xl font-thin' id='text-1'>
        And a third piece of advice! You are an oozing fountain of knowledge!
      </p>
      <p id='text-2' className='text-white text-xl'>
        Feel free to stay for as long as you’d like and read other people’s
        advice
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
