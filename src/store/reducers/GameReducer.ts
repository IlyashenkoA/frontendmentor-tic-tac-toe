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
			localStorage.setItem('gameMode', action.payload);
			localStorage.setItem('hasStarted', 'true');
			localStorage.setItem('firstPlayerMark', state.firstPlayerMark);

			return {
				...state,
				gameMode: action.payload,
				hasStarted: true,
			};
		case ACTIONS.SET_PLAYER_MARK:
			localStorage.setItem('firstPlayerMark', action.payload);

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

				localStorage.setItem('board', JSON.stringify(updatedBoard));
				localStorage.setItem(
					'currentStep',
					state.currentStep === 'cross' ? 'toe' : 'cross'
				);

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
			localStorage.setItem(
				'scores',
				JSON.stringify(scores ? scores : state.scores)
			);
			localStorage.setItem('isFinished', 'true');
			localStorage.setItem('notification', JSON.stringify(notification));
			localStorage.setItem('status', status);

			return {
				...state,
				isFinished: true,
				scores: scores ? scores : state.scores,
				notification: notification,
				status: status,
			};
		case ACTIONS.NEXT_ROUND:
			localStorage.setItem(
				'board',
				JSON.stringify([
					['', '', ''],
					['', '', ''],
					['', '', ''],
				])
			);
			localStorage.setItem('isFinished', 'false');
			localStorage.setItem('currentStep', 'cross');

			return {
				...state,
				board: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				isFinished: false,
				currentStep: 'cross',
			};
		case ACTIONS.RESET_ROUND:
			localStorage.clear();

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
			localStorage.setItem('isFinished', 'false');

			return {
				...state,
				isFinished: false,
				status: GameStatus.DEFAULT,
			};
		case ACTIONS.RESET_GAME:
			localStorage.clear();

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
				gameMode: '',
				scores: {
					firstPlayer: 0,
					secondPlayer: 0,
					tie: 0,
				},
			};
		case ACTIONS.UPDATE_DATA_FROM_LOCAL_STORAGE:
			const {
				board,
				gameMode,
				firstPlayerMark,
				scores: localStorageScore,
				hasStarted,
				isFinished,
				notification: localStorageNotification,
				status: localStorageStatus,
				currentStep,
			} = action.payload;

			return {
				...state,
				board: board
					? board
					: [
							['', '', ''],
							['', '', ''],
							['', '', ''],
					  ],
				gameMode: gameMode,
				firstPlayerMark: firstPlayerMark,
				secondPlayerMark: firstPlayerMark === 'cross' ? 'toe' : 'cross',
				currentStep: currentStep,
				scores: localStorageScore ? localStorageScore : state.scores,
				hasStarted: hasStarted === 'true' ? true : false,
				isFinished: isFinished === 'true' ? true : false,
				notification: localStorageNotification
					? localStorageNotification
					: state.notification,
				status: localStorageStatus ? localStorageStatus : state.status,
			};
		default:
			return state;
	}
};
