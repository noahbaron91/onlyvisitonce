import type { PageState } from './Panel';

export function InitialPanel({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  return (
    <>
      <p className='text-white text-xl font-thin'>Greetings traveler</p>
      <p className='text-white text-xl'>Come rest with me for a second</p>
      <p className='text-white text-xl'>
        What is a piece of advice you would give to your past self?
      </p>
      <div className='flex gap-4'>
        <button
          onClick={() => onChangeState('write')}
          className='text-white text-xl'
        >
          Leave advice
        </button>
        <button
          className='text-white text-xl'
          onClick={() => onChangeState('read')}
        >
          Read advice
        </button>
      </div>
    </>
  );
}
