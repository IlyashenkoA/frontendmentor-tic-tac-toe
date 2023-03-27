import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/reducers";
import { Cross } from "./Icons/Cross";
import { Toe } from "./Icons/Toe";

export const PlayerTurnIndicator = () => {
  const { currentStep } = useSelector((state: RootState) => state.GameReducer);

  return (
    <div className="flex flex-row items-center gap-x-2 bg-semiDarkNavy shadow-[inset_0_-4px_0_#10212A] rounded px-4 pt-2 pb-3">
      {currentStep === 'cross' ? <Cross svgClassName="w-4 h-4" pathClassName="fill-silver" /> : <Toe svgClassName="w-4 h-4" pathClassName="fill-silver" />}
      <h1 className="text-silver text-base uppercase font-bold">TURN</h1>
    </div>
  );
};