import { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setFirstPlayerMark } from '../store/action-creators/action-creators';
import { Cross } from './Icons/Cross';
import { Toe } from './Icons/Toe';

export const PlayerMark = () => {
  const [playerMark, setPlayerMark] = useState<string>('cross');
  const dispatch = useDispatch();

  return (
    <div className="grid place-items-center bg-semiDarkNavy shadow-[inset_0_-8px_0_#10212A] rounded-2xl p-6 gap-y-6">
      <h1 className="text-silver text-base uppercase font-bold">PICK PLAYER 1&apos;S MARK</h1>
      <div className="inline-flex bg-darkNavy rounded-xl w-full p-2">
        <label
          className={`flex-auto cursor-pointer rounded-xl p-2 ${playerMark === 'cross' ? 'bg-silver' : 'hover:bg-silver/[.05]'}`}
          htmlFor="cross"
        >
          <input
            className="hidden"
            type="radio"
            id="cross"
            name="player-mark"
            value='cross'
            checked={playerMark === 'cross'}
            onChange={e => {
              setPlayerMark(e.target.value);
              dispatch(setFirstPlayerMark(e.target.value));
            }}
          />
          <Cross
            svgClassName='m-auto'
            pathClassName={`${playerMark === 'cross' ? 'fill-darkNavy' : 'fill-silver'}`}
          />
        </label>
        <label
          className={`flex-auto cursor-pointer rounded-xl p-2 ${playerMark === 'toe' ? 'bg-silver' : 'hover:bg-silver/[.05]'}`}
          htmlFor="toe"
        >
          <input
            className="hidden"
            type="radio"
            id="toe"
            name="player-mark"
            value='toe'
            checked={playerMark === 'toe'}
            onChange={e => {
              setPlayerMark(e.target.value);
              dispatch(setFirstPlayerMark(e.target.value));
            }}
          />
          <Toe
            svgClassName='m-auto'
            pathClassName={`${playerMark === 'toe' ? 'fill-darkNavy' : 'fill-silver'}`}
          />
        </label>
      </div>
      <h2 className="text-silver text-sm uppercase font-bold opacity-50">REMEMBER : X GOES FIRST</h2>
    </div>
  );
};