import { useState } from 'react';
import type { PageState } from './Panel';

function ChevronLeft() {
  return (
    <svg
      width='26'
      height='27'
      viewBox='0 0 26 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.0164 6.23332C17.4394 6.65638 17.4394 7.34231 17.0164 7.76538L11.2824 13.4993L17.0164 19.2333C17.4394 19.6564 17.4394 20.3423 17.0164 20.7654C16.5933 21.1884 15.9074 21.1884 15.4843 20.7654L8.98429 14.2654C8.56123 13.8423 8.56123 13.1564 8.98429 12.7333L15.4843 6.23332C15.9074 5.81025 16.5933 5.81025 17.0164 6.23332Z'
        fill='white'
      />
    </svg>
  );
}

export function WriteAdvice({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  const [advice, setAdvice] = useState('');

  const submitAdvice = async () => {
    try {
      await fetch('/api/v1/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          advice,
        }),
      });

      onChangeState('initial');
    } catch (error) {
      // TODO: Add toast error message
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!advice) {
      return;
    }

    await submitAdvice();
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
      <div className='flex gap-2 items-center'>
        <button onClick={() => onChangeState('initial')}>
          <ChevronLeft />
        </button>
        <h3 className='text-white text-xl'>Write advice</h3>
      </div>
      <p className='text-white text-xl'>
        What is a piece of advice you would give to your past self?
      </p>
      <textarea
        value={advice}
        onChange={(event) => setAdvice(event.target.value)}
        placeholder='Write some wise words for future visitors'
        className='text-white outline-none w-full px-4 py-2 h-32 rounded-lg'
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        required
      />
      <button className='text-white text-xl' type='submit'>
        Submit
      </button>
    </form>
  );
}
