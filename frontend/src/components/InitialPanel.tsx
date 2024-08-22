import type { PageState } from './Panel';

export function InitialPanel({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  return (
    <>
      <p className='text-white text-xl font-thin'>Greetings traveler</p>
      <p className='text-white text-xl'>Come rest with me for a bit</p>
      <p className='text-white text-xl'>
        I will be leaving soon, so you'll only see me once
      </p>
      <p className='text-white text-xl'>
        What is one piece of advice you would give to your past self?
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
