import { GameStatus } from '.';

export interface InitialState {
	board: string[][];
	hasStarted: boolean;
	isFinished: boolean;
	gameMode: 'singlePlayer' | 'multiPlayer' | '';
	firstPlayerMark: 'cross' | 'toe';
	secondPlayerMark: 'cross' | 'toe';
	currentStep: 'cross' | 'toe';
	scores: ScoresPayload;
	notification: NotificationData;
	status:
		| GameStatus.DEFAULT
		| GameStatus.RESTART_ROUND
		| GameStatus.ROUND_LOST
		| GameStatus.ROUND_WON
		| GameStatus.ROUND_TIED;
}

export type GameAction = {
	type: string;
	payload: any;
};

export type ScoresPayload = {
	firstPlayer: number;
	secondPlayer: number;
	tie: number;
};

export type NotificationData = {
	message: string;
	subtitle: string;
	icon: string | null;
};
