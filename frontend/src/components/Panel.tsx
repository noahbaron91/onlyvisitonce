import { useState } from 'react';
import { WriteAdvice } from './WriteAdvice';
import { ReadAdvice } from './ReadAdvice';
import { InitialPanel } from './InitialPanel';

export type PageState = 'initial' | 'read' | 'write';

function InsideContent() {
  const [pageState, setPageState] = useState<PageState>('initial');

  switch (pageState) {
    case 'read': {
      return <ReadAdvice onChangeState={setPageState} />;
    }
    case 'write': {
      return <WriteAdvice onChangeState={setPageState} />;
    }
    case 'initial': {
      return <InitialPanel onChangeState={setPageState} />;
    }
  }
}

export function Panel() {
  return (
    <div
      className='rounded-xl my-3 py-3 px-4 mx-3 text-left flex flex-col gap-5'
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
    >
      <InsideContent />
    </div>
  );
}
