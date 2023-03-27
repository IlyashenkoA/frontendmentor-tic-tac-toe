export class Minimax {
	board: string[][];
	player: string;
	opponent: string;
	MAX: number;
	MIN: number;

	constructor(board: string[][], playerMark: string, opponentMark: string) {
		this.board = board;
		this.player = playerMark;
		this.opponent = opponentMark;
		this.MAX = Infinity;
		this.MIN = -Infinity;
	}

	isMoveLeft(board: string[][]) {
		let emptyValue = 0;
		const flatBoard = board.flat();

		flatBoard.forEach((item) => {
			if (item === '') emptyValue++;
		});

		if (emptyValue === 0) return false;

		return true;
	}

	evaluate(board: string[][]) {
		const WIN_SCORE = 10;
		const LOSE_SCORE = -10;
		const combinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		const flatBoard = board.flat();

		for (let comb of combinations) {
			if (
				flatBoard[comb[0]] === flatBoard[comb[1]] &&
				flatBoard[comb[1]] === flatBoard[comb[2]]
			) {
				if (flatBoard[comb[0]] === this.player) return WIN_SCORE;
				else if (flatBoard[comb[0]] === this.opponent) return LOSE_SCORE;
			}
		}

		// Else if none of them have
		// won then return 0
		return 0;
	}

	minimax(
		board: string[][],
		depth: number,
		isMax: boolean,
		alpha: number,
		beta: number
	) {
		let score = this.evaluate(board);
		const BOARD_SIZE = 3;

		// If Maximizer has won the game
		// return his/her evaluated score
		if (score === 10) return score;

		// If Minimizer has won the game
		// return his/her evaluated score
		if (score === -10) return score;

		// If there are no more moves and
		// no winner then it is a tie
		if (this.isMoveLeft(board) === false) return 0;

		// If this maximizer's move
		if (isMax) {
			let best = this.MIN;

			// Traverse all cells
			for (let i = 0; i < BOARD_SIZE; i++) {
				for (let j = 0; j < BOARD_SIZE; j++) {
					// Check if cell is empty
					if (board[i][j] === '') {
						// Make the move
						board[i][j] = this.player;

						// Call minimax recursively
						// and choose the maximum value
						best = Math.max(
							best,
							this.minimax(board, depth + 1, !isMax, alpha, beta)
						);
						alpha = Math.max(alpha, best);

						// Undo the move
						board[i][j] = '';

						if (beta <= alpha) break;
					}
				}
			}
			return best;
		}

		// If this minimizer's move
		else {
			let best = this.MAX;

			// Traverse all cells
			for (let i = 0; i < BOARD_SIZE; i++) {
				for (let j = 0; j < BOARD_SIZE; j++) {
					// Check if cell is empty
					if (board[i][j] === '') {
						// Make the move
						board[i][j] = this.opponent;

						// Call minimax recursively and
						// choose the minimum value
						best = Math.min(
							best,
							this.minimax(board, depth + 1, !isMax, alpha, beta)
						);
						beta = Math.min(beta, best);

						// Undo the move
						board[i][j] = '';

						if (beta <= alpha) break;
					}
				}
			}
			return best;
		}
	}

	findBestMove(board: string[][]) {
		let bestVal = this.MIN;
		let bestMove = { row: -1, col: -1 };

		// Traverse all cells, evaluate
		// minimax function for all empty
		// cells. And return the cell
		// with optimal value.
		board.forEach((row, rowIndex) => {
			row.forEach((value, colIndex) => {
				// Check if cell is empty
				if (value === '') {
					// Make the move
					value = this.player;

					// compute evaluation function
					// for this move.
					let moveVal = this.minimax(board, 0, false, this.MIN, this.MAX);

					// Undo the move
					value = '';

					// If the value of the current move
					// is more than the best value, then
					// update best
					if (moveVal > bestVal) {
						bestMove.row = rowIndex;
						bestMove.col = colIndex;
						bestVal = moveVal;
					}
				}
			});
		});

		return bestMove;
	}
}
