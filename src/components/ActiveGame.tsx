import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Reset } from '../assets/icons/reset.svg';
import { Minimax } from '../minimax/Minimax';
import { setGameResults, updateBoard } from '../store/action-creators/action-creators';
import { RootState } from '../store/reducers';
import { GameStatus } from '../store/types';
import { ScoresPayload } from '../store/types/IGame';
import { Button } from './Button';
import { Cell } from './Cell';
import { Cross } from "./Icons/Cross";
import { Toe } from "./Icons/Toe";
import { PlayerTurnIndicator } from './PlayerTurnIndicator';
import { ScoreIndicator } from './ScoreIndicator';

const getWinner = (boardValue: string, scores: ScoresPayload, firstPlayerMark: string, gameMode: string) => {
  const data = {
    scores: scores,
    notification: {},
    status: GameStatus.DEFAULT
  };

  if (boardValue === firstPlayerMark && boardValue !== '') {
    data.scores.firstPlayer++;
    data.status = GameStatus.ROUND_WON;

    if (gameMode === 'singlePlayer') {
      data.notification = {
        message: 'You won!',
        subtitle: 'Takes the round',
        icon: firstPlayerMark,
      };
    } else {
      data.notification = {
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
      data.notification = {
        message: 'Oh no, you lost...',
        subtitle: 'Takes the round',
        icon: firstPlayerMark === 'cross' ? 'toe' : 'cross',

      };
    } else {
      data.notification = {
        message: 'Player 2 Wins!',
        subtitle: 'Takes the round',
        icon: firstPlayerMark === 'cross' ? 'toe' : 'cross',
      };
    }

    return data;
  };

  return data;
};

const isVictory = (board: string[][], scores: ScoresPayload, firstPlayerMark: string, gameMode: string) => {
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

      return { status: true, result };
    }
  }

  return {
    status: false,
    result: {
      scores,
      notification: {
        message: '',
        subtitle: '',
        icon: null,
      },
      status: GameStatus.DEFAULT
    }
  };
};

const isTie = (board: string[][], scores: ScoresPayload, firstPlayerMark: string, gameMode: string) => {
  let emptyValue = 0;
  const flatBoard = board.flat();

  flatBoard.forEach(item => {
    if (item === '') emptyValue++;
  });

  const { status } = isVictory(board, scores, firstPlayerMark, gameMode);

  if (emptyValue === 0 && !status) return true;

  return false;
};

export const ActiveGame = () => {
  const {
    board,
    gameMode,
    firstPlayerMark,
    secondPlayerMark,
    scores,
    currentStep,
    isFinished
  } = useSelector((state: RootState) => state.GameReducer);
  const [minimax] = useState(() => new Minimax(firstPlayerMark, secondPlayerMark));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFinished) {
      const { status, result } = isVictory(board, scores, firstPlayerMark, gameMode);
      if (status) {
        dispatch(setGameResults(result));

      } else if (isTie(board, scores, firstPlayerMark, gameMode)) {
        const data = {
          scores,
          notification: {
            message: '',
            subtitle: 'Round Tied',
            icon: null,
          },
          status: GameStatus.ROUND_TIED
        };

        data.scores.tie++;
        dispatch(setGameResults(data));

      } else if ((gameMode === 'singlePlayer' && currentStep === secondPlayerMark)
        && (!status && !isTie(board, scores, firstPlayerMark, gameMode))) {
        const promise = new Promise<any>(resolve => {
          setTimeout(() => {
            resolve(minimax.findBestMove(board));
          }, 200);
        });

        promise.then(result => {
          dispatch(updateBoard({ row: result.row, col: result.col, value: currentStep }));
        });
      }
    }

  }, [board]);

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
              notification: {
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