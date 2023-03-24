interface IScoreIndicator {
  styles?: string;
  children: React.ReactNode;
}

export const ScoreIndicator: React.FC<IScoreIndicator> = ({ styles, children }) => {
  return (
    <div className={styles}>
      {children}
    </div>
  );
};