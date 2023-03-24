import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { updateBoard } from "../store/action-creators/action-creators";
import { RootState } from "../store/reducers";
import { Cross } from "./Icons/Cross";
import { CrossHover } from "./Icons/Hover/CrossHover";
import { ToeHover } from "./Icons/Hover/ToeHover";
import { Toe } from "./Icons/Toe";

interface ICell {
  icon: string;
  row: number;
  col: number;
}

export const Cell: React.FC<ICell> = memo(({ icon, row, col }) => {
  const currentStep = useSelector((state: RootState) => state.GameReducer.currentStep);
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <button
      className=" grid place-items-center bg-semiDarkNavy h-24 w-24 pt-6 pb-8 px-7 md:p-10 md:h-36 md:w-36 rounded-xl shadow-[inset_0_-8px_0_#10212A]"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => dispatch(updateBoard({ row: row, col: col, value: currentStep }))}
    >
      {icon === 'cross'
        ? <Cross svgClassName="md:h-16 md:w-16" />
        : icon === 'toe'
          ? <Toe svgClassName="md:h-16 md:w-16" />
          : isHover && currentStep === 'cross' ? <CrossHover svgClassName="h-8 w-8 md:h-16 md:w-16" />
            : isHover && currentStep === 'toe' ? <ToeHover svgClassName="h-8 w-8 md:h-16 md:w-16" />
              : null}
    </button>
  );
});