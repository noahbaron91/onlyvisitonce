import { useState } from 'react';
import type { PageState } from './Panel';
import { twMerge } from 'tailwind-merge';
import useSWR from 'swr';

function ChevronLeft() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z'
        fill='white'
      />
    </svg>
  );
}

function Upvote() {
  return (
    <svg
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.41107 7.41009C9.73651 7.08466 10.2641 7.08466 10.5896 7.41009L15.5896 12.4101C15.915 12.7355 15.915 13.2632 15.5896 13.5886C15.2641 13.914 14.7365 13.914 14.4111 13.5886L10.0003 9.17786L5.58958 13.5886C5.26414 13.914 4.73651 13.914 4.41107 13.5886C4.08563 13.2632 4.08563 12.7355 4.41107 12.4101L9.41107 7.41009Z'
        fill='inherit'
      />
    </svg>
  );
}

function Downvote() {
  return (
    <svg
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.5894 13.5889C10.264 13.9144 9.73634 13.9144 9.41091 13.5889L4.41091 8.58893C4.08547 8.26349 4.08547 7.73585 4.41091 7.41042C4.73634 7.08498 5.26398 7.08498 5.58942 7.41042L10.0002 11.8212L14.4109 7.41042C14.7363 7.08498 15.264 7.08498 15.5894 7.41042C15.9149 7.73585 15.9149 8.26349 15.5894 8.58893L10.5894 13.5889Z'
        fill='inherit'
      />
    </svg>
  );
}

const getAdvice = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

type Filter = 'top' | 'recent';

function AdviceList({ filter }: { filter: Filter }) {
  const { data, mutate } = useSWR<
    {
      id: number;
      advice: string;
      value: null | -1 | 1;
      netVotes: number;
      userVoteStatus: number;
    }[]
  >(`/api/v1/advice?filter=${filter}`, getAdvice);

  if (!data) {
    return <p className='text-white'>Loading...</p>;
  }

  const voteForAdvice = async (id: number, vote: -1 | 0 | 1) => {
    try {
      // TOODO: Optimistic update with swr
      await fetch(`/api/v1/advice/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ vote }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await mutate();
    } catch (error) {
      // TOOD: Add toast error message
    }
  };

  const handleUpvoteAdvice = async (id: number) => {
    if (!data) return;

    const advice = data.find((advice) => advice.id === id);
    if (!advice) return;

    if (advice.userVoteStatus === 1) {
      await voteForAdvice(id, 0);
      return;
    }

    await voteForAdvice(id, 1);
  };

  const handleDownvoteAdvice = async (id: number) => {
    if (!data) return;

    const advice = data.find((advice) => advice.id === id);

    if (!advice) return;

    if (advice.userVoteStatus === -1) {
      await voteForAdvice(id, 0);
      return;
    }

    await voteForAdvice(id, -1);
  };

  if (data.length === 0) {
    return null;
  }

  return data.map(({ advice, id, netVotes, userVoteStatus }) => (
    <div className='flex flex-col gap-1' key={id}>
      <p
        className='text-white w-full leading-snug'
        style={{ wordBreak: 'break-word' }}
      >
        {advice}
      </p>
      <div className='flex gap-1 items-center'>
        <button
          style={{ fill: userVoteStatus === 1 ? '#00C2FF' : 'white' }}
          type='button'
          onClick={() => handleUpvoteAdvice(id)}
        >
          <Upvote />
        </button>
        <p
          className='text-white text-xl min-w-4 text-center'
          onClick={(event) => event.stopPropagation()}
        >
          {netVotes}
        </p>
        <button
          style={{ fill: userVoteStatus === -1 ? '#00C2FF' : 'white' }}
          type='button'
          onClick={() => handleDownvoteAdvice(id)}
        >
          <Downvote />
        </button>
      </div>
    </div>
  ));
}

export function ReadAdvice({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  const [filter, setFilter] = useState<Filter>('top');

  return (
    <div className='flex flex-col items-start gap-3'>
      <div className='flex gap-3 items-center'>
        <button onClick={() => onChangeState('initial')}>
          <ChevronLeft />
        </button>
        <h3 className='text-white text-xl'>Read advice</h3>
      </div>
      <div className='flex items-center gap-6'>
        <button
          className={twMerge(
            'text-white text-xl',
            filter === 'top' && 'underline'
          )}
          onClick={() => setFilter('top')}
        >
          Top
        </button>
        <p
          className={twMerge(
            'text-white text-xl',
            filter === 'recent' && 'underline'
          )}
          onClick={() => setFilter('recent')}
        >
          Recent
        </p>
      </div>
      <AdviceList filter={filter} />
    </div>
  );
}
