import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  color: 'lightBlue' | 'lightYellow' | 'silver';
  styles?: string;
  onClick?: () => void;
};

const boxShadow = {
  lightBlue: 'shadow-[inset_0_-8px_0_#118C87]',
  lightYellow: 'shadow-[inset_0_-8px_0_#CC8B13]',
  silver: 'shadow-[inset_0_-4px_0_#6B8997]'
};

const buttonColor = {
  lightBlue: 'bg-lightBlue hover:bg-lightBlueHover',
  lightYellow: 'bg-lightYellow hover:bg-lightYellowHover',
  silver: 'bg-silver hover:bg-silverHover'
};

export const Button: React.FC<ButtonProps> = ({ children, color, styles, onClick }) => {
  return (
    <button className={`${buttonColor[color]} ${boxShadow[color]} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
};