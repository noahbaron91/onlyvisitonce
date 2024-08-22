import type { PageState } from './Panel';

export function InitialPanel({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  return (
    <>
      <p className='text-white text-4xl' id='text'></p>
      <div className='flex gap-10'>
        <button
          onClick={() => onChangeState('write')}
          className='text-white text-2xl'
        >
          Leave advice
        </button>
        <button
          className='text-white text-2xl'
          onClick={() => onChangeState('read')}
        >
          Read advice
        </button>
      </div>
    </>
  );
}
