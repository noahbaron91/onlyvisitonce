import { useEffect, useState } from 'react';
import type { PageState } from './Panel';
import { twMerge } from 'tailwind-merge';

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

type Filter = 'top' | 'recent';

function Advice({
  advice,
  id,
  netVotes,
  userVoteStatus,
  onDownvote,
  onUpvote,
}: {
  advice: string;
  netVotes: number;
  userVoteStatus: number;
  id: number;
  onUpvote: () => void;
  onDownvote: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const netVotesWithSign = netVotes > 0 ? `+${netVotes}` : netVotes;

  return (
    <div className='flex flex-col ' key={id}>
      <p
        className={twMerge(
          'text-white w-full leading-snug text-xl',
          !isExpanded && 'line-clamp-4'
        )}
        style={{ wordBreak: 'break-word' }}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {advice}
      </p>
      <div className='flex gap-1 items-center'>
        <button
          style={{ fill: userVoteStatus === 1 ? '#00C2FF' : 'white' }}
          type='button'
          onClick={onUpvote}
        >
          <Upvote />
        </button>
        <p
          className='text-white text-xl min-w-4 text-center'
          onClick={(event) => event.stopPropagation()}
        >
          {netVotesWithSign}
        </p>
        <button
          style={{ fill: userVoteStatus === -1 ? '#00C2FF' : 'white' }}
          type='button'
          onClick={onDownvote}
        >
          <Downvote />
        </button>
      </div>
    </div>
  );
}

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    // retry in 5 seconds
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(fetchData(url));
      }, 5000);
    });
  }
};

const useAdvice = ({
  filter,
  page,
}: {
  page: number;
  filter: 'top' | 'recent';
}) => {
  const [advice, setAdvice] = useState<
    | {
        data: {
          id: number;
          advice: string;
          value: null | -1 | 1;
          netVotes: number;
          userVoteStatus: number;
          createdAt: string;
        }[];
        hasMore: boolean;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    try {
      fetchData(`/api/v1/advice?filter=${filter}&page=${page}`).then((data) => {
        setAdvice(data);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [filter, page]);

  return { advice, setAdvice };
};

function AdviceListPage({
  filter,
  page,
  isLastPage,
  loadMore,
}: {
  filter: Filter;
  page: number;
  isLastPage: boolean;
  loadMore: () => void;
}) {
  const { advice, setAdvice } = useAdvice({ filter, page });

  if (!advice) {
    return <p className='text-white text-xl'>Loading...</p>;
  }

  const voteForAdvice = async (id: number, vote: -1 | 0 | 1) => {
    try {
      const optimisticData = advice.data.map((advice) => {
        if (advice.id === id) {
          return {
            ...advice,
            netVotes: advice.netVotes + vote - advice.userVoteStatus,
            userVoteStatus: vote,
          };
        }

        return advice;
      });

      setAdvice({ ...advice, data: optimisticData });

      await fetch(`/api/v1/advice/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ vote }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpvoteAdvice = async (id: number) => {
    if (!advice) return;

    const currentAdvice = advice.data.find((advice) => advice.id === id);
    if (!currentAdvice) return;

    if (currentAdvice.userVoteStatus === 1) {
      await voteForAdvice(id, 0);
      return;
    }

    await voteForAdvice(id, 1);
  };

  const handleDownvoteAdvice = async (id: number) => {
    if (!advice) return;

    const currentAdvice = advice.data.find((advice) => advice.id === id);
    if (!currentAdvice) return;

    if (currentAdvice.userVoteStatus === -1) {
      await voteForAdvice(id, 0);
      return;
    }

    await voteForAdvice(id, -1);
  };

  if (advice.data.length === 0) {
    return null;
  }

  return (
    <>
      {advice.data.map(({ advice, id, netVotes, userVoteStatus }) => (
        <Advice
          advice={advice}
          id={id}
          key={id}
          netVotes={netVotes}
          onDownvote={() => handleDownvoteAdvice(id)}
          onUpvote={() => handleUpvoteAdvice(id)}
          userVoteStatus={userVoteStatus}
        />
      ))}
      {isLastPage && advice.hasMore && (
        <button
          className='text-black bg-white w-full rounded-lg py-2 font-bold mt-2'
          onClick={loadMore}
        >
          Read more
        </button>
      )}
    </>
  );
}

function AdviceList({ filter }: { filter: Filter }) {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div className='hide-scrollbar flex flex-col h-[calc(100vh-175px)] lg:h-[calc(100vh-206px)] gap-3 py-3 overflow-y-auto w-full'>
      {Array.from({ length: pageIndex + 1 }).map((_, index) => (
        <AdviceListPage
          key={index}
          filter={filter}
          page={index}
          isLastPage={pageIndex === index}
          loadMore={() => setPageIndex((prev) => prev + 1)}
        />
      ))}
    </div>
  );
}

export function ReadAdvice({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  const [filter, setFilter] = useState<Filter>('top');

  return (
    <div className='flex flex-col items-start gap-3'>
      <div className='flex gap-2 items-center'>
        <button onClick={() => onChangeState('initial')}>
          <ChevronLeft />
        </button>
        <h3 className='text-white text-xl md:text-2xl'>Read advice</h3>
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
        <button
          className={twMerge(
            'text-white text-xl',
            filter === 'recent' && 'underline'
          )}
          onClick={() => setFilter('recent')}
        >
          Recent
        </button>
      </div>
      <AdviceList filter={filter} />
    </div>
  );
}
