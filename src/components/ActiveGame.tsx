import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Reset } from '../assets/icons/reset.svg';
import { setGameResults } from '../store/action-creators/action-creators';
import { RootState } from '../store/reducers';
import { ScoresPayload } from '../store/reducers/GameReducer';
import { GameStatus } from '../store/types';
import { Button } from './Button';
import { Cell } from './Cell';
import { Cross } from "./Icons/Cross";
import { Toe } from "./Icons/Toe";
import { PlayerTurnIndicator } from './PlayerTurnIndicator';
import { ScoreIndicator } from './ScoreIndicator';

const getWinner = (boardValue: string, scores: ScoresPayload, firstPlayerMark: string, gameMode: string) => {
  const data = {
    scores: scores,
    result: {},
    status: GameStatus.DEFAULT
  };

  if (boardValue === firstPlayerMark && boardValue !== '') {
    data.scores.firstPlayer++;
    data.status = GameStatus.ROUND_WON;

    if (gameMode === 'singlePlayer') {
      data.result = {
        message: 'You won!',
        subtitle: 'Takes the round',
        icon: firstPlayerMark,
      };
    } else {
      data.result = {
        message: 'Player 1 Wins!',
        subtitle: 'Takes the round',
        icon: firstPlayerMark,
      };
    }

    return data;
  };

  if (boardValue !== firstPlayerMark && boardValue !== '') {
    data.scores.secondPlayer++;
    data.status = GameStatus.ROUND_LOST;

    if (gameMode === 'singlePlayer') {
      data.result = {
        message: 'Oh no, you lost...',
        subtitle: 'Takes the round',
        icon: firstPlayerMark === 'cross' ? 'toe' : 'cross',

      };
    } else {
      data.result = {
        message: 'Player 2 Wins!',
        subtitle: 'Takes the round',
        icon: firstPlayerMark === 'cross' ? 'toe' : 'cross',
      };
    }

    return data;
  };

  return data;
};

export const ActiveGame = () => {
  const board = useSelector((state: RootState) => state.GameReducer.board);
  const gameMode = useSelector((state: RootState) => state.GameReducer.gameMode);
  const firstPlayerMark = useSelector((state: RootState) => state.GameReducer.firstPlayerMark);
  const secondPlayerMark = useSelector((state: RootState) => state.GameReducer.secondPlayerMark);
  const scores = useSelector((state: RootState) => state.GameReducer.scores);

  const dispatch = useDispatch();

  useEffect(() => {
    isVictory(board);
    isTie(board, scores);
  }, [board]);

  const isVictory = (board: string[][]) => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const flatBoard = board.flat();

    for (let comb of combinations) {
      if (
        flatBoard[comb[0]] === flatBoard[comb[1]]
        && flatBoard[comb[1]] === flatBoard[comb[2]]
        && flatBoard[comb[0]] !== ''
      ) {
        const result = getWinner(flatBoard[comb[0]], scores, firstPlayerMark, gameMode);

        dispatch(setGameResults(result));
        return true;
      }
    }

    return false;
  };

  const isTie = (board: string[][], scores: ScoresPayload) => {
    let emptyValue = 0;
    const flatBoard = board.flat();
    const result = {
      scores,
      result: {
        message: '',
        subtitle: 'Round Tied',
        icon: null,
      },
      status: GameStatus.ROUND_TIED
    };

    flatBoard.forEach(item => {
      if (item === '') emptyValue++;
    });

    if (emptyValue === 0 && !isVictory(board)) {
      result.scores.tie++;
      dispatch(setGameResults(result));
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="flex flex-row justify-between items-center  pb-11 md:pb-0">
        <div className="flex flex-row gap-x-2">
          <Cross />
          <Toe />
        </div>
        <PlayerTurnIndicator />
        <Button
          color='silver'
          styles='h-10 w-10 grid place-items-center rounded'
          onClick={() => {
            const data = {
              result: {
                message: '',
                subtitle: 'Restart Game?',
                icon: null
              },
              status: GameStatus.RESTART_ROUND
            };

            dispatch(setGameResults(data));
          }}
        >
          <Reset />
        </Button>
      </div>
      <div className='grid grid-cols-3 grid-rows-3 place-items-center place-self-center gap-5 w-fit'>
        {board.map((item, row) => {
          return item.map((item, col) => {
            let id = '' + row + col;

            return <Cell key={id} icon={item} row={row} col={col} />;
          });
        })}
      </div>
      <div className="inline-flex gap-x-5 justify-between">
        <ScoreIndicator styles='bg-lightBlue w-24 md:w-36 rounded-2xl py-3 grid place-items-center'>
          <p className='text-darkNavy font-medium text-sm'>
            X {gameMode === 'singlePlayer'
              ? firstPlayerMark === 'cross'
                ? '(YOU)'
                : '(CPU)'
              : firstPlayerMark === 'cross'
                ? '(P1)'
                : '(P2)'}
          </p>
          <span className='text-2xl text-darkNavy font-bold'>
            {firstPlayerMark === 'cross'
              ? scores.firstPlayer
              : scores.secondPlayer}
          </span>
        </ScoreIndicator>
        <ScoreIndicator styles='bg-silver w-24 md:w-36 rounded-2xl py-3 grid place-items-center'>
          <p className='text-darkNavy font-medium text-sm'>TIES</p>
          <span className='text-2xl text-darkNavy font-bold'>
            {scores.tie}
          </span>
        </ScoreIndicator>
        <ScoreIndicator styles='bg-lightYellow w-24 md:w-36 rounded-2xl py-3 grid place-items-center'>
          <p className='text-darkNavy font-medium text-sm'>
            O {gameMode === 'singlePlayer'
              ? secondPlayerMark === 'cross'
                ? '(YOU)'
                : '(CPU)'
              : secondPlayerMark === 'cross'
                ? '(P1)'
                : '(P2)'}
          </p>
          <span className='text-2xl text-darkNavy font-bold'>
            {secondPlayerMark === 'cross'
              ? scores.firstPlayer
              : scores.secondPlayer}
          </span>
        </ScoreIndicator>
      </div>
    </div>
  );
};