import { useDispatch, useSelector } from "react-redux";
import { cancelAction, nextRound, resetGame, resetRound } from "../store/action-creators/action-creators";
import { RootState } from "../store/reducers";
import { GameStatus } from "../store/types";
import { Button } from "./Button";
import { Cross } from "./Icons/Cross";
import { Toe } from "./Icons/Toe";

export const Notification = () => {
  const result = useSelector((state: RootState) => state.GameReducer.result);
  const status = useSelector((state: RootState) => state.GameReducer.status);

  const dispatch = useDispatch();

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-[#000000] opacity-50 z-1"></div>
      <div className="absolute top-2/4 left-0 translate-y-[-50%] w-full bg-semiDarkNavy py-11 z-2 grid place-items-center">
        <p className="uppercase text-base text-silver pb-4">
          {result?.message}
        </p>
        {result?.subtitle.length > 0
          ? <h1 className="inline-flex items-center gap-x-6 pb-6">
            {result?.icon === 'cross'
              ? <Cross svgClassName="w-16 h-16" />
              : result.icon === 'toe'
                ? <Toe svgClassName="w-16 h-16" />
                : null}
            <p className={`text-4xl uppercase font-bold ${result.icon === 'cross' ? 'text-lightBlue' : result.icon === 'toe' ? 'text-lightYellow' : 'text-silver'}`}>
              {result?.subtitle}
            </p>
          </h1>
          : null}
        <div className="inline-flex gap-x-4">
          <Button
            color='silver'
            styles='font-bold text-darkNavy uppercase pt-4 pb-5 px-4 rounded-2xl'
            onClick={() => {
              status === GameStatus.RESTART_ROUND
                ? dispatch(cancelAction())
                : dispatch(resetGame());
            }}
          >
            {status === GameStatus.RESTART_ROUND ? 'No, cancel' : 'Quit'}
          </Button>
          <Button
            color='lightYellow'
            styles='font-bold text-darkNavy uppercase pt-4 pb-5 px-4 rounded-2xl'
            onClick={() => {
              status === GameStatus.RESTART_ROUND
                ? dispatch(resetRound())
                : dispatch(nextRound());
            }}
          >
            {status === GameStatus.RESTART_ROUND ? 'Yes, restart' : 'Next round'}
          </Button>
        </div>
      </div>
    </>
  );
};