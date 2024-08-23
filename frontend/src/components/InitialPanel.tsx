import { useAmountOfAdviceLeft } from '../context/AmountOfAdviceLeft';
import { NoPiecesOfAdviceLeft } from './PiecesOfAdvice/NoPiecesOfAdviceLeft';
import { OnePieceOfAdviceLeft } from './PiecesOfAdvice/OnePieceOfAdviceLeft';
import type { PageState } from './Panel';
import { EightPiecesOfAdviceLeft } from './PiecesOfAdvice/EightPiecesOfAdviceLeft';
import { ThreePiecesOfAdviceLeft } from './PiecesOfAdvice/ThreePiecesOfAdviceLeft';
import { FourPiecesOfAdviceLeft } from './PiecesOfAdvice/FourPiecesOfAdviceLeft';
import { FivePiecesOfAdviceLeft } from './PiecesOfAdvice/FivePiecesOfAdviceLeft';
import { SixPiecesOfAdviceLeft } from './PiecesOfAdvice/SixPiecesOfAdviceLeft';
import { SevenPiecesOfAdviceLeft } from './PiecesOfAdvice/SevenPiecesOfAdviceLeft';
import { NinePiecesOfAdviceLeft } from './PiecesOfAdvice/NinePiecesOfAdviceLeft';
import { TenPiecesOfAdviceLeft } from './PiecesOfAdvice/TenPiecesOfAdviceLeft';
import { ElevenPiecesOfAdviceLeft } from './PiecesOfAdvice/ElevenPiecesOfAdviceLeft';
import { TwoPiecesOfAdviceLeft } from './PiecesOfAdvice/TwoPiecesOfAdviceLeft';
import { TwelvePiecesOfAdviceLeft } from './PiecesOfAdvice/TwelvePiecesOfAdivceLeft';

export function InitialPanel({
  onChangeState,
}: {
  onChangeState: (state: PageState) => void;
}) {
  const { amountOfAdviceLeft } = useAmountOfAdviceLeft();

  switch (amountOfAdviceLeft) {
    case 0:
      return <NoPiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 1:
      return <OnePieceOfAdviceLeft onChangeState={onChangeState} />;
    case 2:
      return <TwoPiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 3:
      return <ThreePiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 4:
      return <FourPiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 5:
      return <FivePiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 6:
      return <SixPiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 7:
      return <SevenPiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 8:
      return <EightPiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 9:
      return <NinePiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 10:
      return <TenPiecesOfAdviceLeft onChangeState={onChangeState} />;
    case 11:
      return <ElevenPiecesOfAdviceLeft onChangeState={onChangeState} />;
    default:
      return <TwelvePiecesOfAdviceLeft onChangeState={onChangeState} />;
  }
}
