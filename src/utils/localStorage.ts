import { ScoresPayload } from '../store/types/IGame';

type updateInLocalStorage = {
	board: string[][];
	gameMode: string;
	firstPlayerMark: string;
	scores: ScoresPayload;
};

export const updateDataInLocalStorage = ({
	board,
	gameMode,
	firstPlayerMark,
	scores,
}: updateInLocalStorage) => {
	localStorage.setItem('board', JSON.stringify(board));
	localStorage.setItem('gameMode', gameMode);
	localStorage.setItem('firstPlayerMark', firstPlayerMark);
	localStorage.setItem('scores', JSON.stringify(scores));
};

export const getDataFromLocalStorage = () => {
	if (localStorage.getItem('board')) {
		return {
			status: true,
			data: {
				board: JSON.parse(localStorage.getItem('board')!),
				gameMode: localStorage.getItem('gameMode'),
				firstPlayerMark: localStorage.getItem('firstPlayerMark'),
				scores: JSON.parse(localStorage.getItem('scores')!),
				currentStep: localStorage.getItem('currentStep'),
				hasStarted: JSON.parse(localStorage.getItem('hasStarted')!),
				isFinished: JSON.parse(localStorage.getItem('isFinished')!),
				notification: JSON.parse(localStorage.getItem('notification')!),
				status: localStorage.getItem('status'),
			},
		};
	}

	return { status: false, data: {} };
};
