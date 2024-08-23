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
      className='rounded-xl max-h-screen m-3 lg:m-8 p-4 text-left flex flex-col gap-5 max-w-2xl md:p-7 border border-stone-800'
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
    >
      <InsideContent />
    </div>
  );
}
