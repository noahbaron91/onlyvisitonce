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
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M17.0164 6.23332C17.4394 6.65638 17.4394 7.34231 17.0164 7.76538L11.2824 13.4993L17.0164 19.2333C17.4394 19.6564 17.4394 20.3423 17.0164 20.7654C16.5933 21.1884 15.9074 21.1884 15.4843 20.7654L8.98429 14.2654C8.56123 13.8423 8.56123 13.1564 8.98429 12.7333L15.4843 6.23332C15.9074 5.81025 16.5933 5.81025 17.0164 6.23332Z'
        fill='white'
      />
    </svg>
  );
}

export function ReadAdvice({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  return (
    <>
      <div className='flex items-center gap-5'>
        <div className='flex gap-4 items-center'>
          <ChevronLeft />
          <h3 className='text-white text-2xl'>Read advice</h3>
        </div>
        <div className='flex items-center gap-6'>
          <p className='text-white text-2xl'>Top</p>
          <p className='text-white text-2xl'>Recent</p>
        </div>
      </div>
    </>
  );
}
