import { useDelayedText } from '../../hooks/useDelayedText';
import { PageState } from '../Panel';

const MESSAGE_1 =
  'DID YOU REALLY THINK YOU COULD ESCAPE ME? MY POWER IS LIMITLESS. I WILL DESTROY YOU NOW.';

export const TenPiecesOfAdviceLeft = ({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) => {
  useDelayedText(MESSAGE_1, 'text-1', 0);

  return (
    <>
      <p className='text-white text-xl font-thin' id='text-1'>
        DID YOU REALLY THINK YOU COULD ESCAPE ME? MY POWER IS LIMITLESS. I WILL
        DESTROY YOU NOW.
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
