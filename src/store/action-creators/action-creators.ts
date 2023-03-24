import { ScoresPayload } from '../reducers/GameReducer';
import { ACTIONS, GameStatus } from '../types';

type UpdateBoardPayload = {
	row: number;
	col: number;
	value: string;
};

type GameResults = {
	scores?: ScoresPayload;
	result: Object;
	status:
		| GameStatus.DEFAULT
		| GameStatus.ROUND_LOST
		| GameStatus.ROUND_WON
		| GameStatus.ROUND_TIED
		| GameStatus.RESTART_ROUND;
};

export const startGame = (data: string) => {
	return { type: ACTIONS.START_GAME, payload: data };
};

export const setFirstPlayerMark = (data: string) => {
	return { type: ACTIONS.SET_PLAYER_MARK, payload: data };
};

export const updateBoard = (data: UpdateBoardPayload) => {
	return { type: ACTIONS.UPDATE_BOARD, payload: data };
};

export const setGameResults = (data: GameResults) => {
	return { type: ACTIONS.SET_GAME_RESULTS, payload: data };
};

export const nextRound = () => {
	return { type: ACTIONS.NEXT_ROUND };
};

export const resetRound = () => {
	return { type: ACTIONS.RESET_ROUND };
};

export const cancelAction = () => {
	return { type: ACTIONS.CANCEL };
};

export const resetGame = () => {
	return { type: ACTIONS.RESET_GAME };
};