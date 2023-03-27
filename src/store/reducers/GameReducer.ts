import { Reducer } from 'redux';
import { ACTIONS, GameStatus } from '../types';
import { GameAction, InitialState } from '../types/IGame';

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
