import type { PageState } from './Panel';

export function SuccessPanel({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  return (
    <>
      <p className='text-white text-xl font-thin'>
        Thanks for the great advice—I’ll be sure to pass it along to future
        travellers
      </p>
      <p className='text-white text-xl'>
        Feel free to stay for as long as you’d like
      </p>
      <div className='flex gap-3'>
        <button
          onClick={() => onChangeState('write')}
          className='text-left text-white underline text-xl'
        >
          Write advice
        </button>
        <button
          className='text-left text-white underline text-xl'
          onClick={() => onChangeState('read')}
        >
          Read advice
        </button>
      </div>
    </>
  );
}
