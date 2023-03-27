import { useDispatch } from 'react-redux';

import { startGame } from '../store/action-creators/action-creators';
import { Button } from './Button';
import { Cross } from './Icons/Cross';
import { Toe } from './Icons/Toe';
import { PlayerMark } from './PlayerMark';

export const GameMenu = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col gap-y-8">
      <div className="flex flex-row justify-center gap-x-2">
        <Cross />
        <Toe />
      </div>
      <PlayerMark />
      <div className='flex flex-col gap-y-4'>
        <Button
          color='lightYellow'
          styles='font-bold text-darkNavy uppercase pt-4 pb-5 rounded-2xl'
          onClick={() => dispatch(startGame('singlePlayer'))}
        >
          New Game (vs CPU)
        </Button>
        <Button
          color='lightBlue'
          styles='font-bold text-darkNavy uppercase pt-4 pb-5 rounded-2xl'
          onClick={() => dispatch(startGame('multiPlayer'))}
        >
          New Game (vs Player)
        </Button>
      </div>
    </div >
  );
};