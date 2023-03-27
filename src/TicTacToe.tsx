import { useSelector } from "react-redux";
import { ActiveGame } from "./components/ActiveGame";
import { GameMenu } from "./components/GameMenu";
import { Notification } from "./components/Notification";
import { RootState } from "./store/reducers";

export const TicTacToe = () => {
  const { hasStarted, isFinished } = useSelector((state: RootState) => state.GameReducer);

  return (
    <main className='min-h-screen min-w-[375px] max-w-[23.5rem] md:max-w-[31.75rem] px-6 py-6 m-auto grid md:place-items-center md:py-0 font-outfit'>
      {hasStarted ? <ActiveGame /> : <GameMenu />}
      {hasStarted && isFinished ? <Notification /> : null}
    </main>
  );
};
