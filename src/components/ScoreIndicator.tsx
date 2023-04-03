import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { ScoresPayload } from "../store/types/IGame";

interface RenderProps {
  scores: ScoresPayload;
  gameMode?: 'singlePlayer' | 'multiPlayer' | '';
  firstPlayerMark?: 'cross' | 'toe';
  secondPlayerMark?: 'cross' | 'toe';
}

interface IScoreIndicator {
  styles?: string;
  render: ({ scores, gameMode, firstPlayerMark, secondPlayerMark }: RenderProps) => ReactNode;
}

export const ScoreIndicator: React.FC<IScoreIndicator> = ({ styles, render }) => {
  const gameMode = useSelector((state: RootState) => state.GameReducer.gameMode);
  const firstPlayerMark = useSelector((state: RootState) => state.GameReducer.firstPlayerMark);
  const secondPlayerMark = useSelector((state: RootState) => state.GameReducer.secondPlayerMark);
  const scores = useSelector((state: RootState) => state.GameReducer.scores);

  return (
    <div className={styles}>
      {render({ scores, gameMode, firstPlayerMark, secondPlayerMark })}
    </div>
  );
};