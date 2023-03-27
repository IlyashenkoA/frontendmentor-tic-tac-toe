import { Reducer } from 'redux';
import { ACTIONS, GameStatus } from '../types';

const initialState: InitialState = {
	board: [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	],
	hasStarted: false,
	isFinished: false,
	gameMode: '',
	firstPlayerMark: 'cross',
	secondPlayerMark: 'toe',
	currentStep: 'cross',
	scores: {
		firstPlayer: 0,
		secondPlayer: 0,
		tie: 0,
	},
	notification: {
		message: '',
		subtitle: '',
		icon: null,
	},
	status: GameStatus.DEFAULT,
};

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

type GameAction = {
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

export const GameReducer: Reducer<InitialState, GameAction> = (
	state = initialState,
	action: GameAction
) => {
	switch (action.type) {
		case ACTIONS.START_GAME:
			return {
				...state,
				gameMode: action.payload,
				hasStarted: true,
			};
		case ACTIONS.SET_PLAYER_MARK:
			return {
				...state,
				firstPlayerMark: action.payload,
				secondPlayerMark: action.payload === 'cross' ? 'toe' : 'cross',
			};
		case ACTIONS.UPDATE_BOARD:
			const { col, row, value } = action.payload;

			if (state.board[row][col] === '') {
				const updatedBoard = Object.assign([...state.board], {
					[row]: Object.assign([...state.board[row]], {
						[col]: value,
					}),
				});

				return {
					...state,
					board: updatedBoard,
					currentStep: state.currentStep === 'cross' ? 'toe' : 'cross',
				};
			}

			return {
				...state,
			};
		case ACTIONS.SET_GAME_RESULTS:
			const { scores, notification, status } = action.payload;

			return {
				...state,
				isFinished: true,
				scores: scores ? scores : state.scores,
				notification: notification,
				status: status,
			};
		case ACTIONS.NEXT_ROUND:
			return {
				...state,
				board: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				isFinished: false,
				resetRound: false,
				currentStep: 'cross',
			};
		case ACTIONS.RESET_ROUND:
			return {
				...state,
				board: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				currentStep: 'cross',
				isFinished: false,
			};
		case ACTIONS.CANCEL:
			return {
				...state,
				isFinished: false,
				status: GameStatus.DEFAULT,
			};
		case ACTIONS.RESET_GAME:
			return {
				...state,
				hasStarted: false,
				isFinished: false,
				board: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				currentStep: 'cross',
				firstPlayerMark: 'cross',
				secondPlayerMark: 'toe',
				scores: {
					firstPlayer: 0,
					secondPlayer: 0,
					tie: 0,
				},
			};
		default:
			return state;
	}
};
