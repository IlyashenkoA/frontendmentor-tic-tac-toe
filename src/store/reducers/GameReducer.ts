import { ACTIONS, GameStatus } from '../types';

const initialState = {
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
	result: {},
	status: GameStatus.DEFAULT,
};

type GameAction = {
	type: string;
	payload: any;
};

export type ScoresPayload = {
	firstPlayer: number;
	secondPlayer: number;
	tie: number;
};

export const GameReducer = (state = initialState, action: GameAction) => {
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
			const { scores, result, status } = action.payload;

			return {
				...state,
				isFinished: true,
				scores: scores ? scores : state.scores,
				result: result,
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
